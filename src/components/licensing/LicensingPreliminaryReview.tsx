"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { licensingApplications, LicensingApplicationType } from "@/lib/licensing";
import { LicensingObservation, LicensingReviewField, LicensingReviewResponse, licensingFieldText, prepareLicensingObservations } from "@/lib/licensing-review";
import { useGetLicensingPreliminaryReviewQuery, useSaveLicensingPreliminaryReviewMutation } from "@/redux/features/license-api-slice";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export function ReviewFieldValue({ field }: { field: LicensingReviewField }) {
  if (field.kind === "file" && typeof field.value === "string" && /^https?:\/\//i.test(field.value)) {
    const name = decodeURIComponent(field.value.split("/").pop()?.split("?")[0] || "Attachment");
    return <div className="rounded-md border bg-background p-3"><p className="mb-2 break-all text-sm">{name}</p>
      <a href={field.value} target="_blank" rel="noopener noreferrer" className="font-medium text-primary underline">Open submitted document</a>
    </div>;
  }
  return <div className="whitespace-pre-wrap break-words rounded-md bg-muted/40 p-3 text-sm">{licensingFieldText(field.value)}</div>;
}

function ReviewEditor({ data, applicationType, id, onSaved }: {
  data: LicensingReviewResponse; applicationType: LicensingApplicationType; id: number;
  onSaved: (response: LicensingReviewResponse) => void;
}) {
  const router = useRouter();
  const [observations, setObservations] = useState<Record<string, LicensingObservation>>(() => {
    const keys = new Set(data.fields.map((field) => field.key));
    return Object.fromEntries(Object.entries(data.review?.observations ?? {}).filter(([key]) => keys.has(key)));
  });
  const [summary, setSummary] = useState(data.review?.summary ?? "");
  const [outcome, setOutcome] = useState(data.review?.outcome ?? "");
  const [confirmed, setConfirmed] = useState(false);
  const [dirty, setDirty] = useState(false);
  const [search, setSearch] = useState("");
  const [concernsOnly, setConcernsOnly] = useState(false);
  const [section, setSection] = useState("");
  const [error, setError] = useState("");
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [historyId, setHistoryId] = useState("");
  const [saveReview, { isLoading: saving }] = useSaveLicensingPreliminaryReviewMutation();
  const historical = data.history.find((item) => String(item.id) === historyId);
  const editable = data.can_edit && !historical;
  const shownFields = historical?.fields ?? data.fields;
  const shownObservations = historical?.observations ?? observations;
  const sections = [...new Set(shownFields.map((field) => field.section))];
  const comments = Object.values(shownObservations).filter((item) => item.comment.trim());
  const concerns = Object.values(shownObservations).filter((item) => item.finding === "clarification").length;
  const visible = shownFields.filter((field) => (!section || section === field.section)
    && (!concernsOnly || shownObservations[field.key]?.finding === "clarification")
    && `${field.label} ${licensingFieldText(field.value)}`.toLowerCase().includes(search.toLowerCase()));

  useEffect(() => {
    if (!dirty) return;
    const guard = (event: BeforeUnloadEvent) => { event.preventDefault(); event.returnValue = ""; };
    window.addEventListener("beforeunload", guard);
    return () => window.removeEventListener("beforeunload", guard);
  }, [dirty]);

  const change = (key: string, next: LicensingObservation | null) => {
    setObservations((current) => { const updated = { ...current }; if (next) updated[key] = next; else delete updated[key]; return updated; });
    setDirty(true);
    setError("");
  };
  const save = async (submit: boolean) => {
    if (!editable || saving) return;
    const cleaned = prepareLicensingObservations(observations);
    if (Object.values(cleaned).some((item) => !item.comment)) { setError("Describe every item flagged for clarification."); return; }
    if (submit && (!summary.trim() || !outcome || !confirmed)) { setError("Provide an overall summary, choose a conclusion and confirm you reviewed the application."); return; }
    if (submit && outcome === "no_concerns" && concerns) { setError("Choose clarification required because fields are flagged for clarification."); return; }
    setError("");
    try {
      const response = await saveReview({ applicationType, id, data: {
        revision: data.review?.revision ?? 0, snapshot_hash: data.snapshot_hash, observations: cleaned,
        summary: summary.trim(), outcome, submit, confirmed,
      } }).unwrap();
      setDirty(false);
      toast.success(submit ? "Preliminary review submitted." : "Review draft saved.");
      onSaved(response);
    } catch (failure) {
      const payload = failure && typeof failure === "object" && "data" in failure ? failure.data : null;
      setError(payload && typeof payload === "object" ? Object.values(payload).flat().filter((value) => typeof value === "string").join(" ") || "Unable to save this review." : "Unable to save this review. Please retry.");
    }
  };

  return <div className="space-y-5">
    <header className="flex flex-wrap items-start justify-between gap-3 rounded-lg border bg-muted/20 p-5">
      <div><p className="text-sm text-muted-foreground">{licensingApplications[applicationType].label}</p>
        <h1 className="text-xl font-semibold">Preliminary review · {data.application_code}</h1>
        <p className="mt-1 font-medium">{data.institution}</p><p className="text-sm text-muted-foreground">{data.status}</p>
      </div>
      <Button variant="outline" disabled={saving} onClick={() => {
        if (!dirty || window.confirm("Leave this review without saving your changes?")) router.push(`/license/${licensingApplications[applicationType].path}/under-review`);
      }}>Back to applications</Button>
    </header>
    <p className="rounded-md border p-3 text-sm">Read the submitted values and open supporting documents. Add a note wherever needed, or flag a field for clarification. You do not need to comment on every field. This review records preliminary findings; it does not approve or reject the licence.</p>
    {!data.can_edit && <p role="status" className="rounded-md bg-muted p-3 text-sm">{data.review?.submitted_at ? "This review has been submitted. Its comments and application snapshot are read-only." : "Read-only view. Only the assigned active ILA Desk Review Officer can edit this review."}</p>}
    {data.can_edit && data.review && data.review.snapshot_hash !== data.snapshot_hash && <p role="alert" className="rounded-md border border-amber-400 p-3 text-sm">The application has changed since this draft was saved. Check the current values and your comments before saving again.</p>}
    {!!data.history.length && <div className="space-y-1"><label htmlFor="review-history" className="text-sm font-medium">Review history</label>
      <select id="review-history" value={historyId} disabled={dirty || saving} onChange={(event) => { setHistoryId(event.target.value); setSection(""); }} className="block w-full max-w-xl rounded-md border bg-background p-2 text-sm">
        <option value="">Current review</option>
        {data.history.map((item) => <option key={item.id} value={String(item.id)}>{item.reviewer_name} · {new Date(item.submitted_at!).toLocaleString()} · Submitted</option>)}
      </select>
      {historical && <p className="text-sm text-muted-foreground">Viewing the saved application snapshot for this submitted review.</p>}
    </div>}

    <div className="grid gap-5 lg:grid-cols-[230px_minmax(0,1fr)]">
      <aside className="space-y-3 lg:sticky lg:top-20 lg:self-start">
        <div className="rounded-lg border p-3"><h2 className="mb-2 font-semibold">Application sections</h2>
          <nav aria-label="Review sections" className="space-y-1">
            {["", ...sections].map((name) => <button type="button" key={name} onClick={() => setSection(name)} aria-current={section === name ? "true" : undefined}
              className={`block w-full rounded-md px-2 py-2 text-left text-sm ${section === name ? "bg-primary text-primary-foreground" : "hover:bg-muted"}`}>{name || "All fields"} <span className="float-right">{shownFields.filter((field) => !name || field.section === name).length}</span></button>)}
          </nav>
        </div>
        <div className="rounded-lg border p-3 text-sm"><p>{shownFields.length} application fields</p><p>{comments.length} comments</p><p>{concerns} need clarification</p>
          {editable && <p aria-live="polite" className="mt-2 font-medium">{dirty ? "Unsaved changes" : data.review ? "Draft saved" : "Review not yet saved"}</p>}
        </div>
      </aside>
      <div className="min-w-0 space-y-4">
        <div className="flex flex-wrap items-center gap-3"><Input value={search} onChange={(event) => setSearch(event.target.value)} aria-label="Find an application field" placeholder="Find a field or submitted value" className="max-w-lg" />
          <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={concernsOnly} onChange={(event) => setConcernsOnly(event.target.checked)} />Clarifications only</label>
        </div>
        {visible.map((field) => {
          const observation = shownObservations[field.key];
          return <article key={field.key} className={`rounded-lg border p-4 ${observation?.finding === "clarification" ? "border-amber-400" : ""}`}>
            <p className="text-xs text-muted-foreground">{field.section}</p><h3 className="mb-3 font-semibold">{field.label}</h3>
            <div className="grid gap-4 xl:grid-cols-2"><div><p className="mb-1 text-xs font-medium text-muted-foreground">Submitted value</p><ReviewFieldValue field={field} /></div>
              <div className="space-y-2">
                {observation ? <>
                  <label htmlFor={`finding-${field.key}`} className="block text-sm font-medium">Reviewer observation</label>
                  <select id={`finding-${field.key}`} value={observation.finding} disabled={!editable || saving} onChange={(event) => change(field.key, { ...observation, finding: event.target.value as LicensingObservation["finding"] })} className="w-full rounded-md border bg-background p-2 text-sm">
                    <option value="note">Note</option><option value="clarification">Needs clarification</option>
                  </select>
                  <textarea aria-label={`Comment on ${field.label}`} value={observation.comment} disabled={!editable || saving} maxLength={10000} rows={4}
                    onChange={(event) => change(field.key, { ...observation, comment: event.target.value })} placeholder="Explain what you noticed and what needs clarification." className="w-full rounded-md border bg-background p-3 text-sm" />
                  {editable && <button type="button" disabled={saving} onClick={() => change(field.key, null)} className="text-sm text-muted-foreground underline">Remove observation</button>}
                </> : editable ? <Button type="button" variant="outline" disabled={saving} onClick={() => change(field.key, { finding: "note", comment: "" })}>Add comment</Button> : <p className="text-sm text-muted-foreground">No observation recorded.</p>}
              </div>
            </div>
          </article>;
        })}
        {!visible.length && <p className="rounded-md border p-5 text-sm">No fields match these filters.</p>}

        <section className="space-y-3 rounded-lg border p-5"><h2 className="font-semibold">Overall preliminary review</h2>
          <label htmlFor="review-summary" className="block text-sm font-medium">Summary of findings</label>
          <textarea id="review-summary" value={historical?.summary ?? summary} disabled={!editable || saving} rows={5} maxLength={20000}
            onChange={(event) => { setSummary(event.target.value); setDirty(true); }} className="w-full rounded-md border bg-background p-3 text-sm" placeholder="Summarise your findings, including any clarifications required." />
          <label htmlFor="review-outcome" className="block text-sm font-medium">Preliminary conclusion</label>
          <select id="review-outcome" value={historical?.outcome ?? outcome} disabled={!editable || saving}
            onChange={(event) => { setOutcome(event.target.value as typeof outcome); setDirty(true); }} className="w-full rounded-md border bg-background p-2 text-sm">
            <option value="">Select a conclusion</option><option value="no_concerns">No concerns identified</option><option value="clarification_required">Clarification required</option>
          </select>
          {editable && <label className="flex items-start gap-2 text-sm"><input type="checkbox" checked={confirmed} disabled={saving} onChange={(event) => setConfirmed(event.target.checked)} className="mt-1" />I have reviewed the application and relevant supporting documents. My observations reflect my preliminary findings.</label>}
        </section>
        {error && <div role="alert" className="rounded-md border border-red-400 p-3 text-sm text-red-600">{error}</div>}
        {editable && <div className="sticky bottom-0 flex flex-wrap items-center justify-end gap-3 rounded-md border bg-background p-3 shadow-sm">
          <Button variant="outline" disabled={saving} onClick={() => void save(false)}>{saving ? "Saving..." : "Save draft"}</Button>
          <Button disabled={saving} onClick={() => setShowConfirmation(true)}>Submit preliminary review</Button>
        </div>}
        <Dialog open={showConfirmation && editable} onOpenChange={(open) => { if (!saving) setShowConfirmation(open); }}>
          <DialogContent><DialogHeader><DialogTitle>Submit this preliminary review?</DialogTitle>
            <DialogDescription>The submitted review and the application values you reviewed will be saved as a read-only record. This does not approve or reject the application.</DialogDescription></DialogHeader>
            <div className="flex justify-end gap-3"><Button variant="outline" disabled={saving} onClick={() => setShowConfirmation(false)}>Continue editing</Button><Button disabled={saving} onClick={() => { setShowConfirmation(false); void save(true); }}>Confirm submission</Button></div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  </div>;
}

export default function LicensingPreliminaryReview({ applicationType, id }: { applicationType: LicensingApplicationType; id: number }) {
  const { currentData: data, isLoading, error, refetch } = useGetLicensingPreliminaryReviewQuery({ applicationType, id }, { refetchOnMountOrArgChange: true });
  const [saved, setSaved] = useState<LicensingReviewResponse>();
  const response = saved ?? data;
  if (isLoading && !response) return <p>Loading application fields and preliminary review...</p>;
  if (error || !response) return <div role="alert" className="space-y-3"><p>Unable to load this preliminary review. Check that the application is assigned to you and your ILA reviewer membership is active.</p><Button onClick={() => void refetch()}>Retry</Button></div>;
  return <ReviewEditor key={`${response.review?.id ?? "new"}:${response.review?.revision ?? 0}:${response.snapshot_hash}`} data={response} applicationType={applicationType} id={id} onSaved={setSaved} />;
}
