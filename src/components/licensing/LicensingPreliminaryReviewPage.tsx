import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset } from "@/components/ui/sidebar";
import { licensingApplications, LicensingApplicationType } from "@/lib/licensing";
import { RequireAuth } from "@/utils";
import LicensingPreliminaryReview from "./LicensingPreliminaryReview";

export default function LicensingPreliminaryReviewPage({ applicationType, id }: { applicationType: LicensingApplicationType; id: number }) {
  const config = licensingApplications[applicationType];
  return <RequireAuth>
    <SiteHeader items={[{ label: "Home", href: "/" }, { label: config.label, href: `/license/${config.path}/under-review` }, { label: "Preliminary Review" }]} />
    <div className="flex flex-1"><AppSidebar /><SidebarInset>
      <main className="flex flex-1 flex-col gap-4 p-4"><LicensingPreliminaryReview applicationType={applicationType} id={id} /></main>
    </SidebarInset></div>
  </RequireAuth>;
}
