"use server"
import { AppSidebar } from "@/components/app-sidebar";
import { DataTable } from "@/components/common/data-table";
import { SiteHeader } from "@/components/site-header";
import { Button } from '@/components/ui/button';
import { SidebarInset } from "@/components/ui/sidebar";
import { columns, Payment } from "./columns";
async function getData(): Promise<Payment[]> {
  // Fetch data from your API here.
  return [
    {
      id: "728ed53f",
      amount: 100,
      status: "pending",
      email: "s@example.com",
    },
    {
      id: "728ed52f",
      amount: 100,
      status: "success",
      email: "m@example.com",
    },
    {
      id: "728ed53a",
      amount: 100,
      status: "failed",
      email: "n@example.com",
    },
    {
      id: "728ed53b",
      amount: 100,
      status: "processing",
      email: "t@example.com",
    },
    {
      id: "728ed53c",
      amount: 100,
      status: "pending",
      email: "e@example.com",
    },
    {
      id: "728ed53d",
      amount: 100,
      status: "success",
      email: "a@example.com",
    },
    {
      id: "728ed53e",
      amount: 100,
      status: "failed",
      email: "r@example.com",
    },
    {
      id: "728ed53g",
      amount: 100,
      status: "processing",
      email: "s@example.com",
    },
    {
      id: "728ed53h",
      amount: 100,
      status: "pending",
      email: "s@example.com",
    },
    { id: "728ed53i", amount: 100, status: "success", email: "s@example.com" },
    { id: "728ed53j", amount: 100, status: "failed", email: "s@example.com" },  
    { id: "728ed53k", amount: 100, status: "processing", email: "s@example.com" },
  ]
}

export default async function Page() {
  const data = await getData()

  return (
    <>
  <SiteHeader />
      <AppSidebar />
     <div className="flex flex-1">
          <AppSidebar />
          <SidebarInset>
            <div className="flex flex-1 flex-col gap-4 p-4">
           <DataTable columns={columns} data={data} />
      <Button size={"sm"}>Button</Button>
           </div>
          </SidebarInset>
        </div>
     </>

      
  )
}