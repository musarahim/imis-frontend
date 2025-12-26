import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset } from "@/components/ui/sidebar";
import { RequireAuth } from '@/utils';
import ApprovalForm from "./ApprovalForm";
import Content from "./Content";
type Props = { params: Promise<{ id: string }> }
export default async function page({ params }: Props) {
      const { id } = await params;
  return (
    <RequireAuth>
           <SiteHeader items={[
                { label: "Home", href: "/" },
                {label:"HR Approvals", href:"/leave/hr-approvals",},
                {label:"Approve" }   
              ]} />
          <div className="flex flex-1">
            <AppSidebar />
            <SidebarInset>
              <div className="flex flex-1 flex-col gap-4 p-4">
            <div className="border-t  border-gray-900/10  dark:border-gray-400">
        <h2 className="text-base/8 font-semibold mt-2 text-gray-900 dark:text-white">
          HR LEAVE APPROVAL
        </h2>
      </div>
        <div className="flex flex-col lg:flex-row gap-2 h-full">
          <div className="flex-1 lg:w-1/2 rounded-lg border p-2 h-full">
            <Content id={id} />
          </div>
          <div className="lg:w-1/2 w-full">
            <div className="bg-white dark:bg-gray-950 rounded-lg border p-2 h-full">
              <h3 className="text-md font-semibold mb-4 text-gray-900 dark:text-white">
                Application Decision
              </h3>
              {/* Chart component will go here */}
              <div className="h-64 w-full dark:bg-gray-950  rounded flex items-center p-2">
              <ApprovalForm id={id} />

              </div>
            </div>
          </div>
        </div>
     
            </div>
            </SidebarInset>
          </div>
    </RequireAuth>
  )
}
