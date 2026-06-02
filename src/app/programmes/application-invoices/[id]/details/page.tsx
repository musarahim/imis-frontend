import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset } from "@/components/ui/sidebar";
import { RequireAuth } from "@/utils";
import Content from "./content";

type Props = { params: Promise<{ id: string }> };

export default async function page({ params }: Props) {
  const { id } = await params;

  return (
    <RequireAuth>
      <SiteHeader
        items={[
          { label: "Home", href: "/" },
          { label: "Programmes", href: "/" },
          {
            label: "Programme Accreditations ",
            href: "/programme-accreditation",
          },
          { label: "Application Invoice Details" },
        ]}
      />
      <div className="flex flex-1">
        <AppSidebar />
        <SidebarInset>
          <div className="flex flex-1 flex-col gap-4 p-4">
            <div className="flex flex-col lg:flex-row gap-4 h-full">
              <div className="flex-1">
                <Content id={id} />
              </div>
            </div>
          </div>
        </SidebarInset>
      </div>
    </RequireAuth>
  );
}
