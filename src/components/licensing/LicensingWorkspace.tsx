"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { licensingApplications, LicensingApplicationType, LicensingPageMode } from "@/lib/licensing";
import { useGetLicensingQueueQuery } from "@/redux/features/license-api-slice";
import Link from "next/link";
import { useState } from "react";
import LicensingAssignmentForm from "./LicensingAssignmentForm";

function LicensingQueueWorkspace({ applicationType, mode }: {
  applicationType: LicensingApplicationType; mode: "submitted" | "under-review";
}) {
  const config = licensingApplications[applicationType];
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [reviewStatus, setReviewStatus] = useState("pending");
  const queue = mode === "under-review" ? "under-review" : "submitted-applications";
  const { data, isFetching, error, refetch } = useGetLicensingQueueQuery(
    { applicationType, queue, page, search, reviewStatus }, { refetchOnMountOrArgChange: true },
  );
  const rows = data?.results ?? [];
  if (error) return <div role="alert" className="space-y-3"><p>Unable to load licensing applications.</p><Button onClick={() => void refetch()}>Retry</Button></div>;

  return <div className="space-y-4">
    <div className="flex flex-wrap items-center justify-between gap-3">
      {!applicationType.startsWith("oti-") && <Button asChild variant="outline" className="border-primary/20 text-primary hover:bg-primary/5 hover:text-primary"><Link href={`/license/${config.path}/processing`}>Application Processing</Link></Button>}
      <Input aria-label="Search licensing applications" placeholder="Search application code or institution" value={search}
        onChange={(event) => { setSearch(event.target.value); setPage(1); }} className="max-w-md" />
      {data?.can_assign && <Button asChild><Link href={`/license/${config.path}/assign-reviewer`}>Assign / Reassign Reviewer</Link></Button>}
      {mode === "under-review" && <label className="flex items-center gap-2 text-sm">Review status
        <select value={reviewStatus} onChange={(event) => { setReviewStatus(event.target.value); setPage(1); }} className="rounded-md border bg-background p-2">
          <option value="pending">Pending preliminary review</option><option value="completed">Submitted preliminary reviews</option>
        </select>
      </label>}
    </div>
    <div className="overflow-x-auto rounded-md border" aria-busy={isFetching}>
      <Table>
        <TableHeader><TableRow>
          <TableHead>Application Code</TableHead><TableHead>Institution</TableHead><TableHead>Application Date</TableHead><TableHead>Status</TableHead><TableHead>Reviewer</TableHead>
          {mode === "under-review" && <TableHead>Preliminary Review</TableHead>}
        </TableRow></TableHeader>
        <TableBody>
          {rows.map((row) => <TableRow key={row.id}>
            <TableCell>{config.details ? <Link className="text-primary underline" href={`/license/${config.path}/${row.id}/details`}>{row.application_code}</Link> : row.application_code}</TableCell>
            <TableCell>{row.institution}</TableCell><TableCell>{row.application_date || "—"}</TableCell><TableCell><Link className="text-primary underline" href={`/license/${config.path}/${row.id}/status`}>{row.status}</Link></TableCell><TableCell>{row.desk_reviewer_name || "Unassigned"}</TableCell>
            {mode === "under-review" && <TableCell>{row.can_open_review && <Link className="font-medium text-primary underline" href={`/license/${config.path}/${row.id}/review`}>{row.status_code === "prelim_feedback" ? "View review" : "Open review"}</Link>}</TableCell>}
          </TableRow>)}
          {!rows.length && <TableRow><TableCell colSpan={mode === "under-review" ? 6 : 5} className="py-8 text-center">{isFetching ? "Loading applications…" : "No applications found."}</TableCell></TableRow>}
        </TableBody>
      </Table>
    </div>
    <div className="flex items-center justify-between gap-3">
      <p>{data?.count ?? 0} application(s) · Page {page}</p>
      <div className="flex gap-2"><Button type="button" variant="outline" disabled={page === 1 || isFetching} onClick={() => setPage((current) => current - 1)}>Previous</Button>
        <Button type="button" variant="outline" disabled={!data?.next || isFetching} onClick={() => setPage((current) => current + 1)}>Next</Button></div>
    </div>
  </div>;
}

export default function LicensingWorkspace({ applicationType, mode }: {
  applicationType: LicensingApplicationType; mode: LicensingPageMode;
}) {
  return mode === "assign-reviewer"
    ? <LicensingAssignmentForm applicationType={applicationType} />
    : <LicensingQueueWorkspace applicationType={applicationType} mode={mode} />;
}
