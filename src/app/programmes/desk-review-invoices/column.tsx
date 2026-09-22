"use client";
import { DataTableColumnHeader } from "@/components/common/data-table-column-header";
import { Button } from "@/components/ui/button";
import { LinkAsBadge } from "@/components/ui/link-as-badge";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";

function getStatusColor(status: string) {
  switch (status?.toLowerCase()) {
    case "draft": return "bg-gray-500 text-white";
    case "paid": return "bg-amber-600 text-white";
    case "reconciled": return "bg-green-600 text-white";
    case "cancelled": return "bg-red-600 text-white";
    default: return "bg-blue-600 text-white";
  }
}

function ActionCell({ application }: { application: DeskReviewInvoice }) {
  return <Button asChild variant="outline" size="sm">
    <Link href={`/programmes/desk-review-invoices/${application.id}/details`}>View / Manage</Link>
  </Button>;
}

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
            href={`/programmes/desk-review-invoices/${row.original.id}/details`}
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
