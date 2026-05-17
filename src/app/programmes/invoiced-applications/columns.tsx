"use client";
import { DataTableColumnHeader } from "@/components/common/data-table-column-header";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LinkAsBadge } from "@/components/ui/link-as-badge";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

// Helper function to get status colors
function getStatusColor(status: string) {
  switch (status?.toLowerCase()) {
    case "pending":
      return "bg-yellow-500 text-white dark:bg-yellow-600 hover:bg-yellow-600";
    case "paid":
      return "bg-green-500 text-white dark:bg-green-600 hover:bg-green-600";
    default:
      return "bg-blue-500 text-white dark:bg-blue-600 hover:bg-blue-600";
  }
}

function formatFieldLabel(key: string) {
  return key
    .replace(/^invoice_/, "")
    .replace(/_/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

function formatFieldValue(key: string, value: unknown) {
  if (value === null || value === undefined || value === "") {
    return "-";
  }

  if (typeof value === "number") {
    if (key.toLowerCase().includes("amount")) {
      return value.toLocaleString();
    }
    return String(value);
  }

  if (typeof value === "string") {
    if (key.toLowerCase().includes("amount")) {
      const numeric = Number(value);
      if (!Number.isNaN(numeric)) {
        return numeric.toLocaleString();
      }
    }
    return value;
  }

  return String(value);
}

// Actions cell component that can properly use hooks
function ActionCell({ application }: { application: ProgrammeAccreditation }) {
  const router = useRouter();
  const [isReconcileDialogOpen, setIsReconcileDialogOpen] = useState(false);
  const invoiceDetails = Object.entries(application)
    .filter(([key]) => {
      const normalizedKey = key.toLowerCase();
      return (
        normalizedKey.includes("invoice") &&
        normalizedKey !== "invoice_payment_date"
      );
    })
    .sort(([firstKey], [secondKey]) => firstKey.localeCompare(secondKey));

  return (
    <>
      <div className="flex justify-center">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0 ">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem
              onClick={() =>
                router.push(
                  `/programmes/programme-accreditation/${application.id}/details`,
                )
              }
            >
              View
            </DropdownMenuItem>
            <DropdownMenuItem onSelect={() => setIsReconcileDialogOpen(true)}>
              Reconcile Invoice
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <Dialog
        open={isReconcileDialogOpen}
        onOpenChange={setIsReconcileDialogOpen}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Reconcile Invoice</DialogTitle>
            <DialogDescription>
              Reconciliation form for invoice {application.invoice_number ?? ""}
              .
            </DialogDescription>
          </DialogHeader>

          <div className="max-h-80 overflow-y-auto rounded-md border">
            <table className="w-full text-sm">
              <tbody>
                {invoiceDetails.map(([key, value]) => (
                  <tr key={key} className="border-b last:border-b-0">
                    <td className="bg-muted/40 px-3 py-2 font-medium">
                      {formatFieldLabel(key)}
                    </td>
                    <td className="px-3 py-2">
                      {formatFieldValue(key, value)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit">Reconcile</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const columns: ColumnDef<ProgrammeAccreditation>[] = [
  {
    accessorKey: "institution",
    id: "institution",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Institution" />
    ),
  },
  {
    accessorKey: "application_number",
    id: "Application Number",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Application Code" />
    ),
    cell: ({ row }) => {
      return <div>{row.original.application_number}</div>;
    },
  },
  {
    accessorKey: "invoice_number",
    id: "Invoice Number",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Invoice No." />
    ),
  },
  //   {
  //     accessorKey: "application_type",
  //     header: "Application Type",
  //   },
  {
    accessorKey: "invoice_amount",
    id: "Invoice Amount",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Amount" />
    ),
    cell: ({ row }) => {
      const amount = row.original.invoice_amount;
      return <div>{Number(amount).toLocaleString()}</div>;
    },
  },

  {
    accessorKey: "invoice_date",
    id: "Invoice Date",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Invoice Date" />
    ),
  },
  {
    accessorKey: "invoice_status",
    id: "Invoice Status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex justify-center">
          <LinkAsBadge
            href={`/programmes/programme-accreditation/${row.original.id}/details`}
            text={row.original.invoice_status ?? ""}
            className={getStatusColor(row.original.invoice_status ?? "")}
          />
        </div>
      );
    },
  },
  {
    id: "actions",
    header: () => <div className="text-center">Action</div>,
    cell: ({ row }) => <ActionCell application={row.original} />,
  },
];
