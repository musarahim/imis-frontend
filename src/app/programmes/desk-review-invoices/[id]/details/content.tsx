"use client";

import { Separator } from "@/components/ui/separator";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { useRetrieveDeskReviewInvoiceQuery } from "@/redux/features/programme-api-slice";
import ExportInvoicePdfButton from "./ExportInvoicePdfButton";

const formatDate = (value?: string) => {
  if (!value) return "-";

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;

  return date.toLocaleDateString();
};

const formatCurrency = (value?: string | number) => {
  if (value === undefined || value === null || value === "") return "0";

  const numericValue = typeof value === "number" ? value : Number(value);
  if (Number.isNaN(numericValue)) return String(value);

  return numericValue.toLocaleString();
};

const normalizeInvoice = (payload: unknown): DeskReviewInvoice | null => {
  if (!payload) return null;

  if (Array.isArray(payload)) {
    return (payload[0] as DeskReviewInvoice) ?? null;
  }

  if (typeof payload === "object") {
    const data = payload as {
      results?: DeskReviewInvoice[];
      data?: DeskReviewInvoice;
    };

    if (Array.isArray(data.results)) {
      return data.results[0] ?? null;
    }

    if (data.data && typeof data.data === "object") {
      return data.data;
    }

    return payload as DeskReviewInvoice;
  }

  return null;
};

function Content({ id }: { id: string }) {
  const { data, error, isLoading } = useRetrieveDeskReviewInvoiceQuery(
    Number(id),
    {
      refetchOnMountOrArgChange: true,
    },
  );

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading invoice</div>;

  const invoice = normalizeInvoice(data);

  if (!invoice) {
    return <div>No invoice data available</div>;
  }

  return (
    <div className="bg-white dark:bg-gray-950 rounded-lg border p-2">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <h3 className="text-xl font-semibold">Invoice Details</h3>
        <ExportInvoicePdfButton
          invoice={{
            invoice_number: invoice.invoice_number,
            application: invoice.application,
            institution: invoice.institution,
            invoice_date: invoice.invoice_date,
            payment_reference: invoice?.payment_reference,
            payment_date: invoice.payment_date,
            status: invoice.status,
            administrative_fee: invoice.administrative_fee,
            desk_review_fee: invoice.desk_review_fee,
            grand_total: invoice.grand_total,
          }}
        />
      </div>
      <Separator className="my-4" />

      <Table className="w-full mt-1">
        <TableBody>
          <TableRow>
            <TableCell className="font-semibold text-md" colSpan={3}>
              Invoice Number:
            </TableCell>
            <TableCell className="text-md">
              {invoice.invoice_number ?? "-"}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-semibold text-md" colSpan={3}>
              Application Number:
            </TableCell>
            <TableCell className="text-md">
              {invoice.application ?? "-"}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-semibold text-md" colSpan={3}>
              Institution:
            </TableCell>
            <TableCell className="text-md">
              {invoice.institution ?? "-"}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-semibold text-md" colSpan={3}>
              Invoice Date:
            </TableCell>
            <TableCell className="text-md">
              {formatDate(invoice.invoice_date)}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-semibold text-md" colSpan={3}>
              Payment Date:
            </TableCell>
            <TableCell className="text-md">
              {formatDate(invoice?.payment_date ?? undefined)}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-semibold text-md" colSpan={3}>
              Payment Reference:
            </TableCell>
            <TableCell className="text-md">
              {invoice.payment_reference ?? "-"}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-semibold text-md" colSpan={3}>
              Status:
            </TableCell>
            <TableCell className="text-md capitalize">
              {invoice.status ?? "-"}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-semibold text-md" colSpan={3}>
              Desk Review Fee:
            </TableCell>
            <TableCell className="text-md capitalize">
              {formatCurrency(invoice.desk_review_fee ?? "-")}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-semibold text-md" colSpan={3}>
              10% Administrative Fee:
            </TableCell>
            <TableCell className="text-md capitalize">
              {formatCurrency(invoice.administrative_fee ?? "-")}
            </TableCell>
          </TableRow>
          <TableRow className="bg-gray-300 dark:bg-gray-800">
            <TableCell className="font-semibold text-md" colSpan={3}>
              Grand Total:
            </TableCell>
            <TableCell className="text-md">
              {formatCurrency(invoice.grand_total ?? invoice.grand_total)}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
}

export default Content;
