import type { LicensingReviewField, LicensingObservation } from "./licensing-review";

export type ProcessingMember = {
  name: string; role: string; experience: number; conflict_declared: boolean; has_conflict: boolean;
};
export type ProcessingAction = { action: string; label: string; fields: { name: string; label: string; kind: string }[] };
export type ProcessingState = {
  application_code: string; institution: string; family: string; stage: string; revision: number;
  actions: ProcessingAction[];
  history: { id: number; action: string; actor: string; occurred_on: string; notes: string; evidence: Record<string, unknown> }[];
  deadlines: { task: string; due_on: string; event_id?: number }[];
  validity: Record<string, string> | null;
  preliminary_review: { summary: string; outcome: string; fields: LicensingReviewField[]; observations: Record<string, LicensingObservation> } | null;
};
export type ProcessingInput = {
  revision: number; action: string; occurred_on: string; notes: string;
  evidence: Record<string, unknown>; confirmed: boolean;
};
export type ProcessingQueue = { count: number; next: string | null; previous: string | null;
  results: { id: number; application_code: string; institution: string; application_date: string | null; stage: string }[] };

export type ProcessingRow = ProcessingQueue["results"][number];

export const processingStages: Record<string, { label: string; office: string; next: string }> = {
  awaiting_preliminary: { label: "Preliminary Review", office: "ILA Desk Review Officer", next: "Acknowledge receipt and complete the assigned preliminary review." },
  preliminary_feedback: { label: "Preliminary Review Completed", office: "ILA / Executive Director", next: "Resolve any clarifications, then appoint the vetting team. For interim authority, forward the assessment to Council." },
  clarification: { label: "Awaiting Applicant Response", office: "Applicant / ILA", next: "Receive and record the applicant's response to the clarification letter." },
  vetting: { label: "Vetting in Progress", office: "Vetting Team", next: "Complete vetting and submit the findings report to the Executive Director." },
  vetting_report: { label: "Vetting Report Submitted", office: "Executive Director", next: "Forward the vetting report to Council for consideration." },
  council_decision: { label: "Council Consideration", office: "National Council", next: "Record the Council decision and communicate it to the applicant." },
  verification_invoice: { label: "Ready for Verification Invoice", office: "ILA / Finance", next: "Invoice the applicant before appointing the verification or inspection committee." },
  verification_appointment: { label: "Ready for Committee Appointment", office: "National Council / ILA", next: "Record the committee appointment, qualifications, conflict declarations and briefing." },
  verification: { label: "Verification / Inspection in Progress", office: "Verification / Inspection Committee", next: "Complete the visit and submit the signed report with individual findings and any minority reports." },
  verification_report: { label: "Verification / Inspection Report Submitted", office: "Executive Director", next: "Forward the committee report to Council for a final decision." },
  final_council: { label: "Final Council Consideration", office: "National Council", next: "Consider the report and record the licensing decision or charter recommendation." },
  hearing: { label: "Awaiting Show-Cause Response", office: "Applicant / ILA", next: "Record the written response, or close the hearing after the full fourteen-day response period." },
  hearing_decision: { label: "Council Reconsideration", office: "National Council", next: "Consider the hearing response and record issuance or a reasoned refusal." },
  deferred: { label: "Deferred by Council", office: "Applicant / ILA", next: "Receive evidence addressing the shortfalls before reopening the application for vetting." },
  attorney_general: { label: "Attorney General Clearance", office: "Attorney General", next: "Receive legal clearance and submit the cleared charter to the Minister." },
  minister: { label: "Minister Consideration", office: "Minister", next: "Record accreditation and the recommendation to the President." },
  president: { label: "Presidential Grant", office: "President", next: "Record the Presidential grant before publication." },
  publication_pending: { label: "Awaiting Publication", office: "ILA / Minister for charters", next: "Record Gazette and print publication evidence to complete processing." },
  issued: { label: "Issued", office: "ILA", next: "Processing is complete. Retain the signed instrument and publication records." },
  refused: { label: "Refused", office: "ILA", next: "Communicate the reasoned decision and retain evidence of service." },
};

