"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useGetDepartmentsQuery, useGetEmployeesQuery } from "@/redux/features/hr-api-slice";
import { useGetHrApprovalsQuery, useGetStaffOnLeaveQuery } from "@/redux/features/leave-api-slice";

export default function HumanResourceDashboard({ user }: { user: User }) {
  const canApproveLeave = user.groups?.some((group) =>
    group.permissions?.some((permission) => permission.codename === "hr_approve_leave"),
  ) ?? false;
  const employees = useGetEmployeesQuery({ page: 1, pageSize: 1 }, { refetchOnMountOrArgChange: true });
  const departments = useGetDepartmentsQuery(undefined, { refetchOnMountOrArgChange: true });
  const staffOnLeave = useGetStaffOnLeaveQuery(undefined, {
    refetchOnMountOrArgChange: true,
    pollingInterval: 60_000,
  });
  const approvals = useGetHrApprovalsQuery(
    { page: 1, pageSize: 5 },
    { skip: !canApproveLeave, refetchOnMountOrArgChange: true },
  );

  const metrics = [
    { label: "Employees", count: employees.data?.count, loading: employees.isLoading, error: employees.isError, retry: employees.refetch },
    { label: "Departments", count: departments.data?.length, loading: departments.isLoading, error: departments.isError, retry: departments.refetch },
    { label: "Staff on leave today", count: staffOnLeave.data?.count, loading: staffOnLeave.isLoading, error: staffOnLeave.isError, retry: staffOnLeave.refetch },
    ...(canApproveLeave ? [{ label: "Pending HR leave approvals", count: approvals.data?.count, loading: approvals.isLoading, error: approvals.isError, retry: approvals.refetch }] : []),
  ];

  return (
    <>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {metrics.map((metric) => (
          <Card key={metric.label}>
            <CardHeader><CardDescription>{metric.label}</CardDescription></CardHeader>
            <CardContent>
              <p className="text-3xl font-semibold" aria-live="polite">
                {metric.error ? "Unavailable" : metric.loading ? "..." : metric.count?.toLocaleString() ?? "—"}
              </p>
              {metric.error && <Button variant="outline" className="mt-3" onClick={() => metric.retry()}>Try again</Button>}
            </CardContent>
          </Card>
        ))}
      </div>
      <Card>
        <CardHeader><CardTitle>Quick actions</CardTitle></CardHeader>
        <CardContent className="flex flex-wrap gap-3">
          <Button asChild><Link href="/hr/employees">Manage employees</Link></Button>
          <Button asChild variant="outline"><Link href="/hr/employees/new">Add employee</Link></Button>
          {canApproveLeave && <Button asChild variant="outline"><Link href="/leave/hr-approvals">Review leave applications</Link></Button>}
        </CardContent>
      </Card>
      {canApproveLeave && (
        <Card>
          <CardHeader>
            <CardTitle>Leave awaiting HR approval</CardTitle>
            <CardDescription>Applications approved by the supervisor and director.</CardDescription>
          </CardHeader>
          <CardContent>
            {approvals.isLoading ? <p role="status">Loading applications...</p> : approvals.isError ? (
              <div role="alert" className="space-y-3">
                <p>We couldn&apos;t load leave applications.</p>
                <Button variant="outline" onClick={() => approvals.refetch()}>Try again</Button>
              </div>
            ) : approvals.data?.results.length ? (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <caption className="sr-only">First page of leave applications awaiting HR approval</caption>
                  <thead className="text-muted-foreground border-b">
                    <tr>
                      <th scope="col" className="p-3">Employee</th>
                      <th scope="col" className="p-3">Leave type</th>
                      <th scope="col" className="p-3">Dates</th>
                      <th scope="col" className="p-3">Days</th>
                      <th scope="col" className="p-3">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {approvals.data.results.slice(0, 5).map((application) => (
                      <tr key={application.id} className="border-b last:border-0">
                        <td className="p-3">{application.employee}</td>
                        <td className="p-3">{application.leave_type}</td>
                        <td className="p-3">{application.start_date} – {application.end_date}</td>
                        <td className="p-3">{application.leave_days}</td>
                        <td className="p-3"><Link className="text-primary underline" href={`/leave/hr-approvals/${application.id}/approve`}>Review</Link></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : <p className="text-muted-foreground">No leave applications are awaiting HR approval.</p>}
          </CardContent>
        </Card>
      )}
    </>
  );
}
