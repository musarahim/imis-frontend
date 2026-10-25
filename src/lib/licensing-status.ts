export const licensingStatusApplications = {
  "interim-authority": { endpoint: "interim-authority", label: "Interim Authority (University)" },
  "odai-interim-authority": { endpoint: "interim-authority-odai", label: "Interim Authority (ODAI)" },
  "university-provisional-license": { endpoint: "university-provisional-license", label: "Provisional Licence (University)" },
  "provisional-license-odai": { endpoint: "provisional-license-odai", label: "Provisional Licence (ODAI)" },
  "university-grant-charter": { endpoint: "charter-application", label: "Charter (University)" },
  "grant-charter-odai": { endpoint: "charter-application-odai", label: "Charter (ODAI)" },
  "provisional-license-oti": { endpoint: "oti-provisional", label: "Provisional Licence (OTI)" },
  "classification-registration": { endpoint: "certification-and-classification", label: "Classification and Registration (OTI)" },
} as const;

export type LicensingStatusEndpoint = typeof licensingStatusApplications[keyof typeof licensingStatusApplications]["endpoint"];

export type LicensingStatusEntry = {
  id: number | null;
  status_code: string;
  status: string;
  next_step: string;
  action_required: boolean;
  recorded_at: string | null;
};

export type LicensingApplicationStatus = {
  application_code: string;
  application_type: string;
  institution: string;
  status_code: string;
  status: string;
  next_step: string;
  action_required: boolean;
  updated_at: string | null;
  history: LicensingStatusEntry[];
};

export function licensingStatusText(application: { status?: string | null; tracking_status?: string | null }) {
  return application.tracking_status || application.status || "Status unavailable";
}

export function formatStatusDate(value: string | null) {
  if (!value) return "Date not recorded";
  return new Intl.DateTimeFormat("en-GB", {
    dateStyle: "medium", timeStyle: "short", timeZone: "Africa/Kampala",
  }).format(new Date(value));
}
