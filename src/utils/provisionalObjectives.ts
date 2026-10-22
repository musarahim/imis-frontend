export function parseProvisionalObjectives(value?: string | null): string[] {
  if (!value?.trim()) return [];
  try {
    const parsed: unknown = JSON.parse(value);
    if (Array.isArray(parsed) && parsed.every((item) => typeof item === "string")) {
      return parsed.map((item) => item.trim()).filter(Boolean);
    }
  } catch {
    // Existing applications store objectives as plain text.
  }
  return value.split(/\r?\n/).map((item) => item.trim()).filter(Boolean);
}
