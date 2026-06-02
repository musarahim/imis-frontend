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
import { useReconcileInvoiceMutation } from "@/redux/features/programme-api-slice";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
// Helper function to get status colors
function getStatusColor(status: string) {
  switch (status?.toLowerCase()) {
    case "issued":
      return "bg-blue-500 text-white dark:bg-blue-600 hover:bg-blue-600";
    case "paid":
      return "bg-green-500 text-white dark:bg-green-600 hover:bg-green-600";
    case "cancelled":
      return "bg-red-500 text-white dark:bg-red-600 hover:bg-red-600";
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
function ActionCell({ application }: { application: Invoice }) {
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

  const [reconcileInvoice] = useReconcileInvoiceMutation();
  const handleReconcile = async () => {
    if (application.id === undefined) {
      console.error("Cannot reconcile invoice: missing application id");
      return;
    }

    try {
      await reconcileInvoice({ id: application.id }).unwrap();
      setIsReconcileDialogOpen(false);
    } catch (error) {
      console.error("Failed to reconcile invoice:", error);
    }
  };

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
                  `/programmes/application-invoices/${application.id}/details`,
                )
              }
            >
              View
            </DropdownMenuItem>
            {application.status?.toLowerCase() === "paid" && (
              <DropdownMenuItem onSelect={() => setIsReconcileDialogOpen(true)}>
                Reconcile Invoice
              </DropdownMenuItem>
            )}
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
            <Button
              type="button"
              onClick={() => handleReconcile()} // Replace with handleReconcile when backend is ready
              disabled={application.id === undefined}
            >
              Reconcile
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const columns: ColumnDef<Invoice>[] = [
  {
    accessorKey: "institution",
    id: "institution",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Institution" />
    ),
  },
  {
    accessorKey: "application",
    id: "Application Number",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Application Code" />
    ),
    cell: ({ row }) => {
      return <div>{row.original.application}</div>;
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
      const amount = row.original.grand_total;
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
    accessorKey: "status",
    id: "Invoice Status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex justify-center">
          <LinkAsBadge
            href={`/programmes/application-invoices/${row.original.id}/details`}
            text={row.original.status ?? ""}
            className={getStatusColor(row.original.status ?? "")}
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
