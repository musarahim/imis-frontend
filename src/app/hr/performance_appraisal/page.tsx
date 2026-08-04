import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset } from "@/components/ui/sidebar";
import { RequireAuth } from "@/utils";
import AppraisalData from "./data";

export default function page() {
  return (
    <RequireAuth>
      <SiteHeader
        items={[
          { label: "Home", href: "/" },
          { label: "Performance Appraisal" },
        ]}
      />
      <div className="flex flex-1">
        <AppSidebar />
        <SidebarInset>
          <div className="flex flex-1 flex-col gap-4 p-4">
            <div className="border-t border-gray-900/10 dark:border-gray-400">
              <h2 className="text-base/8 font-semibold mt-2 text-gray-900 dark:text-white">
                MY PERFORMANCE APPRAISALS
              </h2>
            </div>
            <AppraisalData />
          </div>
        </SidebarInset>
      </div>
    </RequireAuth>
  );
}