export const processingQueues = [
  { value: "all", label: "All Applications", stages: [] as string[] },
  { value: "preliminary", label: "Preliminary Review", stages: ["awaiting_preliminary", "preliminary_feedback", "clarification"] },
  { value: "vetting", label: "Vetting", stages: ["vetting", "vetting_report"] },
  { value: "council", label: "Council Review", stages: ["council_decision", "final_council", "hearing", "hearing_decision"] },
  { value: "verification", label: "Verification / Inspection", stages: ["verification_invoice", "verification_appointment", "verification", "verification_report"] },
  { value: "external", label: "Charter Approvals", stages: ["attorney_general", "minister", "president"] },
  { value: "publication", label: "Publication", stages: ["publication_pending"] },
  { value: "completed", label: "Decisions Issued", stages: ["issued", "refused", "deferred"] },
];

export const processingActionLabels: Record<string, string> = {
  acknowledge: "Acknowledge Receipt", record_communication: "Record Correspondence",
  request_clarification: "Request Clarification", record_response: "Record Applicant Response",
  refer_council: "Forward to Council", issue_interim: "Issue Interim Authority", refuse: "Refuse Application",
  appoint_vetting: "Appoint Vetting Team", submit_vetting: "Submit Vetting Report", defer: "Defer Application",
  reopen: "Reopen for Vetting", approve_verification: "Approve Verification / Inspection",
  invoice_verification: "Record Verification / Inspection Invoice", appoint_verification: "Appoint Verification / Inspection Committee",
  submit_verification: "Submit Verification / Inspection Report", forward_verification: "Forward Report to Council",
  invite_hearing: "Invite Applicant to Show Cause", record_hearing_response: "Record Show-Cause Response",
  close_hearing: "Close Response Period", issue_provisional: "Issue Provisional Licence",
  publish_provisional: "Record Licence Publication", recommend_charter: "Recommend Charter and Seek Legal Clearance",
  record_ag_clearance: "Record Legal Clearance and Forward to Minister", record_minister: "Record Minister Recommendation",
  record_president: "Record Presidential Grant", publish_charter: "Record Charter Publication",
};

export function processingSteps(family: string) {
  const preliminary = { label: "Preliminary Review", queue: "preliminary", stages: ["awaiting_preliminary", "preliminary_feedback", "clarification"] };
  const outcome = { label: "Outcome", queue: "completed", stages: ["issued", "refused", "deferred"] };
  if (family === "interim") return [preliminary, { label: "Council Decision", queue: "council", stages: ["council_decision"] }, outcome];
  const steps = [
    preliminary,
    { label: "Vetting", queue: "vetting", stages: ["vetting", "vetting_report"] },
    { label: "Council Review", queue: "council", stages: ["council_decision"] },
    { label: family === "charter" ? "Inspection" : "Verification", queue: "verification", stages: ["verification_invoice", "verification_appointment", "verification", "verification_report"] },
    { label: "Final Council Decision", queue: "council", stages: ["final_council", "hearing", "hearing_decision"] },
  ];
  if (family === "charter") steps.push(
    { label: "Attorney General", queue: "external", stages: ["attorney_general"] },
    { label: "Minister", queue: "external", stages: ["minister"] },
    { label: "President", queue: "external", stages: ["president"] },
  );
  return [...steps, { label: "Publication", queue: "publication", stages: ["publication_pending"] }, outcome];
}

export function processingLabel(value: string) {
  return processingStages[value]?.label ?? processingActionLabels[value] ?? value.replaceAll("_", " ").replace(/^./, (letter) => letter.toUpperCase());
}

export function processingError(error: unknown): string {
  const data = (error as { data?: unknown })?.data;
  const messages = (value: unknown): string[] => {
    if (typeof value === "string") return [value];
    if (Array.isArray(value)) return value.flatMap(messages);
    if (value && typeof value === "object") return Object.values(value).flatMap(messages);
    return [];
  };
  return messages(data).join(" ") || "Unable to submit the decision. Please try again.";
}
