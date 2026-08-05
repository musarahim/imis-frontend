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

function ProcurementItemActions({ item }: { item: ProcurementItem }) {
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
            onClick={() => router.push(`/procurement/items/${item.id}/edit`)}
          >
            Edit
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

const columns: ColumnDef<ProcurementItem>[] = [
  {
    id: "Name",
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => {
      return <div>{row.original.name}</div>;
    },
  },

  {
    accessorKey: "description",
    header: "Description",
    enableSorting: true,
    enableHiding: true,
    enableColumnFilter: true,
  },

  {
    id: "actions",
    header: () => <div className="text-center">Action</div>,
    cell: ({ row }) => <ProcurementItemActions item={row.original} />,
  },
];

export default columns;
