import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { useEmployeeData } from "@/hooks";
function NextofKin() {
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
                  Name
                </TableCell>
                <TableCell className="text-left sm:text-right text-gray-800 dark:text-gray-100 py-3 break-words">
                 {employee?.next_of_kin_name}
                </TableCell>
              </TableRow>
              <TableRow className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-900/50 dark:even:bg-gray-950">
                <TableCell className="font-medium w-1/3 min-w-[120px] sm:w-[140px] text-left align-top py-3">
                  Relationship
                </TableCell>
                <TableCell className="text-left sm:text-right text-gray-800 dark:text-gray-100 py-3 break-words">
                  {employee?.next_of_kin_relationship}
                </TableCell>
              </TableRow>
              <TableRow className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-900/50 dark:even:bg-gray-950">
                <TableCell className="font-medium w-1/3 min-w-[120px] sm:w-[140px] text-left align-top py-3">
                    Date of Birth
                </TableCell>
                <TableCell className="text-left sm:text-right text-gray-800 dark:text-gray-100 py-3 break-words">
                  {employee?.next_of_kin_date_of_birth}
                </TableCell>
              </TableRow>
              <TableRow className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-900/50 dark:even:bg-gray-950">
                <TableCell className="font-medium w-1/3 min-w-[120px] sm:w-[140px] text-left align-top py-3">
                  Occupation
                </TableCell>
                <TableCell className="text-left sm:text-right text-gray-800 dark:text-gray-100 py-3 break-words">
                  {employee?.occupation}
                </TableCell>
              </TableRow>
              <TableRow className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-900/50 dark:even:bg-gray-950">
                <TableCell className="font-medium w-1/3 min-w-[120px] sm:w-[140px] text-left align-top py-3">
                  Work Place
                </TableCell>
                <TableCell className="text-left sm:text-right text-gray-800 dark:text-gray-100 py-3 break-words">
                  {employee?.work_place}
                </TableCell>
              </TableRow>
             
                <TableRow className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-900/50 dark:even:bg-gray-950">
                <TableCell className="font-medium w-1/3 min-w-[120px] sm:w-[140px] text-left align-top py-3">
                  Phone Number
                </TableCell>
                <TableCell className="text-left sm:text-right text-gray-800 dark:text-gray-100 py-3 break-words">
                  {employee?.next_of_kin_phone_number}
                </TableCell>
              </TableRow>
              <TableRow className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-900/50 dark:even:bg-gray-950">
                <TableCell className="font-medium w-1/3 min-w-[120px] sm:w-[140px] text-left align-top py-3">
                  Email
                </TableCell>
                <TableCell className="text-left sm:text-right text-gray-800 dark:text-gray-100 py-3 break-words">
                  {employee?.next_of_kin_email}
                </TableCell>
              </TableRow>
              <TableRow className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-900/50 dark:even:bg-gray-950">
                <TableCell className="font-medium w-1/3 min-w-[120px] sm:w-[140px] text-left align-top py-3">
                  Address
                </TableCell>
                <TableCell className="text-left sm:text-right text-gray-800 dark:text-gray-100 py-3 break-words">
                  {employee?.next_of_kin_address}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
    </div>
  )
}

export default NextofKin