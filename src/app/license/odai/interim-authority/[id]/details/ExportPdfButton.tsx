"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
    Document,
    Page,
    pdf,
    StyleSheet,
    Text,
    View,
} from "@react-pdf/renderer";
import { Download } from "lucide-react";
import { useMemo, useState } from "react";

type ExportSectionId =
  | "application"
  | "institution"
  | "location"
  | "strategy"
  | "documents";

type ExportSection = {
  id: ExportSectionId;
  title: string;
  description: string;
};

type ExportRow = {
  label: string;
  value: string;
};

type ExportPdfButtonProps = {
  licenseData?: InterimAuthority;
  institution?: Institution;
  paymentPRN?: PaymentPRN;
};

const EXPORT_SECTIONS: ExportSection[] = [
  {
    id: "application",
    title: "Application details",
    description: "Application code, status, and payment reference details.",
  },
  {
    id: "institution",
    title: "Institute details",
    description: "Institution contact and location details.",
  },
  {
    id: "location",
    title: "Location and land",
    description: "Title deed, infrastructure, and promoters.",
  },
  {
    id: "strategy",
    title: "Vision and planning",
    description:
      "Vision, mission, objectives, governance, finance, and programmes.",
  },
  {
    id: "documents",
    title: "Other documents",
    description: "Promoters signatures and project proposal attachments.",
  },
];

const pdfStyles = StyleSheet.create({
  page: {
    paddingTop: 28,
    paddingBottom: 36,
    paddingHorizontal: 28,
    fontSize: 10,
    color: "#0f172a",
    fontFamily: "Helvetica",
    lineHeight: 1.45,
  },
  header: {
    marginBottom: 18,
    borderBottomWidth: 1,
    borderBottomColor: "#cbd5e1",
    paddingBottom: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: 700,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 10,
    color: "#475569",
  },
  section: {
    marginBottom: 14,
    breakInside: "avoid",
  },
  sectionTitle: {
    fontSize: 11,
    fontWeight: 700,
    color: "#7c2d12",
    marginBottom: 8,
    textTransform: "uppercase",
  },
  row: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#e2e8f0",
    paddingVertical: 6,
    gap: 12,
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
  footer: {
    position: "absolute",
    bottom: 18,
    left: 28,
    right: 28,
    fontSize: 9,
    color: "#64748b",
    flexDirection: "row",
    justifyContent: "space-between",
    borderTopWidth: 1,
    borderTopColor: "#e2e8f0",
    paddingTop: 8,
  },
});

function toDisplayValue(value: unknown) {
  if (value === null || value === undefined || value === "") {
    return "-";
  }

  if (typeof value === "boolean") {
    return value ? "Yes" : "No";
  }

  const normalized = String(value)
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/\s+/g, " ")
    .trim();

  return normalized || "-";
}

function toFileName(file: string | File | null | undefined) {
  if (!file) {
    return "-";
  }

  if (file instanceof File) {
    return file.name;
  }

  return file.split("/").pop() || file;
}

function formatCurrency(value: number | null | undefined) {
  if (value === null || value === undefined || Number.isNaN(value)) {
    return "-";
  }

  return `UGX ${new Intl.NumberFormat("en-UG").format(value)}`;
}

function buildExportRows(
  licenseData?: InterimAuthority,
  institution?: Institution,
  paymentPRN?: PaymentPRN,
) {
  const sections: Record<ExportSectionId, ExportRow[]> = {
    application: [
      {
        label: "Application code",
        value: toDisplayValue(licenseData?.application_code),
      },
      { label: "Status", value: toDisplayValue(licenseData?.status) },
      { label: "PRN", value: toDisplayValue(paymentPRN?.prn) },
      { label: "Search code", value: toDisplayValue(paymentPRN?.searchCode) },
      { label: "PRN amount", value: formatCurrency(paymentPRN?.amount) },
      {
        label: "PRN reconciled",
        value: toDisplayValue(paymentPRN?.prn_reconciled),
      },
    ],
    institution: [
      { label: "Institution name", value: toDisplayValue(institution?.name) },
      { label: "Acronym", value: toDisplayValue(institution?.acroynm) },
      {
        label: "Postal address",
        value: toDisplayValue(institution?.postal_address),
      },
      { label: "Website", value: toDisplayValue(institution?.website) },
      { label: "Landline", value: toDisplayValue(institution?.landline) },
      { label: "Mobile", value: toDisplayValue(institution?.phone) },
      { label: "Region", value: toDisplayValue(institution?.region) },
      { label: "District", value: toDisplayValue(institution?.district) },
      { label: "Location", value: toDisplayValue(institution?.location) },
    ],
    location: [
      {
        label: "Has title deed",
        value: toDisplayValue(licenseData?.has_title_deed),
      },
      { label: "Title deed", value: toFileName(licenseData?.title_deed) },
      {
        label: "Existing infrastructure",
        value: toDisplayValue(licenseData?.infrastructure),
      },
      {
        label: "University promoters",
        value: toDisplayValue(licenseData?.names_of_promoters),
      },
    ],
    strategy: [
      { label: "Vision", value: toDisplayValue(licenseData?.vision) },
      { label: "Mission", value: toDisplayValue(licenseData?.mission) },
      { label: "Objectives", value: toDisplayValue(licenseData?.objectives) },
      { label: "Philosophy", value: toDisplayValue(licenseData?.philosophy) },
      {
        label: "Governance structures",
        value: toDisplayValue(licenseData?.governance_structure),
      },
      {
        label: "Human resources",
        value: toDisplayValue(licenseData?.human_resources),
      },
      {
        label: "Source of finance",
        value: toDisplayValue(licenseData?.source_of_finance),
      },
      { label: "Action plan", value: toDisplayValue(licenseData?.action_plan) },
      {
        label: "Planned programmes of study",
        value: toDisplayValue(licenseData?.programmes),
      },
    ],
    documents: [
      {
        label: "Promoters signatures",
        value: toFileName(licenseData?.promoters),
      },
      {
        label: "Project proposal",
        value: toFileName(licenseData?.project_proposal),
      },
    ],
  };

  return sections;
}

