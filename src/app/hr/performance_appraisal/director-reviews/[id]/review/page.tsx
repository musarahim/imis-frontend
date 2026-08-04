import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset } from "@/components/ui/sidebar";
import { RequireAuth } from "@/utils";
import AppraisalSummary from "../../../reviewer-reviews/[id]/review/Content";
import ReviewForm from "./ReviewForm";

type Props = { params: Promise<{ id: string }> };

export default async function page({ params }: Props) {
  const { id } = await params;
  return (
    <RequireAuth>
      <SiteHeader items={[{ label: "Home", href: "/" }, { label: "Performance Appraisal", href: "/hr/performance_appraisal" }, { label: "Director Reviews", href: "/hr/performance_appraisal/director-reviews" }, { label: "Review" }]} />
      <div className="flex flex-1">
        <AppSidebar />
        <SidebarInset>
          <div className="flex flex-1 flex-col gap-4 p-4">
            <div className="border-t border-gray-900/10 dark:border-gray-400">
              <h2 className="text-base/8 font-semibold mt-2 text-gray-900 dark:text-white">PERFORMANCE APPRAISAL — DIRECTOR REVIEW</h2>
            </div>
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1 lg:w-1/2 border rounded-lg p-4">
                <h3 className="text-sm font-semibold mb-3">Appraisal Summary</h3>
                <AppraisalSummary id={id} />
              </div>
              <div className="lg:w-1/2 border rounded-lg p-4">
                <h3 className="text-sm font-semibold mb-3">Director&apos;s Decision</h3>
                <ReviewForm id={id} />
              </div>
            </div>
          </div>
        </SidebarInset>
      </div>
    </RequireAuth>
  );
}
