import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SidebarInset } from "@/components/ui/sidebar";
import { RequireAuth } from "@/utils";

type Props = { params: Promise<{ id: string }> };

export default async function page({ params }: Props) {
  const { id } = await params;

  return (
    <RequireAuth>
      <SiteHeader
        items={[
          { label: "Home", href: "/" },
          { label: "Procurement", href: "#" },
          { label: "Expenditures", href: "/procurement/expenditure" },
          { label: "Expenditure Details" },
        ]}
      />
      <div className="flex flex-1">
        <AppSidebar />
        <SidebarInset>
          <div className="flex flex-1 flex-col gap-4 p-4">
            <Card>
              <CardHeader>
                <CardTitle>Expenditure Details</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Expenditure details for ID: {id}</p>
              </CardContent>
            </Card>
          </div>
        </SidebarInset>
      </div>
    </RequireAuth>
  );
}
