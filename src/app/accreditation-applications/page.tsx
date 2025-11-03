import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset } from "@/components/ui/sidebar";
import { RequireAuth } from '@/utils';
import ProgrammeAccreditationData from "./data";
function page() {
  return (
    <RequireAuth>
      <SiteHeader items={[
        { label: "Home", href: "/" },
        { label: "Programme", href: "/accreditation-applications", },
      ]} />
      <div className="flex flex-1">
        <AppSidebar />
        <SidebarInset>
          <div className="flex flex-1 flex-col gap-4 p-4">
            <ProgrammeAccreditationData />
          </div>
        </SidebarInset>
      </div>
    </RequireAuth>
  )
}

export default page