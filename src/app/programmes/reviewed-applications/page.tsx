import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset } from "@/components/ui/sidebar";
import { RequireAuth } from "@/utils";
import ReviewData from "./data";

function page() {
  return (
    <RequireAuth>
      <SiteHeader
        items={[
          { label: "Home", href: "/" },
          { label: "Programmes", href: "/programmes" },
          {
            label: "Programme Accreditation",
            href: "/programmes/programme-accreditation",
          },
          {
            label: "Reviewed Applications",
            href: "/programmes/reviewed-applications",
          },
        ]}
      />
      <div className="flex flex-1">
        <AppSidebar />
        <SidebarInset>
          <div className="flex flex-1 flex-col gap-4 p-4">
            <h1 className="text-2xl font-bold">Reviewed Applications</h1>
            <ReviewData />
          </div>
        </SidebarInset>
      </div>
    </RequireAuth>
  );
}

export default page;
