import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { useEmployeeData } from "@/hooks";

function ResidentialAddress() {
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
                  District
                </TableCell>
                <TableCell className="text-left sm:text-right text-gray-800 dark:text-gray-100 py-3 break-words">
                 {employee?.district}
                </TableCell>
              </TableRow>
              <TableRow className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-900/50 dark:even:bg-gray-950">
                <TableCell className="font-medium w-1/3 min-w-[120px] sm:w-[140px] text-left align-top py-3">
                  County
                </TableCell>
                <TableCell className="text-left sm:text-right text-gray-800 dark:text-gray-100 py-3 break-words">
                  {employee?.county}
                </TableCell>
              </TableRow>
              <TableRow className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-900/50 dark:even:bg-gray-950">
                <TableCell className="font-medium w-1/3 min-w-[120px] sm:w-[140px] text-left align-top py-3">
                    Sub-county
                </TableCell>
                <TableCell className="text-left sm:text-right text-gray-800 dark:text-gray-100 py-3 break-words">
                  {employee?.sub_county}
                </TableCell>
              </TableRow>
              <TableRow className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-900/50 dark:even:bg-gray-950">
                <TableCell className="font-medium w-1/3 min-w-[120px] sm:w-[140px] text-left align-top py-3">
                  Parish
                </TableCell>
                <TableCell className="text-left sm:text-right text-gray-800 dark:text-gray-100 py-3 break-words">
                  {employee?.parish}
                </TableCell>
              </TableRow>
              <TableRow className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-900/50 dark:even:bg-gray-950">
                <TableCell className="font-medium w-1/3 min-w-[120px] sm:w-[140px] text-left align-top py-3">
                  Village
                </TableCell>
                <TableCell className="text-left sm:text-right text-gray-800 dark:text-gray-100 py-3 break-words">
                  {employee?.village}
                </TableCell>
              </TableRow>
              <TableRow className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-900/50 dark:even:bg-gray-950">
                <TableCell className="font-medium w-1/3 min-w-[120px] sm:w-[140px] text-left align-top py-3">
                  Distance from work place (in km)
                </TableCell>
                <TableCell className="text-left sm:text-right text-gray-800 dark:text-gray-100 py-3 break-words">
                  {employee?.distance_from_work}
                </TableCell>
              </TableRow>
                <TableRow className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-900/50 dark:even:bg-gray-950">
                <TableCell className="font-medium w-1/3 min-w-[120px] sm:w-[140px] text-left align-top py-3">
                  Address
                </TableCell>
                <TableCell className="text-left sm:text-right text-gray-800 dark:text-gray-100 py-3 break-words">
                  {employee?.address}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
    </div>
  )
}

export default ResidentialAddress