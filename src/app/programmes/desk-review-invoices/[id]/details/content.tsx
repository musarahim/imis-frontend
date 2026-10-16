"use client";

import { useRetrieveDeskReviewInvoiceQuery } from "@/redux/features/programme-api-slice";
import ExportInvoicePdfButton from "./ExportInvoicePdfButton";
import InvoiceActions from "./InvoiceActions";
import InvoicePaper from "../../InvoicePaper";

export default function Content({ id }: { id: string }) {
  const { data: invoice, isLoading, isError } = useRetrieveDeskReviewInvoiceQuery(Number(id), { refetchOnMountOrArgChange: true, pollingInterval: 60000 });
  if (isLoading) return <p>Loading invoice...</p>;
  if (isError || !invoice) return <p role="alert">Unable to load this invoice.</p>;
  return <div className="space-y-6">
    <div className="flex flex-wrap items-center justify-between gap-4"><h1 className="text-2xl font-semibold">Desk Review Invoice</h1><ExportInvoicePdfButton invoice={invoice} /></div>
    <section className="rounded-lg border bg-white p-5 dark:bg-gray-950" aria-label="Payment tracking">
      <p className="font-semibold">{invoice.status === "Paid" ? "Payment submitted ? awaiting full verification" : invoice.status} ? {invoice.programme_count} programme(s)</p>
      <div className="mt-3 flex flex-wrap gap-6 text-sm"><p>Invoice total: <strong>UGX {Number(invoice.grand_total).toLocaleString()}</strong></p><p>Verified: <strong>UGX {Number(invoice.verified_amount).toLocaleString()}</strong></p><p>Balance: <strong>UGX {Number(invoice.outstanding_balance).toLocaleString()}</strong></p></div>
      <p className={`mt-3 font-medium ${invoice.cleared ? "text-green-700" : "text-amber-700"}`}>{invoice.cleared ? "Full payment verified. All programmes on this invoice are cleared for assessor assignment." : "All programmes remain blocked from assessor assignment until Accounts verifies the full invoice total."}</p>
      {invoice.payment_receipt && <a className="mt-3 inline-block text-blue-600 underline" href={invoice.payment_receipt} target="_blank" rel="noopener noreferrer">View Payment Receipt</a>}
      <InvoiceActions invoice={invoice} />
      {!!invoice.verifications?.length && <div className="mt-4 overflow-x-auto"><h2 className="mb-2 font-semibold">Verification history</h2><table className="w-full text-left text-sm"><thead><tr><th>Date</th><th>Verified by</th><th>Reference</th><th>Cumulative verified amount (UGX)</th></tr></thead><tbody>{invoice.verifications.map((item, index) => <tr key={index} className="border-t"><td className="py-2">{new Date(item.verified_at).toLocaleString()}</td><td>{item.verified_by}</td><td>{item.payment_reference}</td><td>{Number(item.verified_total).toLocaleString()}</td></tr>)}</tbody></table></div>}
    </section>
    <InvoicePaper invoice={invoice} />
  </div>;
}
