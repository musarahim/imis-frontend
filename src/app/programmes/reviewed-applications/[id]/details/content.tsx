"use client";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { useEmployeeData } from "@/hooks";
import {
    usePatchProgrammeAccreditationMutation,
    useRetrievePreliminaryReviewQuery,
} from "@/redux/features/programme-api-slice";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

const labelCellClassName =
  "w-64 align-top whitespace-nowrap pr-4 font-semibold text-md";

const richTextCellClassName =
  "max-w-full overflow-hidden break-words whitespace-normal align-top [&_*]:max-w-full [&_*]:break-words [&_img]:h-auto [&_img]:max-w-full [&_table]:w-full [&_table]:table-fixed";

const plainTextCellClassName =
  "max-w-0 align-top break-words whitespace-pre-wrap";

function Content({ id }: { id: string }) {
  const router = useRouter();
  const { user } = useEmployeeData();
  const [patchProgrammeAccreditation, { isLoading: isSubmittingDecision }] =
    usePatchProgrammeAccreditationMutation();
  const [isRejectDialogOpen, setIsRejectDialogOpen] = useState(false);
  const [rejectionReason, setRejectionReason] = useState("");
  const [rejectionError, setRejectionError] = useState("");

  const { data, isLoading, isError } = useRetrievePreliminaryReviewQuery(
    Number(id),
    { refetchOnMountOrArgChange: true },
  );

  const applicationId = Number(data?.application);
  const hasValidApplicationId =
    Number.isFinite(applicationId) && applicationId > 0;
  const canAssignReviewers =
    user?.groups?.some((group) =>
      group.permissions?.some(
        (permission) => permission.codename === "can_assign_reviewers",
      ),
    ) ?? false;

  const handleAccept = () => {
    if (!hasValidApplicationId) {
      toast.error("Application ID is missing");
      return;
    }

    router.push(
      `/programmes/applications-ready-for-invoicing/${applicationId}/desk-review-invoice`,
    );
  };

  const handleReject = async () => {
    if (!hasValidApplicationId) {
      toast.error("Application ID is missing");
      return;
    }

    const reason = rejectionReason.trim();
    if (!reason) {
      setRejectionError("A rejection reason is required");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("status", "rejected");
      formData.append("rejection_reason", reason);

      await patchProgrammeAccreditation({
        id: applicationId,
        data: formData,
      }).unwrap();

      toast.success("Application rejected successfully");
      setIsRejectDialogOpen(false);
      setRejectionReason("");
      setRejectionError("");
      router.push("/programmes/reviewed-applications");
    } catch (error) {
      console.error("Failed to reject application:", error);
      toast.error("Failed to reject application");
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error...</div>;

  return (
    <>
      {canAssignReviewers && data?.application_status === "Reviewed" ? (
        <div className="mb-4 flex flex-wrap items-center justify-end gap-2 mt-6">
          <Button
            type="button"
            onClick={handleAccept}
            disabled={!hasValidApplicationId || isSubmittingDecision}
            className="bg-emerald-600 text-white hover:bg-emerald-700"
          >
            Accept & Invoice
          </Button>
          <Button
            type="button"
            variant="destructive"
            onClick={() => setIsRejectDialogOpen(true)}
            disabled={!hasValidApplicationId || isSubmittingDecision}
          >
            Reject
          </Button>
        </div>
      ) : null}
      <div className="bg-white dark:bg-gray-950 rounded-lg border p-2 h-full">
        <h3 className="text-xl font-semibold">{data?.programme}</h3>{" "}
        <Separator className="my-4" />
        <Table className="mt-1 w-full table-fixed">
          <colgroup>
            <col className="w-64" />
            <col />
          </colgroup>
          <TableBody>
            <TableRow>
              <TableCell className={labelCellClassName} colSpan={1}>
                Institution:
              </TableCell>

              <TableCell className={plainTextCellClassName}>
                {data?.institution}
              </TableCell>
            </TableRow>
            <TableRow className="bg-muted">
              <TableCell className={labelCellClassName} colSpan={1}>
                Application Number:
              </TableCell>

              <TableCell className={plainTextCellClassName}>
                {data?.application_number}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className={labelCellClassName} colSpan={1}>
                Programme Name:
              </TableCell>

              <TableCell className={plainTextCellClassName}>
                {data?.programme}
              </TableCell>
            </TableRow>
            <TableRow className="bg-muted">
              <TableCell className={labelCellClassName} colSpan={1}>
                Reviewer:
              </TableCell>

              <TableCell className={plainTextCellClassName}>
                {data?.reviewer_name}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className={labelCellClassName} colSpan={1}>
                Review Date:
              </TableCell>

              <TableCell className={plainTextCellClassName}>
                {data?.review_date}
              </TableCell>
            </TableRow>
            <TableRow className="bg-muted">
              <TableCell className={labelCellClassName} colSpan={1}>
                Progression for Expert Review:
              </TableCell>

              <TableCell className={plainTextCellClassName}>
                {data?.expert_progression}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className={labelCellClassName} colSpan={1}>
                Institution:
              </TableCell>

              <TableCell className={plainTextCellClassName}>
                {data?.institution}
              </TableCell>
            </TableRow>
            <TableRow className="bg-muted">
              <TableCell className={labelCellClassName} colSpan={1}>
                Type of Entry:
              </TableCell>

              <TableCell className="align-top text-gray-800 dark:text-gray-100">
                <div
                  className={richTextCellClassName}
                  dangerouslySetInnerHTML={{
                    __html: data?.type_of_entry_summary || "",
                  }}
                />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className={labelCellClassName} colSpan={1}>
                Entry Remarks:
              </TableCell>

              <TableCell className={plainTextCellClassName}>
                {data?.type_of_entry_comments}
              </TableCell>
            </TableRow>
            <TableRow className="bg-muted">
              <TableCell className={labelCellClassName} colSpan={1}>
                Entry Requirements:
              </TableCell>

              <TableCell className="align-top text-gray-800 dark:text-gray-100">
                <div
                  className={richTextCellClassName}
                  dangerouslySetInnerHTML={{
                    __html: data?.entry_requirements_summary || "",
                  }}
                />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className={labelCellClassName} colSpan={1}>
                Entry Requirements Remarks:
              </TableCell>

              <TableCell className={plainTextCellClassName}>
                {data?.entry_requirements_comments}
              </TableCell>
            </TableRow>
            <TableRow className="bg-muted">
              <TableCell className={labelCellClassName} colSpan={1}>
                Human Resources:
              </TableCell>

              <TableCell className="align-top text-gray-800 dark:text-gray-100">
                <div
                  className={richTextCellClassName}
                  dangerouslySetInnerHTML={{
                    __html: data?.human_resource_summary || "",
                  }}
                />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className={labelCellClassName} colSpan={1}>
                Human Resources Remarks:
              </TableCell>

              <TableCell className={plainTextCellClassName}>
                {data?.human_resource_comments}
              </TableCell>
            </TableRow>
            <TableRow className="bg-muted">
              <TableCell className={labelCellClassName} colSpan={1}>
                Facilities:
              </TableCell>

              <TableCell className="align-top text-gray-800 dark:text-gray-100">
                <div
                  className={richTextCellClassName}
                  dangerouslySetInnerHTML={{
                    __html: data?.facilities_summary || "",
                  }}
                />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className={labelCellClassName} colSpan={1}>
                Facilities Remarks:
              </TableCell>

              <TableCell className={plainTextCellClassName}>
                {data?.facilities_comments}
              </TableCell>
            </TableRow>
            <TableRow className="bg-muted">
              <TableCell className={labelCellClassName} colSpan={1}>
                Programme Duration:
              </TableCell>

              <TableCell className="align-top text-gray-800 dark:text-gray-100">
                <div
                  className={richTextCellClassName}
                  dangerouslySetInnerHTML={{
                    __html: data?.programme_duration_summary || "",
                  }}
                />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className={labelCellClassName} colSpan={1}>
                Duration Remarks:
              </TableCell>

              <TableCell className={plainTextCellClassName}>
                {data?.programme_duration_comments}
              </TableCell>
            </TableRow>
            <TableRow className="bg-muted">
              <TableCell className={labelCellClassName} colSpan={1}>
                Minimum Graduation Load:
              </TableCell>

              <TableCell className="align-top text-gray-800 dark:text-gray-100">
                <div
                  className={richTextCellClassName}
                  dangerouslySetInnerHTML={{
                    __html: data?.minimum_graduation_load_summary || "",
                  }}
                />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className={labelCellClassName} colSpan={1}>
                Remarks:
              </TableCell>

              <TableCell className={plainTextCellClassName}>
                {data?.minimum_graduation_load_comments}
              </TableCell>
            </TableRow>
            <TableRow className="bg-muted">
              <TableCell className={labelCellClassName} colSpan={1}>
                Proposed Maximum Number of Students to be Registered Per Year
                Based on the Available Resources
              </TableCell>

              <TableCell></TableCell>
            </TableRow>
            <TableRow>
              <TableCell className={labelCellClassName} colSpan={1}>
                Day Students:
              </TableCell>

              <TableCell className={plainTextCellClassName}>
                {data?.day_students}
              </TableCell>
            </TableRow>

            <TableRow className="bg-muted">
              <TableCell className={labelCellClassName} colSpan={1}>
                Evening Students:
              </TableCell>

              <TableCell className={plainTextCellClassName}>
                {data?.evening_students}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className={labelCellClassName} colSpan={1}>
                Weekend Students:
              </TableCell>

              <TableCell className={plainTextCellClassName}>
                {data?.weekend_students}
              </TableCell>
            </TableRow>
            <TableRow className="bg-muted">
              <TableCell className={labelCellClassName} colSpan={1}>
                Student Total:
              </TableCell>

              <TableCell className={plainTextCellClassName}>
                {data?.student_total}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
        {canAssignReviewers && data?.application_status === "Reviewed" ? (
          <div className="mb-4 flex flex-wrap items-center justify-end gap-2 mt-6">
            <Button
              type="button"
              onClick={handleAccept}
              disabled={!hasValidApplicationId || isSubmittingDecision}
              className="bg-emerald-600 text-white hover:bg-emerald-700"
            >
              Accept & Invoice
            </Button>
            <Button
              type="button"
              variant="destructive"
              onClick={() => setIsRejectDialogOpen(true)}
              disabled={!hasValidApplicationId || isSubmittingDecision}
            >
              Reject
            </Button>
          </div>
        ) : null}
        <Dialog
          open={isRejectDialogOpen}
          onOpenChange={(open) => {
            setIsRejectDialogOpen(open);
            if (!open) {
              setRejectionError("");
            }
          }}
        >
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Reject Application</DialogTitle>
              <DialogDescription>
                Provide a reason for rejecting this application before
                submitting.
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-2">
              <Label htmlFor="rejection-reason">Reason</Label>
              <Textarea
                id="rejection-reason"
                value={rejectionReason}
                onChange={(event) => {
                  setRejectionReason(event.target.value);
                  if (rejectionError) {
                    setRejectionError("");
                  }
                }}
                placeholder="Enter rejection reason..."
                rows={4}
              />
              {rejectionError ? (
                <p className="text-sm text-destructive">{rejectionError}</p>
              ) : null}
            </div>

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsRejectDialogOpen(false)}
                disabled={isSubmittingDecision}
              >
                Cancel
              </Button>
              <Button
                type="button"
                variant="destructive"
                onClick={handleReject}
                disabled={isSubmittingDecision}
              >
                {isSubmittingDecision ? "Submitting..." : "Submit Rejection"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
}

export default Content;
