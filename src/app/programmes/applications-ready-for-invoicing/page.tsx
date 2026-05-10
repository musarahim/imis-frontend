import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset } from "@/components/ui/sidebar";
import { RequireAuth } from "@/utils";
import ReadyForInvoice from "./data";

function page() {
  return (
    <RequireAuth>
      <SiteHeader
        items={[
          { label: "Home", href: "/" },
          { label: "Programmes", href: "/programmes" },
          {
            label: "Applications Ready for Invoicing",
            href: "/programmes/applications-ready-for-invoicing",
          },
        ]}
      />
      <div className="flex flex-1">
        <AppSidebar />
        <SidebarInset>
          <div className="flex flex-1 flex-col gap-4 p-4">
            <h1 className="text-2xl font-semibold">
              Applications Ready for Invoicing
            </h1>
            <ReadyForInvoice />
          </div>
        </SidebarInset>
      </div>
    </RequireAuth>
  );
}

export default page;
