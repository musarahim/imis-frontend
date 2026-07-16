import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset } from "@/components/ui/sidebar";
import { RequireAuth } from "@/utils";
import Content from "./Content";
type Props = { params: Promise<{ id: string }> };

export default async function page({ params }: Props) {
  const { id } = await params;
  return (
    <RequireAuth>
      <SiteHeader
        items={[
          { label: "Home", href: "/" },
          { label: "Human Resource", href: "#" },
          { label: "Employees", href: "/hr/employees" },
          { label: "Employee Details" },
        ]}
      />
      <div className="flex flex-1">
        <AppSidebar />
        <SidebarInset>
          <div className="flex flex-1 flex-col gap-4 p-4">
            <Content id={Number(id)} />
          </div>
        </SidebarInset>
      </div>
    </RequireAuth>
  );
}
