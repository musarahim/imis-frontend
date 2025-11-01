import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SidebarInset } from "@/components/ui/sidebar";
import { RequireAuth } from '@/utils';
import ChartApplicationForm from "./ChartApplicationForm";

function page() {
  return (
    <RequireAuth>
      <SiteHeader items={[
        { label: "Home", href: "/" },
        { label: "Grant of a Charter University", href: "/university-grant-charter", },
        { label: "Application" } // current page
      ]} />
      <div className="flex flex-1">
        <AppSidebar />
        <SidebarInset>
          <div className="flex flex-1 flex-col gap-4 p-4">
            <Card>
              <CardHeader>
                <CardTitle>New Grant a Charter Application</CardTitle>
              </CardHeader>
              <CardContent>
                <ChartApplicationForm />
              </CardContent>
            </Card>
          </div>
        </SidebarInset>
      </div>
    </RequireAuth>
  )
}

export default page