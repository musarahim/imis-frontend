"use client";
import { DataTableColumnHeader } from "@/components/common/data-table-column-header";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LinkAsBadge } from "@/components/ui/link-as-badge";
import type { ColumnDef, Row } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { useRouter } from "next/navigation";

const STATUS_BADGE: Record<string, string> = {
  self_assessment: "bg-blue-500 text-white",
  appraiser_review: "bg-indigo-500 text-white",
};

function ActionsCell({ row }: { row: Row<PerformanceAppraisal> }) {
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
          <DropdownMenuItem onClick={() => router.push(`/hr/performance_appraisal/appraiser-reviews/${row.original.id}/review`)}>
            Review
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

const columns: ColumnDef<PerformanceAppraisal>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")} onCheckedChange={(v) => table.toggleAllPageRowsSelected(!!v)} aria-label="Select all" />
    ),
    cell: ({ row }) => <Checkbox checked={row.getIsSelected()} onCheckedChange={(v) => row.toggleSelected(!!v)} aria-label="Select row" />,
    enableSorting: false,
    enableHiding: false,
  },
  { accessorKey: "appraisee_name", header: ({ column }) => <DataTableColumnHeader column={column} title="Appraisee" /> },
  { accessorKey: "start_date", header: ({ column }) => <DataTableColumnHeader column={column} title="Start Date" /> },
  { accessorKey: "end_date", header: ({ column }) => <DataTableColumnHeader column={column} title="End Date" /> },
  {
    accessorKey: "status",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Status" />,
    cell: ({ row }) => {
      const s = row.original.status ?? "self_assessment";
      return <LinkAsBadge className={STATUS_BADGE[s] ?? "bg-gray-400 text-white"}>{s.replace("_", " ")}</LinkAsBadge>;
    },
  },
  { id: "actions", cell: ({ row }) => <ActionsCell row={row} /> },
];

export default columns;
