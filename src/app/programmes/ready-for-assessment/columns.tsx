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
                `/programmes/programme-accreditation/${application.review_id}/details`,
              )
            }
          >
            View
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
    header: "Programme Name",
  },

  {
    accessorKey: "review_date",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Review Date" />
    ),
  },
  {
    accessorKey: "status",
    header: () => <div className="text-center">Progressed</div>,
    cell: ({ row }) => {
      return (
        <div className="flex justify-center">
          <LinkAsBadge
            href={`/programmes/programme-accreditation/${row.original.review_id}/details`}
            text={row.original.expert_progression ?? ""}
            className={
              row.original.expert_progression === "Yes"
                ? "bg-green-500 text-white dark:bg-green-600 hover:bg-green-600"
                : "bg-amber-500 text-white dark:bg-amber-600 hover:bg-amber-600"
            }
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
