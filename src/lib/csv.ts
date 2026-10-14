export function serializeTableCsv<T>(
  rows: T[],
  columns: { id: string; accessorFn?: (row: T, index: number) => unknown; columnDef: { header?: unknown } }[],
  columnLabels: Record<string, string> = {},
): string {
  const dataColumns = columns.filter((column) => column.accessorFn);
  return serializeCsv([
    dataColumns.map((column) => columnLabels[column.id] ?? (
      typeof column.columnDef.header === "string" ? column.columnDef.header
        : column.id.replace(/_/g, " ").replace(/\b\w/g, (letter) => letter.toUpperCase())
    )),
    ...rows.map((row, index) => dataColumns.map((column) => column.accessorFn!(row, index))),
  ]);
}

export async function collectPaginatedRows<T>(
  fetchPage: (page: number) => Promise<{ results: T[]; next: string | null } | T[]>,
): Promise<T[]> {
  const rows: T[] = [];
  let page = 1;
  while (true) {
    const response = await fetchPage(page);
    if (Array.isArray(response)) return [...rows, ...response];
    rows.push(...response.results);
    if (!response.next) return rows;
    if (!response.results.length) throw new Error("The export page is empty but indicates more results.");
    page += 1;
  }
}

export function serializeCsv(rows: unknown[][]): string {
  const escapeCell = (value: unknown) => {
    let text = value == null ? "" : String(value);
    // Keep spreadsheet applications from treating user-entered text as formulas.
    if (typeof value === "string" && /^[\s]*[=+\-@]/.test(text)) text = `'${text}`;
    return `"${text.replace(/"/g, '""')}"`;
  };
  return "\uFEFF" + rows.map((row) => row.map(escapeCell).join(",")).join("\r\n");
}
