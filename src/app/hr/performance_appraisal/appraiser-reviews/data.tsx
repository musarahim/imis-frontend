"use client";
import { DataTable } from "@/components/common/data-table";
import { useGetAppraiserReviewsQuery } from "@/redux/features/appraisal-api-slice";
import { ColumnFiltersState, PaginationState, SortingState, VisibilityState } from "@tanstack/react-table";
import React from "react";
import columns from "./column";

function AppraiserReviewData() {
  const [pagination, setPagination] = React.useState<PaginationState>({ pageIndex: 0, pageSize: 10 });
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = React.useState("");
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});

  const queryParams = React.useMemo<ListParams>(() => ({
    page: pagination.pageIndex + 1,
    pageSize: pagination.pageSize,
    search: globalFilter || undefined,
    ordering: sorting.length > 0 ? `${sorting[0].desc ? "-" : ""}${sorting[0].id}` : undefined,
  }), [pagination, sorting, globalFilter]);

  const { data, isLoading, isError } = useGetAppraiserReviewsQuery(queryParams, { refetchOnMountOrArgChange: true });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading reviews.</div>;

  return (
    <DataTable<PerformanceAppraisal, unknown>
      isFetching={isLoading}
      columns={columns}
      data={data?.results ?? []}
      pagination={pagination}
      setPagination={setPagination}
      sorting={sorting}
      setSorting={setSorting}
      globalFilter={globalFilter}
      setGlobalFilter={setGlobalFilter}
      columnFilters={columnFilters}
      setColumnFilters={setColumnFilters}
      columnVisibility={columnVisibility}
      setColumnVisibility={setColumnVisibility}
    />
  );
}

export default AppraiserReviewData;
