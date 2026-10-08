type Field = readonly [keyof Employee, string];
type Section = { id: string; label: string; fields: readonly Field[] };

// Keep these fields aligned with the required fields in the staff form.
const sections: Section[] = [
  { id: "personal_details", label: "Personal Details", fields: [
    ["system_account", "System account"], ["directorate", "Directorate"],
    ["department", "Department"], ["designation", "Designation"],
    ["employee_number", "Employee number"], ["date_of_birth", "Date of birth"],
    ["gender", "Gender"], ["nationality", "Nationality"], ["religion", "Religion"],
    ["tribe", "Tribe"], ["marital_status", "Marital status"], ["joining_date", "Joining date"],
  ] },
  { id: "residential_address", label: "Residential Address", fields: [
    ["district", "District"], ["county", "County"], ["sub_county", "Sub-county"],
    ["parish", "Parish"], ["village", "Village"], ["distance_from_work", "Distance from work"],
    ["address", "Address"],
  ] },
  { id: "place_of_origin", label: "Place of Origin", fields: [
    ["district_of_origin", "District"], ["county_of_origin", "County"],
    ["sub_county_of_origin", "Sub-county"], ["parish_of_origin", "Parish"],
    ["village_of_origin", "Village"], ["address_of_origin", "Address"],
  ] },
  { id: "next_of_kin", label: "Next of Kin", fields: [
    ["next_of_kin_name", "Name"], ["next_of_kin_relationship", "Relationship"],
    ["next_of_kin_date_of_birth", "Date of birth"], ["occupation", "Occupation"],
    ["work_place", "Workplace"], ["next_of_kin_phone_number", "Phone number"],
    ["next_of_kin_address", "Address"],
  ] },
  { id: "contact_person", label: "Contact Person", fields: [
    ["contact_person_name", "Name"], ["contact_person_relationship", "Relationship"],
    ["contact_person_telephone", "Telephone"],
  ] },
  { id: "parents", label: "Parents", fields: [
    ["father_name", "Father's name"], ["father_status", "Father's status"],
    ["mother_name", "Mother's name"], ["mother_status", "Mother's status"],
  ] },
  { id: "identification", label: "Identification", fields: [["nin", "National Identification Number (NIN)"]] },
  { id: "bank_details", label: "Bank Details", fields: [
    ["bank_name", "Bank name"], ["branch", "Branch"], ["account_name", "Account name"],
    ["account_number", "Account number"], ["account_type", "Account type"],
  ] },
];

const collections = [
  { id: "dependents", label: "Dependents", fields: ["name", "relationship", "date_of_birth", "gender"] },
  { id: "education_history", key: "education_histories", label: "Education History", fields: ["institution", "from_year", "to_year", "qualification"] },
  { id: "work_history", key: "work_histories", label: "Work History", fields: ["employer", "from_date", "position"] },
  { id: "referees", label: "Referees", fields: ["name", "place_of_work", "position"] },
] as const;

export function isEntered(value: unknown): boolean {
  if (typeof value === "string") return value.trim().length > 0;
  if (typeof value === "number") return Number.isFinite(value);
  return value !== null && value !== undefined;
}

export function completionPercentage(completed: number, total: number): number {
  if (!total) return 0;
  return completed === total ? 100 : Math.min(99, Math.round(completed / total * 100));
}

export function getProfileCompletion(employee: Partial<Employee>, includeDocuments = false) {
  const progress = sections.map((section) => {
    const missing = section.fields.filter(([key]) => !isEntered(employee[key])).map(([, label]) => label);
    return { id: section.id, label: section.label, total: section.fields.length, completed: section.fields.length - missing.length, missing };
  });
  for (const section of collections) {
    const key = "key" in section ? section.key : section.id;
    const entries = employee[key] ?? [];
    const missing: string[] = [];
    entries.forEach((entry, index) => {
      for (const field of section.fields) {
        if (!isEntered((entry as unknown as Record<string, unknown>)[field])) {
          missing.push(`Entry ${index + 1}: ${field.replaceAll("_", " ")}`);
        }
      }
    });
    const total = entries.length * section.fields.length;
    progress.push({ id: section.id, label: section.label, total, completed: total - missing.length, missing });
  }
  if (includeDocuments) {
    const entries = employee.documents ?? [];
    const missing: string[] = [];
    entries.forEach((entry, index) => {
      if (!isEntered(entry.name)) missing.push(`Entry ${index + 1}: name`);
      if (!isEntered(entry.document)) missing.push(`Entry ${index + 1}: document`);
    });
    progress.push({ id: "documents", label: "Documents", total: entries.length * 2, completed: entries.length * 2 - missing.length, missing });
  }
  const total = progress.reduce((sum, section) => sum + section.total, 0);
  const completed = progress.reduce((sum, section) => sum + section.completed, 0);
  return { sections: progress, total, completed, remaining: total - completed, percentage: completionPercentage(completed, total) };
}
