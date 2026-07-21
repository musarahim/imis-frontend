import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { FileDisplay } from "@/utils/fileUtils";
function Identification({ employee }: { employee: Employee }) {
  return (
    <div className="w-full overflow-hidden">
      <Table className="w-full rounded-2xl">
        <TableBody>
          <TableRow className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-900/50 dark:even:bg-gray-950">
            <TableCell className="font-medium w-1/3 min-w-30 sm:w-35 text-left align-top py-3">
              National ID Document
            </TableCell>
            <TableCell className="text-left sm:text-right text-gray-800 dark:text-gray-100 py-3 wrap-break-words">
              <FileDisplay file={employee?.national_id_document} />
            </TableCell>
          </TableRow>
          <TableRow className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-900/50 dark:even:bg-gray-950">
            <TableCell className="font-medium w-1/3 min-w-30 sm:w-35 text-left align-top py-3">
              Passport photo
            </TableCell>
            <TableCell className="text-left sm:text-right text-gray-800 dark:text-gray-100 py-3 wrap-break-words">
              <FileDisplay file={employee?.passport_photo} />
            </TableCell>
          </TableRow>
          <TableRow className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-900/50 dark:even:bg-gray-950">
            <TableCell className="font-medium w-1/3 min-w-30 sm:w-35 text-left align-top py-3">
              Driving License number
            </TableCell>
            <TableCell className="text-left sm:text-right text-gray-800 dark:text-gray-100 py-3 wrap-break-words">
              {employee?.license_number}
            </TableCell>
          </TableRow>

          <TableRow className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-900/50 dark:even:bg-gray-950">
            <TableCell className="font-medium w-1/3 min-w-30 sm:w-35 text-left align-top py-3">
              Class
            </TableCell>
            <TableCell className="text-left sm:text-right text-gray-800 dark:text-gray-100 py-3 wrap-break-words">
              {employee?.class_of_license}
            </TableCell>
          </TableRow>
          <TableRow className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-900/50 dark:even:bg-gray-950">
            <TableCell className="font-medium w-1/3 min-w-30 sm:w-35 text-left align-top py-3">
              Date of issue
            </TableCell>
            <TableCell className="text-left sm:text-right text-gray-800 dark:text-gray-100 py-3 wrap-break-words">
              {employee?.date_of_issue}
            </TableCell>
          </TableRow>
          <TableRow className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-900/50 dark:even:bg-gray-950">
            <TableCell className="font-medium w-1/3 min-w-30 sm:w-35 text-left align-top py-3">
              Date of expiry
            </TableCell>
            <TableCell className="text-left sm:text-right text-gray-800 dark:text-gray-100 py-3 wrap-break-words">
              {employee?.date_of_expiry}
            </TableCell>
          </TableRow>
          <TableRow className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-900/50 dark:even:bg-gray-950">
            <TableCell className="font-medium w-1/3 min-w-30 sm:w-35 text-left align-top py-3">
              License document
            </TableCell>
            <TableCell className="text-left sm:text-right text-gray-800 dark:text-gray-100 py-3 wrap-break-words">
              <FileDisplay file={employee?.license_document} />
            </TableCell>
          </TableRow>
          <TableRow className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-900/50 dark:even:bg-gray-950">
            <TableCell className="font-medium w-1/3 min-w-30 sm:w-35 text-left align-top py-3">
              Passport number
            </TableCell>
            <TableCell className="text-left sm:text-right text-gray-800 dark:text-gray-100 py-3 wrap-break-words">
              {employee?.passport_number}
            </TableCell>
          </TableRow>
          <TableRow className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-900/50 dark:even:bg-gray-950">
            <TableCell className="font-medium w-1/3 min-w-30 sm:w-35 text-left align-top py-3">
              Passport type
            </TableCell>
            <TableCell className="text-left sm:text-right text-gray-800 dark:text-gray-100 py-3 wrap-break-words">
              {employee?.passport_type_name}
            </TableCell>
          </TableRow>
          <TableRow className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-900/50 dark:even:bg-gray-950">
            <TableCell className="font-medium w-1/3 min-w-30 sm:w-35 text-left align-top py-3">
              Date of Issue
            </TableCell>
            <TableCell className="text-left sm:text-right text-gray-800 dark:text-gray-100 py-3 wrap-break-words">
              {employee?.issue_date}
            </TableCell>
          </TableRow>
          <TableRow className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-900/50 dark:even:bg-gray-950">
            <TableCell className="font-medium w-1/3 min-w-30 sm:w-35 text-left align-top py-3">
              Date of Expiry
            </TableCell>
            <TableCell className="text-left sm:text-right text-gray-800 dark:text-gray-100 py-3 wrap-break-words">
              {employee?.expiry_date}
            </TableCell>
          </TableRow>
          <TableRow className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-900/50 dark:even:bg-gray-950">
            <TableCell className="font-medium w-1/3 min-w-30 sm:w-35 text-left align-top py-3">
              Place of Issue
            </TableCell>
            <TableCell className="text-left sm:text-right text-gray-800 dark:text-gray-100 py-3 wrap-break-words">
              {employee?.place_of_issue}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
}

export default Identification;
