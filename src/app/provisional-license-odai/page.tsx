import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset } from "@/components/ui/sidebar";
import { RequireAuth } from '@/utils';
function page() {
  return (
     <RequireAuth>
         <SiteHeader items={[
                { label: "Home", href: "/" },
                { label: "Provisional License (ODAI)", href: "/provisional-license-odai", },
              ]} />
              <div className="flex flex-1">
        <AppSidebar />
        <SidebarInset>
          <div className="flex flex-1 flex-col gap-4 p-4">
            <div>Provisional License (ODAI)</div>
            </div>
        </SidebarInset>
      </div>
    </RequireAuth> 

  )
}

export default page