"use client";
import { Separator } from "@/components/ui/separator";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import {
    useRetrievePreliminaryReviewQuery
} from "@/redux/features/programme-api-slice";

const labelCellClassName =
  "w-64 align-top whitespace-nowrap pr-4 font-semibold text-md";

const richTextCellClassName =
  "max-w-full overflow-hidden break-words whitespace-normal align-top [&_*]:max-w-full [&_*]:break-words [&_img]:h-auto [&_img]:max-w-full [&_table]:w-full [&_table]:table-fixed";

const plainTextCellClassName =
  "max-w-0 align-top break-words whitespace-pre-wrap";

function Content({ id }: { id: string }) {
  const { data, isLoading, isError } = useRetrievePreliminaryReviewQuery(
    Number(id),
    { refetchOnMountOrArgChange: true },
  );

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error...</div>;

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
    </div>
  );
}

export default Content;
