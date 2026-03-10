import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset } from "@/components/ui/sidebar";
import { RequireAuth } from "@/utils";
import AssignReviewers from "./AssignReviewers";
import Content from "./content";

type Props = { params: Promise<{ id: string }> };

export default async function page({ params }: Props) {
  const { id } = await params;

  return (
    <RequireAuth>
      <SiteHeader
        items={[
          { label: "Home", href: "/" },
          { label: "Lincenses", href: "/" },
          {
            label: "Programme Accreditation ",
            href: "/programme-accreditation",
          },
          { label: "Application Details" },
        ]}
      />
      <div className="flex flex-1">
        <AppSidebar />
        <SidebarInset>
          <div className="flex flex-1 flex-col gap-4 p-4">
            <div className="border-t  border-gray-900/10  dark:border-gray-400">
              <h2 className="text-base/8 font-semibold mt-2 text-gray-900 dark:text-white">
                PROGRAMME ACCREDITATION APPLICATION DETAILS
              </h2>
            </div>
            <div className="flex flex-col lg:flex-row gap-4 h-full">
              <div className="flex-1 lg:w-3/4">
                <Content id={id} />
              </div>
              <div className="lg:w-1/4 w-full">
                <div className="bg-white dark:bg-gray-950 rounded-lg border p-2 h-full">
                  <AssignReviewers id={id} />
                </div>
              </div>
            </div>
          </div>
        </SidebarInset>
      </div>
    </RequireAuth>
  );
}
