import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { useEmployeeData } from "@/hooks";

function Origin() {
     const { employee, user, isLoading } = useEmployeeData();
        
          if (isLoading) {
            return <div>Loading...</div>;
          }
        
  return (
    <div className="w-full overflow-hidden">
        <Table className="w-full rounded-2xl">
            <TableBody>
              <TableRow className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-900/50 dark:even:bg-gray-950">
                <TableCell className="font-medium w-1/3 min-w-[120px] sm:w-[140px] text-left align-top py-3">
                  District of origin
                </TableCell>
                <TableCell className="text-left sm:text-right text-gray-800 dark:text-gray-100 py-3 break-words">
                 {employee?.district_of_origin}
                </TableCell>
              </TableRow>
              <TableRow className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-900/50 dark:even:bg-gray-950">
                <TableCell className="font-medium w-1/3 min-w-[120px] sm:w-[140px] text-left align-top py-3">
                  County of origin
                </TableCell>
                <TableCell className="text-left sm:text-right text-gray-800 dark:text-gray-100 py-3 break-words">
                  {employee?.county_of_origin}
                </TableCell>
              </TableRow>
              <TableRow className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-900/50 dark:even:bg-gray-950">
                <TableCell className="font-medium w-1/3 min-w-[120px] sm:w-[140px] text-left align-top py-3">
                    Sub-county of origin
                </TableCell>
                <TableCell className="text-left sm:text-right text-gray-800 dark:text-gray-100 py-3 break-words">
                  {employee?.sub_county_of_origin}
                </TableCell>
              </TableRow>
              <TableRow className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-900/50 dark:even:bg-gray-950">
                <TableCell className="font-medium w-1/3 min-w-[120px] sm:w-[140px] text-left align-top py-3">
                  Parish of origin
                </TableCell>
                <TableCell className="text-left sm:text-right text-gray-800 dark:text-gray-100 py-3 break-words">
                  {employee?.parish_of_origin}
                </TableCell>
              </TableRow>
              <TableRow className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-900/50 dark:even:bg-gray-950">
                <TableCell className="font-medium w-1/3 min-w-[120px] sm:w-[140px] text-left align-top py-3">
                  Village of origin
                </TableCell>
                <TableCell className="text-left sm:text-right text-gray-800 dark:text-gray-100 py-3 break-words">
                  {employee?.village_of_origin}
                </TableCell>
              </TableRow>
             
                <TableRow className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-900/50 dark:even:bg-gray-950">
                <TableCell className="font-medium w-1/3 min-w-[120px] sm:w-[140px] text-left align-top py-3">
                  Address of origin
                </TableCell>
                <TableCell className="text-left sm:text-right text-gray-800 dark:text-gray-100 py-3 break-words">
                  {employee?.address_of_origin}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
    </div>
  )
}

export default Origin