"use client";

import { ArrowRight, CircleAlert, Clock3, FileCheck2, RefreshCw } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { formatStatusDate, LicensingApplicationStatus, LicensingStatusEndpoint } from "@/lib/licensing-status";
import { useGetLicensingApplicationStatusQuery } from "@/redux/features/license-api-slice";

export function ApplicationStatusContent({ data }: { data: LicensingApplicationStatus }) {
  return (
    <div className="space-y-6">
      <div className="space-y-4" aria-live="polite">
        <div className="rounded-lg border border-primary/15 bg-primary/5 p-4">
          <p className="mb-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">Application Reference</p>
          <p className="mb-3 break-words text-sm font-semibold text-foreground">{data.application_code}</p>
          <Badge className={data.action_required ? "border-secondary/25 bg-secondary/10 text-foreground whitespace-normal px-3 py-1" : "border-primary/20 bg-primary text-primary-foreground whitespace-normal px-3 py-1"}>
            {data.status}
          </Badge>
          {data.updated_at && <p className="mt-3 flex items-center gap-1.5 text-xs text-muted-foreground"><Clock3 className="h-3.5 w-3.5 shrink-0" />Updated: {formatStatusDate(data.updated_at)}</p>}
        </div>
        <div className={`rounded-lg border p-4 ${data.action_required ? "border-secondary/25 bg-secondary/5" : "border-border bg-muted/40"}`}>
          <h4 className="mb-2 flex items-center gap-2 text-sm font-semibold">
            {data.action_required ? <CircleAlert className="h-4 w-4 shrink-0 text-secondary" /> : <ArrowRight className="h-4 w-4 shrink-0 text-primary" />}
            {data.action_required ? "Action Required" : "What Happens Next"}
          </h4>
          <p className="text-sm leading-relaxed text-muted-foreground">{data.next_step}</p>
        </div>
      </div>
      <div>
        <h4 className="mb-4 flex items-center gap-2 text-sm font-semibold"><Clock3 className="h-4 w-4 text-primary" />Status History</h4>
        <ol className="ml-2 space-y-5 border-l-2 border-primary/15 pl-5">
          {[...data.history].reverse().map((entry, index) => (
            <li key={entry.id ?? `current-${index}`} className="relative">
              <span className={`absolute -left-[27px] top-1 h-3 w-3 rounded-full border-2 border-card ${index === 0 ? "bg-primary ring-4 ring-primary/10" : "bg-muted-foreground/40"}`} aria-hidden="true" />
              <div className={index === 0 ? "rounded-md bg-primary/5 p-3 -mt-2" : "py-0.5"}>
                {index === 0 && <p className="mb-1 text-[10px] font-semibold uppercase tracking-wider text-primary">Current Status</p>}
                <p className="text-sm font-medium leading-relaxed">{entry.status}</p>
                <p className="mt-1 text-xs text-muted-foreground">{formatStatusDate(entry.recorded_at)}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}

export default function ApplicationStatus({ endpoint, id }: { endpoint: LicensingStatusEndpoint; id: number }) {
  const { data, isLoading, isFetching, error, refetch } = useGetLicensingApplicationStatusQuery(
    { endpoint, id },
    { pollingInterval: 60000, skipPollingIfUnfocused: true, refetchOnFocus: true, refetchOnReconnect: true, refetchOnMountOrArgChange: true },
  );

  return (
    <Card id="application-status" className="w-full overflow-hidden border-primary/15 shadow-sm scroll-mt-20">
      <CardHeader className="border-b border-primary/10 bg-primary/[0.03] pb-5">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <CardTitle className="flex items-center gap-2 text-base"><span className="rounded-md bg-primary/10 p-2 text-primary"><FileCheck2 className="h-4 w-4" /></span>Application Status</CardTitle>
          <Button type="button" size="sm" className="shadow-sm" disabled={isFetching} onClick={() => void refetch()}>
            <RefreshCw className={`h-3.5 w-3.5 ${isFetching ? "animate-spin" : ""}`} aria-hidden="true" />
            {isFetching ? "Refreshing..." : "Refresh"}
          </Button>
        </div>
        <CardDescription className="text-xs leading-relaxed">Follow the progress of this application. Status refreshes automatically while this page is open.</CardDescription>
      </CardHeader>
      <CardContent className="pt-5">
        {isLoading ? <p className="text-sm">Loading application status...</p> : error ? (
          <p role="alert" className="text-sm text-red-600">Unable to refresh the status. Select Refresh to try again.</p>
        ) : data ? <ApplicationStatusContent data={data} /> : <p className="text-sm">Status unavailable.</p>}
      </CardContent>
    </Card>
  );
}
