import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SidebarInset } from "@/components/ui/sidebar";
import { RequireAuth } from "@/utils";
import Form from "../../new/Form";

type Props = { params: Promise<{ id: string }> };

export default async function page({ params }: Props) {
  const { id } = await params;
  const itemId = Number(id);

  return (
    <RequireAuth>
      <SiteHeader
        items={[
          { label: "Home", href: "/" },
          { label: "Procurement", href: "#" },
          { label: "Items", href: "/procurement/items" },
          { label: "Edit Item" },
        ]}
      />
      <div className="flex flex-1">
        <AppSidebar />
        <SidebarInset>
          <div className="flex flex-1 flex-col gap-4 p-4">
            <Card>
              <CardHeader>
                <CardTitle>Edit Item</CardTitle>
              </CardHeader>
              <CardContent>
                <Form item_id={itemId} />
              </CardContent>
            </Card>
          </div>
        </SidebarInset>
      </div>
    </RequireAuth>
  );
}
