"use client";

import { Button } from "@/components/ui/button";
import {
    Document,
    Image,
    Page,
    StyleSheet,
    Text,
    View,
    pdf,
} from "@react-pdf/renderer";
import { Download } from "lucide-react";
import { useMemo, useState } from "react";

type InvoicePdfItem = {
  item_type?: string;
  persons_number?: number;
  number_of_days?: number;
  total?: string | number;
};

type InvoicePdfData = {
  invoice_number?: string;
  application?: string | number;
  application_number?: string;
  institution?: string;
  invoice_date?: string;
  payment_reference?: string;
  payment_date?: string;
  status?: string;
  grand_total?: string | number;
  invoice_amount?: string | number;
  invoice_items?: InvoicePdfItem[];
};

type ExportInvoicePdfButtonProps = {
  invoice: InvoicePdfData;
};

const ORGANIZATION_NAME = "Uganda National Council for Higher Education";
const ORGANIZATION_SHORT = "National Council for Higher Education (NCHE)";
const PRIMARY_PDF_COLOR = "#1f3f73";

const pdfStyles = StyleSheet.create({
  page: {
    paddingTop: 24,
    paddingBottom: 30,
    paddingHorizontal: 28,
    fontSize: 10,
    fontFamily: "Helvetica",
    color: "#0f172a",
  },
  contentWrapper: {
    borderWidth: 2,
    borderColor: PRIMARY_PDF_COLOR,
    borderRadius: 6,
    paddingTop: 12,
    paddingBottom: 14,
    paddingHorizontal: 12,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#cbd5e1",
    paddingBottom: 10,
    marginBottom: 14,
  },
  logo: {
    width: 50,
    height: 50,
    objectFit: "contain",
  },
  headerText: {
    flexGrow: 1,
  },
  orgName: {
    fontSize: 12,
    fontWeight: 700,
    marginBottom: 2,
  },
  reportTitle: {
    fontSize: 11,
    color: "#334155",
  },
  sectionTitle: {
    fontSize: 11,
    fontWeight: 700,
    marginBottom: 8,
    color: "#7c2d12",
    textTransform: "uppercase",
  },
  detailsWrap: {
    marginBottom: 16,
  },
  row: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#e2e8f0",
    paddingVertical: 6,
  },
  label: {
    width: "38%",
    fontWeight: 700,
    color: "#334155",
  },
  value: {
    width: "62%",
    color: "#0f172a",
  },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#f1f5f9",
    borderWidth: 1,
    borderColor: "#cbd5e1",
    paddingVertical: 6,
    paddingHorizontal: 6,
    fontWeight: 700,
  },
  tableRow: {
    flexDirection: "row",
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderColor: "#cbd5e1",
    paddingVertical: 6,
    paddingHorizontal: 6,
  },
  colType: { width: "43%" },
  colPersons: { width: "19%" },
  colDays: { width: "18%" },
  colTotal: { width: "20%", textAlign: "right" },
  footer: {
    position: "absolute",
    bottom: 16,
    left: 28,
    right: 28,
    fontSize: 9,
    color: "#64748b",
    borderTopWidth: 1,
    borderTopColor: "#e2e8f0",
    paddingTop: 6,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  helperText: {
    marginTop: 6,
    fontSize: 12,
    color: "#b91c1c",
  },
});

function formatDate(value?: string) {
  if (!value) return "-";

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;

  return date.toLocaleDateString();
}

function formatCurrency(value?: string | number) {
  if (value === undefined || value === null || value === "") return "0";

  const numericValue = typeof value === "number" ? value : Number(value);
  if (Number.isNaN(numericValue)) return String(value);

  return numericValue.toLocaleString("en-UG");
}

