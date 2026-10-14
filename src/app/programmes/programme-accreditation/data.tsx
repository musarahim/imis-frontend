"use client";
import { DataTable } from "@/components/common/data-table";
import { useGetProgrammeAccreditationsQuery, useLazyGetProgrammeAccreditationsQuery } from "@/redux/features/programme-api-slice";
import { collectPaginatedRows } from "@/lib/csv";
import {
  ColumnFiltersState,
  PaginationState,
  SortingState,
  VisibilityState,
} from "@tanstack/react-table";
import React from "react";
import { columns } from "./columns";
// ...existing code...

function ProgrammeAccreditationData() {
  const [fetchExportPage] = useLazyGetProgrammeAccreditationsQuery();
  const [pagination, setPagination] = React.useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = React.useState<string>("");

  // new table state pieces required by DataTable props
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});

  // 2. Memoize the RTK Query argument object
  const queryParams: ListParams = React.useMemo(() => {
    // Convert TanStack table state to DRF API query params
    const ordering =
      sorting.length > 0
        ? `${sorting[0].desc ? "-" : ""}${sorting[0].id}`
        : undefined;

    return {
      page: pagination.pageIndex + 1, // RTK is 1-indexed, TanStack is 0-indexed
      pageSize: pagination.pageSize,
      search: globalFilter || undefined,
      ordering: ordering,
    };
  }, [pagination, sorting, globalFilter]);

  const { currentData: data, isLoading, isFetching, isError } = useGetProgrammeAccreditationsQuery(
    queryParams,
    {
      // 3. Refetch data when pagination, sorting, or filtering changes
      refetchOnMountOrArgChange: true,
    },
  );
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error...</div>;
  console.log(data);
  return (
    <>
      <DataTable<ProgrammeAccreditation, unknown>
        isFetching={isFetching}
        totalCount={data?.count ?? 0}
        csvExport={{
          filename: "programme-accreditation",
          columnLabels: { "Programme Name": "Programme Name" },
          fetchRows: () => collectPaginatedRows<ProgrammeAccreditation>(async (page) => {
            const request = fetchExportPage({ ...queryParams, page, pageSize: 100 });
            try {
              return await request.unwrap();
            } finally {
              request.unsubscribe();
            }
          }),
        }}
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
        addHref="/programmes/assign-reviewers"
        addText="Assign Reviewer"
      />
    </>
  );
}

export default ProgrammeAccreditationData;
