"use client";

import { Input } from "@/components/ui/input";
import { LinkButton } from "@/components/ui/link-button";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { useEmployeeData } from "@/hooks";
import {
    ColumnDef,
    ColumnFiltersState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    PaginationState,
    SortingState,
    useReactTable,
    VisibilityState,
} from "@tanstack/react-table";
import { Loader2 } from "lucide-react";
import * as React from "react";
import { DataTablePagination } from "./data-table-pagination";
import { DataTableViewOptions } from "./data-table-view-options ";
interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  isFetching: boolean;
  totalCount?: number;
  addHref?: string;
  addText?: string;
  addRequiredPermissions?: string[];
  //handlers
  pagination: PaginationState;
  setPagination: React.Dispatch<React.SetStateAction<PaginationState>>;
  sorting: SortingState;
  setSorting: React.Dispatch<React.SetStateAction<SortingState>>;
  columnFilters: ColumnFiltersState;
  setColumnFilters: React.Dispatch<React.SetStateAction<ColumnFiltersState>>;
  columnVisibility: VisibilityState;
  setColumnVisibility: React.Dispatch<React.SetStateAction<VisibilityState>>;
  globalFilter: string;
  setGlobalFilter: React.Dispatch<React.SetStateAction<string>>;
}

export function DataTable<TData extends object, TValue>({
  columns,
  data,
  addHref,
  addText,
  addRequiredPermissions,
  isFetching,
  totalCount,
  globalFilter,
  setGlobalFilter,
  pagination,
  setPagination,
  sorting,
  setSorting,
  columnFilters,
  setColumnFilters,
  columnVisibility,
  setColumnVisibility,
}: DataTableProps<TData, TValue>) {
  const { user } = useEmployeeData();
  const [searchValue, setSearchValue] = React.useState(globalFilter);

  const userPermissions = React.useMemo(() => {
    if (!user || !user.groups) return new Set<string>();
    return new Set(
      user.groups.flatMap(
        (group) =>
          group.permissions?.map((permission) => permission.codename) || [],
      ),
    );
  }, [user]);

  const canSeeAddAction = React.useMemo(() => {
    const requiredPermissions = addRequiredPermissions ?? [];
    if (requiredPermissions.length === 0) return true;
    return requiredPermissions.some((permission) =>
      userPermissions.has(permission),
    );
  }, [addRequiredPermissions, userPermissions]);

  React.useEffect(() => {
    // Set an initial value when component mounts
    setSearchValue(globalFilter);
  }, [globalFilter]);

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      // Only trigger the parent state change (and RTK fetch) after 300ms of no typing
      if (searchValue !== globalFilter) {
        setGlobalFilter(searchValue);
        // Crucial: Reset to page 0 on new search term
        setPagination((prev) => ({ ...prev, pageIndex: 0 }));
      }
    }, 300);

    return () => clearTimeout(timeout);
  }, [searchValue, globalFilter, setGlobalFilter, setPagination]);
  const table = useReactTable({
    data,
    columns,
    manualPagination: true,
    manualSorting: true,
    manualFiltering: true,
    rowCount: totalCount,
    pageCount:
      typeof totalCount === "number"
        ? Math.ceil(totalCount / pagination.pageSize)
        : undefined,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    state: {
      sorting,
      pagination,
      columnFilters,
      columnVisibility,
      globalFilter: searchValue,
    },
    onPaginationChange: setPagination,
    enableSorting: true,
    enableHiding: true,
  });

  return (
    <div className="w-full min-w-0">
      <div className="flex flex-wrap items-center gap-2 py-4">
        <Input
          placeholder="Search..."
          value={searchValue}
          onChange={(event) => setSearchValue(event.target.value)}
          className="w-full sm:max-w-sm"
        />

        <div className="ml-auto mr-2 shrink-0">
          {addHref && canSeeAddAction && (
            <LinkButton href={addHref} linkText={addText || "Add New"} />
          )}
        </div>

        <div className="shrink-0">
          <DataTableViewOptions table={table} />
        </div>
      </div>
      <div className="w-full max-w-full overflow-x-auto rounded-md border">
        <Table className="min-w-190 table-auto md:min-w-full">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      className="whitespace-normal sm:whitespace-normal align-top wrap-anywhere"
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {isFetching && !data.length ? ( // Use a custom loading state
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  <Loader2 className="mr-2 h-4 w-4 animate-spin inline-block" />{" "}
                  Loading...
                </TableCell>
              </TableRow>
            ) : table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className={isFetching ? "opacity-50 transition-opacity" : ""}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      className="whitespace-normal sm:whitespace-normal align-top wrap-anywhere"
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <DataTablePagination table={table} />
    </div>
  );
}
