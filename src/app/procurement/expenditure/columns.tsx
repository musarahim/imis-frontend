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

function ProcurementExpenditureActions({
  item,
}: {
  item: ProcurementExpenditure;
}) {
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
            onClick={() =>
              router.push(`/procurement/expenditure/${item.id}/details`)
            }
          >
            Details
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

const columns: ColumnDef<ProcurementExpenditure>[] = [
  {
    id: "Reference",
    accessorKey: "reference",
    header: "Reference",
    cell: ({ row }) => {
      return <div>{row.original.reference}</div>;
    },
  },
  {
    id: "Budget Item",
    accessorKey: "item",
    header: "Budget Item",
    cell: ({ row }) => {
      return <div>{row.original.item}</div>;
    },
  },
  {
    id: "Amount Allocated",
    accessorKey: "budget_amount",
    header: "Amount Allocated (UGX)",
    cell: ({ row }) => {
      return <div>{row.original.budget_amount}</div>;
    },
  },

  {
    accessorKey: "procurement_subject",
    header: "Procurement Subject",
    enableSorting: true,
    enableHiding: true,
    enableColumnFilter: true,
  },
  {
    accessorKey: "amount",
    header: "Amount Spent (UGX)",
    enableSorting: true,
    enableHiding: true,
    enableColumnFilter: true,
  },
  {
    accessorKey: "date",
    header: "Date",
    enableSorting: true,
    enableHiding: true,
    enableColumnFilter: true,
  },

  {
    id: "actions",
    header: () => <div className="text-center">Action</div>,
    cell: ({ row }) => <ProcurementExpenditureActions item={row.original} />,
  },
];

export default columns;
