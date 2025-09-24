import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset } from "@/components/ui/sidebar";
import { RequireAuth } from '@/utils';
import IntrimAuthorityData from "./data";

function  page() {
  
  return (
   <RequireAuth>
    <SiteHeader items={[    { label: "Home", href: "/" },
    { label: "Lincenses", href: "/" },
    { label: "Interim Authority (University)" }, // current page
]} />
          <AppSidebar />
         <div className="flex flex-1">
              <AppSidebar />
              <SidebarInset>
          <div className="flex flex-1 flex-col gap-4 p-4">
           <IntrimAuthorityData />
     
           </div>
              </SidebarInset>
            </div>
            
              
             </RequireAuth>
  )
}

export default page