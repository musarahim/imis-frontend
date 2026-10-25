"use client";

import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { useRouter } from "next/navigation";
import { DataTableColumnHeader } from "@/components/common/data-table-column-header";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { LinkAsBadge } from "@/components/ui/link-as-badge";
import { ProcessingRow, processingLabel, processingStages } from "@/lib/licensing-processing";

function ActionCell({ application, path }: { application: ProcessingRow; path: string }) {
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
          <DropdownMenuItem onClick={() => router.push(`/license/${path}/${application.id}/status`)}>
            Track Status
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => router.push(`/license/${path}/${application.id}/processing`)}>
            Review / Process Application
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

export function processingColumns(path: string): ColumnDef<ProcessingRow>[] {
  return [
    { accessorKey: "institution", header: ({ column }) => <DataTableColumnHeader column={column} title="Institution" /> },
    { accessorKey: "application_code", header: ({ column }) => <DataTableColumnHeader column={column} title="Application Code" /> },
    { accessorKey: "application_date", header: ({ column }) => <DataTableColumnHeader column={column} title="Application Date" /> },
    {
      accessorKey: "stage", enableSorting: false,
      header: () => <div className="text-center">Status</div>,
      cell: ({ row }) => (
        <div className="flex justify-center">
          <LinkAsBadge
            href={`/license/${path}/${row.original.id}/processing`}
            text={processingLabel(row.original.stage)}
            className={row.original.stage === "issued" ? "bg-emerald-500 text-white hover:bg-emerald-600" : row.original.stage === "refused" ? "bg-rose-600 text-white hover:bg-rose-700" : "bg-primary text-primary-foreground hover:bg-primary/90"}
          />
        </div>
      ),
    },
    { id: "responsible_office", header: "Responsible Office", enableSorting: false, cell: ({ row }) => processingStages[row.original.stage]?.office ?? "ILA" },
    { id: "actions", header: () => <div className="text-center">Action</div>, cell: ({ row }) => <ActionCell application={row.original} path={path} /> },
  ];
}
