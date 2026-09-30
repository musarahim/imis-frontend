"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
  const [action, setAction] = useState<"edit" | "send" | "acknowledge" | null>(null);
  const [fee, setFee] = useState("");
  const [update, updateState] = useUpdateDeskReviewInvoiceMutation();
  const [send, sendState] = useSendDeskReviewInvoiceMutation();
  const [acknowledge, acknowledgeState] = useAcknowledgeDeskReviewPaymentMutation();
  const busy = updateState.isLoading || sendState.isLoading || acknowledgeState.isLoading;
  if (!invoice.can_manage || !invoice.id) return null;
  const draft = invoice.status?.toLowerCase() === "draft";
  const paid = invoice.status?.toLowerCase() === "paid";

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!invoice.id || busy) return;
    try {
      if (action === "edit") {
        await update({ id: invoice.id, desk_review_fee: fee }).unwrap();
        toast.success("Invoice updated.");
      } else if (action === "send") {
        await send(invoice.id).unwrap();
        toast.success("Invoice sent to the institution.");
      } else if (action === "acknowledge") {
        await acknowledge(invoice.id).unwrap();
        toast.success("Payment acknowledged. The institution has been notified.");
      }
      setAction(null);
    } catch (error) {
      toast.error(errorMessage(error));
    }
  }

  return <>
    <div className="my-4 flex flex-wrap gap-2">
      {draft && <>
        <Button variant="outline" onClick={() => { setFee(invoice.desk_review_fee ?? ""); setAction("edit"); }}>Edit Invoice</Button>
        <Button onClick={() => setAction("send")}>Send Invoice to Institution</Button>
      </>}
      {paid && <Button onClick={() => setAction("acknowledge")}>Verify & Acknowledge Payment</Button>}
    </div>
    <Dialog open={action !== null} onOpenChange={(open) => { if (!open && !busy) setAction(null); }}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{action === "edit" ? "Edit Invoice" : action === "send" ? "Send Invoice to Institution" : "Acknowledge Payment"}</DialogTitle>
          <DialogDescription>
            {action === "edit" ? "The 10% administrative fee and total will be recalculated." : action === "send" ? "The institution will receive the invoice by email and can view it in their portal. The issued amount will be locked." : "Confirm that you have checked the receipt and payment reference against the payment received. This will allow the application to proceed."}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={submit} className="space-y-4">
          {action === "edit" ? <div className="space-y-2">
            <Label htmlFor="desk-review-fee">Desk Review Fee (UGX)</Label>
            <Input id="desk-review-fee" type="number" min="0.01" max="90909090.90" step="0.01" value={fee} onChange={(event) => setFee(event.target.value)} required disabled={busy} />
          </div> : <div className="space-y-2 [overflow-wrap:anywhere]">
            <p>Invoice: {invoice.invoice_number}</p>
            <p>Total: UGX {Number(invoice.grand_total).toLocaleString()}</p>
            {action === "acknowledge" && <>
              <p>Reference: {invoice.payment_reference}</p>
              <p>Payment date: {invoice.payment_date}</p>
              {invoice.payment_receipt && <a href={invoice.payment_receipt} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">View Payment Receipt</a>}
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
