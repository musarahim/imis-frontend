import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset } from "@/components/ui/sidebar";
import { RequireAuth } from "@/utils";
import Data from "./data";

function page() {
  return (
    <RequireAuth>
      <SiteHeader
        items={[
          { label: "Home", href: "/" },
          { label: "Programmes", href: "/programmes" },
          {
            label: "Programme Assessments",
            href: "/programmes/programme-assessments",
          },
        ]}
      />
      <div className="flex flex-1">
        <AppSidebar />
        <SidebarInset>
          <div className="flex flex-1 flex-col gap-4 p-4">
            <Data />
          </div>
        </SidebarInset>
      </div>
    </RequireAuth>
  );
}

export default page;
