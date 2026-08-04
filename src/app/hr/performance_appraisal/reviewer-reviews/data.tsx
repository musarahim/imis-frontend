"use client";
import { DataTable } from "@/components/common/data-table";
import { useGetReviewerReviewsQuery } from "@/redux/features/appraisal-api-slice";
import { ColumnFiltersState, PaginationState, SortingState, VisibilityState } from "@tanstack/react-table";
import React from "react";
import { DataTableColumnHeader } from "@/components/common/data-table-column-header";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { LinkAsBadge } from "@/components/ui/link-as-badge";
import type { ColumnDef, Row } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { useRouter } from "next/navigation";

function ActionsCell({ row }: { row: Row<PerformanceAppraisal> }) {
  const router = useRouter();
  return (
    <div className="flex justify-center">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0"><MoreHorizontal className="h-4 w-4" /></Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => router.push(`/hr/performance_appraisal/reviewer-reviews/${row.original.id}/review`)}>
            Review
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

const columns: ColumnDef<PerformanceAppraisal>[] = [
  { id: "select", header: ({ table }) => <Checkbox checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")} onCheckedChange={(v) => table.toggleAllPageRowsSelected(!!v)} aria-label="Select all" />, cell: ({ row }) => <Checkbox checked={row.getIsSelected()} onCheckedChange={(v) => row.toggleSelected(!!v)} aria-label="Select row" />, enableSorting: false, enableHiding: false },
  { accessorKey: "appraisee_name", header: ({ column }) => <DataTableColumnHeader column={column} title="Appraisee" /> },
  { accessorKey: "appraiser_name", header: ({ column }) => <DataTableColumnHeader column={column} title="Appraiser" /> },
  { accessorKey: "overall_score", header: ({ column }) => <DataTableColumnHeader column={column} title="Score" />, cell: ({ row }) => row.original.overall_score ?? "—" },
  { accessorKey: "overall_level", header: ({ column }) => <DataTableColumnHeader column={column} title="Level" />, cell: ({ row }) => row.original.overall_level ? <LinkAsBadge className="bg-indigo-500 text-white">{row.original.overall_level}</LinkAsBadge> : "—" },
  { id: "actions", cell: ({ row }) => <ActionsCell row={row} /> },
];

function ReviewerReviewData() {
  const [pagination, setPagination] = React.useState<PaginationState>({ pageIndex: 0, pageSize: 10 });
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = React.useState("");
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});

  const queryParams = React.useMemo<ListParams>(() => ({
    page: pagination.pageIndex + 1, pageSize: pagination.pageSize, search: globalFilter || undefined,
    ordering: sorting.length > 0 ? `${sorting[0].desc ? "-" : ""}${sorting[0].id}` : undefined,
  }), [pagination, sorting, globalFilter]);

  const { data, isLoading, isError } = useGetReviewerReviewsQuery(queryParams, { refetchOnMountOrArgChange: true });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading reviews.</div>;

  return (
    <DataTable<PerformanceAppraisal, unknown> isFetching={isLoading} columns={columns} data={data?.results ?? []}
      pagination={pagination} setPagination={setPagination} sorting={sorting} setSorting={setSorting}
      globalFilter={globalFilter} setGlobalFilter={setGlobalFilter} columnFilters={columnFilters} setColumnFilters={setColumnFilters}
      columnVisibility={columnVisibility} setColumnVisibility={setColumnVisibility} />
  );
}

export default ReviewerReviewData;
