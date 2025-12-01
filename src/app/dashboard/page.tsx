
import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset } from "@/components/ui/sidebar";
import { RequireAuth } from '@/utils';




export default function Page() {
  return (
     <RequireAuth>
    <SiteHeader items={[    { label: "Home", href: "/" },
    { label: "Main Menu", href: "/" },
    { label: "Dashboard" }, // current page
]} />
          <AppSidebar />
         <div className="flex flex-1">
              <AppSidebar />
              <SidebarInset>
                <div className="flex flex-1 flex-col gap-4 p-4">
                    <div className="flex flex-1 flex-col gap-4 p-4">
              <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                <div className="bg-muted/50 aspect-video rounded-xl" />
                <div className="bg-muted/50 aspect-video rounded-xl" />
                <div className="bg-muted/50 aspect-video rounded-xl" />
              </div>
              <div className="bg-muted/50 min-h-[100vh] flex-1 rounded-xl md:min-h-min" />
            </div>
               </div>
              </SidebarInset>
        
            </div>
            
              
             </RequireAuth>

  
  )
}
