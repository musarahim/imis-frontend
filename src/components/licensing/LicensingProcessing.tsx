"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Building2, Eye, ListFilter, Route } from "lucide-react";
import { ColumnFiltersState, PaginationState, SortingState, VisibilityState } from "@tanstack/react-table";
import { DataTable } from "@/components/common/data-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { licensingApplications, LicensingApplicationType } from "@/lib/licensing";
import { ProcessingRow, ProcessingState, processingLabel, processingQueues, processingStages, processingSteps } from "@/lib/licensing-processing";
import { useGetLicensingProcessingQuery, useGetLicensingProcessingQueueQuery } from "@/redux/features/license-api-slice";
import { ReviewFieldValue } from "./LicensingPreliminaryReview";
import LicensingProcessingDecision from "./LicensingProcessingDecision";
import { processingColumns } from "./LicensingProcessingColumns";

function EvidenceValue({ value }: { value: unknown }) {
  if (Array.isArray(value)) {
    return (
      <div className="overflow-x-auto">
        <Table>
          <TableHeader><TableRow><TableHead>Member</TableHead><TableHead>Role</TableHead><TableHead>Experience</TableHead><TableHead>Conflict Declaration</TableHead></TableRow></TableHeader>
          <TableBody>{value.map((member, index) => (
            <TableRow key={index}>
              <TableCell>{String(member.name ?? "")}</TableCell>
              <TableCell>{processingLabel(String(member.role ?? ""))}</TableCell>
              <TableCell>{String(member.experience ?? "")} years</TableCell>
              <TableCell>{member.conflict_declared ? member.has_conflict ? "Conflict declared" : "No conflict declared" : "Not recorded"}</TableCell>
            </TableRow>
          ))}</TableBody>
        </Table>
      </div>
    );
  }
  return <span className="whitespace-pre-wrap break-words">{String(value ?? "Not provided")}</span>;
}

