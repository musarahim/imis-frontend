import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset } from "@/components/ui/sidebar";
import { RequireAuth } from '@/utils';
import ProfileContent from "./profile-content";
import ProfileHeader from "./profile-header";



function page() {
  return (
 <RequireAuth>
    <SiteHeader />
          <AppSidebar />
         <div className="flex flex-1">
              <AppSidebar />
            {/* Main content */}
      <SidebarInset>
            <div className="flex flex-1 flex-col gap-4 p-4">
              <ProfileHeader />
              <ProfileContent />


                     </div>
          </SidebarInset>
           
          </div>
          </RequireAuth>
  )
}

export default page