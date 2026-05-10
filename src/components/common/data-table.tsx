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
import useEmployeeData from "@/hooks/use-employee-data";
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

  const canShowAddButton = React.useMemo(() => {
    if (!addHref) {
      return false;
    }

    if (!addRequiredPermissions?.length) {
      return true;
    }

    const userPermissions = new Set(
      user?.groups?.flatMap(
        (group) =>
          group.permissions?.map((permission) => permission.codename) || [],
      ) || [],
    );

    return addRequiredPermissions.some((permission) =>
      userPermissions.has(permission),
    );
  }, [addHref, addRequiredPermissions, user]);

  const shouldShowButton = canShowAddButton && addHref;

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
    <div>
      <div className="flex items-center py-4">
        <Input
          placeholder="Search..."
          value={searchValue}
          onChange={(event) => setSearchValue(event.target.value)}
          className="max-w-sm"
        />

        <div className="ml-auto mr-2">
          {shouldShowButton && (
            <LinkButton href={addHref} linkText={addText || "Add New"} />
          )}
        </div>

        <DataTableViewOptions table={table} />
      </div>
      <div className="overflow-hidden rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
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
                    <TableCell key={cell.id}>
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
