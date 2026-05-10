import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset } from "@/components/ui/sidebar";
import { RequireAuth } from "@/utils";
import InvoiceForm from "./InvoiceForm";

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
          {
            label: "Invoice",
            href: "#",
          },
        ]}
      />
      <div className="flex flex-1">
        <AppSidebar />
        <SidebarInset>
          <div className="flex flex-1 flex-col gap-4 p-4">
            <InvoiceForm />
          </div>
        </SidebarInset>
      </div>
    </RequireAuth>
  );
}

export default page;
