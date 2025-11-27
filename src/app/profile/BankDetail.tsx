import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { useEmployeeData } from "@/hooks";

function BankDetail() {
     const { employee, isLoading } = useEmployeeData();
                if (isLoading) {
                  return <div>Loading...</div>;
                }
  return (
      <div className="w-full overflow-hidden">
                    <Table className="w-full rounded-2xl">
                        <TableBody>
                         
                         
                          <TableRow className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-900/50 dark:even:bg-gray-950">
                            <TableCell className="font-medium w-1/3 min-w-[120px] sm:w-[140px] text-left align-top py-3">
                                Bank Name
                            </TableCell>
                            <TableCell className="text-left sm:text-right text-gray-800 dark:text-gray-100 py-3 break-words">
                              {employee?.bank_name}
                            </TableCell>
                          </TableRow>
                          
                        
                          <TableRow className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-900/50 dark:even:bg-gray-950">
                            <TableCell className="font-medium w-1/3 min-w-[120px] sm:w-[140px] text-left align-top py-3">
                              Branch
                            </TableCell>
                            <TableCell className="text-left sm:text-right text-gray-800 dark:text-gray-100 py-3 break-words">
                              {employee?.branch}
                            </TableCell>
                          </TableRow>
                          <TableRow className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-900/50 dark:even:bg-gray-950">
                            <TableCell className="font-medium w-1/3 min-w-[120px] sm:w-[140px] text-left align-top py-3">
                              Account name
                            </TableCell>
                            <TableCell className="text-left sm:text-right text-gray-800 dark:text-gray-100 py-3 break-words">
                              {employee?.account_name}
                            </TableCell>
                          </TableRow> 
                          <TableRow className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-900/50 dark:even:bg-gray-950">
                            <TableCell className="font-medium w-1/3 min-w-[120px] sm:w-[140px] text-left align-top py-3">
                              Account Number
                            </TableCell>
                            <TableCell className="text-left sm:text-right text-gray-800 dark:text-gray-100 py-3 break-words">
                              {employee?.account_number}
                            </TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                </div>
  )
}

export default BankDetail