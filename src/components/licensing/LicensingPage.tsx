import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset } from "@/components/ui/sidebar";
import { licensingApplications, LicensingApplicationType, LicensingPageMode } from "@/lib/licensing";
import { RequireAuth } from "@/utils";
import LicensingWorkspace from "./LicensingWorkspace";

export default function LicensingPage({ applicationType, mode }: {
  applicationType: LicensingApplicationType; mode: LicensingPageMode;
}) {
  const config = licensingApplications[applicationType];
  const title = mode === "assign-reviewer" ? "Assign Reviewer" : mode === "under-review" ? "Under Review" : "Submitted Applications";
  return <RequireAuth>
    <SiteHeader items={[{ label: "Home", href: "/" }, { label: config.label, href: `/license/${config.path}/submitted` }, { label: title }]} />
    <div className="flex flex-1"><AppSidebar /><SidebarInset>
      <main className="flex flex-1 flex-col gap-4 p-4">
        {mode !== "assign-reviewer" && <h1 className="text-xl font-semibold">{config.label} — {title}</h1>}
        <LicensingWorkspace key={`${applicationType}:${mode}`} applicationType={applicationType} mode={mode} />
      </main>
    </SidebarInset></div>
  </RequireAuth>;
}
