import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset } from "@/components/ui/sidebar";
import { licensingApplications, LicensingApplicationType } from "@/lib/licensing";
import { RequireAuth } from "@/utils";
import ApplicationStatus from "./ApplicationStatus";

export default function LicensingStatusPage({ applicationType, id }: { applicationType: LicensingApplicationType; id: number }) {
  const config = licensingApplications[applicationType];
  return (
    <RequireAuth>
      <SiteHeader items={[
        { label: "Home", href: "/" },
        { label: config.label, href: `/license/${config.path}/submitted` },
        { label: "Application Status" },
      ]} />
      <div className="flex flex-1">
        <AppSidebar />
        <SidebarInset>
          <div className="flex flex-1 flex-col gap-4 p-4">
            <h1 className="text-2xl font-semibold">Application Status</h1>
            <p className="text-sm text-muted-foreground">This status and history are also visible to the institution.</p>
            <div className="max-w-3xl"><ApplicationStatus endpoint={config.endpoint} id={id} /></div>
          </div>
        </SidebarInset>
      </div>
    </RequireAuth>
  );
}
