import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset } from "@/components/ui/sidebar";
import { RequireAuth } from '@/utils';
function page() {
  return (
     <RequireAuth>
         <SiteHeader items={[
                { label: "Home", href: "/" },
                { label: "Grant Charter University", href: "/university-grant-charter", },
              ]} />
              <div className="flex flex-1">
        <AppSidebar />
        <SidebarInset>
          <div className="flex flex-1 flex-col gap-4 p-4">
            <div>Grant Charter University</div>
            </div>
        </SidebarInset>
      </div>
    </RequireAuth> 

  )
}

export default page