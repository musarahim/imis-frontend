import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset } from "@/components/ui/sidebar";
import { RequireAuth } from "@/utils";
import DashboardContent from "./dashboard-content";

export default function Page() {
  return (
    <RequireAuth>
      <SiteHeader items={[
        { label: "Home", href: "/" },
        { label: "Dashboard" },
      ]} />
      <div className="flex flex-1">
        <AppSidebar />
        <SidebarInset>
          <div className="flex flex-1 flex-col gap-6 p-4 md:p-6">
            <DashboardContent />
          </div>
        </SidebarInset>
      </div>
    </RequireAuth>
  );
}