function ProcessingContent({ data, applicationType, id, onSaved }: {
  data: ProcessingState; applicationType: LicensingApplicationType; id: number; onSaved: () => void;
}) {
  const current = processingStages[data.stage];
  const path = licensingApplications[applicationType].path;
  const steps = processingSteps(data.family);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Button asChild variant="outline" className="border-primary/20 text-primary hover:bg-primary/5 hover:text-primary"><Link href={`/license/${path}/processing`}><ArrowLeft />Back to Applications</Link></Button>
        <Button asChild variant="secondary" className="shadow-sm"><Link href={`/license/${path}/${id}/status`}><Eye />View Institution Status</Link></Button>
      </div>
      <div className="overflow-hidden rounded-xl border border-primary/15 bg-card shadow-sm">
        <div className="flex flex-wrap items-start justify-between gap-4 border-b border-primary/10 bg-primary/[0.04] p-5 sm:p-6">
          <div className="flex items-start gap-3">
            <span className="rounded-xl bg-primary/10 p-3 text-primary"><Building2 className="h-6 w-6" /></span>
            <div>
              <p className="mb-1 text-xs font-medium uppercase tracking-wide text-muted-foreground">{licensingApplications[applicationType].label}</p>
              <h1 className="text-xl font-semibold tracking-tight sm:text-2xl">{data.institution}</h1>
              <p className="mt-1 text-sm text-muted-foreground">{data.application_code}</p>
            </div>
          </div>
          <Badge className="border-primary/15 bg-primary text-primary-foreground px-3 py-1.5 whitespace-normal">{processingLabel(data.stage)}</Badge>
        </div>
        <div className="grid gap-5 p-5 sm:p-6 md:grid-cols-[1fr_2fr]">
          <div><p className="mb-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">Responsible Office</p><p className="text-sm font-semibold">{current?.office}</p></div>
          <div className="rounded-lg border border-secondary/20 bg-secondary/5 p-4">
            <p className="mb-2 flex items-center gap-2 text-sm font-semibold"><ArrowRight className="h-4 w-4 text-primary" />Next Step</p>
            <p className="text-sm leading-relaxed text-muted-foreground">{current?.next}</p>
          </div>
        </div>
        {data.validity && <div className="flex flex-wrap gap-6 border-t px-6 py-4">{Object.entries(data.validity).map(([key, value]) => <div key={key}><p className="text-xs text-muted-foreground">{processingLabel(key)}</p><p className="mt-1 text-sm font-semibold">{value}</p></div>)}</div>}
      </div>
      <Card className="border-primary/10 shadow-sm">
        <CardHeader><CardTitle className="flex items-center gap-2 text-base"><Route className="h-5 w-5 text-primary" />Application Process</CardTitle><CardDescription>Select a stage to view its applications. The current stage is highlighted.</CardDescription></CardHeader>
        <CardContent>
          <ol className="flex flex-wrap gap-2">
            {steps.map((queue, index) => {
              const active = queue.stages.includes(data.stage);
              return <li key={queue.label}><Link href={`/license/${path}/processing?queue=${queue.queue}`} aria-current={active ? "step" : undefined} className={`inline-flex items-center gap-2.5 rounded-lg border px-3 py-2.5 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 ${active ? "border-primary bg-primary text-primary-foreground shadow-sm" : "border-primary/10 bg-card text-muted-foreground hover:border-primary/30 hover:bg-primary/5 hover:text-primary"}`}><span className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-semibold ${active ? "bg-primary-foreground/15" : "bg-primary/10 text-primary"}`}>{index + 1}</span>{queue.label}</Link></li>;
            })}
          </ol>
        </CardContent>
      </Card>
      <Tabs defaultValue="decision">
        <TabsList className="h-auto flex-wrap justify-start gap-1 border border-primary/10 bg-primary/5 p-1.5 [&_[data-slot=tabs-trigger]]:px-4 [&_[data-slot=tabs-trigger]]:py-2 [&_[data-state=active]]:bg-primary [&_[data-state=active]]:text-primary-foreground">
          <TabsTrigger value="decision">Decision / Next Step</TabsTrigger>
          <TabsTrigger value="application">Application &amp; Preliminary Review</TabsTrigger>
          <TabsTrigger value="history">Previous Decisions</TabsTrigger>
          <TabsTrigger value="timelines">Timelines</TabsTrigger>
        </TabsList>
        <TabsContent value="decision"><LicensingProcessingDecision key={data.revision} data={data} applicationType={applicationType} id={id} onSaved={onSaved} /></TabsContent>
        <TabsContent value="application">
          <Card><CardHeader><CardTitle>Application &amp; Preliminary Review</CardTitle></CardHeader><CardContent>
            {data.preliminary_review ? (
              <div className="space-y-4">
                <p className="whitespace-pre-wrap">{data.preliminary_review.summary}</p>
                <Badge variant="secondary">{processingLabel(data.preliminary_review.outcome)}</Badge>
                <Table><TableBody>{data.preliminary_review.fields.map((field, index) => (
                  <TableRow key={field.key} className={index % 2 ? "bg-muted" : ""}>
                    <TableCell className="w-64 align-top whitespace-normal font-semibold">{field.section}<p className="font-normal">{field.label}</p></TableCell>
                    <TableCell className="whitespace-normal"><ReviewFieldValue field={field} />{data.preliminary_review?.observations[field.key] && <p className="mt-2 whitespace-pre-wrap">{processingLabel(data.preliminary_review.observations[field.key].finding)}: {data.preliminary_review.observations[field.key].comment}</p>}</TableCell>
                  </TableRow>
                ))}</TableBody></Table>
              </div>
            ) : <p>The assigned officer has not submitted a preliminary review.</p>}
          </CardContent></Card>
        </TabsContent>
        <TabsContent value="history">
          <div className="space-y-4">
            {!data.history.length && <p>No previous decisions recorded.</p>}
            {[...data.history].reverse().map((item) => (
              <Card key={item.id}>
                <CardHeader><CardTitle>{processingLabel(item.action)}</CardTitle><CardDescription>{item.occurred_on} | {item.actor}</CardDescription></CardHeader>
                <CardContent><p className="mb-4 whitespace-pre-wrap">{item.notes}</p><Table><TableBody>{Object.entries(item.evidence).map(([key, value]) => <TableRow key={key}><TableCell className="w-64 align-top whitespace-normal font-semibold">{processingLabel(key)}</TableCell><TableCell className="whitespace-normal"><EvidenceValue value={value} /></TableCell></TableRow>)}</TableBody></Table></CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="timelines">
          <Card><CardHeader><CardTitle>Processing Timelines</CardTitle><CardDescription>Historical obligations remain visible after completion. Working days exclude weekends; check public holidays and receipt / service dates.</CardDescription></CardHeader>
            <CardContent><Table><TableHeader><TableRow><TableHead>Required Action</TableHead><TableHead>Due Date</TableHead></TableRow></TableHeader><TableBody>{data.deadlines.map((item, index) => <TableRow key={index}><TableCell className="whitespace-normal">{item.task}</TableCell><TableCell>{item.due_on}</TableCell></TableRow>)}{!data.deadlines.length && <TableRow><TableCell colSpan={2}>No timelines recorded.</TableCell></TableRow>}</TableBody></Table></CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

export function LicensingProcessingDetail({ applicationType, id }: { applicationType: LicensingApplicationType; id: number }) {
  const { data, error, isLoading, refetch } = useGetLicensingProcessingQuery({ applicationType, id }, { refetchOnMountOrArgChange: true });
  if (isLoading) return <div>Loading...</div>;
  if (error || !data) return <div role="alert">Unable to load the application. <Button variant="outline" onClick={() => void refetch()}>Retry</Button></div>;
  return <ProcessingContent data={data} applicationType={applicationType} id={id} onSaved={() => void refetch()} />;
}

export function LicensingProcessingQueue({ applicationType, queue = "all" }: { applicationType: LicensingApplicationType; queue?: string }) {
  const [pagination, setPagination] = React.useState<PaginationState>({ pageIndex: 0, pageSize: 10 });
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = React.useState("");
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
  const config = licensingApplications[applicationType];
  const columns = React.useMemo(() => processingColumns(config.path), [config.path]);
  const queryParams = React.useMemo(() => ({
    applicationType, page: pagination.pageIndex + 1, pageSize: pagination.pageSize,
    search: globalFilter, queue,
    ordering: sorting.length ? `${sorting[0].desc ? "-" : ""}${sorting[0].id}` : undefined,
  }), [applicationType, pagination, globalFilter, queue, sorting]);
  const { data, isFetching, error, refetch } = useGetLicensingProcessingQueueQuery(queryParams, { refetchOnMountOrArgChange: true });
  const queues = processingQueues.filter((item) => (applicationType.endsWith("charter") || item.value !== "external") && (!applicationType.endsWith("interim") || !["vetting", "verification", "publication"].includes(item.value)));

  return (
    <div className="space-y-4">
      <div className="rounded-xl border border-primary/10 bg-card p-4 shadow-sm sm:p-5">
        <div className="mb-4 flex items-start gap-3">
          <span className="rounded-lg bg-primary/10 p-2 text-primary"><ListFilter className="h-5 w-5" /></span>
          <div><h2 className="font-semibold">Processing Queues</h2><p className="mt-1 text-sm text-muted-foreground">Choose a stage, then open an application to review its findings and submit the next decision.</p></div>
        </div>
        <div className="flex flex-wrap gap-2" aria-label="Processing queues">
          {queues.map((item) => <Button key={item.value} variant={queue === item.value ? "default" : "outline"} className={queue === item.value ? "shadow-sm" : "border-primary/15 text-primary hover:border-primary/30 hover:bg-primary/5 hover:text-primary"} asChild><Link href={`/license/${config.path}/processing?queue=${item.value}`} aria-current={queue === item.value ? "page" : undefined}>{item.label}</Link></Button>)}
        </div>
      </div>
      {error ? <div role="alert">Unable to load applications. <Button variant="outline" onClick={() => void refetch()}>Retry</Button></div> : (
        <DataTable<ProcessingRow, unknown>
          columns={columns} data={data?.results ?? []} totalCount={data?.count ?? 0} isFetching={isFetching}
          pagination={pagination} setPagination={setPagination} sorting={sorting} setSorting={setSorting}
          globalFilter={globalFilter} setGlobalFilter={setGlobalFilter} columnFilters={columnFilters}
          setColumnFilters={setColumnFilters} columnVisibility={columnVisibility} setColumnVisibility={setColumnVisibility}
        />
      )}
    </div>
  );
}
