"use client";

import { Button } from "@/components/ui/button";
import { useDownloadDeskReviewInvoiceMutation } from "@/redux/features/programme-api-slice";
import { Printer } from "lucide-react";
import { toast } from "sonner";

export default function ExportInvoicePdfButton({ invoice }: { invoice: DeskReviewInvoice }) {
  const [download, { isLoading }] = useDownloadDeskReviewInvoiceMutation();
  async function handleDownload() {
    if (!invoice.id) return;
    try {
      const url = await download(invoice.id).unwrap();
      const link = document.createElement("a");
      link.href = url;
      link.download = `${(invoice.invoice_number ?? "invoice").replaceAll("/", "-")}.pdf`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      URL.revokeObjectURL(url);
    } catch { toast.error("Unable to download the invoice. Please try again."); }
  }
  return <Button onClick={handleDownload} disabled={isLoading || !invoice.id}><Printer className="mr-2 h-4 w-4" />{isLoading ? "Generating PDF..." : "Download Invoice PDF"}</Button>;
}
