export type LicensingReviewField = {
  key: string; label: string; section: string;
  kind: "text" | "file" | "boolean" | "number";
  value: string | number | boolean | null;
};
export type LicensingObservation = { finding: "note" | "clarification"; comment: string };
export type LicensingReviewRecord = {
  id: number; reviewer_id: number; reviewer_name: string;
  observations: Record<string, LicensingObservation>; summary: string;
  outcome: "" | "no_concerns" | "clarification_required";
  revision: number; updated_at: string; submitted_at: string | null; snapshot_hash: string;
};
export type LicensingReviewResponse = {
  application_code: string; institution: string; status: string; can_edit: boolean;
  fields: LicensingReviewField[]; snapshot_hash: string;
  review: LicensingReviewRecord | null;
  history: (LicensingReviewRecord & { fields: LicensingReviewField[] })[];
};
export type LicensingReviewInput = {
  revision: number; snapshot_hash: string; observations: Record<string, LicensingObservation>;
  summary: string; outcome: LicensingReviewRecord["outcome"]; submit: boolean; confirmed: boolean;
};

export function licensingFieldText(value: LicensingReviewField["value"]) {
  if (value === null || value === "") return "Not provided";
  if (typeof value === "boolean") return value ? "Yes" : "No";
  return String(value);
}

export function prepareLicensingObservations(observations: Record<string, LicensingObservation>) {
  return Object.fromEntries(Object.entries(observations)
    .filter(([, observation]) => observation.comment.trim() || observation.finding === "clarification")
    .map(([key, observation]) => [key, { ...observation, comment: observation.comment.trim() }]));
}
