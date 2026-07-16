import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import React from "react";
function Referees({ employee }: { employee: Employee }) {
  return (
    <div className="w-full overflow-hidden">
      <Table className="w-full rounded-2xl">
        <TableBody>
          {employee?.referees?.length > 0 ? (
            employee.referees.map((referee: Referee, index: number) => (
              <React.Fragment key={index}>
                <TableRow className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-900/50 dark:even:bg-gray-950">
                  <TableCell className="font-bold w-1/3 min-w-30 sm:w-35 text-left align-top py-3">
                    No. {index + 1}
                  </TableCell>
                  <TableCell className="text-left sm:text-right text-gray-800 dark:text-gray-100 py-3 wrap-break-words">
                    {""}
                  </TableCell>
                </TableRow>
                <TableRow className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-900/50 dark:even:bg-gray-950">
                  <TableCell className="font-medium w-1/3 min-w-30 sm:w-35 text-left align-top py-3">
                    Name
                  </TableCell>
                  <TableCell className="text-left sm:text-right text-gray-800 dark:text-gray-100 py-3 wrap-break-words">
                    {referee?.name}
                  </TableCell>
                </TableRow>

                <TableRow className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-900/50 dark:even:bg-gray-950">
                  <TableCell className="font-medium w-1/3 min-w-30 sm:w-35 text-left align-top py-3">
                    Place of work
                  </TableCell>
                  <TableCell className="text-left sm:text-right text-gray-800 dark:text-gray-100 py-3 wrap-break-words">
                    {referee?.place_of_work}
                  </TableCell>
                </TableRow>

                <TableRow className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-900/50 dark:even:bg-gray-950">
                  <TableCell className="font-medium w-1/3 min-w-30 sm:w-35 text-left align-top py-3">
                    Position Held
                  </TableCell>
                  <TableCell className="text-left sm:text-right text-gray-800 dark:text-gray-100 py-3 wrap-break-words">
                    {referee?.position}
                  </TableCell>
                </TableRow>

                <TableRow className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-900/50 dark:even:bg-gray-950">
                  <TableCell className="font-medium w-1/3 min-w-30 sm:w-35 text-left align-top py-3">
                    Telephone
                  </TableCell>
                  <TableCell className="text-left sm:text-right text-gray-800 dark:text-gray-100 py-3 wrap-break-words">
                    {referee?.telephone}
                  </TableCell>
                </TableRow>
                <TableRow className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-900/50 dark:even:bg-gray-950">
                  <TableCell className="font-medium w-1/3 min-w-30 sm:w-35 text-left align-top py-3">
                    Email
                  </TableCell>
                  <TableCell className="text-left sm:text-right text-gray-800 dark:text-gray-100 py-3 wrap-break-words">
                    {referee?.email}
                  </TableCell>
                </TableRow>
              </React.Fragment>
            ))
          ) : (
            <TableRow className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-900/50 dark:even:bg-gray-950">
              <TableCell className="font-bold w-1/3 min-w-30 sm:w-35 text-left align-top py-3">
                No referees available
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

export default Referees;
