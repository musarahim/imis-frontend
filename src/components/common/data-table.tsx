"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { serializeTableCsv } from "@/lib/csv";
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
import { Download, Loader2 } from "lucide-react";
import { toast } from "react-toastify";
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
  toolbarActions?: React.ReactNode;
  /** Exports visible data columns. Supply fetchRows to export all matching server pages. */
  csvExport?: {
    filename: string;
    fetchRows?: () => Promise<TData[]>;
    columnLabels?: Record<string, string>;
  };
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
  toolbarActions,
  csvExport,
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
  const [isExporting, setIsExporting] = React.useState(false);
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

  const exportCsv = async () => {
    if (!csvExport || isExporting || isFetching || searchValue !== globalFilter) return;
    const exportColumns = table.getVisibleLeafColumns().filter((column) => column.accessorFn);
    if (!exportColumns.length) {
      toast.error("Show at least one data column before exporting.");
      return;
    }
    setIsExporting(true);
    try {
      const rows = csvExport.fetchRows
        ? await csvExport.fetchRows()
        : table.getRowModel().rows.map((row) => row.original);
      if (!rows.length) {
        toast.info("No rows match the current filters.");
        return;
      }
      const csv = serializeTableCsv(rows, exportColumns, csvExport.columnLabels);
      const url = URL.createObjectURL(new Blob([csv], { type: "text/csv;charset=utf-8;" }));
      const link = document.createElement("a");
      link.href = url;
      link.download = `${csvExport.filename.replace(/\.csv$/i, "")}-${new Date().toISOString().slice(0, 10)}.csv`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      setTimeout(() => URL.revokeObjectURL(url), 1000);
      toast.success(`Exported ${rows.length} rows.`);
    } catch {
      toast.error("Could not export rows. Please try again.");
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div>
      <div className="flex flex-wrap items-center gap-2 py-4">
        <Input
          placeholder="Search..."
          value={searchValue}
          onChange={(event) => setSearchValue(event.target.value)}
          className="max-w-sm"
        />

        <div className="ml-auto mr-2 flex items-center gap-2">
          {csvExport && (
            <Button type="button" variant="secondary" onClick={() => void exportCsv()}
              disabled={isExporting || isFetching || searchValue !== globalFilter || !data.length}
              title={csvExport.fetchRows ? "Export all matching rows across all pages" : "Export rows on the current page"}>
              {isExporting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Download className="h-4 w-4" />}
              {isExporting ? "Exporting..." : "Export CSV"}
            </Button>
          )}
          {toolbarActions}
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
