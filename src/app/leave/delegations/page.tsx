import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset } from "@/components/ui/sidebar";
import { RequireAuth } from '@/utils';
import LeaveDeligationData from "./data";
function page() {
  return (
     <RequireAuth>
         <SiteHeader items={[
                { label: "Home", href: "/" },
                { label: "My Leave Applications", href: "/leave-applications", },
                {label:"Leave  Delegations"}
              ]} />
              <div className="flex flex-1">
        <AppSidebar />
        <SidebarInset>
          <div className="flex flex-1 flex-col gap-4 p-4">
            <LeaveDeligationData />
            </div>
        </SidebarInset>
      </div>
    </RequireAuth> 
  )
}

export default page