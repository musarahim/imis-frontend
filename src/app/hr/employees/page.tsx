import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset } from "@/components/ui/sidebar";
import { RequireAuth } from "@/utils";
import EmployeeData from "./data";

function page() {
  return (
    <RequireAuth>
      <SiteHeader
        items={[
          { label: "Home", href: "/" },
          { label: "Human Resource", href: "/hr/employees" },
          { label: "Employees" },
        ]}
      />
      <div className="flex flex-1">
        <AppSidebar />
        <SidebarInset>
          <div className="flex flex-1 flex-col gap-4 p-4">
            <EmployeeData />
          </div>
        </SidebarInset>
      </div>
    </RequireAuth>
  );
}

export default page;
