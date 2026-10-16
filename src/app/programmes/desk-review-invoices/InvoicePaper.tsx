"use client";

const money = (value?: string | number) => Number(value ?? 0).toLocaleString("en-UG", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

export default function InvoicePaper({ invoice }: { invoice: DeskReviewInvoice }) {
  const bank = invoice.payment_instructions;
  return <article className="mx-auto w-full max-w-4xl border bg-white p-6 text-black shadow-sm sm:p-12" style={{ fontFamily: 'Georgia, "Times New Roman", serif' }} aria-label="Desk review invoice preview">
    {/* eslint-disable-next-line @next/next/no-img-element */}
    <img src="/images/logo2.png" alt="National Council for Higher Education — Ensuring Quality for Excellence" className="mx-auto mb-4 w-full max-w-md" />
    <div className="border-t border-black pt-7">
      <h2 className="mb-7 text-center text-lg font-bold">INVOICE</h2>
      <div className="mb-6 flex flex-wrap justify-between gap-2">
        <p>Date: {invoice.invoice_date || "Assigned on save"}</p>
        <p className="font-bold">No. {invoice.invoice_number || "Assigned on save"}</p>
      </div>
      <p>The Academic Registrar</p>
      <p>{invoice.institution || "Select an institution"}</p>
      {invoice.institution_address && <p className="whitespace-pre-line">{invoice.institution_address}</p>}
      <h3 className="my-6 font-bold">Subject: Programme Accreditation – Desk Review</h3>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-left text-sm [&_td]:border [&_td]:border-black [&_td]:p-3 [&_th]:border [&_th]:border-black [&_th]:p-3">
          <thead><tr><th className="w-2/3">Description</th><th>No.</th><th className="text-right">Total Cost (UGX)</th></tr></thead>
          <tbody>
            {invoice.lines?.map((line) => <tr key={line.application}>
              <td><span className="font-bold">Programme</span><p className="mt-1 italic">{line.programme_name}</p><p className="mt-1 text-xs">{line.application_number}</p></td>
              <td className="align-top text-center">1</td><td className="align-top text-right tabular-nums">{money(line.desk_review_fee)}</td>
            </tr>)}
            {!invoice.lines?.length && <tr><td colSpan={3} className="text-center text-gray-500">Select programmes to add their fee lines.</td></tr>}
            <tr><td colSpan={2}>10% administrative costs</td><td className="text-right tabular-nums">{money(invoice.administrative_fee)}</td></tr>
            <tr className="font-bold"><td colSpan={2}>Total</td><td className="text-right tabular-nums">{money(invoice.grand_total)}</td></tr>
          </tbody>
        </table>
      </div>
      <p className="mt-5 text-sm leading-relaxed">Please remit <strong>UGX {money(invoice.grand_total)}</strong>{invoice.amount_in_words && <> ({invoice.amount_in_words})</>} to the following bank account. All payments should be made through the bank. Upon confirmation of payment, an official receipt will be issued. <strong>Please quote the invoice number when making payments.</strong></p>
      {bank && <div className="my-5 text-sm font-bold leading-relaxed">
        <p>Account Name: {bank.account_name}</p><p>Account No.: {bank.account_number}</p><p>Bank: {bank.bank}</p><p>Branch: {bank.branch}</p>
      </div>}
      <p className="mt-7">Thank you.</p><p className="mt-6 font-bold">For: DIRECTOR FINANCE</p>
    </div>
  </article>;
}
