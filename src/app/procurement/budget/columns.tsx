"use client";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { useRouter } from "next/navigation";

function ProcurementBudgetActions({ item }: { item: ProcurementBudget }) {
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
          <DropdownMenuItem
            onClick={() => router.push(`/procurement/budget/${item.id}/edit`)}
          >
            Edit
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

const columns: ColumnDef<ProcurementBudget>[] = [
  {
    id: "Item",
    accessorKey: "item_name",
    header: "Item",
    cell: ({ row }) => {
      return <div>{row.original.item_name}</div>;
    },
  },

  {
    accessorKey: "department_name",
    header: "Department",
    enableSorting: true,
    enableHiding: true,
    enableColumnFilter: true,
  },
  {
    accessorKey: "amount",
    header: "Amount Allocated (UGX)",
    enableSorting: true,
    enableHiding: true,
    enableColumnFilter: true,
  },
  {
    accessorKey: "amount_spent",
    header: "Amount Spent (UGX)",
    enableSorting: true,
    enableHiding: true,
    enableColumnFilter: true,
  },
  {
    accessorKey: "current_balance",
    header: "Balance (UGX)",
    enableSorting: true,
    enableHiding: true,
    enableColumnFilter: true,
  },

  {
    accessorKey: "fiscal_year_name",
    header: "Fiscal Year",
    enableSorting: true,
    enableHiding: true,
    enableColumnFilter: true,
  },

  {
    id: "actions",
    header: () => <div className="text-center">Action</div>,
    cell: ({ row }) => <ProcurementBudgetActions item={row.original} />,
  },
];

export default columns;
