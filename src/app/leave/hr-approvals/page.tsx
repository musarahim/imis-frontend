import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset } from "@/components/ui/sidebar";
import { RequireAuth } from '@/utils';
import HrApprovalData from "./data";
function page() {
  return (
        <RequireAuth>
             <SiteHeader items={[
                    { label: "Home", href: "/" },
                    { label: "My Leave Applications", href: "/leave-applications", },
                    { label: "Supervisor Leave Approvals", href: "/leave/supervisor-approvals", },
                  ]} />
                  <div className="flex flex-1">
            <AppSidebar />
            <SidebarInset>
              <div className="flex flex-1 flex-col gap-4 p-4">
    <HrApprovalData />
               </div>
    <AppSidebar />
    
            </SidebarInset>
          </div>
        </RequireAuth>   

  )
}

export default page