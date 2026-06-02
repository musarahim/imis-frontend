"use client";

import { Separator } from "@/components/ui/separator";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { useRetrieveProgrammeInvoiceQuery } from "@/redux/features/programme-api-slice";
import ExportInvoicePdfButton from "./ExportInvoicePdfButton";

type InvoiceLike = {
  id?: number;
  institution?: string;
  application?: string | number;
  application_number?: string;
  invoice_number?: string;
  invoice_date?: string;
  status?: string;
  payment_date?: string;
  grand_total?: string | number;
  invoice_amount?: string | number;
  invoice_items?: {
    item_type?: string;
    persons_number?: number;
    number_of_days?: number;
    total?: string | number;
  }[];
  items?: {
    item_type?: string;
    persons_number?: number;
    number_of_days?: number;
    total?: string | number;
  }[];
};

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

const normalizeInvoice = (payload: unknown): InvoiceLike | null => {
  if (!payload) return null;

  if (Array.isArray(payload)) {
    return (payload[0] as InvoiceLike) ?? null;
  }

  if (typeof payload === "object") {
    const data = payload as {
      results?: InvoiceLike[];
      data?: InvoiceLike;
    };

    if (Array.isArray(data.results)) {
      return data.results[0] ?? null;
    }

    if (data.data && typeof data.data === "object") {
      return data.data;
    }

    return payload as InvoiceLike;
  }

  return null;
};

function Content({ id }: { id: string }) {
  const { data, error, isLoading } = useRetrieveProgrammeInvoiceQuery(
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

  const invoiceItems = invoice.invoice_items ?? invoice.items ?? [];

  return (
    <div className="bg-white dark:bg-gray-950 rounded-lg border p-2 h-full">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <h3 className="text-xl font-semibold">Invoice Details</h3>
        <ExportInvoicePdfButton
          invoice={{
            invoice_number: invoice.invoice_number,
            application: invoice.application,
            application_number: invoice.application_number,
            institution: invoice.institution,
            invoice_date: invoice.invoice_date,
            payment_date: invoice.payment_date,
            status: invoice.status,
            grand_total: invoice.grand_total,
            invoice_amount: invoice.invoice_amount,
            invoice_items: invoiceItems,
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
              {invoice.application ?? invoice.application_number ?? "-"}
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
              {formatDate(invoice.payment_date)}
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
              Grand Total:
            </TableCell>
            <TableCell className="text-md">
              {formatCurrency(invoice.grand_total ?? invoice.invoice_amount)}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>

      <div className="mt-6">
        <h4 className="text-lg font-semibold mb-3">Invoice Items</h4>

        {invoiceItems.length ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Item Type</TableHead>
                <TableHead>Persons</TableHead>
                <TableHead>Days</TableHead>
                <TableHead className="text-right">Total</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {invoiceItems.map((item, index) => (
                <TableRow key={`${item.item_type}-${index}`}>
                  <TableCell>{item.item_type ?? "-"}</TableCell>
                  <TableCell>{item.persons_number ?? 0}</TableCell>
                  <TableCell>{item.number_of_days ?? 0}</TableCell>
                  <TableCell className="text-right">
                    {formatCurrency(item.total)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <div className="text-center py-8 text-gray-500 dark:text-gray-400 border rounded-md">
            <p>No invoice items available</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Content;
