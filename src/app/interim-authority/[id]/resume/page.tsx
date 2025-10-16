import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SidebarInset } from "@/components/ui/sidebar";
import { RequireAuth } from '@/utils';
import InterimForm from '../../new/InterimForm';

type Props = { params: { id: string } }

// make the page async and await params before using its properties
export default async function page({ params }: Props) {
  const { id } = await params;

  return (
    <RequireAuth>
      <SiteHeader items={[
        { label: "Home", href: "/" },
        { label: "Lincenses", href: "/" },
        { label: "Interim Authority (University)", href: "/interim-authority" },
        { label: "Resume Application" }
      ]} />
      <div className="flex flex-1">
        <AppSidebar />
        <SidebarInset>
          <div className="flex flex-1 flex-col gap-4 p-4">
            <Card>
              <CardHeader>
                <CardTitle>
                  Resume Application for a letter of interim authority to establish and operate a private university
                </CardTitle>
              </CardHeader>
              <CardContent>
                <InterimForm showStepNumber={true} application_id={Number(id)} />
              </CardContent>
            </Card>
          </div>
        </SidebarInset>
      </div>
    </RequireAuth>
  );
}
