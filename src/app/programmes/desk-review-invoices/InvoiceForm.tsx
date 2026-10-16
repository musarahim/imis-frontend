"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAddProgrammeAssessmentInvoiceMutation, useDeskReviewCreationOptionsQuery, useAvailableDeskReviewProgrammesQuery } from "@/redux/features/programme-api-slice";
import InvoicePaper from "./InvoicePaper";
import DeskReviewFeeInput from "./DeskReviewFeeInput";

function describeError(error: unknown): string {
  if (typeof error === "object" && error !== null && "data" in error) return JSON.stringify(error.data);
  return "The invoice could not be saved. Please try again.";
}

export default function InvoiceForm() {
  const router = useRouter();
  const [institution, setInstitution] = useState("");
  const [fees, setFees] = useState<Record<number, string>>({});
  const [filter, setFilter] = useState("");
  const { data: options, isLoading, isError } = useDeskReviewCreationOptionsQuery();
  const { currentData: programmes, isFetching, isError: programmeError } = useAvailableDeskReviewProgrammesQuery(Number(institution), { skip: !institution });
  const [create, { isLoading: saving }] = useAddProgrammeAssessmentInvoiceMutation();
  const selected = (programmes ?? []).filter((programme) => programme.id in fees);
  const lines = selected.map((programme) => ({ application: programme.id, programme_name: programme.programme_name, application_number: programme.application_number, desk_review_fee: fees[programme.id] }));
  const subtotal = lines.reduce((sum, line) => sum + Math.round(Number(line.desk_review_fee || 0) * 100), 0);
  const adminBase = Math.floor(subtotal / 10);
  // Match Decimal's half-even rounding on the server, using integer cents.
  const admin = adminBase + (subtotal % 10 > 5 || (subtotal % 10 === 5 && adminBase % 2 === 1) ? 1 : 0);
  const valid = selected.length > 0 && selected.every((programme) => /^\d+(\.\d{1,2})?$/.test(fees[programme.id]) && Number(fees[programme.id]) > 0) && subtotal <= 9090909090;

  async function save(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!valid || !institution || saving || isFetching) return;
    try {
      const invoice = await create({ institution_id: Number(institution), lines: lines.map(({ application, desk_review_fee }) => ({ application, desk_review_fee })) }).unwrap();
      toast.success("Invoice draft created. Review it and send it to the institution.");
      router.push(`/programmes/desk-review-invoices/${invoice.id}/details`);
    } catch (error) { toast.error(describeError(error)); }
  }

  if (isLoading) return <p>Loading institutions...</p>;
  if (isError) return <p role="alert">Unable to load institutions. Please refresh and try again.</p>;
  if (!options?.can_create) return <p>Head Programme Accreditation access is required to create and send invoices.</p>;
  return <div className="space-y-6">
    <form onSubmit={save} className="space-y-6 rounded-lg border bg-white p-6 dark:bg-gray-950">
      <div><h1 className="text-2xl font-semibold">Create Desk Review Invoice</h1><p className="mt-2 text-sm text-muted-foreground">Select an institution, then choose the programmes to include on one invoice.</p></div>
      <div className="max-w-xl space-y-2">
        <Label htmlFor="invoice-institution">Institution</Label>
        <select id="invoice-institution" className="w-full rounded-md border bg-background px-3 py-2" required value={institution} disabled={saving} onChange={(event) => { setInstitution(event.target.value); setFees({}); setFilter(""); }}>
          <option value="">Select an institution</option>
          {options.institutions.map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}
        </select>
        {!options.institutions.length && <p className="text-sm text-muted-foreground">No institutions currently have reviewed programmes available for invoicing.</p>}
      </div>
      {institution && <section className="space-y-3" aria-label="Programme selection">
        <h2 className="font-semibold">Programmes ready for invoicing</h2>
        <p className="text-sm text-muted-foreground">Only reviewed programmes without an active desk review invoice appear here.</p>
        <Input aria-label="Search programmes" placeholder="Search by programme name or application number" value={filter} onChange={(event) => setFilter(event.target.value)} disabled={saving} />
        {isFetching ? <p>Loading programmes...</p> : programmeError ? <p role="alert">Unable to load programmes. Please try again.</p> : !programmes?.length ? <p>No programmes are currently ready for invoicing at this institution.</p> : <div className="overflow-x-auto">
          <table className="w-full text-left text-sm"><thead><tr className="border-b"><th className="p-3">Include</th><th className="p-3">Programme / Application</th><th className="p-3">Desk review fee (UGX)</th></tr></thead>
            <tbody>{programmes.filter((p) => `${p.programme_name} ${p.application_number}`.toLowerCase().includes(filter.toLowerCase())).map((programme) => <tr key={programme.id} className="border-b">
              <td className="p-3"><input type="checkbox" aria-label={`Include ${programme.programme_name}`} checked={programme.id in fees} disabled={saving} onChange={(event) => setFees((previous) => { const next = { ...previous }; if (event.target.checked) next[programme.id] = "750000"; else delete next[programme.id]; return next; })} /></td>
              <td className="p-3"><p className="font-medium">{programme.programme_name}</p><p className="text-muted-foreground">{programme.application_number}</p></td>
              <td className="p-3"><DeskReviewFeeInput aria-label={`Desk review fee for ${programme.programme_name}`} required={programme.id in fees} disabled={!(programme.id in fees) || saving} value={fees[programme.id] ?? "750000"} onValueChange={(value) => setFees((previous) => ({ ...previous, [programme.id]: value }))} /></td>
            </tr>)}</tbody>
          </table>
        </div>}
      </section>}
      <div className="flex flex-wrap items-center justify-between gap-4 border-t pt-4">
        <p>{selected.length} programme(s) selected · Total including 10% administration: <strong>UGX {((subtotal + admin) / 100).toLocaleString("en-UG", { minimumFractionDigits: 2 })}</strong></p>
        <Button type="submit" disabled={!valid || saving || isFetching}>{saving ? "Creating..." : "Create Invoice Draft"}</Button>
      </div>
      <p className="text-sm text-muted-foreground">All programmes on this invoice remain blocked from assessor assignment until Accounts verifies the full payment.</p>
    </form>
    <InvoicePaper invoice={{ institution: options.institutions.find((item) => item.id === Number(institution))?.name, lines, desk_review_fee: (subtotal / 100).toFixed(2), administrative_fee: (admin / 100).toFixed(2), grand_total: (subtotal + admin) / 100, payment_instructions: options.payment_instructions }} />
  </div>;
}
