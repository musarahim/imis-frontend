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
  const queue = mode === "under-review" ? "under-review" : "submitted-applications";
  const { data, isFetching, error, refetch } = useGetLicensingQueueQuery(
    { applicationType, queue, page, search }, { refetchOnMountOrArgChange: true },
  );
  const rows = data?.results ?? [];
  if (error) return <div role="alert" className="space-y-3"><p>Unable to load licensing applications.</p><Button onClick={() => void refetch()}>Retry</Button></div>;

  return <div className="space-y-4">
    <div className="flex flex-wrap items-center justify-between gap-3">
      <Input aria-label="Search licensing applications" placeholder="Search application code or institution" value={search}
        onChange={(event) => { setSearch(event.target.value); setPage(1); }} className="max-w-md" />
      {data?.can_assign && <Button asChild><Link href={`/license/${config.path}/assign-reviewer`}>Assign / Reassign Reviewer</Link></Button>}
    </div>
    <div className="overflow-x-auto rounded-md border" aria-busy={isFetching}>
      <Table>
        <TableHeader><TableRow>
          <TableHead>Application Code</TableHead><TableHead>Institution</TableHead><TableHead>Application Date</TableHead><TableHead>Status</TableHead><TableHead>Reviewer</TableHead>
        </TableRow></TableHeader>
        <TableBody>
          {rows.map((row) => <TableRow key={row.id}>
            <TableCell>{config.details ? <Link className="text-primary underline" href={`/license/${config.path}/${row.id}/details`}>{row.application_code}</Link> : row.application_code}</TableCell>
            <TableCell>{row.institution}</TableCell><TableCell>{row.application_date || "—"}</TableCell><TableCell>{row.status}</TableCell><TableCell>{row.desk_reviewer_name || "Unassigned"}</TableCell>
          </TableRow>)}
          {!rows.length && <TableRow><TableCell colSpan={5} className="py-8 text-center">{isFetching ? "Loading applications…" : "No applications found."}</TableCell></TableRow>}
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
