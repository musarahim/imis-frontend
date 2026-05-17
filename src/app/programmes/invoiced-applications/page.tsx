import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset } from "@/components/ui/sidebar";
import { RequireAuth } from "@/utils";
import InvoicedApplications from "./data";

function page() {
  return (
    <RequireAuth>
      <SiteHeader
        items={[
          { label: "Home", href: "/" },
          { label: "Programmes", href: "/programmes" },
          {
            label: "Invoiced Applications",
            href: "/programmes/invoiced-applications",
          },
        ]}
      />
      <div className="flex flex-1">
        <AppSidebar />
        <SidebarInset>
          <div className="flex flex-1 flex-col gap-4 p-4">
            <h1 className="text-2xl font-semibold">Invoiced Applications</h1>

            <InvoicedApplications />
          </div>
        </SidebarInset>
      </div>
    </RequireAuth>
  );
}

export default page;
