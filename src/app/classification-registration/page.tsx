import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset } from "@/components/ui/sidebar";
import { RequireAuth } from '@/utils';
function page() {
  return (

 <RequireAuth>
         <SiteHeader items={[
                { label: "Home", href: "/" },
                { label: "Classification & Registration", href: "/classification-registration", },
              ]} />
              <div className="flex flex-1">
        <AppSidebar />
        <SidebarInset>
          <div className="flex flex-1 flex-col gap-4 p-4">
            <div>Classification and Registration</div>
            </div>
        </SidebarInset>
      </div>
    </RequireAuth> 
  )
}

export default page