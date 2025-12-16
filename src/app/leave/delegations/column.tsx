"use client";

import { DataTableColumnHeader } from "@/components/common/data-table-column-header";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LinkAsBadge } from "@/components/ui/link-as-badge";
import type { ColumnDef, Row } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { useRouter } from "next/navigation";

// If not already declared elsewhere, ensure IntrimAuthority is imported or defined
// type IntrimAuthority = { ... };

type ActionsCellProps = {
  row: Row<LeaveApplication>;
};

function getStatusBadgeClass(status: string): string {
  switch (status.toLowerCase()) {
    case 'planned':
      return "bg-gray-500 text-white dark:bg-gray-600 hover:bg-gray-600";
    case 'submitted':
      return "bg-blue-500 text-white dark:bg-blue-600 hover:bg-blue-600";
    case 'delegation_accepted':
      return "bg-indigo-500 text-white dark:bg-indigo-600 hover:bg-indigo-600";
    case 'delegation_rejected':
      return "bg-red-500 text-white dark:bg-red-600 hover:bg-red-600";
    case 'supervisor_approved':
      return "bg-green-500 text-white dark:bg-green-600 hover:bg-green-600";
    case 'supervisor_rejected':
      return "bg-red-500 text-white dark:bg-red-600 hover:bg-red-600";
    case 'hr_approved':
      return "bg-emerald-500 text-white dark:bg-emerald-600 hover:bg-emerald-600";
    case 'hr_rejected':
      return "bg-red-600 text-white dark:bg-red-700 hover:bg-red-700";
    case 'ed_approved':
      return "bg-teal-500 text-white dark:bg-teal-600 hover:bg-teal-600";
    case 'ed_rejected':
      return "bg-red-700 text-white dark:bg-red-800 hover:bg-red-800";
    default:
      return "bg-gray-400 text-white dark:bg-gray-500 hover:bg-gray-500";
  }
}

function ActionsCell({ row }: ActionsCellProps) {
  const router = useRouter();
  const application = row.original;

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
            onClick={() =>
              navigator.clipboard.writeText(String(application.id))
            }
          >
            Approve
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          <DropdownMenuItem
            onClick={() =>
              router.push(`/leave/applications/${application.id}/cancel`)
            }
          >
            Cancel
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

const columns: ColumnDef<LeaveApplication>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "leave_type",
    header: "Leave Type",
  },
  {
    accessorKey: "leave_days",
    header: "Leave Days",
  },
  {
    accessorKey: "start_date",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Start Date" />
    ),
  }, 
  {
    accessorKey: "return_date",
    header: ({ column }) => (
    <DataTableColumnHeader column={column} title="Return Date" />
    ),
  },
  {
    accessorKey: "status",
    header: () => <div className="text-center">Status</div>,
    cell: ({ row }) => (
      <div className="flex justify-center">
        <LinkAsBadge
          href="#"
          text={row.original.status ?? ""}
          className={getStatusBadgeClass(row.original.status ?? "")}
        />
      </div>
    ),
  },
  {
    id: "actions",
    header: () => <div className="text-center">Action</div>,
    cell: ({ row }) => <ActionsCell row={row} />,
  },
];

export default columns;
