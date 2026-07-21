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
          { label: "Human Resource", href: "/hr/employees" },
          { label: "New Employee" },
        ]}
      />
      <div className="flex flex-1">
        <AppSidebar />
        <SidebarInset>
          <div className="flex flex-1 flex-col gap-4 p-4">
            <Card>
              <CardHeader>
                <CardTitle>Staff Registration Form</CardTitle>
              </CardHeader>
              <CardContent>
                <Form showStepNumber={true} />
              </CardContent>
            </Card>
          </div>
        </SidebarInset>
      </div>
    </RequireAuth>
  );
}

export default page;
