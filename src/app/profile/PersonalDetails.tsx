import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { useEmployeeData } from "@/hooks";
function PersonalDetails() {
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
                  Names
                </TableCell>
                <TableCell className="text-left sm:text-right text-gray-800 dark:text-gray-100 py-3 break-words">
                 {employee?.title}. {user?.first_name} {user?.last_name} {user?.other_names}
                </TableCell>
              </TableRow>
              <TableRow className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-900/50 dark:even:bg-gray-950">
                <TableCell className="font-medium w-1/3 min-w-[120px] sm:w-[140px] text-left align-top py-3">
                  Email
                </TableCell>
                <TableCell className="text-left sm:text-right text-gray-800 dark:text-gray-100 py-3 break-words">
                  {user?.email}
                </TableCell>
              </TableRow>
              <TableRow className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-900/50 dark:even:bg-gray-950">
                <TableCell className="font-medium w-1/3 min-w-[120px] sm:w-[140px] text-left align-top py-3">
                  Contact Numbers
                </TableCell>
                <TableCell className="text-left sm:text-right text-gray-800 dark:text-gray-100 py-3 break-words">
                  {user?.phone}{user?.alternative_phone_number ? `/ ${user?.alternative_phone_number}` : ""}
                </TableCell>
              </TableRow>
              <TableRow className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-900/50 dark:even:bg-gray-950">
                <TableCell className="font-medium w-1/3 min-w-[120px] sm:w-[140px] text-left align-top py-3">
                  Directorate
                </TableCell>
                <TableCell className="text-left sm:text-right text-gray-800 dark:text-gray-100 py-3 break-words">
                  {employee?.directorate}
                </TableCell>
              </TableRow>
              <TableRow className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-900/50 dark:even:bg-gray-950">
                <TableCell className="font-medium w-1/3 min-w-[120px] sm:w-[140px] text-left align-top py-3">
                  Department
                </TableCell>
                <TableCell className="text-left sm:text-right text-gray-800 dark:text-gray-100 py-3 break-words">
                  {employee?.department}
                </TableCell>
              </TableRow>
              <TableRow className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-900/50 dark:even:bg-gray-950">
                <TableCell className="font-medium w-1/3 min-w-[120px] sm:w-[140px] text-left align-top py-3">
                  Designation
                </TableCell>
                <TableCell className="text-left sm:text-right text-gray-800 dark:text-gray-100 py-3 break-words">
                  {employee?.designation}
                </TableCell>
              </TableRow>
                <TableRow className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-900/50 dark:even:bg-gray-950">
                <TableCell className="font-medium w-1/3 min-w-[120px] sm:w-[140px] text-left align-top py-3">
                  Supervisor
                </TableCell>
                <TableCell className="text-left sm:text-right text-gray-800 dark:text-gray-100 py-3 break-words">
                  {employee?.supervisor}
                </TableCell>
              </TableRow>
              <TableRow className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-900/50 dark:even:bg-gray-950">
                <TableCell className="font-medium w-1/3 min-w-[120px] sm:w-[140px] text-left align-top py-3">
                  Employee number
                </TableCell>
                <TableCell className="text-left sm:text-right text-gray-800 dark:text-gray-100 py-3 break-words">
                  {employee?.employee_number}
                </TableCell>
              </TableRow>
               <TableRow className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-900/50 dark:even:bg-gray-950">
                <TableCell className="font-medium w-1/3 min-w-[120px] sm:w-[140px] text-left align-top py-3">
                  National Identification Number (NIN)
                </TableCell>
                <TableCell className="text-left sm:text-right text-gray-800 dark:text-gray-100 py-3 break-words">
                  {employee?.nin}
                </TableCell>
              </TableRow>
              <TableRow className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-900/50 dark:even:bg-gray-950">
                <TableCell className="font-medium w-1/3 min-w-[120px] sm:w-[140px] text-left align-top py-3">
                  Nssf number
                </TableCell>
                <TableCell className="text-left sm:text-right text-gray-800 dark:text-gray-100 py-3 break-words">
                  {employee?.nssf_number}
                </TableCell>
              </TableRow>
              <TableRow className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-900/50 dark:even:bg-gray-950">
                <TableCell className="font-medium w-1/3 min-w-[120px] sm:w-[140px] text-left align-top py-3">
                  Tax Identification Number (TIN)
                </TableCell>
                <TableCell className="text-left sm:text-right text-gray-800 dark:text-gray-100 py-3 break-words">
                  {employee?.tin_number}
                </TableCell>
              </TableRow>
              <TableRow className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-900/50 dark:even:bg-gray-950">
                <TableCell className="font-medium w-1/3 min-w-[120px] sm:w-[140px] text-left align-top py-3">
                  Date of birth
                </TableCell>
                <TableCell className="text-left sm:text-right text-gray-800 dark:text-gray-100 py-3 break-words">
                  {employee?.date_of_birth}
                </TableCell>
              </TableRow>

               <TableRow className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-900/50 dark:even:bg-gray-950">
                <TableCell className="font-medium w-1/3 min-w-[120px] sm:w-[140px] text-left align-top py-3">
                  Gender 
                </TableCell>
                <TableCell className="text-left sm:text-right text-gray-800 dark:text-gray-100 py-3 break-words">
                  {employee?.gender}
                </TableCell>
              </TableRow>

               <TableRow className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-900/50 dark:even:bg-gray-950">
                <TableCell className="font-medium w-1/3 min-w-[120px] sm:w-[140px] text-left align-top py-3">
                  Nationality
                </TableCell>
                <TableCell className="text-left sm:text-right text-gray-800 dark:text-gray-100 py-3 break-words">
                  {employee?.nationality}
                </TableCell>
              </TableRow>

               <TableRow className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-900/50 dark:even:bg-gray-950">
                <TableCell className="font-medium w-1/3 min-w-[120px] sm:w-[140px] text-left align-top py-3">
                  Religion
                </TableCell>
                <TableCell className="text-left sm:text-right text-gray-800 dark:text-gray-100 py-3 break-words">
                  {employee?.religion}
                </TableCell>
              </TableRow>

               <TableRow className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-900/50 dark:even:bg-gray-950">
                <TableCell className="font-medium w-1/3 min-w-[120px] sm:w-[140px] text-left align-top py-3">
                  Tribe
                </TableCell>
                <TableCell className="text-left sm:text-right text-gray-800 dark:text-gray-100 py-3 break-words">
                  {employee?.tribe}
                </TableCell>
              </TableRow>

               <TableRow className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-900/50 dark:even:bg-gray-950">
                <TableCell className="font-medium w-1/3 min-w-[120px] sm:w-[140px] text-left align-top py-3">
                  Marital status
                </TableCell>
                <TableCell className="text-left sm:text-right text-gray-800 dark:text-gray-100 py-3 break-words">
                  {employee?.marital_status}
                </TableCell>
              </TableRow>
              
               {employee?.marital_status === 'Married' && (
               <TableRow className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-900/50 dark:even:bg-gray-950">
                <TableCell className="font-medium w-1/3 min-w-[120px] sm:w-[140px] text-left align-top py-3">
                  Spouse name
                </TableCell>
                <TableCell className="text-left sm:text-right text-gray-800 dark:text-gray-100 py-3 break-words">
                  {employee?.spouse_name}
                </TableCell>
              </TableRow>
                )}

               <TableRow className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-900/50 dark:even:bg-gray-950">
                <TableCell className="font-medium w-1/3 min-w-[120px] sm:w-[140px] text-left align-top py-3">
                  Blood group
                </TableCell>
                <TableCell className="text-left sm:text-right text-gray-800 dark:text-gray-100 py-3 break-words">
                  {employee?.blood_group}
                </TableCell>
              </TableRow>

               <TableRow className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-900/50 dark:even:bg-gray-950">
                <TableCell className="font-medium w-1/3 min-w-[120px] sm:w-[140px] text-left align-top py-3">
                 Allergies
                </TableCell>
                <TableCell className="text-left sm:text-right text-gray-800 dark:text-gray-100 py-3 break-words">
                  {employee?.allergies}
                </TableCell>
              </TableRow>

               <TableRow className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-900/50 dark:even:bg-gray-950">
                <TableCell className="font-medium w-1/3 min-w-[120px] sm:w-[140px] text-left align-top py-3">
                  Joining Date
                </TableCell>
                <TableCell className="text-left sm:text-right text-gray-800 dark:text-gray-100 py-3 break-words">
                  {employee?.joining_date}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
    </div>
  )
}

export default PersonalDetails