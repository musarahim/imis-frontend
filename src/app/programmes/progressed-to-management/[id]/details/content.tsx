"use client";

import { LinkAsBadge } from "@/components/ui/link-as-badge";
import { Separator } from "@/components/ui/separator";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { useRetrieveManagementApplicationQuery } from "@/redux/features/programme-api-slice";
import { FileDisplay } from "@/utils/fileUtils";
import Decision from "./Decision";

const labelCellClassName =
  "w-64 align-top whitespace-nowrap pr-4 font-semibold text-md";

const richTextCellClassName =
  "max-w-full overflow-hidden break-words whitespace-normal align-top [&_*]:max-w-full [&_*]:break-words [&_img]:h-auto [&_img]:max-w-full [&_table]:w-full [&_table]:table-fixed";

const plainTextCellClassName =
  "max-w-0 align-top break-words whitespace-pre-wrap";

const recommendationBadgeClass: Record<string, string> = {
  "Accredit as is":
    "bg-emerald-500 text-white hover:bg-emerald-600 dark:bg-emerald-600",
  "Accredit with Minor Corrections":
    "bg-amber-500 text-white hover:bg-amber-600 dark:bg-amber-600",
  "Accredit After Major Corrections":
    "bg-orange-500 text-white hover:bg-orange-600 dark:bg-orange-600",
  "Don't Accredit": "bg-rose-600 text-white hover:bg-rose-700 dark:bg-rose-700",
};

const expertProgressionBadgeClass: Record<string, string> = {
  yes: "bg-emerald-500 text-white hover:bg-emerald-600 dark:bg-emerald-600",
  no: "bg-rose-600 text-white hover:bg-rose-700 dark:bg-rose-700",
};

