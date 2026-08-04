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
  draft: "bg-gray-400 text-white",
  self_assessment: "bg-blue-500 text-white",
  appraiser_review: "bg-indigo-500 text-white",
  reviewer_review: "bg-purple-500 text-white",
  director_review: "bg-amber-500 text-white",
  executive_review: "bg-orange-500 text-white",
  completed: "bg-green-600 text-white",
  rejected: "bg-red-600 text-white",
};

const STATUS_LABEL: Record<string, string> = {
  draft: "Draft",
  self_assessment: "Self-Assessment Submitted",
  appraiser_review: "Under Appraiser Review",
  reviewer_review: "Under Reviewer Review",
  director_review: "Under Director Review",
  executive_review: "Under Executive Review",
  completed: "Completed",
  rejected: "Rejected",
};

function ActionsCell({ row }: { row: Row<PerformanceAppraisal> }) {
  const router = useRouter();
  const appraisal = row.original;
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
          <DropdownMenuItem onClick={() => router.push(`/hr/performance_appraisal/${appraisal.id}`)}>
            View
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
      <Checkbox
        checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")}
        onCheckedChange={(v) => table.toggleAllPageRowsSelected(!!v)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox checked={row.getIsSelected()} onCheckedChange={(v) => row.toggleSelected(!!v)} aria-label="Select row" />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "appraisee_name",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Appraisee" />,
  },
  {
    accessorKey: "appraiser_name",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Appraiser" />,
  },
  {
    accessorKey: "start_date",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Start Date" />,
  },
  {
    accessorKey: "end_date",
    header: ({ column }) => <DataTableColumnHeader column={column} title="End Date" />,
  },
  {
    accessorKey: "overall_score",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Score" />,
    cell: ({ row }) => row.original.overall_score ?? "—",
  },
  {
    accessorKey: "status",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Status" />,
    cell: ({ row }) => {
      const s = row.original.status ?? "draft";
      return (
        <LinkAsBadge className={STATUS_BADGE[s] ?? "bg-gray-400 text-white"}>
          {STATUS_LABEL[s] ?? s}
        </LinkAsBadge>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <ActionsCell row={row} />,
  },
];

export default columns;
