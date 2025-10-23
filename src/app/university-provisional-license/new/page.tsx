import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SidebarInset } from "@/components/ui/sidebar";
import { RequireAuth } from '@/utils';
import ProvisionalForm from "./ProvisionalForm";
function page() {
  return (
       <RequireAuth>
        <SiteHeader items={[    { label: "Home", href: "/" },
        { label: "Lincenses", href: "/" },
        { label: "Provisional License (University)", href: "/university-provisional-license" },
        { label: "Apply" } // current page
    ]} />
              <AppSidebar />
             <div className="flex flex-1">
                  <AppSidebar />
                  <SidebarInset>
              <div className="flex flex-1 flex-col gap-4 p-4">
                <Card>
                    <CardHeader>
                   
        <CardTitle>Application for a Provisional Licence to establish and operate a Private University</CardTitle>
      
        
      </CardHeader>
                    <CardContent>
    <ProvisionalForm showStepNumber={true} />
    </CardContent>
    </Card>
    </div>
                 </SidebarInset>
               </div>
               
                 
                </RequireAuth>
  )
}

export default page