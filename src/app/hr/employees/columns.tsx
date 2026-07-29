"use client";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { useRouter } from "next/navigation";

function EmployeeActions({ employee }: { employee: Employee }) {
  const router = useRouter();
  return (
    <div className="flex justify-center">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end">
          <DropdownMenuItem
            onClick={() => router.push(`/hr/employees/${employee.id}/details`)}
          >
            Details
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          <DropdownMenuItem
            onClick={() => router.push(`/hr/employees/${employee.id}/edit`)}
          >
            Edit
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

const columns: ColumnDef<Employee>[] = [
  {
    id: "Employee Number",
    accessorKey: "employee_number",
    header: "Employee Number",
    cell: ({ row }) => {
      return <div>{row.original.employee_number}</div>;
    },
  },
  {
    accessorKey: "names",
    header: "Name",
  },
  {
    accessorKey: "designation_name",
    header: "Designation",
    enableSorting: true,
    enableHiding: true,
    enableColumnFilter: true,
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "phone",
    header: "Phone Number",
    enableHiding: true,
  },

  {
    id: "actions",
    header: () => <div className="text-center">Action</div>,
    cell: ({ row }) => <EmployeeActions employee={row.original} />,
  },
];

export default columns;
