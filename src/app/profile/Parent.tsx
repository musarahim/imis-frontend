import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { useEmployeeData } from "@/hooks";

function Parent() {
     const { employee, isLoading } = useEmployeeData();
                
                  if (isLoading) {
                    return <div>Loading...</div>;
                  }
  return (
    <div className="w-full overflow-hidden">
            <Table className="w-full rounded-2xl">
                <TableBody>
                  <TableRow className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-900/50 dark:even:bg-gray-950">
                    <TableCell className="font-bold w-1/3 min-w-[120px] sm:w-[140px] text-left align-top py-3">
                      Father
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
                      {employee?.father_name}
                    </TableCell>
                  </TableRow>
                  <TableRow className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-900/50 dark:even:bg-gray-950">
                    <TableCell className="font-medium w-1/3 min-w-[120px] sm:w-[140px] text-left align-top py-3">
                        Status
                    </TableCell>
                    <TableCell className="text-left sm:text-right text-gray-800 dark:text-gray-100 py-3 break-words">
                      {employee?.father_status}
                    </TableCell>
                  </TableRow>
                  
                
                  <TableRow className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-900/50 dark:even:bg-gray-950">
                    <TableCell className="font-medium w-1/3 min-w-[120px] sm:w-[140px] text-left align-top py-3">
                      Contact
                    </TableCell>
                    <TableCell className="text-left sm:text-right text-gray-800 dark:text-gray-100 py-3 break-words">
                      {employee?.father_contact}
                    </TableCell>
                  </TableRow>
                  <TableRow className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-900/50 dark:even:bg-gray-950">
                    <TableCell className="font-bold w-1/3 min-w-[120px] sm:w-[140px] text-left align-top py-3">
                      Mother
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
                      {employee?.mother_name}
                    </TableCell>
                  </TableRow>
                   <TableRow className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-900/50 dark:even:bg-gray-950">
                    <TableCell className="font-medium w-1/3 min-w-[120px] sm:w-[140px] text-left align-top py-3">
                      Status
                    </TableCell>
                    <TableCell className="text-left sm:text-right text-gray-800 dark:text-gray-100 py-3 break-words">
                      {employee?.mother_status}
                    </TableCell>
                  </TableRow>
                    <TableRow className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-900/50 dark:even:bg-gray-950">
                    <TableCell className="font-medium w-1/3 min-w-[120px] sm:w-[140px] text-left align-top py-3">
                      Contact
                    </TableCell>
                    <TableCell className="text-left sm:text-right text-gray-800 dark:text-gray-100 py-3 break-words">
                      {employee?.mother_contact}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
        </div>
  )
}

export default Parent