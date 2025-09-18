
import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset } from "@/components/ui/sidebar";
import { RequireAuth } from '@/utils';



export default function Home() {
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
            <p> Institution Dashboard</p>
               </div>
              </SidebarInset>
        
            </div>
            
              
             </RequireAuth>
  );
}




