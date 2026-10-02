"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useRetrieveUserQuery } from "@/redux/features/authApiSlice";
import HumanResourceDashboard from "./human-resource-dashboard";

// Entries are ordered: the first matching group selects the dashboard.
const roleDashboards = [
  { group: "Human Resource", component: HumanResourceDashboard },
];

export default function DashboardContent() {
  const { data: user, isLoading, isError, refetch } = useRetrieveUserQuery();

  if (isLoading) return <p role="status">Loading your dashboard...</p>;
  if (isError || !user) {
    return (
      <div role="alert" className="space-y-3">
        <p>We couldn&apos;t load your dashboard.</p>
        <Button variant="outline" onClick={() => refetch()}>Try again</Button>
      </div>
    );
  }

  const dashboard = roleDashboards.find(({ group }) =>
    user.groups?.some((membership) => membership.name === group),
  );
  const RoleDashboard = dashboard?.component;
  const canViewLeave = user.groups?.some((group) =>
    group.name === "Staff" && group.permissions?.some((permission) =>
      permission.codename === "view_leaveapplication",
    ),
  );

  return (
    <>
      <div>
        <h1 className="text-2xl font-semibold">Welcome, {user.first_name || user.username}</h1>
        <p className="text-muted-foreground mt-1">
          {dashboard ? `${dashboard.group} dashboard` : "Your staff dashboard"}
        </p>
      </div>
      {RoleDashboard ? <RoleDashboard user={user} /> : (
        <Card>
          <CardHeader><CardTitle>My workspace</CardTitle></CardHeader>
          <CardContent className="flex flex-wrap gap-3">
            {user.employee && (
              <>
                <Button asChild variant="outline"><Link href="/profile">My biodata</Link></Button>
                {canViewLeave && <Button asChild variant="outline"><Link href="/leave/leave-schedule">My leave schedule</Link></Button>}
              </>
            )}
            <p className="text-muted-foreground w-full text-sm">Use the sidebar to open the services available to you.</p>
          </CardContent>
        </Card>
      )}
    </>
  );
}
