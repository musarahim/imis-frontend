import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SidebarInset } from "@/components/ui/sidebar";
import { RequireAuth } from "@/utils";
import Form from "./Form";
function page() {
  return (
    <RequireAuth>
      <SiteHeader
        items={[
          { label: "Home", href: "/" },
          { label: "Procurement", href: "#" },
          { label: "Bugets", href: "/procurement/budget" },
          { label: "Add Budget" },
        ]}
      />
      <div className="flex flex-1">
        <AppSidebar />
        <SidebarInset>
          <div className="flex flex-1 flex-col gap-4 p-4">
            <Card>
              <CardHeader>
                <CardTitle>Add New Buget</CardTitle>
              </CardHeader>
              <CardContent>
                <Form />
              </CardContent>
            </Card>
          </div>
        </SidebarInset>
      </div>
    </RequireAuth>
  );
}

export default page;
