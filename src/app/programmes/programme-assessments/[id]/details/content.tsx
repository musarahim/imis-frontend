"use client";
import { LinkAsBadge } from "@/components/ui/link-as-badge";
import { Separator } from "@/components/ui/separator";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { useRetrieveProgrammeAssessmentQuery } from "@/redux/features/programme-api-slice";
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

function Content({ id }: { id: string }) {
  const { data, isLoading, isError } = useRetrieveProgrammeAssessmentQuery(
    Number(id),
    { refetchOnMountOrArgChange: true },
  );

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error...</div>;
  console.log("Programme Assessment Data:", data);
  return (
    <div className="bg-white dark:bg-gray-950 rounded-lg border p-2 h-full">
      <h3 className="text-xl font-semibold">{data?.programme}</h3>
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
              Programme Assessor:
            </TableCell>

            <TableCell className={plainTextCellClassName}>
              {data?.assessor_name}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className={labelCellClassName} colSpan={1}>
              Assessment Date:
            </TableCell>

            <TableCell className={plainTextCellClassName}>
              {data?.assessment_date}
            </TableCell>
          </TableRow>
          <TableRow className="bg-muted">
            <TableCell className={labelCellClassName} colSpan={1}>
              Recommendation:
            </TableCell>

            <TableCell className={plainTextCellClassName}>
              <LinkAsBadge
                href={`/programmes/programme-assessments/${data?.id}/details`}
                text={data?.recommendation ?? ""}
                className={`${recommendationBadgeClass[data?.recommendation || ""]}`}
              />
              {/* {data?.recommendation} */}
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
            <TableCell className={labelCellClassName} colSpan={2}>
              ASSESSOR’S COMMENTS
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className={labelCellClassName} colSpan={1}>
              Development Process:
            </TableCell>

            <TableCell className="align-top text-gray-800 dark:text-gray-100">
              <div
                className={richTextCellClassName}
                dangerouslySetInnerHTML={{
                  __html: data?.programme_development_process || "",
                }}
              />
            </TableCell>
          </TableRow>
          <TableRow className="bg-muted">
            <TableCell className={labelCellClassName} colSpan={1}>
              Programme Rationale:
            </TableCell>

            <TableCell className="align-top text-gray-800 dark:text-gray-100">
              <div
                className={richTextCellClassName}
                dangerouslySetInnerHTML={{
                  __html: data?.rationale || "",
                }}
              />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className={labelCellClassName} colSpan={1}>
              Programme Objectives:
            </TableCell>

            <TableCell className="align-top text-gray-800 dark:text-gray-100">
              <div
                className={richTextCellClassName}
                dangerouslySetInnerHTML={{
                  __html: data?.programme_objectives || "",
                }}
              />
            </TableCell>
          </TableRow>
          <TableRow className="bg-muted">
            <TableCell className={labelCellClassName} colSpan={1}>
              Competences:
            </TableCell>

            <TableCell className="align-top text-gray-800 dark:text-gray-100">
              <div
                className={richTextCellClassName}
                dangerouslySetInnerHTML={{
                  __html: data?.competences || "",
                }}
              />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className={labelCellClassName} colSpan={1}>
              Learning Outcomes:
            </TableCell>

            <TableCell className="align-top text-gray-800 dark:text-gray-100">
              <div
                className={richTextCellClassName}
                dangerouslySetInnerHTML={{
                  __html: data?.learning_outcomes || "",
                }}
              />
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
                  __html: data?.entry_requirements || "",
                }}
              />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className={labelCellClassName} colSpan={1}>
              Duration:
            </TableCell>

            <TableCell className="align-top text-gray-800 dark:text-gray-100">
              <div
                className={richTextCellClassName}
                dangerouslySetInnerHTML={{
                  __html: data?.duration || "",
                }}
              />
            </TableCell>
          </TableRow>
          <TableRow className="bg-muted">
            <TableCell className={labelCellClassName} colSpan={1}>
              Grading System:
            </TableCell>

            <TableCell className="align-top text-gray-800 dark:text-gray-100">
              <div
                className={richTextCellClassName}
                dangerouslySetInnerHTML={{
                  __html: data?.grading_system || "",
                }}
              />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className={labelCellClassName} colSpan={1}>
              Curriculum Structure:
            </TableCell>

            <TableCell className="align-top text-gray-800 dark:text-gray-100">
              <div
                className={richTextCellClassName}
                dangerouslySetInnerHTML={{
                  __html: data?.curriculum_structure || "",
                }}
              />
            </TableCell>
          </TableRow>
          <TableRow className="bg-muted">
            <TableCell className={labelCellClassName} colSpan={1}>
              Staffing Levels:
            </TableCell>

            <TableCell className="align-top text-gray-800 dark:text-gray-100">
              <div
                className={richTextCellClassName}
                dangerouslySetInnerHTML={{
                  __html: data?.staffing_levels || "",
                }}
              />
            </TableCell>
          </TableRow>

          <TableRow>
            <TableCell className={labelCellClassName} colSpan={1}>
              Infrastructure:
            </TableCell>

            <TableCell className="align-top text-gray-800 dark:text-gray-100">
              <div
                className={richTextCellClassName}
                dangerouslySetInnerHTML={{
                  __html: data?.infrastructure || "",
                }}
              />
            </TableCell>
          </TableRow>
          <TableRow className="bg-muted">
            <TableCell className={labelCellClassName} colSpan={1}>
              CBE Alignment:
            </TableCell>

            <TableCell className="align-top text-gray-800 dark:text-gray-100">
              <div
                className={richTextCellClassName}
                dangerouslySetInnerHTML={{
                  __html: data?.cbe_allignment || "",
                }}
              />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className={labelCellClassName} colSpan={1}>
              Others:
            </TableCell>

            <TableCell className="align-top text-gray-800 dark:text-gray-100">
              <div
                className={richTextCellClassName}
                dangerouslySetInnerHTML={{
                  __html: data?.other_comments || "",
                }}
              />
            </TableCell>
          </TableRow>
          <TableRow className="bg-muted">
            <TableCell className={labelCellClassName} colSpan={2}>
              COURSE
            </TableCell>
          </TableRow>

          <TableRow>
            <TableCell className={labelCellClassName} colSpan={1}>
              Course Name:
            </TableCell>

            <TableCell className={plainTextCellClassName}>
              {data?.course_name}
            </TableCell>
          </TableRow>

          <TableRow className="bg-muted">
            <TableCell className={labelCellClassName} colSpan={1}>
              Course Code:
            </TableCell>

            <TableCell className={plainTextCellClassName}>
              {data?.course_code}
            </TableCell>
          </TableRow>

          <TableRow>
            <TableCell className={labelCellClassName} colSpan={1}>
              Course Level:
            </TableCell>

            <TableCell className={plainTextCellClassName}>
              {data?.course_level}
            </TableCell>
          </TableRow>
          <TableRow className="bg-muted">
            <TableCell className={labelCellClassName} colSpan={1}>
              Contact Hours:
            </TableCell>

            <TableCell className={plainTextCellClassName}>
              {data?.contact_hours}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className={labelCellClassName} colSpan={1}>
              Credit Units:
            </TableCell>

            <TableCell className={plainTextCellClassName}>
              {data?.credit_units}
            </TableCell>
          </TableRow>
          <TableRow className="bg-muted">
            <TableCell className={labelCellClassName} colSpan={1}>
              Brief Course Description:
            </TableCell>

            <TableCell className={plainTextCellClassName}>
              {data?.course_description}
            </TableCell>
          </TableRow>

          <TableRow>
            <TableCell className={labelCellClassName} colSpan={1}>
              Course Objectives:
            </TableCell>

            <TableCell className={plainTextCellClassName}>
              {data?.course_objectives}
            </TableCell>
          </TableRow>
          <TableRow className="bg-muted">
            <TableCell className={labelCellClassName} colSpan={1}>
              Course Learning Outcomes:
            </TableCell>

            <TableCell className={plainTextCellClassName}>
              {data?.course_learning_outcomes}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className={labelCellClassName} colSpan={1}>
              Detailed Course Contents:
            </TableCell>

            <TableCell className={plainTextCellClassName}>
              {data?.detailed_course_content}
            </TableCell>
          </TableRow>

          <TableRow className="bg-muted">
            <TableCell className={labelCellClassName} colSpan={1}>
              Instructional Materials:
            </TableCell>

            <TableCell className={plainTextCellClassName}>
              {data?.instructional_materials}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className={labelCellClassName} colSpan={1}>
              Modes of Delivery:
            </TableCell>

            <TableCell className={plainTextCellClassName}>
              {data?.delivery_modes}
            </TableCell>
          </TableRow>
          <TableRow className="bg-muted">
            <TableCell className={labelCellClassName} colSpan={1}>
              Modes of Assessment:
            </TableCell>

            <TableCell className={plainTextCellClassName}>
              {data?.assessment_modes}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className={labelCellClassName} colSpan={1}>
              Reading List:
            </TableCell>

            <TableCell className={plainTextCellClassName}>
              {data?.reading_list}
            </TableCell>
          </TableRow>
          <TableRow className="bg-muted">
            <TableCell className={labelCellClassName} colSpan={1}>
              Writing Style and Grammar:
            </TableCell>

            <TableCell className={plainTextCellClassName}>
              {data?.writing_styles_and_grammar}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className={labelCellClassName} colSpan={1}>
              Minimum Standards (NCHE):
            </TableCell>

            <TableCell className={plainTextCellClassName}>
              {data?.minimum_standards}
            </TableCell>
          </TableRow>
          <TableRow className="bg-muted">
            <TableCell className={labelCellClassName} colSpan={2}>
              COMMENTS
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className={labelCellClassName} colSpan={1}>
              Comments for the Institution:
            </TableCell>

            <TableCell className={plainTextCellClassName}>
              {data?.institution_comments}
            </TableCell>
          </TableRow>
          <TableRow className="bg-muted">
            <TableCell className={labelCellClassName} colSpan={1}>
              Comments for NCHE:
            </TableCell>

            <TableCell className={plainTextCellClassName}>
              {data?.nche_comments}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className={labelCellClassName} colSpan={1}>
              Conclusion:
            </TableCell>

            <TableCell className={plainTextCellClassName}>
              {data?.conclusions}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
}

export default Content;
