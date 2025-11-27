import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { useEmployeeData } from "@/hooks";
import React from "react";

function Dependants() {
  const { employee, isLoading } = useEmployeeData();
  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <div className="w-full overflow-hidden">
      <Table className="w-full rounded-2xl">
        <TableBody>
          {employee?.dependents?.map((dependant: Dependent, index: number) => (
            <React.Fragment key={index}>
              <TableRow className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-900/50 dark:even:bg-gray-950">
                <TableCell className="font-bold w-1/3 min-w-[120px] sm:w-[140px] text-left align-top py-3">
                  No. {index + 1}
                </TableCell>
                <TableCell className="text-left sm:text-right text-gray-800 dark:text-gray-100 py-3 break-words">
                  {""}
                </TableCell>
              </TableRow>
              <TableRow className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-900/50 dark:even:bg-gray-950">
                <TableCell className="font-medium w-1/3 min-w-[120px] sm:w-[140px] text-left align-top py-3">
                  Name
                </TableCell>
                <TableCell className="text-left sm:text-right text-gray-800 dark:text-gray-100 py-3 break-words">
                  {dependant?.name}
                </TableCell>
              </TableRow>

              <TableRow className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-900/50 dark:even:bg-gray-950">
                <TableCell className="font-medium w-1/3 min-w-[120px] sm:w-[140px] text-left align-top py-3">
                  Relationship
                </TableCell>
                <TableCell className="text-left sm:text-right text-gray-800 dark:text-gray-100 py-3 break-words">
                  {dependant?.relationship}
                </TableCell>
              </TableRow>

              <TableRow className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-900/50 dark:even:bg-gray-950">
                <TableCell className="font-medium w-1/3 min-w-[120px] sm:w-[140px] text-left align-top py-3">
                  Date of Birth
                </TableCell>
                <TableCell className="text-left sm:text-right text-gray-800 dark:text-gray-100 py-3 break-words">
                  {dependant?.date_of_birth}
                </TableCell>
              </TableRow>

              <TableRow className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-900/50 dark:even:bg-gray-950">
                <TableCell className="font-medium w-1/3 min-w-[120px] sm:w-[140px] text-left align-top py-3">
                  Gender
                </TableCell>
                <TableCell className="text-left sm:text-right text-gray-800 dark:text-gray-100 py-3 break-words">
                  {dependant?.gender}
                </TableCell>
              </TableRow>
            </React.Fragment>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default Dependants;
