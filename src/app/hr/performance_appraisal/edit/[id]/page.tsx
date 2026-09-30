import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SidebarInset } from "@/components/ui/sidebar";
import { RequireAuth } from "@/utils";
import Form from "../../new/Form";

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return (
    <RequireAuth>
      <SiteHeader items={[{ label: "Home", href: "/" }, { label: "Performance Appraisal", href: "/hr/performance_appraisal" }, { label: "Continue draft" }]} />
      <div className="flex flex-1">
        <AppSidebar />
        <SidebarInset>
          <div className="flex flex-1 flex-col gap-4 p-4">
            <Card>
              <CardHeader><CardTitle>Continue Performance Appraisal</CardTitle></CardHeader>
              <CardContent><Form showStepNumber appraisal_id={Number(id)} /></CardContent>
            </Card>
          </div>
        </SidebarInset>
      </div>
    </RequireAuth>
  );
}