function Content({ id }: { id: string }) {
  const { data, isLoading, isError } = useRetrieveManagementApplicationQuery(
    Number(id),
    { refetchOnMountOrArgChange: true },
  );

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error...</div>;

  return (
    <div className="bg-white dark:bg-gray-950 rounded-lg border p-2 h-full">
      <h3 className="text-xl font-semibold">{data?.program_name}</h3>
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
              {data?.program_name}
            </TableCell>
          </TableRow>
          <TableRow className="bg-muted">
            <TableCell className={labelCellClassName} colSpan={1}>
              Application Type:
            </TableCell>

            <TableCell className={plainTextCellClassName}>
              {data?.application_type}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className={labelCellClassName} colSpan={1}>
              Level:
            </TableCell>

            <TableCell className={plainTextCellClassName}>
              {data?.program_level}
            </TableCell>
          </TableRow>
          <TableRow className="bg-muted">
            <TableCell className={labelCellClassName} colSpan={1}>
              Number of years
            </TableCell>
            <TableCell className={plainTextCellClassName}>
              {data?.number_of_years}
            </TableCell>
          </TableRow>
          <TableRow className="bg-muted">
            <TableCell className={labelCellClassName} colSpan={1}>
              Duration:
            </TableCell>

            <TableCell className={plainTextCellClassName}>
              {data?.duration} {data?.duration_type}
            </TableCell>
          </TableRow>

          <TableRow>
            <TableCell className={labelCellClassName} colSpan={1}>
              Campus:
            </TableCell>

            <TableCell className={plainTextCellClassName}>
              {data?.campus}
            </TableCell>
          </TableRow>
          <TableRow className="bg-muted">
            <TableCell className={labelCellClassName} colSpan={1}>
              Submission Date:
            </TableCell>

            <TableCell className={plainTextCellClassName}>
              {data?.date_submitted}
            </TableCell>
          </TableRow>

          <TableRow>
            <TableCell className={labelCellClassName} colSpan={1}>
              Programme Structure:
            </TableCell>

            <TableCell className={plainTextCellClassName}>
              <FileDisplay file={data?.program_structure} />
            </TableCell>
          </TableRow>
          <TableRow className="bg-muted">
            <TableCell className={labelCellClassName} colSpan={1}>
              Letter of Submission:
            </TableCell>

            <TableCell className={plainTextCellClassName}>
              <FileDisplay file={data?.letter_of_submission} />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className={`${labelCellClassName} text-xl`} colSpan={2}>
              PRELIMINARY REVIEW
            </TableCell>
          </TableRow>
          {/* preliminary review details */}
          <TableRow className="bg-muted">
            <TableCell className={labelCellClassName} colSpan={1}>
              Reviewer:
            </TableCell>

            <TableCell className={plainTextCellClassName}>
              {data?.preliminary_review?.reviewer_name}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className={labelCellClassName} colSpan={1}>
              Review Date:
            </TableCell>

            <TableCell className={plainTextCellClassName}>
              {data?.preliminary_review?.review_date}
            </TableCell>
          </TableRow>
          <TableRow className="bg-muted">
            <TableCell className={labelCellClassName} colSpan={1}>
              Progression for Expert Review:
            </TableCell>

            <TableCell className={plainTextCellClassName}>
              {data?.preliminary_review?.expert_progression && (
                <LinkAsBadge
                  href={`/programmes/directorate-applications/${data?.id}/details`}
                  text={
                    data.preliminary_review.expert_progression === "Yes"
                      ? "Yes"
                      : "No"
                  }
                  className={
                    expertProgressionBadgeClass[
                      data.preliminary_review.expert_progression.toLowerCase()
                    ] ?? ""
                  }
                />
              )}
            </TableCell>
          </TableRow>

          <TableRow>
            <TableCell className={labelCellClassName} colSpan={1}>
              Type of Entry:
            </TableCell>

            <TableCell className="align-top text-gray-800 dark:text-gray-100">
              <div
                className={richTextCellClassName}
                dangerouslySetInnerHTML={{
                  __html: data?.preliminary_review?.type_of_entry_summary || "",
                }}
              />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className={labelCellClassName} colSpan={1}>
              Entry Remarks:
            </TableCell>

            <TableCell className={plainTextCellClassName}>
              {data?.preliminary_review?.type_of_entry_comments}
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
                  __html:
                    data?.preliminary_review?.entry_requirements_summary || "",
                }}
              />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className={labelCellClassName} colSpan={1}>
              Entry Requirements Remarks:
            </TableCell>

            <TableCell className={plainTextCellClassName}>
              {data?.preliminary_review?.entry_requirements_comments}
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
                  __html:
                    data?.preliminary_review?.human_resource_summary || "",
                }}
              />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className={labelCellClassName} colSpan={1}>
              Human Resources Remarks:
            </TableCell>

            <TableCell className={plainTextCellClassName}>
              {data?.preliminary_review?.human_resource_comments}
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
                  __html: data?.preliminary_review?.facilities_summary || "",
                }}
              />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className={labelCellClassName} colSpan={1}>
              Facilities Remarks:
            </TableCell>

            <TableCell className={plainTextCellClassName}>
              {data?.preliminary_review?.facilities_comments}
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
                  __html:
                    data?.preliminary_review?.programme_duration_summary || "",
                }}
              />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className={labelCellClassName} colSpan={1}>
              Duration Remarks:
            </TableCell>

            <TableCell className={plainTextCellClassName}>
              {data?.preliminary_review?.programme_duration_comments}
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
                  __html:
                    data?.preliminary_review?.minimum_graduation_load_summary ||
                    "",
                }}
              />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className={labelCellClassName} colSpan={1}>
              Remarks:
            </TableCell>

            <TableCell className={plainTextCellClassName}>
              {data?.preliminary_review?.minimum_graduation_load_comments}
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
              {data?.preliminary_review?.day_students}
            </TableCell>
          </TableRow>

          <TableRow className="bg-muted">
            <TableCell className={labelCellClassName} colSpan={1}>
              Evening Students:
            </TableCell>

            <TableCell className={plainTextCellClassName}>
              {data?.preliminary_review?.evening_students}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className={labelCellClassName} colSpan={1}>
              Weekend Students:
            </TableCell>

            <TableCell className={plainTextCellClassName}>
              {data?.preliminary_review?.weekend_students}
            </TableCell>
          </TableRow>
          <TableRow className="bg-muted">
            <TableCell className={labelCellClassName} colSpan={1}>
              Student Total:
            </TableCell>

            <TableCell className={plainTextCellClassName}>
              {data?.preliminary_review?.student_total}
            </TableCell>
          </TableRow>

          {/* end of preliminary review details */}
          <TableRow>
            <TableCell className={`${labelCellClassName} text-xl`} colSpan={2}>
              PROGRAMME ASSESSMENT
            </TableCell>
          </TableRow>

          <TableRow className="bg-muted">
            <TableCell className={labelCellClassName} colSpan={1}>
              Programme Assessor:
            </TableCell>

            <TableCell className={plainTextCellClassName}>
              {data?.assessment?.assessor_name}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className={labelCellClassName} colSpan={1}>
              Assessment Date:
            </TableCell>

            <TableCell className={plainTextCellClassName}>
              {data?.assessment?.assessment_date}
            </TableCell>
          </TableRow>
          <TableRow className="bg-muted">
            <TableCell className={labelCellClassName} colSpan={1}>
              Recommendation:
            </TableCell>

            <TableCell className={plainTextCellClassName}>
              <LinkAsBadge
                href={`/programmes/programme-assessments/${data?.id}/details`}
                text={data?.assessment?.recommendation ?? ""}
                className={`${recommendationBadgeClass[data?.assessment?.recommendation || ""]}`}
              />
              {/* {data?.recommendation} */}
            </TableCell>
          </TableRow>

          <TableRow>
            <TableCell className={labelCellClassName} colSpan={2}>
              ASSESSOR&apos;S COMMENTS
            </TableCell>
          </TableRow>
          <TableRow className="bg-muted">
            <TableCell className={labelCellClassName} colSpan={1}>
              Development Process:
            </TableCell>

            <TableCell className="align-top text-gray-800 dark:text-gray-100">
              <div
                className={richTextCellClassName}
                dangerouslySetInnerHTML={{
                  __html: data?.assessment?.programme_development_process || "",
                }}
              />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className={labelCellClassName} colSpan={1}>
              Programme Rationale:
            </TableCell>

            <TableCell className="align-top text-gray-800 dark:text-gray-100">
              <div
                className={richTextCellClassName}
                dangerouslySetInnerHTML={{
                  __html: data?.assessment?.rationale || "",
                }}
              />
            </TableCell>
          </TableRow>
          <TableRow className="bg-muted">
            <TableCell className={labelCellClassName} colSpan={1}>
              Programme Objectives:
            </TableCell>

            <TableCell className="align-top text-gray-800 dark:text-gray-100">
              <div
                className={richTextCellClassName}
                dangerouslySetInnerHTML={{
                  __html: data?.assessment?.programme_objectives || "",
                }}
              />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className={labelCellClassName} colSpan={1}>
              Competences:
            </TableCell>

            <TableCell className="align-top text-gray-800 dark:text-gray-100">
              <div
                className={richTextCellClassName}
                dangerouslySetInnerHTML={{
                  __html: data?.assessment?.competences || "",
                }}
              />
            </TableCell>
          </TableRow>
          <TableRow className="bg-muted">
            <TableCell className={labelCellClassName} colSpan={1}>
              Learning Outcomes:
            </TableCell>

            <TableCell className="align-top text-gray-800 dark:text-gray-100">
              <div
                className={richTextCellClassName}
                dangerouslySetInnerHTML={{
                  __html: data?.assessment?.learning_outcomes || "",
                }}
              />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className={labelCellClassName} colSpan={1}>
              Entry Requirements:
            </TableCell>

            <TableCell className="align-top text-gray-800 dark:text-gray-100">
              <div
                className={richTextCellClassName}
                dangerouslySetInnerHTML={{
                  __html: data?.assessment?.entry_requirements || "",
                }}
              />
            </TableCell>
          </TableRow>
          <TableRow className="bg-muted">
            <TableCell className={labelCellClassName} colSpan={1}>
              Duration:
            </TableCell>

            <TableCell className="align-top text-gray-800 dark:text-gray-100">
              <div
                className={richTextCellClassName}
                dangerouslySetInnerHTML={{
                  __html: data?.assessment?.duration || "",
                }}
              />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className={labelCellClassName} colSpan={1}>
              Grading System:
            </TableCell>

            <TableCell className="align-top text-gray-800 dark:text-gray-100">
              <div
                className={richTextCellClassName}
                dangerouslySetInnerHTML={{
                  __html: data?.assessment?.grading_system || "",
                }}
              />
            </TableCell>
          </TableRow>
          <TableRow className="bg-muted">
            <TableCell className={labelCellClassName} colSpan={1}>
              Curriculum Structure:
            </TableCell>

            <TableCell className="align-top text-gray-800 dark:text-gray-100">
              <div
                className={richTextCellClassName}
                dangerouslySetInnerHTML={{
                  __html: data?.assessment?.curriculum_structure || "",
                }}
              />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className={labelCellClassName} colSpan={1}>
              Staffing Levels:
            </TableCell>

            <TableCell className="align-top text-gray-800 dark:text-gray-100">
              <div
                className={richTextCellClassName}
                dangerouslySetInnerHTML={{
                  __html: data?.assessment?.staffing_levels || "",
                }}
              />
            </TableCell>
          </TableRow>

          <TableRow className="bg-muted">
            <TableCell className={labelCellClassName} colSpan={1}>
              Infrastructure:
            </TableCell>

            <TableCell className="align-top text-gray-800 dark:text-gray-100">
              <div
                className={richTextCellClassName}
                dangerouslySetInnerHTML={{
                  __html: data?.assessment?.infrastructure || "",
                }}
              />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className={labelCellClassName} colSpan={1}>
              CBE Alignment:
            </TableCell>

            <TableCell className="align-top text-gray-800 dark:text-gray-100">
              <div
                className={richTextCellClassName}
                dangerouslySetInnerHTML={{
                  __html: data?.assessment?.cbe_allignment || "",
                }}
              />
            </TableCell>
          </TableRow>
          <TableRow className="bg-muted">
            <TableCell className={labelCellClassName} colSpan={1}>
              Others:
            </TableCell>

            <TableCell className="align-top text-gray-800 dark:text-gray-100">
              <div
                className={richTextCellClassName}
                dangerouslySetInnerHTML={{
                  __html: data?.assessment?.other_comments || "",
                }}
              />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className={labelCellClassName} colSpan={2}>
              COURSE
            </TableCell>
          </TableRow>

          <TableRow className="bg-muted">
            <TableCell className={labelCellClassName} colSpan={1}>
              Course Name:
            </TableCell>

            <TableCell className={plainTextCellClassName}>
              {data?.assessment?.course_name}
            </TableCell>
          </TableRow>

          <TableRow>
            <TableCell className={labelCellClassName} colSpan={1}>
              Course Code:
            </TableCell>

            <TableCell className={plainTextCellClassName}>
              {data?.assessment?.course_code}
            </TableCell>
          </TableRow>

          <TableRow className="bg-muted">
            <TableCell className={labelCellClassName} colSpan={1}>
              Course Level:
            </TableCell>

            <TableCell className={plainTextCellClassName}>
              {data?.assessment?.course_level}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className={labelCellClassName} colSpan={1}>
              Contact Hours:
            </TableCell>

            <TableCell className={plainTextCellClassName}>
              {data?.assessment?.contact_hours}
            </TableCell>
          </TableRow>
          <TableRow className="bg-muted">
            <TableCell className={labelCellClassName} colSpan={1}>
              Credit Units:
            </TableCell>

            <TableCell className={plainTextCellClassName}>
              {data?.assessment?.credit_units}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className={labelCellClassName} colSpan={1}>
              Brief Course Description:
            </TableCell>

            <TableCell className={plainTextCellClassName}>
              {data?.assessment?.course_description}
            </TableCell>
          </TableRow>

          <TableRow className="bg-muted">
            <TableCell className={labelCellClassName} colSpan={1}>
              Course Objectives:
            </TableCell>

            <TableCell className={plainTextCellClassName}>
              {data?.assessment?.course_objectives}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className={labelCellClassName} colSpan={1}>
              Course Learning Outcomes:
            </TableCell>

            <TableCell className={plainTextCellClassName}>
              {data?.assessment?.course_learning_outcomes}
            </TableCell>
          </TableRow>
          <TableRow className="bg-muted">
            <TableCell className={labelCellClassName} colSpan={1}>
              Detailed Course Contents:
            </TableCell>

            <TableCell className={plainTextCellClassName}>
              {data?.assessment?.detailed_course_content}
            </TableCell>
          </TableRow>

          <TableRow>
            <TableCell className={labelCellClassName} colSpan={1}>
              Instructional Materials:
            </TableCell>

            <TableCell className={plainTextCellClassName}>
              {data?.assessment?.instructional_materials}
            </TableCell>
          </TableRow>
          <TableRow className="bg-muted">
            <TableCell className={labelCellClassName} colSpan={1}>
              Modes of Delivery:
            </TableCell>

            <TableCell className={plainTextCellClassName}>
              {data?.assessment?.delivery_modes}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className={labelCellClassName} colSpan={1}>
              Modes of Assessment:
            </TableCell>

            <TableCell className={plainTextCellClassName}>
              {data?.assessment?.assessment_modes}
            </TableCell>
          </TableRow>
          <TableRow className="bg-muted">
            <TableCell className={labelCellClassName} colSpan={1}>
              Reading List:
            </TableCell>

            <TableCell className={plainTextCellClassName}>
              {data?.assessment?.reading_list}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className={labelCellClassName} colSpan={1}>
              Writing Style and Grammar:
            </TableCell>

            <TableCell className={plainTextCellClassName}>
              {data?.assessment?.writing_styles_and_grammar}
            </TableCell>
          </TableRow>
          <TableRow className="bg-muted">
            <TableCell className={labelCellClassName} colSpan={1}>
              Minimum Standards (NCHE):
            </TableCell>

            <TableCell className={plainTextCellClassName}>
              {data?.assessment?.minimum_standards}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className={labelCellClassName} colSpan={2}>
              COMMENTS
            </TableCell>
          </TableRow>
          <TableRow className="bg-muted">
            <TableCell className={labelCellClassName} colSpan={1}>
              Comments for the Institution:
            </TableCell>

            <TableCell className={plainTextCellClassName}>
              {data?.assessment?.institution_comments}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className={labelCellClassName} colSpan={1}>
              Comments for NCHE:
            </TableCell>

            <TableCell className={plainTextCellClassName}>
              {data?.assessment?.nche_comments}
            </TableCell>
          </TableRow>
          <TableRow className="bg-muted">
            <TableCell className={labelCellClassName} colSpan={1}>
              Conclusion:
            </TableCell>

            <TableCell className={plainTextCellClassName}>
              {data?.assessment?.conclusions}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className={`${labelCellClassName} text-xl`} colSpan={2}>
              HEAD OF DEPARTMENT RECOMMENDATION
            </TableCell>
          </TableRow>
          <TableRow className="bg-muted">
            <TableCell className={labelCellClassName} colSpan={1}>
              Recommendation:
            </TableCell>

            <TableCell className={plainTextCellClassName}>
              {data?.pod_comment}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <Separator className="my-2" />
      <h2 className="text-xl font-semibold mt-2 ms-3 text-gray-900 dark:text-white">
        DIRECTOR&apos;S DECISION
      </h2>
      {data?.director_comment ? (
        <div className="bg-yellow-50 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-300 rounded-md p-4 my-4 mx-3">
          <h3 className="font-semibold mb-2">
            Director&apos;s Recommendation: {data?.status}
          </h3>
          <h3 className="font-semibold mb-2">Comment from Director:</h3>
          <p>{data?.director_comment}</p>
        </div>
      ) : (
        <Decision applicationID={Number(id)} />
      )}

      <Separator className="my-4" />
    </div>
  );
}

export default Content;
