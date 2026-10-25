import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset } from "@/components/ui/sidebar";
import { licensingApplications, LicensingApplicationType } from "@/lib/licensing";
import { RequireAuth } from "@/utils";
import { LicensingProcessingDetail, LicensingProcessingQueue } from "./LicensingProcessing";
import { processingQueues } from "@/lib/licensing-processing";

export default function LicensingProcessingPage({ applicationType, id, queue = "all" }: {
  applicationType: LicensingApplicationType;
  id?: number;
  queue?: string;
}) {
  const config = licensingApplications[applicationType];
  const selectedQueue = processingQueues.find((item) => item.value === queue) ?? processingQueues[0];

  return (
    <RequireAuth>
      <SiteHeader items={[
        { label: "Home", href: "/" },
        { label: config.label, href: `/license/${config.path}/submitted` },
        { label: "Application Processing", href: `/license/${config.path}/processing` },
        { label: id !== undefined ? "Review Application" : selectedQueue.label },
      ]} />
      <div className="flex flex-1">
        <AppSidebar />
        <SidebarInset>
          <div className="flex flex-1 flex-col gap-4 p-4">
            {id !== undefined ? (
              <LicensingProcessingDetail applicationType={applicationType} id={id} />
            ) : (
              <>
                <h1 className="text-2xl font-semibold">{config.label} - {selectedQueue.label}</h1>
                <LicensingProcessingQueue key={`${applicationType}:${selectedQueue.value}`} applicationType={applicationType} queue={selectedQueue.value} />
              </>
            )}
          </div>
        </SidebarInset>
      </div>
    </RequireAuth>
  );
}
