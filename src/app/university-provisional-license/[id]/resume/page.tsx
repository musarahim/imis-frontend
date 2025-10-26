import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SidebarInset } from "@/components/ui/sidebar";
import { RequireAuth } from '@/utils';
import ProvisionalForm from '../../new/ProvisionalForm';

type Props = { params: { id: string } }

// make the page async and await params before using its properties
export default async function page({ params }: Props) {
  const { id } = await params;

  return (
    <RequireAuth>
      <SiteHeader items={[
        { label: "Home", href: "/" },
        { label: "Lincenses", href: "/" },
        { label: "Provisional License (University)", href: "/university-provisional-license" },
        { label: "Resume Application" }
      ]} />
      <div className="flex flex-1">
        <AppSidebar />
        <SidebarInset>
          <div className="flex flex-1 flex-col gap-4 p-4">
            <Card>
              <CardHeader>
                <CardTitle>
                  Edit Application for a Provisional Licence to establish and operate a Private University
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ProvisionalForm showStepNumber={true} application_id={Number(id)} />
              </CardContent>
            </Card>
          </div>
        </SidebarInset>
      </div>
    </RequireAuth>
  );
}
