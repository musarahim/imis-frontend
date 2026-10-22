"use client";

import { AppForm } from "@/components/forms";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { licensingApplications, LicensingApplicationRow, LicensingApplicationType, toggleLicensingSelection } from "@/lib/licensing";
import {
  useAssignLicensingReviewersMutation, useGetLicensingQueueQuery,
  useGetDeskReviewersQuery, useGetLicensingAssignmentFiltersQuery,
} from "@/redux/features/license-api-slice";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import * as Yup from "yup";
import LicensingReviewerSelection from "./LicensingReviewerSelection";

function assignmentError(error: unknown) {
  if (error && typeof error === "object" && "data" in error && error.data && typeof error.data === "object") {
    const message = Object.values(error.data).flat().filter((value) => typeof value === "string").join(" ");
    if (message) return message;
  }
  return "Unable to assign the reviewer. Please try again.";
}

export default function LicensingAssignmentForm({ applicationType }: { applicationType: LicensingApplicationType }) {
  const router = useRouter();
  const config = licensingApplications[applicationType];
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [institution, setInstitution] = useState("");
  const [status, setStatus] = useState("");
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState<Record<number, LicensingApplicationRow>>({});
  const [applicationError, setApplicationError] = useState("");

  useEffect(() => {
    if (search.trim() === debouncedSearch) return;
    const timer = setTimeout(() => { setDebouncedSearch(search.trim()); setPage(1); }, 300);
    return () => clearTimeout(timer);
  }, [search, debouncedSearch]);

  const { currentData: data, isFetching, error, refetch } = useGetLicensingQueueQuery({
    applicationType, queue: "assignment-candidates", page, pageSize: 25,
    search: debouncedSearch, institution, status,
  }, { refetchOnMountOrArgChange: true });
  const { data: filterOptions, isLoading: loadingFilters, error: filtersError, refetch: refetchFilters } =
    useGetLicensingAssignmentFiltersQuery(applicationType, { refetchOnMountOrArgChange: true });
  const { data: reviewers, isFetching: loadingReviewers, error: reviewersError, refetch: refetchReviewers } =
    useGetDeskReviewersQuery({ applicationType }, { refetchOnMountOrArgChange: true });
  const [assignReviewers, { isLoading: saving }] = useAssignLicensingReviewersMutation();

  const rows = data?.results ?? [];
  const selectedApplications = Object.values(selected);
  const selectedCount = selectedApplications.length;
  const isSearching = isFetching || search.trim() !== debouncedSearch;
  const allSelected = rows.length > 0 && rows.every((row) => !!selected[row.id]);
  const someSelected = rows.some((row) => !!selected[row.id]);
  const disabled = saving || loadingReviewers || !!reviewersError || !reviewers?.length || isSearching || !!error;

  const selectRows = (items: LicensingApplicationRow[], checked: boolean) => {
    setSelected((current) => toggleLicensingSelection(current, items, checked));
    setApplicationError("");
  };
  const resetFilters = () => { setInstitution(""); setStatus(""); setSearch(""); setDebouncedSearch(""); setPage(1); };
  const submit = async ({ reviewer }: { reviewer: string }) => {
    if (disabled) return;
    if (!selectedCount) { setApplicationError("Please select at least one application."); return; }
    if (!reviewers?.some((item) => String(item.id) === reviewer)) {
      toast.error("Select an available reviewer."); return;
    }
    setApplicationError("");
    try {
      const result = await assignReviewers({ applicationType, userId: Number(reviewer), applications: selectedApplications.map((row) => row.id) }).unwrap();
      void refetchReviewers();
      toast.success(result.message);
      setSelected({});
      router.push(`/license/${config.path}/under-review`);
    } catch (failure) {
      toast.error(assignmentError(failure));
      void refetch();
      void refetchReviewers();
    }
  };

  return <AppForm initialValues={{ reviewer: "" }} validationSchema={Yup.object({ reviewer: Yup.string().required("Reviewer is required") })} onSubmit={submit}>
    <div className="mb-4 mt-1.5 text-lg font-semibold">Assign Preliminary Reviewer</div>
    <Separator className="my-4" />
    <div className="flex flex-col lg:flex-row gap-4 h-full">
      <div className="min-w-0 flex-1 rounded-lg border p-4 h-full">
        <div className="mb-4 space-y-4 rounded-lg border bg-muted/30 p-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h2 className="text-sm font-semibold">Filter applications</h2>
            <Button type="button" variant="secondary" size="sm" disabled={saving || !(institution || status || search)} onClick={resetFilters}>Reset filters</Button>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="min-w-0 space-y-2">
              <label htmlFor="institution-filter" className="text-sm font-medium">Institution</label>
              <select id="institution-filter" value={institution} disabled={saving || loadingFilters || !!filtersError}
                onChange={(event) => { setInstitution(event.target.value); setPage(1); }}
                className="h-9 w-full rounded-md border border-input bg-background px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-50">
                <option value="">All institutions</option>
                {filterOptions?.institutions.map((option) => <option key={option.id} value={String(option.id)}>{option.name}</option>)}
              </select>
            </div>
            <div className="min-w-0 space-y-2">
              <label htmlFor="status-filter" className="text-sm font-medium">Application status</label>
              <select id="status-filter" value={status} disabled={saving || loadingFilters || !!filtersError}
                onChange={(event) => { setStatus(event.target.value); setPage(1); }}
                className="h-9 w-full rounded-md border border-input bg-background px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-50">
                <option value="">All assignable applications</option>
                {filterOptions?.statuses.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
              </select>
            </div>
          </div>
          {loadingFilters && <p className="text-sm text-muted-foreground">Loading filter options...</p>}
          {filtersError && <p role="alert" className="text-sm text-red-600">Could not load filter options. <button type="button" onClick={() => void refetchFilters()} className="text-primary">Retry</button></p>}
          <div className="space-y-2">
            <label htmlFor="application-search" className="text-sm font-medium">Search applications</label>
            <div className="flex flex-col gap-2 sm:flex-row">
              <Input id="application-search" type="search" value={search} disabled={saving} placeholder="Institution, application code or reviewer"
                onChange={(event) => setSearch(event.target.value)} className="bg-white dark:bg-background"
                onKeyDown={(event) => { if (event.key === "Enter") event.preventDefault(); }} />
              {search && <Button type="button" variant="secondary" disabled={saving} onClick={() => setSearch("")}>Clear search</Button>}
            </div>
          </div>
        </div>

        <div className="overflow-x-auto" aria-busy={isSearching}>
          <Table className="border-collapse border border-border [&_th]:border [&_th]:border-border [&_td]:border [&_td]:border-border">
            <TableHeader><TableRow>
              <TableHead className="w-8"><Checkbox aria-label="Select all applications on this page"
                checked={allSelected ? true : someSelected ? "indeterminate" : false}
                disabled={isSearching || saving || !!error || !rows.length} onCheckedChange={(value) => selectRows(rows, value === true)} /></TableHead>
              <TableHead>Application Code</TableHead><TableHead>Institution</TableHead><TableHead>Application Date</TableHead><TableHead>Status</TableHead><TableHead>Reviewer</TableHead>
            </TableRow></TableHeader>
            <TableBody>
              {isSearching ? <TableRow><TableCell colSpan={6} className="py-6 text-center">Loading applications...</TableCell></TableRow>
                : error ? <TableRow><TableCell colSpan={6} className="py-6 text-center">Could not load applications. <button type="button" onClick={() => void refetch()} className="text-primary">Retry</button></TableCell></TableRow>
                : !rows.length ? <TableRow><TableCell colSpan={6} className="py-6 text-center">{debouncedSearch || institution || status ? "No applications match your filters." : "No applications are awaiting assignment."}</TableCell></TableRow>
                : rows.map((row) => <TableRow key={row.id} data-state={selected[row.id] ? "selected" : undefined}>
                  <TableCell><Checkbox aria-label={`Select ${row.application_code}`} checked={!!selected[row.id]} disabled={saving}
                    onCheckedChange={(value) => selectRows([row], value === true)} /></TableCell>
                  <TableCell>{row.application_code}</TableCell><TableCell className="font-medium">{row.institution}</TableCell>
                  <TableCell>{row.application_date || "—"}</TableCell><TableCell>{row.status}</TableCell><TableCell>{row.desk_reviewer_name || "Unassigned"}</TableCell>
                </TableRow>)}
            </TableBody>
          </Table>
        </div>

        <div className="mt-3 flex flex-wrap items-center justify-between gap-3 text-sm">
          <div className="space-y-1">
            <p aria-live="polite">{selectedCount} selected{!isSearching && !error && ` · ${data?.count ?? rows.length} matching applications`}</p>
            <p className="text-xs text-muted-foreground">Selections are kept across searches, filters and pages.</p>
            {selectedCount > 0 && <button type="button" disabled={saving} onClick={() => setSelected({})} className="text-primary">Clear selection</button>}
          </div>
          <div className="flex items-center gap-2">
            <Button type="button" variant="secondary" size="sm" disabled={isSearching || saving || !!error || !data?.previous} onClick={() => setPage((current) => current - 1)}>Previous</Button>
            <span>Page {page}</span>
            <Button type="button" variant="secondary" size="sm" disabled={isSearching || saving || !!error || !data?.next} onClick={() => setPage((current) => current + 1)}>Next</Button>
          </div>
        </div>
        {applicationError && <p role="alert" className="mt-2 text-sm text-red-600">{applicationError}</p>}
      </div>

      <div className="w-full lg:w-1/3 lg:shrink-0">
        <div className="bg-white dark:bg-gray-950 rounded-lg border p-4">
          {loadingReviewers ? <p>Loading reviewer workloads...</p>
            : reviewersError ? <div className="space-y-2"><p role="alert" className="text-sm text-red-600">Could not load reviewers and their workloads.</p><button type="button" onClick={() => void refetchReviewers()} className="text-sm text-primary">Retry</button></div>
            : reviewers?.length ? <LicensingReviewerSelection reviewers={reviewers} selectedApplications={selectedApplications} disabled={saving} />
            : <p>No active members of the ILA Desk Review Officer group are available.</p>}
          <fieldset disabled={!!disabled} className="mt-6 disabled:opacity-50">
            <Button type="submit" className="w-full" disabled={!!disabled}>{saving ? "Assigning..." : "Assign Reviewer"}</Button>
          </fieldset>
        </div>
      </div>
    </div>
  </AppForm>;
}
