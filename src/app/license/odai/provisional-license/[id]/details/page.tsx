import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset } from "@/components/ui/sidebar";
import { RequireAuth } from "@/utils";
import Content from "./Content";

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <RequireAuth>
    <SiteHeader items={[{ label: "Home", href: "/" }, { label: "ODAI Provisional Licence", href: "/license/odai/provisional-license/submitted" }, { label: "Application Details" }]} />
    <div className="flex flex-1"><AppSidebar /><SidebarInset>
      <div className="flex flex-1 flex-col gap-4 p-4"><Content id={id} /></div>
    </SidebarInset></div>
  </RequireAuth>;
}
