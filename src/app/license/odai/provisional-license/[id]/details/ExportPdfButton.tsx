"use client";
import { parseProvisionalObjectives } from "@/utils/provisionalObjectives";

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
  | "infrastructure"
  | "facilities"
  | "staff"
  | "finance"
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
  licenseData?: UniversityProvisionalLicense;
  institution?: Institution;
  paymentPRN?: PaymentPRN;
};

const EXPORT_SECTIONS: ExportSection[] = [
  {
    id: "application",
    title: "Application details",
    description: "Application code and payment reference details.",
  },
  {
    id: "institution",
    title: "Institute details",
    description: "Institution contact and location details.",
  },
  {
    id: "location",
    title: "Location and land",
    description: "Land ownership, use, and agreements.",
  },
  {
    id: "infrastructure",
    title: "Infrastructure",
    description: "Buildings, grounds, utilities, and transport.",
  },
  {
    id: "facilities",
    title: "Educational facilities",
    description: "Library, computers, connectivity, and learning facilities.",
  },
  {
    id: "staff",
    title: "Staff and governance",
    description: "Staffing, leadership, and ownership information.",
  },
  {
    id: "finance",
    title: "Financial management",
    description: "Budget, income, and expenditure allocations.",
  },
  {
    id: "strategy",
    title: "Strategy and students",
    description: "Vision, mission, programmes, and student distribution.",
  },
  {
    id: "documents",
    title: "Supporting documents",
    description: "Attached file names included in the application.",
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

function toDisplayValue(value: unknown, suffix?: string) {
  if (value === null || value === undefined || value === "") {
    return "-";
  }

  if (typeof value === "boolean") {
    return value ? "Yes" : "No";
  }

  if (Array.isArray(value)) {
    return value.length ? value.join(", ") : "-";
  }

  const normalized = String(value)
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/\s+/g, " ")
    .trim();

  if (!normalized) {
    return "-";
  }

  return suffix ? `${normalized} ${suffix}` : normalized;
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
  licenseData?: UniversityProvisionalLicense,
  institution?: Institution,
  paymentPRN?: PaymentPRN,
) {
  const sections: Record<ExportSectionId, ExportRow[]> = {
    application: [
      {
        label: "Application code",
        value: toDisplayValue(licenseData?.application_code),
      },
      { label: "PRN", value: toDisplayValue(paymentPRN?.prn) },
      { label: "Search code", value: toDisplayValue(paymentPRN?.searchCode) },
      { label: "PRN amount", value: formatCurrency(paymentPRN?.amount) },
      {
        label: "PRN reconciled",
        value: toDisplayValue(paymentPRN?.prn_reconciled),
      },
      { label: "Status", value: toDisplayValue(licenseData?.status) },
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
{ label: "County", value: toDisplayValue(institution?.county_name) },
{ label: "Sub-county", value: toDisplayValue(institution?.sub_county_name) },
{ label: "Parish", value: toDisplayValue(institution?.parish_name) },
{ label: "Village", value: toDisplayValue(institution?.village_name) },
      { label: "Location", value: toDisplayValue(institution?.location) },
    ],
    location: [
      { label: "Geographical location", value: toDisplayValue(licenseData?.geographical_location) },
      {
        label: "Amount of land owned",
        value: toDisplayValue(licenseData?.amount_of_land, "acres"),
      },
      {
        label: "Amount of land in current use",
        value: toDisplayValue(licenseData?.land_in_use, "acres"),
      },
      {
        label: "Amount of land for future use",
        value: toDisplayValue(licenseData?.land_for_future_use, "acres"),
      },
      {
        label: "Years of acquisition",
        value: toDisplayValue(licenseData?.year_obtained),
      },
      {
        label: "Leased or rented",
        value: toDisplayValue(licenseData?.leased_or_rented),
      },
      {
        label: "Lease or rent agreement",
        value: toFileName(licenseData?.lease_or_rent_agreement),
      },
    ],
    infrastructure: [
      {
        label: "Classrooms",
        value: toDisplayValue(licenseData?.classrooms, "sqm"),
      },
      {
        label: "Libraries",
        value: toDisplayValue(licenseData?.libraries, "sqm"),
      },
      {
        label: "Science laboratories",
        value: toDisplayValue(licenseData?.science_labs, "sqm"),
      },
      {
        label: "Computer laboratories",
        value: toDisplayValue(licenseData?.computer_labs, "sqm"),
      },
      {
        label: "Staff houses area",
        value: toDisplayValue(licenseData?.staff_houses, "sqm"),
      },
      {
        label: "Number of staff houses",
        value: toDisplayValue(licenseData?.staff_houses, "houses"),
      },
      {
        label: "Administrative staff area",
        value: toDisplayValue(licenseData?.administrative_staff_area, "sqm"),
      },
      {
        label: "Area for staff use",
        value: toDisplayValue(licenseData?.area_for_staff_use, "sqm"),
      },
      {
        label: "Administrative block area",
        value: toDisplayValue(licenseData?.administrative_block_area, "sqm"),
      },
      {
        label: "Student welfare offices",
        value: toDisplayValue((licenseData?.student_Welfare_offices ?? licenseData?.student_welfare_offices), "sqm"),
      },
      {
        label: "Sick bay area",
        value: toDisplayValue(licenseData?.sick_bay_area, "sqm"),
      },
      {
        label: "Meeting hall area",
        value: toDisplayValue(licenseData?.meeting_hall_area, "sqm"),
      },
      {
        label: "Campus master plan",
        value: toFileName(licenseData?.master_plan),
      },
      {
        label: "Area of playgrounds",
        value: toDisplayValue(licenseData?.area_of_playground, "sqm"),
      },
      {
        label: "Types of playgrounds available",
        value: toDisplayValue(licenseData?.available_playgrounds),
      },
      {
        label: "Area of empty space",
        value: toDisplayValue(licenseData?.area_of_empty_space, "sqm"),
      },
      {
        label: "Total mileage of roads and paths",
        value: toDisplayValue(licenseData?.total_roads_mileage, "sqm"),
      },
      {
        label: "Sources of water",
        value: toDisplayValue(licenseData?.water_source),
      },
      {
        label: "Power source",
        value: toDisplayValue(licenseData?.power_source),
      },
      {
        label: "Has land suitable for agriculture",
        value: toDisplayValue(licenseData?.has_cultivable_land),
      },
      {
        label: "Cultivable land",
        value: toDisplayValue(licenseData?.cultivable_land, "acres"),
      },
      {
        label: "Number of vehicles",
        value: toDisplayValue(licenseData?.number_of_vehicles),
      },
      {
        label: "Vehicle registration details",
        value: toDisplayValue(licenseData?.vehicles?.length ? licenseData.vehicles.map((vehicle) => `${vehicle.make} - ${vehicle.registration_number}`).join("\n") : licenseData?.vehicle_registration),
      },
    ],
    facilities: [
      {
        label: "Library books",
        value: toDisplayValue(licenseData?.library_books),
      },
      { label: "Textbooks", value: toDisplayValue(licenseData?.text_books) },
      {
        label: "Publication years",
        value: toDisplayValue(licenseData?.publication_years),
      },
      {
        label: "Student computers",
        value: toDisplayValue(licenseData?.computers_in_use),
      },
      {
        label: "Computers in the library",
        value: toDisplayValue(licenseData?.computers_in_library),
      },
      {
        label: "Academic staff computers",
        value: toDisplayValue(licenseData?.academic_staff_computers),
      },
      {
        label: "Computers in administration",
        value: toDisplayValue(licenseData?.administrative_staff_computers),
      },
      {
        label: "Library computer program",
        value: toDisplayValue(licenseData?.library_computer_software),
      },
      {
        label: "Students have access to computers",
        value: toDisplayValue(licenseData?.students_have_access),
      },
      {
        label: "University has internet access",
        value: toDisplayValue(licenseData?.has_internet_access),
      },
      {
        label: "Internet Service Provider (ISP)",
        value: toDisplayValue(licenseData?.ISP_provider),
      },
      {
        label: "Number of library seats",
        value: toDisplayValue(licenseData?.library_seats),
      },
      {
        label: "Number of classroom seats",
        value: toDisplayValue(licenseData?.classroom_seats),
      },
      {
        label: "Number of laboratories seats",
        value: toDisplayValue(licenseData?.laboratories_seats),
      },
      {
        label: "Administration block seats",
        value: toDisplayValue(licenseData?.administration_block_seats),
      },
      {
        label: "Student accommodation facilities",
        value: toDisplayValue(licenseData?.student_facilities?.trim() || "No residential / student accommodation proposed"),
      },
    ],
    staff: [
      {
        label: "Full time academic staff",
        value: toDisplayValue(licenseData?.intended_full_time_academic_staff),
      },
      {
        label: "Part time academic staff",
        value: toDisplayValue(licenseData?.intended_part_time_academic_staff),
      },
      {
        label: "Full time administrative staff",
        value: toDisplayValue(licenseData?.intended_full_time_admin_staff),
      },
      {
        label: "Academic staff support",
        value: toDisplayValue(licenseData?.intended_support_staff),
      },
      {
        label: "Proposed council members",
        value: toDisplayValue(licenseData?.council_members),
      },
      {
        label: "Proposed chancellor",
        value: toDisplayValue(licenseData?.proposed_chancellor),
      },
      {
        label: "Proposed vice chancellor",
        value: toDisplayValue(licenseData?.proposed_vice_chancellor),
      },
      {
        label: "Proposed university secretary",
        value: toDisplayValue(licenseData?.proposed_university_secretary),
      },
      {
        label: "Proposed academic registrar",
        value: toDisplayValue(licenseData?.proposed_academic_registrar),
      },
      {
        label: "Heads of faculties",
        value: toDisplayValue(licenseData?.heads_of_faculties),
      },
      {
        label: "Owners of the proposed university",
        value: toDisplayValue(licenseData?.institution_ownership),
      },
      {
        label: "Promoters of the university",
        value: toDisplayValue(licenseData?.university_promoters),
      },
    ],
    finance: [
      {
        label: "Other assets",
        value: toDisplayValue(licenseData?.other_assets),
      },
      {
        label: "Proposed annual budget",
        value: formatCurrency(licenseData?.annual_budget),
      },
      { label: "Fee structure", value: toFileName(licenseData?.fee_structure) },
      {
        label: "Budget derived from fees",
        value: toDisplayValue(licenseData?.fees_percent_budget, "%"),
      },
      {
        label: "Other sources of revenue",
        value: toDisplayValue(licenseData?.other_income_sources),
      },
      {
        label: "Infrastructure development allocation",
        value: formatCurrency(licenseData?.infrastructure_development),
      },
      {
        label: "Research development allocation",
        value: formatCurrency(licenseData?.research_development),
      },
      {
        label: "Computer hardware and software allocation",
        value: formatCurrency(licenseData?.computer_hardware_software),
      },
      {
        label: "Science lab equipment allocation",
        value: formatCurrency(licenseData?.science_lab_equipment),
      },
      {
        label: "Library equipment allocation",
        value: formatCurrency(licenseData?.library_equipment),
      },
      {
        label: "Staff development allocation",
        value: formatCurrency(licenseData?.staff_development),
      },
      {
        label: "Budget for staff salaries",
        value: toDisplayValue(licenseData?.staff_salaries, "%"),
      },
      {
        label: "Current bankers",
        value: toDisplayValue(licenseData?.current_bankers),
      },
    ],
    strategy: [
      { label: "Vision", value: toDisplayValue(licenseData?.vision) },
      { label: "Mission", value: toDisplayValue(licenseData?.mission) },
      {
        label: "Objectives",
        value: toDisplayValue(parseProvisionalObjectives(licenseData?.specific_objectives).map((objective, index) => `${index + 1}. ${objective}`).join("\n")),
      },
      {
        label: "Strategic plan",
        value: toFileName(licenseData?.stractegic_plan),
      },
      {
        label: "University programmes",
        value: toFileName(licenseData?.programmes),
      },
      {
        label: "Area of competence",
        value: toDisplayValue(licenseData?.area_of_competence),
      },
      {
        label: "Future planned programmes",
        value: toDisplayValue(licenseData?.feature_programmes),
      },
      {
        label: "Total number of students",
        value: toDisplayValue(licenseData?.total_number_of_students),
      },
      {
        label: "Arts",
        value: toDisplayValue(licenseData?.arts_percentage, "%"),
      },
      {
        label: "Social sciences",
        value: toDisplayValue(licenseData?.social_sciences_percentage, "%"),
      },
      {
        label: "Basic sciences",
        value: toDisplayValue(licenseData?.basic_sciences_percentage, "%"),
      },
      {
        label: "Arts education",
        value: toDisplayValue(licenseData?.arts_education_percentage, "%"),
      },
      {
        label: "Agriculture",
        value: toDisplayValue(licenseData?.agriculture_percentage, "%"),
      },
      {
        label: "Engineering and technology",
        value: toDisplayValue(licenseData?.engineering_percentage, "%"),
      },
      {
        label: "Medicine",
        value: toDisplayValue(licenseData?.medicine_percentage, "%"),
      },
      {
        label: "Veterinary medicine",
        value: toDisplayValue(licenseData?.veterinary_percentage, "%"),
      },
    ],
    documents: [
      {
        label: "Signatures of the officers",
        value: toFileName(licenseData?.signatures),
      },
      {
        label: "CVs of the members",
        value: toFileName(licenseData?.member_cvs),
      },
      {
        label: "Financial control mechanism",
        value: toFileName(licenseData?.finance_control),
      },
      {
        label: "Programmes details",
        value: toFileName(licenseData?.detailed_programmes),
      },
      {
        label: "Physical and educational facilities",
        value: toFileName(licenseData?.physical_education_facilities),
      },
      ...(licenseData?.supporting_documents ?? []).map((document) => ({
        label: `Supporting document: ${document.title}`,
        value: toFileName(document.document),
      })),
    ],
  };

  return sections;
}

function UniversityProvisionalPdfDocument({
  licenseData,
  institution,
  paymentPRN,
  selectedSections,
}: ExportPdfButtonProps & { selectedSections: ExportSectionId[] }) {
  const sectionRows = buildExportRows(licenseData, institution, paymentPRN);

  return (
    <Document
      title={`University Provisional License ${licenseData?.application_code ?? "details"}`}
    >
      <Page size="A4" style={pdfStyles.page}>
        <View style={pdfStyles.header}>
          <Text style={pdfStyles.title}>
            University Provisional License Application Details
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
      "university-provisional-license-details";
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
        <UniversityProvisionalPdfDocument
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
                      id={`university-provisional-export-section-${section.id}`}
                      checked={checked}
                      onCheckedChange={(value) =>
                        toggleSection(section.id, !!value)
                      }
                    />
                    <div className="space-y-1">
                      <Label
                        htmlFor={`university-provisional-export-section-${section.id}`}
                      >
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
