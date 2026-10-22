export const licensingApplications = {
  "university-interim": {
    label: "Interim Authority (University)", endpoint: "interim-authority",
    path: "university/interim-authority", permission: "can_assign_interim_authority_reviewer",
    reviewPermission: "can_review_application", details: true,
  },
  "university-provisional": {
    label: "Provisional Licence (University)", endpoint: "university-provisional-license",
    path: "university/provisional-license", permission: "can_assign_university_provisional_reviewer",
    reviewPermission: "can_review_provisional_license_application", details: false,
  },
  "university-charter": {
    label: "Grant of Charter (University)", endpoint: "charter-application",
    path: "university/charter", permission: "can_assign_charter_reviewer",
    reviewPermission: "can_review_charter_application", details: true,
  },
  "odai-interim": {
    label: "Interim Authority (ODAI)", endpoint: "interim-authority-odai",
    path: "odai/interim-authority", permission: "can_assign_interim_authority_reviewer",
    reviewPermission: "can_review_application", details: true,
  },
  "odai-provisional": {
    label: "Provisional Licence (ODAI)", endpoint: "provisional-license-odai",
    path: "odai/provisional-license", permission: "can_assign_university_provisional_reviewer",
    reviewPermission: "can_review_provisional_license_application", details: true,
  },
  "odai-charter": {
    label: "Grant of Charter (ODAI)", endpoint: "charter-application-odai",
    path: "odai/charter", permission: "can_assign_charter_reviewer",
    reviewPermission: "can_review_charter_application", details: true,
  },
  "oti-provisional": {
    label: "Provisional Licence (OTI)", endpoint: "oti-provisional",
    path: "oti/provisional-license", permission: "can_assign_oti_provisional_reviewer",
    reviewPermission: "can_review_oti_provisional_application", details: false,
  },
  "oti-classification": {
    label: "Classification and Registration (OTI)", endpoint: "certification-and-classification",
    path: "oti/classification-registration", permission: "can_assign_classification_reviewer",
    reviewPermission: "can_review_classification_application", details: false,
  },
} as const;

export type LicensingApplicationType = keyof typeof licensingApplications;
export type LicensingQueueKind = "submitted-applications" | "under-review" | "assignment-candidates";
export type LicensingPageMode = "submitted" | "under-review" | "assign-reviewer";
export type LicensingApplicationRow = {
  id: number;
  application_code: string;
  institution: string;
  application_date: string | null;
  status: string;
  status_code: string;
  desk_reviewer: number | null;
  desk_reviewer_name: string | null;
};
export type LicensingQueueResponse = ListResponse<LicensingApplicationRow> & { can_assign: boolean };
export type LicensingReviewer = Reviewer & { assigned_application_count: number };
export type LicensingAssignmentFilters = {
  institutions: { id: number; name: string }[];
  statuses: { value: string; label: string }[];
};

export function licensingWorkloadProjection(reviewer: LicensingReviewer, selected: LicensingApplicationRow[]) {
  const additions = selected.filter((row) => row.status_code !== "prelim_review" || row.desk_reviewer !== reviewer.id).length;
  return { assigned: reviewer.assigned_application_count, additions, projected: reviewer.assigned_application_count + additions };
}

export function toggleLicensingSelection(
  selected: Record<number, LicensingApplicationRow>, rows: LicensingApplicationRow[], checked: boolean,
) {
  const next = { ...selected };
  for (const row of rows) {
    if (checked) next[row.id] = row;
    else delete next[row.id];
  }
  return next;
}
