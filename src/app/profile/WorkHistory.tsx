import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { useEmployeeData } from "@/hooks";
import React from "react";

function WorkHistory() {
     const { employee, isLoading } = useEmployeeData();
          if (isLoading) {
            return <div>Loading...</div>;
          }
  return (
      <div className="w-full overflow-hidden">
          <Table className="w-full rounded-2xl">
            <TableBody>
              {employee?.work_histories?.map((work: WorkHistory, index: number) => (
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
                      Employer
                    </TableCell>
                    <TableCell className="text-left sm:text-right text-gray-800 dark:text-gray-100 py-3 break-words">
                      {work?.employer}
                    </TableCell>
                  </TableRow>
    
                  <TableRow className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-900/50 dark:even:bg-gray-950">
                    <TableCell className="font-medium w-1/3 min-w-[120px] sm:w-[140px] text-left align-top py-3">
                      Position
                    </TableCell>
                    <TableCell className="text-left sm:text-right text-gray-800 dark:text-gray-100 py-3 break-words">
                      {work?.position}
                    </TableCell>
                  </TableRow>
    
                  <TableRow className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-900/50 dark:even:bg-gray-950">
                    <TableCell className="font-medium w-1/3 min-w-[120px] sm:w-[140px] text-left align-top py-3">
                        Period
                    </TableCell>
                    <TableCell className="text-left sm:text-right text-gray-800 dark:text-gray-100 py-3 break-words">
                      {work?.from_date} - {work?.to_date}
                    </TableCell>
                  </TableRow>
    
                  <TableRow className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-900/50 dark:even:bg-gray-950">
                    <TableCell className="font-medium w-1/3 min-w-[120px] sm:w-[140px] text-left align-top py-3">
                        Responsibilities 
                      
                    </TableCell>
                    <TableCell className="text-left sm:text-right text-gray-800 dark:text-gray-100 py-3 break-words">
                      {work?.responsibilities}
                    </TableCell>
                  </TableRow>
                 
                </React.Fragment>
              ))}
            </TableBody>
          </Table>
        </div>
  )
}

export default WorkHistory