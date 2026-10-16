import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset } from "@/components/ui/sidebar";
import { RequireAuth } from "@/utils";
import InvoiceForm from "../InvoiceForm";

export default function Page() {
  return <RequireAuth>
    <SiteHeader items={[{ label: "Home", href: "/" }, { label: "Desk Review Invoices", href: "/programmes/desk-review-invoices" }, { label: "Create Invoice", href: "#" }]} />
    <div className="flex flex-1"><AppSidebar /><SidebarInset><div className="flex flex-1 flex-col gap-4 p-4"><InvoiceForm /></div></SidebarInset></div>
  </RequireAuth>;
}
