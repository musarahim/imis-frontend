import { AppSidebar } from "@/components/app-sidebar";
import { DataTable } from "@/components/common/data-table";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset } from "@/components/ui/sidebar";
import { RequireAuth } from '@/utils';
import { columns } from "./column";
async function getData(): Promise<IntrimAuthority[]> {
  // Fetch data from your API here.
  return [
    {
      id: 1,
      application_code: "IA2023-001",
      institution: "Example University",
      application_date: "2023-10-01",
      status: "pending",
      has_title_deed: true,
      names_of_promoters: "John Doe, Jane Smith",
      vision: "To be a leading institution",
      mission: "Provide quality education",
      objectives: "Educate students, Conduct research",
      philosophy: "Excellence and Integrity",
      governance_structure: "Board of Trustees",
      human_resources: "Qualified staff",
      source_of_finance: "Tuition fees, Donations",
      action_plan: "Expand facilities, Hire faculty",
      infrastructure: "Campus buildings, Labs",
      programmes: "Undergraduate, Postgraduate",
      
    }
   
    ]
}
async function  page() {
  const data = await getData()
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
           <DataTable columns={columns} data={data} addHref="/interim-authority/new" addText="Apply for Interim Authority" />
     
           </div>
              </SidebarInset>
            </div>
            
              
             </RequireAuth>
  )
}

export default page