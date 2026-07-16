import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { FileDisplay } from "@/utils/fileUtils";
import React from "react";

function Education({ employee }: { employee: Employee }) {
  return (
    <div className="w-full overflow-hidden">
      <Table className="w-full rounded-2xl">
        <TableBody>
          {employee?.education_histories?.length > 0 ? (
            employee?.education_histories?.map(
              (education: EducationHistory, index: number) => (
                <React.Fragment key={index}>
                  <TableRow className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-900/50 dark:even:bg-gray-950">
                    <TableCell className="font-bold w-1/3 min-w-30 sm:w-35 text-left align-top py-3">
                      No. {index + 1}
                    </TableCell>
                    <TableCell className="text-left sm:text-right text-gray-800 dark:text-gray-100 py-3 wrap-wrap-break-words">
                      {""}
                    </TableCell>
                  </TableRow>
                  <TableRow className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-900/50 dark:even:bg-gray-950">
                    <TableCell className="font-medium w-1/3 min-w-30 sm:w-35 text-left align-top py-3">
                      Institution
                    </TableCell>
                    <TableCell className="text-left sm:text-right text-gray-800 dark:text-gray-100 py-3 wrap-wrap-break-words">
                      {education?.institution}
                    </TableCell>
                  </TableRow>

                  <TableRow className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-900/50 dark:even:bg-gray-950">
                    <TableCell className="font-medium w-1/3 min-w-30 sm:w-35 text-left align-top py-3">
                      Qualification
                    </TableCell>
                    <TableCell className="text-left sm:text-right text-gray-800 dark:text-gray-100 py-3 wrap-break-words">
                      {education?.qualification}
                    </TableCell>
                  </TableRow>

                  <TableRow className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-900/50 dark:even:bg-gray-950">
                    <TableCell className="font-medium w-1/3 min-w-30 sm:w-35 text-left align-top py-3">
                      Period
                    </TableCell>
                    <TableCell className="text-left sm:text-right text-gray-800 dark:text-gray-100 py-3 wrap-break-words">
                      {education?.from_year} - {education.to_year}
                    </TableCell>
                  </TableRow>

                  <TableRow className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-900/50 dark:even:bg-gray-950">
                    <TableCell className="font-medium w-1/3 min-w-30 sm:w-35 text-left align-top py-3">
                      Award Date
                    </TableCell>
                    <TableCell className="text-left sm:text-right text-gray-800 dark:text-gray-100 py-3 wrap-break-words">
                      {education?.award_date}
                    </TableCell>
                  </TableRow>
                  <TableRow className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-900/50 dark:even:bg-gray-950">
                    <TableCell className="font-medium w-1/3 min-w-30 sm:w-35 text-left align-top py-3">
                      Document
                    </TableCell>
                    <TableCell className="text-left sm:text-right text-gray-800 dark:text-gray-100 py-3 wrap-break-words">
                      <FileDisplay file={education?.certificate_document} />
                    </TableCell>
                  </TableRow>
                </React.Fragment>
              ),
            )
          ) : (
            <TableRow className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-900/50 dark:even:bg-gray-950">
              <TableCell className="font-bold w-1/3 min-w-30 sm:w-35 text-left align-top py-3">
                No education history available
              </TableCell>
              <TableCell className="text-left sm:text-right text-gray-800 dark:text-gray-100 py-3 wrap-break-words">
                {""}
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}

export default Education;
