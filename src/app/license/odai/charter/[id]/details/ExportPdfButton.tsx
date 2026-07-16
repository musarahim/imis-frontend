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
  | "infrastructure"
  | "facilities"
  | "academic"
  | "administrative"
  | "ownership"
  | "finance"
  | "strategy"
  | "students"
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
  licenseData?: CharterApplication;
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
    description: "Provisional license, land ownership, and land use details.",
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
    id: "academic",
    title: "Academic staff",
    description: "Academic staffing, qualifications, and ratios.",
  },
  {
    id: "administrative",
    title: "Administrative staff",
    description: "Administrative leadership and support staffing.",
  },
  {
    id: "ownership",
    title: "Ownership",
    description: "Ownership details for the university.",
  },
  {
    id: "finance",
    title: "Financial management",
    description: "Assets, budgets, revenue, and banking information.",
  },
  {
    id: "strategy",
    title: "Vision and mission",
    description: "Vision, mission, objectives, and programme plans.",
  },
  {
    id: "students",
    title: "Student population",
    description: "Student totals, programme distribution, and origins.",
  },
  {
    id: "documents",
    title: "Documents and attachments",
    description: "Attached document file names included in the application.",
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
  licenseData?: CharterApplication,
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
      { label: "Location", value: toDisplayValue(institution?.location) },
    ],
    location: [
      {
        label: "Has provisional license",
        value: toDisplayValue(licenseData?.has_provisional_license),
      },
      {
        label: "Provisional license issue date",
        value: toDisplayValue(licenseData?.provisional_license_issue_date),
      },
      {
        label: "Copy of the licence",
        value: toFileName(licenseData?.provisional_license),
      },
      {
        label: "Amount of land owned",
        value: toDisplayValue(licenseData?.amount_of_land_owned, "acres"),
      },
      { label: "Land title", value: toFileName(licenseData?.land_title) },
      {
        label: "Amount of land in current use",
        value: toDisplayValue(licenseData?.land_in_use, "acres"),
      },
      {
        label: "Amount of land for future use",
        value: toDisplayValue(licenseData?.land_for_future_use, "acres"),
      },
      {
        label: "Year obtained",
        value: toDisplayValue(licenseData?.year_obtained),
      },
      {
        label: "Land leased or rented",
        value: toDisplayValue(licenseData?.leased_or_rented),
      },
      {
        label: "Lease or rent agreement",
        value: toFileName(licenseData?.lease_or_rent_agreement),
      },
    ],
    infrastructure: [
      { label: "Classrooms", value: toDisplayValue(licenseData?.classrooms) },
      { label: "Libraries", value: toDisplayValue(licenseData?.libraries) },
      {
        label: "Science laboratories",
        value: toDisplayValue(licenseData?.science_labs),
      },
      {
        label: "Computer laboratories",
        value: toDisplayValue(licenseData?.computer_labs),
      },
      {
        label: "Staff houses",
        value: toDisplayValue(licenseData?.staff_houses),
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
        value: toDisplayValue(licenseData?.student_welfare_offices, "sqm"),
      },
      {
        label: "Sick bay area",
        value: toDisplayValue(licenseData?.sick_bay_area, "sqm"),
      },
      {
        label: "Hostel or dormitory area",
        value: toDisplayValue(licenseData?.hostels_area, "sqm"),
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
        label: "Available playgrounds",
        value: toDisplayValue(licenseData?.available_playgrounds),
      },
      {
        label: "Total road and paths mileage",
        value: toDisplayValue(licenseData?.total_roads_mileage, "km"),
      },
      {
        label: "Water source",
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
        label: "Total area of cultivable land",
        value: toDisplayValue(licenseData?.cultivable_land, "acres"),
      },
      {
        label: "Number of vehicles",
        value: toDisplayValue(licenseData?.number_of_vehicles),
      },
      {
        label: "Vehicle registration",
        value: toDisplayValue(licenseData?.vehicle_registration),
      },
    ],
    facilities: [
      {
        label: "Total number of library books",
        value: toDisplayValue(licenseData?.library_books),
      },
      {
        label: "Total number of text books",
        value: toDisplayValue(licenseData?.text_books),
      },
      {
        label: "Books publication years",
        value: toDisplayValue(licenseData?.publication_years),
      },
      {
        label: "Computers for students",
        value: toDisplayValue(licenseData?.computers_in_use),
      },
      {
        label: "Computers in the library",
        value: toDisplayValue(licenseData?.computers_in_library),
      },
      {
        label: "Computers for academic staff",
        value: toDisplayValue(licenseData?.academic_staff_computers),
      },
      {
        label: "Computers for administration",
        value: toDisplayValue(licenseData?.administrative_staff_computers),
      },
      {
        label: "Library computer software",
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
        label: "Library seats",
        value: toDisplayValue(licenseData?.library_seats),
      },
      {
        label: "Classroom seats",
        value: toDisplayValue(licenseData?.classroom_seats),
      },
      {
        label: "Laboratories seats",
        value: toDisplayValue(licenseData?.laboratories_seats),
      },
      {
        label: "Administration block seats",
        value: toDisplayValue(licenseData?.administration_block_seats),
      },
      {
        label: "Student accommodation facilities",
        value: toDisplayValue(licenseData?.student_facilities),
      },
    ],
    academic: [
      {
        label: "Full time academic staff",
        value: toDisplayValue(licenseData?.full_time_academic_staff),
      },
      {
        label: "Intended number of full-time academic staff",
        value: toDisplayValue(licenseData?.intended_full_time_academic_staff),
      },
      {
        label: "Academic staff qualifications",
        value: toFileName(licenseData?.full_time_academic_staff_qualifications),
      },
      {
        label: "Part time academic staff",
        value: toDisplayValue(licenseData?.part_time_academic_staff),
      },
      {
        label: "Part-time academic staff qualifications",
        value: toFileName(licenseData?.part_time_academic_staff_qualifications),
      },
      {
        label: "Number of PhD holders",
        value: toDisplayValue(licenseData?.phd_holders),
      },
      {
        label: "PhD holders discipline",
        value: toFileName(licenseData?.phd_holder_discipline),
      },
      {
        label: "Number of masters holders",
        value: toDisplayValue(licenseData?.masters_holders),
      },
      {
        label: "Masters holders discipline",
        value: toFileName(licenseData?.masters_holders_discipline),
      },
      {
        label: "Number of bachelor holders",
        value: toDisplayValue(licenseData?.bachelor_holders),
      },
      {
        label: "Number of diploma holders",
        value: toDisplayValue(licenseData?.diploma_holders),
      },
      {
        label: "Average staff-student ratio",
        value: toDisplayValue(licenseData?.average_staff_student_ratio),
      },
      {
        label: "Programme staff-student ratio",
        value: toFileName(licenseData?.programme_staff_student_ratio),
      },
      {
        label: "Staff overload",
        value: toDisplayValue(licenseData?.staff_overload),
      },
    ],
    administrative: [
      {
        label: "Number of administrative staff",
        value: toDisplayValue(licenseData?.administrative_staff),
      },
      {
        label: "Number of support staff",
        value: toDisplayValue(licenseData?.support_staff),
      },
      {
        label: "Members of the governing council",
        value: toFileName(licenseData?.council_members),
      },
      {
        label: "Members of the senate",
        value: toFileName(licenseData?.senate_members),
      },
      { label: "Chancellor", value: toDisplayValue(licenseData?.chancellor) },
      {
        label: "Vice chancellor",
        value: toDisplayValue(licenseData?.vice_chancellor),
      },
      {
        label: "University secretary",
        value: toDisplayValue(licenseData?.university_secretary),
      },
      {
        label: "Academic registrar",
        value: toDisplayValue(licenseData?.academic_registrar),
      },
      {
        label: "Vice academic registrar",
        value: toDisplayValue(licenseData?.vice_registrar),
      },
      { label: "Deans", value: toFileName(licenseData?.deans) },
    ],
    ownership: [
      {
        label: "University ownership",
        value: toDisplayValue(licenseData?.ownership),
      },
    ],
    finance: [
      {
        label: "Other assets besides land and buildings",
        value: toFileName(licenseData?.other_assets),
      },
      {
        label: "University annual budget",
        value: formatCurrency(licenseData?.annual_budget),
      },
      {
        label: "Previous financial year's accounts",
        value: toFileName(licenseData?.previous_year_accounts),
      },
      {
        label: "Fees structure",
        value: toFileName(licenseData?.fees_structure),
      },
      {
        label: "Fees percentage budget",
        value: toDisplayValue(licenseData?.fees_percentage, "%"),
      },
      {
        label: "Other sources of income",
        value: toDisplayValue(licenseData?.other_income_source),
      },
      {
        label: "Infrastructure development budget",
        value: formatCurrency(licenseData?.infrastructure_budget),
      },
      {
        label: "Research and development budget",
        value: formatCurrency(licenseData?.research_budget),
      },
      {
        label: "Computer hardware and software budget",
        value: formatCurrency(licenseData?.computer_budget),
      },
      {
        label: "Science laboratory equipment budget",
        value: formatCurrency(licenseData?.science_labs_budget),
      },
      {
        label: "Library resources budget",
        value: formatCurrency(licenseData?.library_budget),
      },
      {
        label: "Staff development budget",
        value: formatCurrency(licenseData?.staff_development_budget),
      },
      {
        label: "Staff salaries percentage budget",
        value: toDisplayValue(licenseData?.staff_salary_budget),
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
        label: "Specific objectives",
        value: toDisplayValue(licenseData?.specific_objectives),
      },
      {
        label: "Strategic plan",
        value: toFileName(licenseData?.university_strategic_plan),
      },
      {
        label: "Current programmes offered",
        value: toFileName(licenseData?.programmes_offered),
      },
      {
        label: "Areas of competence",
        value: toFileName(licenseData?.areas_of_competence),
      },
      {
        label: "Future planned programmes",
        value: toFileName(licenseData?.future_planned_programmes),
      },
    ],
    students: [
      {
        label: "Total number of students",
        value: toDisplayValue(licenseData?.total_students),
      },
      {
        label: "Arts students",
        value: toDisplayValue(licenseData?.arts_students),
      },
      {
        label: "Social sciences students",
        value: toDisplayValue(licenseData?.social_science_students),
      },
      {
        label: "Basic sciences students",
        value: toDisplayValue(licenseData?.basic_science_students),
      },
      {
        label: "Arts education students",
        value: toDisplayValue(licenseData?.arts_education_students),
      },
      {
        label: "Science education students",
        value: toDisplayValue(licenseData?.science_education_students),
      },
      {
        label: "Agriculture",
        value: toDisplayValue(licenseData?.agriculture_students),
      },
      {
        label: "Medicine",
        value: toDisplayValue(licenseData?.medicine_students),
      },
      {
        label: "Veterinary medicine",
        value: toDisplayValue(licenseData?.veterinary_students),
      },
      {
        label: "Engineering and technology",
        value: toDisplayValue(licenseData?.engineering_students),
      },
      {
        label: "Eastern region",
        value: toDisplayValue(licenseData?.eastern_region),
      },
      {
        label: "Central region",
        value: toDisplayValue(licenseData?.central_region),
      },
      {
        label: "Northern region",
        value: toDisplayValue(licenseData?.northern_region),
      },
      {
        label: "Western region",
        value: toDisplayValue(licenseData?.western_region),
      },
      {
        label: "East Africans",
        value: toDisplayValue(licenseData?.east_africans),
      },
      {
        label: "Other international students",
        value: toDisplayValue(licenseData?.other_regions),
      },
    ],
    documents: [
      {
        label: "Signatures of the officers",
        value: toFileName(licenseData?.signature_officers),
      },
      {
        label: "Institution member CVs",
        value: toFileName(licenseData?.member_cvs),
      },
      {
        label: "Financial control mechanism",
        value: toFileName(licenseData?.financial_control),
      },
      {
        label: "Detailed programmes",
        value: toFileName(licenseData?.detailed_programmes),
      },
      { label: "Facilities", value: toFileName(licenseData?.facilities) },
    ],
  };

  return sections;
}

function UniversityGrantCharterPdfDocument({
  licenseData,
  institution,
  paymentPRN,
  selectedSections,
}: ExportPdfButtonProps & { selectedSections: ExportSectionId[] }) {
  const sectionRows = buildExportRows(licenseData, institution, paymentPRN);

  return (
    <Document
      title={`University Charter Application ${licenseData?.application_code ?? "details"}`}
    >
      <Page size="A4" style={pdfStyles.page}>
        <View style={pdfStyles.header}>
          <Text style={pdfStyles.title}>
            Grant of Charter Application Details
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
      "university-grant-charter-details";
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
        <UniversityGrantCharterPdfDocument
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
                      id={`university-charter-export-section-${section.id}`}
                      checked={checked}
                      onCheckedChange={(value) =>
                        toggleSection(section.id, !!value)
                      }
                    />
                    <div className="space-y-1">
                      <Label
                        htmlFor={`university-charter-export-section-${section.id}`}
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
