"use client";
import { DataTableColumnHeader } from "@/components/common/data-table-column-header";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LinkAsBadge } from "@/components/ui/link-as-badge";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { useRouter } from "next/navigation";

// Actions cell component that can properly use hooks
function ActionCell({ application }: { application: ProgrammeAccreditation }) {
  const router = useRouter();

  return (
    <div className="flex justify-center">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0 ">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem
            onClick={() =>
              router.push(
                `/programmes/management-review/${application.id}/review`,
              )
            }
          >
            Review
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const columns: ColumnDef<ProgrammeAccreditation>[] = [
  {
    accessorKey: "institution",
    header: "Institution",
  },
  {
    accessorKey: "application_number",
    header: "Application Code",
    cell: ({ row }) => {
      return <div>{row.original.application_number}</div>;
    },
  },
  {
    accessorKey: "program_name",
    header: "Name",
  },
  //   {
  //     accessorKey: "application_type",
  //     header: "Application Type",
  //   },
  {
    accessorKey: "program_level",
    header: "Programme Level",
  },

  {
    accessorKey: "date_submitted",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Application Date" />
    ),
  },
  {
    accessorKey: "status",
    header: () => <div className="text-center">Status</div>,
    cell: ({ row }) => {
      return (
        <div className="flex justify-center">
          <LinkAsBadge
            href={`/programmes/management-review/${row.original.id}/review`}
            text={row.original.status ?? ""}
            className="bg-blue-500 text-white dark:bg-blue-600 hover:bg-blue-600"
          />
        </div>
      );
    },
  },
  {
    id: "actions",
    header: () => <div className="text-center">Action</div>,
    cell: ({ row }) => <ActionCell application={row.original} />,
  },
];
