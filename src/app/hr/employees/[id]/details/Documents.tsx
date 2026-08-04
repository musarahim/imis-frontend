import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { FileDisplay } from "@/utils/fileUtils";
import React from "react";

function Documents({ employee }: { employee: Employee }) {
  return (
    <div className="w-full overflow-hidden">
      <Table className="w-full rounded-2xl">
        <TableBody>
          {employee?.documents?.length > 0 ? (
            employee?.documents?.map((document: Document, index: number) => (
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
                    Document Name
                  </TableCell>
                  <TableCell className="text-left sm:text-right text-gray-800 dark:text-gray-100 py-3 wrap-wrap-break-words">
                    {document?.name}
                  </TableCell>
                </TableRow>

                <TableRow className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-900/50 dark:even:bg-gray-950">
                  <TableCell className="font-medium w-1/3 min-w-30 sm:w-35 text-left align-top py-3">
                    Attached Document
                  </TableCell>
                  <TableCell className="text-left sm:text-right text-gray-800 dark:text-gray-100 py-3 wrap-break-words">
                    {document?.document && (
                      <FileDisplay file={document.document} />
                    )}
                  </TableCell>
                </TableRow>
              </React.Fragment>
            ))
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

export default Documents;
