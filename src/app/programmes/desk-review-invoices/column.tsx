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
import {
    useReconcileInvoiceMutation,
    useRetrieveProgrammeInvoiceQuery,
} from "@/redux/features/programme-api-slice";
import { skipToken } from "@reduxjs/toolkit/query";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";
// Helper function to get status colors
function getStatusColor(status: string) {
  switch (status?.toLowerCase()) {
    case "issued":
      return "bg-blue-500 text-white dark:bg-blue-600 hover:bg-blue-600";
    case "paid":
      return "bg-green-500 text-white dark:bg-green-600 hover:bg-green-600";
    case "cancelled":
      return "bg-red-500 text-white dark:bg-red-600 hover:bg-red-600";
    case "reconciled":
      return "bg-teal-500 text-white dark:bg-teal-600 hover:bg-teal-600";
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

  const isCurrencyLikeField =
    key.toLowerCase().includes("amount") || key.toLowerCase().includes("total");

  if (typeof value === "number") {
    if (isCurrencyLikeField) {
      return value.toLocaleString();
    }
    return String(value);
  }

  if (typeof value === "string") {
    if (isCurrencyLikeField) {
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
function ActionCell({ application }: { application: DeskReviewInvoice }) {
  const router = useRouter();
  const [isReconcileDialogOpen, setIsReconcileDialogOpen] = useState(false);
  const { data: detailedInvoice } = useRetrieveProgrammeInvoiceQuery(
    isReconcileDialogOpen && application.id !== undefined
      ? application.id
      : skipToken,
  );

  const invoiceSnapshot = (detailedInvoice ?? application) as Invoice;
  const invoiceDetails = Object.entries(invoiceSnapshot)
    .filter(([key, value]) => {
      if (value === null || value === undefined || value === "") {
        return false;
      }
      if (key === "id" || key === "application_id") {
        return false;
      }
      if (key === "invoice_items" || key === "payment_receipt") {
        return false;
      }

      const normalizedKey = key.toLowerCase();
      return (
        normalizedKey.includes("invoice") ||
        normalizedKey.includes("payment") ||
        normalizedKey === "application" ||
        normalizedKey === "institution" ||
        normalizedKey === "status" ||
        normalizedKey === "grand_total"
      );
    })
    .sort(([firstKey], [secondKey]) => firstKey.localeCompare(secondKey));

  const [reconcileInvoice, { isLoading: isReconciling }] =
    useReconcileInvoiceMutation();

  const reconcileTargetId =
    invoiceSnapshot.application_id ??
    (typeof invoiceSnapshot.application === "number"
      ? invoiceSnapshot.application
      : undefined);

  const handleReconcile = async () => {
    if (reconcileTargetId === undefined) {
      toast.error("Cannot reconcile invoice: missing application identifier.");
      console.error(
        "Cannot reconcile invoice: missing application id on invoice payload",
      );
      return;
    }

    try {
      await reconcileInvoice({ id: reconcileTargetId }).unwrap();
      toast.success("Invoice reconciled successfully.");
      setIsReconcileDialogOpen(false);
    } catch (error) {
      toast.error("Failed to reconcile invoice.");
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
                  `/programmes/desk-review-invoices/${application.id}/details`,
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
              Reconciliation form for invoice{" "}
              {invoiceSnapshot.invoice_number ?? ""}.
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
              onClick={() => handleReconcile()}
              disabled={isReconciling || reconcileTargetId === undefined}
            >
              {isReconciling ? "Reconciling..." : "Reconcile"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const columns: ColumnDef<DeskReviewInvoice>[] = [
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
    accessorKey: "payment_date",
    id: "Payment Date",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Payment Date" />
    ),
  },
  {
    accessorKey: "payment_reference",
    id: "Payment Reference",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Payment Reference" />
    ),
  },
  {
    id: "actions",
    header: () => <div className="text-center">Action</div>,
    cell: ({ row }) => <ActionCell application={row.original} />,
  },
];
