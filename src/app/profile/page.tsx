import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset } from "@/components/ui/sidebar";
import { RequireAuth } from '@/utils';
import Content from "./Content";



function page() {
  return (
 <RequireAuth>
    <SiteHeader />
          <AppSidebar />
         <div className="flex flex-1">
              <AppSidebar />
            {/* Main content */}
      <SidebarInset>
            <div className="flex flex-1 flex-row gap-4 p-4">
              <Content />
              {/* <ProfileHeader />
              <ProfileContent /> */}


                     </div>
          </SidebarInset>
           
          </div>
          </RequireAuth>
  )
}

export default page