function InvoicePdfDocument({
  invoice,
  logoUrl,
}: {
  invoice: InvoicePdfData;
  logoUrl: string;
}) {
  const items = invoice.invoice_items ?? [];

  return (
    <Document>
      <Page size="A4" style={pdfStyles.page}>
        <View style={pdfStyles.contentWrapper}>
          <View style={pdfStyles.header}>
            <Image src={logoUrl} style={pdfStyles.logo} />
            <View style={pdfStyles.headerText}>
              <Text style={pdfStyles.orgName}>{ORGANIZATION_NAME}</Text>
              <Text style={pdfStyles.reportTitle}>
                Programme Invoice Details
              </Text>
              <Text style={pdfStyles.reportTitle}>{ORGANIZATION_SHORT}</Text>
            </View>
          </View>

          <View style={pdfStyles.detailsWrap}>
            <Text style={pdfStyles.sectionTitle}>Invoice Information</Text>

            <View style={pdfStyles.row}>
              <Text style={pdfStyles.label}>Invoice Number</Text>
              <Text style={pdfStyles.value}>
                {invoice.invoice_number ?? "-"}
              </Text>
            </View>
            <View style={pdfStyles.row}>
              <Text style={pdfStyles.label}>Application Number</Text>
              <Text style={pdfStyles.value}>
                {String(
                  invoice.application ?? invoice.application_number ?? "-",
                )}
              </Text>
            </View>
            <View style={pdfStyles.row}>
              <Text style={pdfStyles.label}>Institution</Text>
              <Text style={pdfStyles.value}>{invoice.institution ?? "-"}</Text>
            </View>
            <View style={pdfStyles.row}>
              <Text style={pdfStyles.label}>Invoice Date</Text>
              <Text style={pdfStyles.value}>
                {formatDate(invoice.invoice_date)}
              </Text>
            </View>
            <View style={pdfStyles.row}>
              <Text style={pdfStyles.label}>Payment Date</Text>
              <Text style={pdfStyles.value}>
                {formatDate(invoice.payment_date)}
              </Text>
            </View>
            <View style={pdfStyles.row}>
              <Text style={pdfStyles.label}>Status</Text>
              <Text style={pdfStyles.value}>{invoice.status ?? "-"}</Text>
            </View>
            <View style={pdfStyles.row}>
              <Text style={pdfStyles.label}>Grand Total</Text>
              <Text style={pdfStyles.value}>
                {formatCurrency(invoice.grand_total ?? invoice.invoice_amount)}
              </Text>
            </View>
          </View>

          <View>
            <Text style={pdfStyles.sectionTitle}>Invoice Items</Text>

            <View style={pdfStyles.tableHeader}>
              <Text style={pdfStyles.colType}>Item Type</Text>
              <Text style={pdfStyles.colPersons}>Persons</Text>
              <Text style={pdfStyles.colDays}>Days</Text>
              <Text style={pdfStyles.colTotal}>Total</Text>
            </View>

            {items.length ? (
              items.map((item, index) => (
                <View
                  key={`${item.item_type ?? "item"}-${index}`}
                  style={pdfStyles.tableRow}
                >
                  <Text style={pdfStyles.colType}>{item.item_type ?? "-"}</Text>
                  <Text style={pdfStyles.colPersons}>
                    {String(item.persons_number ?? 0)}
                  </Text>
                  <Text style={pdfStyles.colDays}>
                    {String(item.number_of_days ?? 0)}
                  </Text>
                  <Text style={pdfStyles.colTotal}>
                    {formatCurrency(item.total)}
                  </Text>
                </View>
              ))
            ) : (
              <View style={pdfStyles.tableRow}>
                <Text style={pdfStyles.colType}>
                  No invoice items available
                </Text>
                <Text style={pdfStyles.colPersons}>-</Text>
                <Text style={pdfStyles.colDays}>-</Text>
                <Text style={pdfStyles.colTotal}>-</Text>
              </View>
            )}
          </View>
        </View>

        <View style={pdfStyles.footer} fixed>
          <Text>NCHE IMIS invoice export</Text>
          <Text>{new Date().toLocaleString()}</Text>
        </View>
      </Page>
    </Document>
  );
}

export default function ExportInvoicePdfButton({
  invoice,
}: ExportInvoicePdfButtonProps) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const fileName = useMemo(() => {
    const invoiceNumber = invoice.invoice_number;
    if (!invoiceNumber) {
      return "programme-invoice-details.pdf";
    }

    return `${invoiceNumber.replace(/[\\/:*?"<>|]/g, "-")}.pdf`;
  }, [invoice.invoice_number]);

  const handleDownload = async () => {
    setErrorMessage(null);
    setIsGenerating(true);

    try {
      const logoUrl = `${window.location.origin}/images/logo2.png`;
      const blob = await pdf(
        <InvoicePdfDocument invoice={invoice} logoUrl={logoUrl} />,
      ).toBlob();

      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      link.remove();
      URL.revokeObjectURL(url);
    } catch {
      setErrorMessage("Failed to generate PDF. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="flex flex-col items-end gap-1">
      <Button onClick={handleDownload} disabled={isGenerating}>
        <Download className="h-4 w-4 mr-2" />
        {isGenerating ? "Generating PDF..." : "Export PDF"}
      </Button>
      {errorMessage ? (
        <p className="text-xs text-red-600">{errorMessage}</p>
      ) : null}
    </div>
  );
}
