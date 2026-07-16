import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset } from "@/components/ui/sidebar";
import { RequireAuth } from "@/utils";
import DeskReviewInvoice from "./data";

function page() {
  return (
    <RequireAuth>
      <SiteHeader
        items={[
          { label: "Home", href: "/" },
          { label: "Programmes", href: "/programmes" },
          {
            label: "Desk Review Invoices",
            href: "/programmes/desk-review-invoices",
          },
        ]}
      />
      <div className="flex flex-1">
        <AppSidebar />
        <SidebarInset>
          <div className="flex flex-1 flex-col gap-4 p-4">
            <h1 className="text-2xl font-semibold">Desk Review Invoices</h1>
            <DeskReviewInvoice />
          </div>
        </SidebarInset>
      </div>
    </RequireAuth>
  );
}

export default page;
