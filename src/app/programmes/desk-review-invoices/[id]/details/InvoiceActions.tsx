"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import DeskReviewFeeInput from "../../DeskReviewFeeInput";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useUpdateDeskReviewInvoiceMutation, useSendDeskReviewInvoiceMutation, useAcknowledgeDeskReviewPaymentMutation } from "@/redux/features/programme-api-slice";

function errorMessage(error: unknown) {
  if (error && typeof error === "object" && "data" in error) {
    const data = error.data;
    if (data && typeof data === "object") return Object.values(data).flat().join(" ");
    if (typeof data === "string") return data;
  }
  return "The invoice could not be updated. Please try again.";
}

export default function InvoiceActions({ invoice }: { invoice: DeskReviewInvoice }) {
  const router = useRouter();
  const [action, setAction] = useState<"edit" | "send" | "acknowledge" | null>(null);
  const [lines, setLines] = useState<DeskReviewInvoiceLine[]>([]);
  const [verifiedAmount, setVerifiedAmount] = useState("");
  const [update, updateState] = useUpdateDeskReviewInvoiceMutation();
  const [send, sendState] = useSendDeskReviewInvoiceMutation();
  const [acknowledge, acknowledgeState] = useAcknowledgeDeskReviewPaymentMutation();
  const busy = updateState.isLoading || sendState.isLoading || acknowledgeState.isLoading;
  if ((!invoice.can_manage && !invoice.can_send) || !invoice.id) return null;
  const draft = invoice.status?.toLowerCase() === "draft";
  const paid = invoice.status?.toLowerCase() === "paid";

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!invoice.id || busy) return;
    try {
      if (action === "edit") {
        await update({ id: invoice.id, lines: lines.map(({ application, desk_review_fee }) => ({ application, desk_review_fee })) }).unwrap();
        toast.success("Invoice updated.");
      } else if (action === "send") {
        await send(invoice.id).unwrap();
        toast.success("Invoice sent to the institution.");
        router.push("/programmes/desk-review-invoices");
      } else if (action === "acknowledge") {
        const result = await acknowledge({ id: invoice.id, verified_amount: verifiedAmount }).unwrap();
        toast.success(result.cleared ? "Full payment verified. All programmes are cleared for assessor assignment." : "Verified amount recorded. Programmes remain blocked until the balance is paid.");
      }
      setAction(null);
    } catch (error) {
      toast.error(errorMessage(error));
    }
  }

  return <>
    <div className="my-4 flex flex-wrap gap-2">
      {draft && invoice.can_send && <>
        <Button variant="outline" onClick={() => { setLines((invoice.lines ?? []).map((line) => ({ ...line }))); setAction("edit"); }}>Edit Programme Fees</Button>
        <Button onClick={() => setAction("send")}>Send Invoice to Institution</Button>
      </>}
      {paid && invoice.can_manage && <Button onClick={() => { setVerifiedAmount(""); setAction("acknowledge"); }}>Verify & Acknowledge Payment</Button>}
    </div>
    <Dialog open={action !== null} onOpenChange={(open) => { if (!open && !busy) setAction(null); }}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{action === "edit" ? "Edit Invoice" : action === "send" ? "Send Invoice to Institution" : "Acknowledge Payment"}</DialogTitle>
          <DialogDescription>
            {action === "edit" ? "The 10% administrative fee and invoice total will be recalculated from the programme fees." : action === "send" ? "The institution will receive the invoice by email. Programme lines and fees will be locked." : "Check the receipt and payment reference against the payment received. Enter the total amount verified to date, including previous verifications. Every programme remains blocked until the full invoice total is verified."}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={submit} className="space-y-4">
          {action === "edit" ? <div className="space-y-2">
            {lines.map((line, index) => <div key={line.application} className="space-y-2">
              <Label htmlFor={`fee-${line.application}`}>{line.programme_name} (UGX)</Label>
              <DeskReviewFeeInput id={`fee-${line.application}`} value={line.desk_review_fee} onValueChange={(value) => setLines((previous) => previous.map((item, i) => i === index ? { ...item, desk_review_fee: value } : item))} required disabled={busy} />
            </div>)}
          </div> : <div className="space-y-2 [overflow-wrap:anywhere]">
            <p>Invoice: {invoice.invoice_number}</p>
            <p>Total: UGX {Number(invoice.grand_total).toLocaleString()}</p>
            {action === "acknowledge" && <>
              <p>Reference: {invoice.payment_reference}</p>
              <p>Payment date: {invoice.payment_date}</p>
              <p>Previously verified: UGX {Number(invoice.verified_amount).toLocaleString()}</p>
              <p>Outstanding balance: UGX {Number(invoice.outstanding_balance).toLocaleString()}</p>
              {invoice.payment_receipt && <a href={invoice.payment_receipt} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">View Payment Receipt</a>}
              <Label htmlFor="verified-total">Cumulative verified amount (UGX)</Label>
              <Input id="verified-total" type="number" min={(Number(invoice.verified_amount) + 0.01).toFixed(2)} max={Number(invoice.grand_total)} step="0.01" required disabled={busy} value={verifiedAmount} onChange={(event) => setVerifiedAmount(event.target.value)} />
            </>}
          </div>}
          <DialogFooter>
            <Button type="button" variant="outline" disabled={busy} onClick={() => setAction(null)}>Cancel</Button>
            <Button type="submit" disabled={busy}>{busy ? "Submitting..." : action === "edit" ? "Save Changes" : action === "send" ? "Send Invoice" : "Acknowledge Payment"}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  </>;
}
