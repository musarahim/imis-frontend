const assert = require("node:assert/strict");
const { test } = require("node:test");
const createLoader = require("./load-typescript.cjs");
const { serializeCsv, serializeTableCsv, collectPaginatedRows } = createLoader()("src/lib/csv.ts");

test("table export uses visible accessor columns and excludes action columns", () => {
  const { createTable, getCoreRowModel } = require("@tanstack/react-table");
  const table = createTable({
    data: [{ programme: { name: 'Computing' }, private_note: 'Hidden', status: 'Submitted' }],
    columns: [
      { id: 'programme_name', accessorFn: (row) => row.programme.name, header: () => null },
      { accessorKey: 'private_note', header: 'Private note' },
      { accessorKey: 'status', header: 'Status' },
      { id: 'actions', header: 'Action' },
    ],
    state: { columnVisibility: { private_note: false }, columnPinning: {} },
    getCoreRowModel: getCoreRowModel(),
    onStateChange: () => {}, renderFallbackValue: null,
  });
  assert.equal(serializeTableCsv(table.options.data, table.getVisibleLeafColumns(), { programme_name: 'Programme' }),
    '\uFEFF"Programme","Status"\r\n"Computing","Submitted"');
});

test("table export derives readable labels for columns with rendered headers", () => {
  assert.equal(serializeTableCsv([{ name: 'Computing' }], [{
    id: 'programme_name', accessorFn: (row) => row.name, columnDef: { header: () => null },
  }]), '\uFEFF"Programme Name"\r\n"Computing"');
});

test("CSV retains Unicode and escapes commas, quotes, newlines and missing values", () => {
  assert.equal(
    serializeCsv([["Institution", "Programme"], ['Université, Kampala', 'Arts "A"\nAdvanced'], [null, undefined]]),
    '\uFEFF"Institution","Programme"\r\n"Université, Kampala","Arts ""A""\nAdvanced"\r\n"",""',
  );
});

test("CSV treats text formula prefixes as text while preserving numeric values", () => {
  assert.equal(serializeCsv([["=1+1", " +SUM(A1)", "-command", "@formula", -2, 3]]),
    '\uFEFF"\'=1+1","\' +SUM(A1)","\'-command","\'@formula","-2","3"');
});

test("export collects every API page regardless of its page size", async () => {
  const pages = [];
  const rows = await collectPaginatedRows(async (page) => {
    pages.push(page);
    return { results: [{ id: page }], next: page < 3 ? `?page=${page + 1}` : null };
  });
  assert.deepEqual(pages, [1, 2, 3]);
  assert.deepEqual(rows, [{ id: 1 }, { id: 2 }, { id: 3 }]);
});

test("export fails if a later API page cannot be fetched", async () => {
  await assert.rejects(collectPaginatedRows(async (page) => {
    if (page === 2) throw new Error("Request failed");
    return { results: [{ id: 1 }], next: "?page=2" };
  }), /Request failed/);
});

test("export supports an unpaginated API response", async () => {
  assert.deepEqual(await collectPaginatedRows(async () => [{ id: 1 }]), [{ id: 1 }]);
});