function InterimPdfDocument({
  licenseData,
  institution,
  paymentPRN,
  selectedSections,
}: ExportPdfButtonProps & { selectedSections: ExportSectionId[] }) {
  const sectionRows = buildExportRows(licenseData, institution, paymentPRN);

  return (
    <Document
      title={`Interim Authority ${licenseData?.application_code ?? "details"}`}
    >
      <Page size="A4" style={pdfStyles.page}>
        <View style={pdfStyles.header}>
          <Text style={pdfStyles.title}>
            Interim Authority Application Details
          </Text>
          <Text style={pdfStyles.subtitle}>
            Application: {toDisplayValue(licenseData?.application_code)}
          </Text>
        </View>

        {EXPORT_SECTIONS.filter((section) =>
          selectedSections.includes(section.id),
        ).map((section) => (
          <View key={section.id} style={pdfStyles.section}>
            <Text style={pdfStyles.sectionTitle}>{section.title}</Text>
            {sectionRows[section.id]
              .filter((row) => row.value !== "-")
              .map((row) => (
                <View key={`${section.id}-${row.label}`} style={pdfStyles.row}>
                  <Text style={pdfStyles.label}>{row.label}</Text>
                  <Text style={pdfStyles.value}>{row.value}</Text>
                </View>
              ))}
          </View>
        ))}

        <View style={pdfStyles.footer} fixed>
          <Text>NCHE IMIS export</Text>
          <Text
            render={({ pageNumber, totalPages }) =>
              `Page ${pageNumber} of ${totalPages}`
            }
          />
        </View>
      </Page>
    </Document>
  );
}

export default function ExportPdfButton({
  licenseData,
  institution,
  paymentPRN,
}: ExportPdfButtonProps) {
  const [open, setOpen] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedSections, setSelectedSections] = useState<ExportSectionId[]>(
    EXPORT_SECTIONS.map((section) => section.id),
  );

  const canExport = Boolean(licenseData);
  const selectedCount = selectedSections.length;
  const allSelected = selectedCount === EXPORT_SECTIONS.length;

  const fileName = useMemo(() => {
    const code =
      licenseData?.application_code?.replace(/[^a-zA-Z0-9-_]+/g, "-") ||
      "interim-authority-details";
    return `${code}.pdf`;
  }, [licenseData?.application_code]);

  const toggleSection = (sectionId: ExportSectionId, checked: boolean) => {
    setSelectedSections((current) => {
      if (checked) {
        return current.includes(sectionId) ? current : [...current, sectionId];
      }

      return current.filter((item) => item !== sectionId);
    });
  };

  const toggleAllSections = () => {
    setSelectedSections(
      allSelected ? [] : EXPORT_SECTIONS.map((section) => section.id),
    );
  };

  const handleDownload = async () => {
    if (!canExport || selectedSections.length === 0) {
      return;
    }

    setIsGenerating(true);

    try {
      const blob = await pdf(
        <InterimPdfDocument
          licenseData={licenseData}
          institution={institution}
          paymentPRN={paymentPRN}
          selectedSections={selectedSections}
        />,
      ).toBlob();

      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      link.remove();
      URL.revokeObjectURL(url);
      setOpen(false);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <>
      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={() => setOpen(true)}
        disabled={!canExport}
      >
        <Download className="size-4" />
        Export PDF
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-xl">
          <DialogHeader>
            <DialogTitle>Export selected sections</DialogTitle>
            <DialogDescription>
              Choose the sections to include in the generated PDF. The document
              is rendered with selectable text.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="flex items-center justify-between rounded-lg border p-3">
              <div>
                <p className="text-sm font-medium">All sections</p>
                <p className="text-sm text-muted-foreground">
                  {selectedCount} of {EXPORT_SECTIONS.length} selected
                </p>
              </div>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={toggleAllSections}
              >
                {allSelected ? "Clear all" : "Select all"}
              </Button>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {EXPORT_SECTIONS.map((section) => {
                const checked = selectedSections.includes(section.id);

                return (
                  <div
                    key={section.id}
                    className="flex items-start gap-3 rounded-lg border p-3"
                  >
                    <Checkbox
                      id={`interim-export-section-${section.id}`}
                      checked={checked}
                      onCheckedChange={(value) =>
                        toggleSection(section.id, !!value)
                      }
                    />
                    <div className="space-y-1">
                      <Label htmlFor={`interim-export-section-${section.id}`}>
                        {section.title}
                      </Label>
                      <p className="text-sm text-muted-foreground">
                        {section.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
            <Button
              type="button"
              onClick={handleDownload}
              disabled={
                !canExport || selectedSections.length === 0 || isGenerating
              }
            >
              {isGenerating ? "Generating PDF..." : "Download PDF"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
