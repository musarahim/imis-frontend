import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";

function ContactPerson({ employee }: { employee: Employee }) {
  return (
    <div className="w-full overflow-hidden">
      <Table className="w-full rounded-2xl">
        <TableBody>
          <TableRow className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-900/50 dark:even:bg-gray-950">
            <TableCell className="font-medium w-1/3 min-w-30 sm:w-35 text-left align-top py-3">
              Name
            </TableCell>
            <TableCell className="text-left sm:text-right text-gray-800 dark:text-gray-100 py-3 wrap-wrap-break-words">
              {employee?.contact_person_name}
            </TableCell>
          </TableRow>
          <TableRow className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-900/50 dark:even:bg-gray-950">
            <TableCell className="font-medium w-1/3 min-w-30 sm:w-35 text-left align-top py-3">
              Relationship
            </TableCell>
            <TableCell className="text-left sm:text-right text-gray-800 dark:text-gray-100 py-3 wrap-wrap-break-words">
              {employee?.contact_person_relationship}
            </TableCell>
          </TableRow>
          <TableRow className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-900/50 dark:even:bg-gray-950">
            <TableCell className="font-medium w-1/3 min-w-30 sm:w-35 text-left align-top py-3">
              Phone Number
            </TableCell>
            <TableCell className="text-left sm:text-right text-gray-800 dark:text-gray-100 py-3 wrap-wrap-break-words">
              {employee?.contact_person_telephone}
            </TableCell>
          </TableRow>

          <TableRow className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-900/50 dark:even:bg-gray-950">
            <TableCell className="font-medium w-1/3 min-w-30 sm:w-35 text-left align-top py-3">
              Email
            </TableCell>
            <TableCell className="text-left sm:text-right text-gray-800 dark:text-gray-100 py-3 wrap-wrap-break-words">
              {employee?.contact_person_email}
            </TableCell>
          </TableRow>
          <TableRow className="odd:bg-white even:bg-gray-100 dark:odd:bg-gray-900/50 dark:even:bg-gray-950">
            <TableCell className="font-medium w-1/3 min-w-30 sm:w-35 text-left align-top py-3">
              Address
            </TableCell>
            <TableCell className="text-left sm:text-right text-gray-800 dark:text-gray-100 py-3 wrap-wrap-break-words">
              {employee?.contact_person_address}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
}

export default ContactPerson;
