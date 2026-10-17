const assert = require("node:assert/strict");
const { test } = require("node:test");
const React = require("react");
const { renderToStaticMarkup } = require("react-dom/server");
const { configureStore } = require("@reduxjs/toolkit");
const { createApi } = require("@reduxjs/toolkit/query/react");
const createLoader = require("./load-typescript.cjs");
const { renderDashboard, row } = require("./programme-dashboard-fixture.cjs");

test("programme dashboard shows live summary, category mix and work queues", () => {
  const html = renderDashboard();
  assert.match(html, /Programme accreditation dashboard for Programme Head/);
  assert.match(html, /Programme category mix/);
  assert.match(html, /Top institutions by application volume/);
  assert.match(html, /Accreditation work queues/);
  assert.match(html, /25 STEM, 15 Humanities, 2 not specified/);
  assert.match(html, /\/programmes\/ready-for-assessment/);
});

test("all applications displays current statuses across workflow stages and a useful empty state", () => {
  const statuses = [["submitted", "Submitted"], ["under_review", "Under Review"], ["reviewed", "Reviewed"],
    ["under_assessment", "Under Assessment"], ["approved", "Approved"], ["rejected", "Rejected"]];
  const html = renderDashboard({ tab: "register", rows: statuses.map(([status, status_label], index) =>
    ({ ...row, id: index + 1, status, status_label })) });
  assert.match(html, />All Applications<\/button>/);
  assert.doesNotMatch(html, /Programme Register/);
  assert.match(html, /Current status/);
  assert.match(html, /All statuses/);
  for (const [, label] of statuses) assert.ok(html.includes(`>${label}</span>`), label);
  assert.match(html, /Bachelor of Science in Computer Science/);
  assert.match(html, /Fully verified/);
  assert.match(html, /PGAC\/2026\/001/);
  assert.match(html, /aria-sort="descending"/);
  assert.match(renderDashboard({ tab: "register", rows: [] }), /No programme applications match these filters/);
});

test("summary failures show a retry instead of invented zero counts", () => {
  const html = renderDashboard({ summaryError: true });
  assert.match(html, /The dashboard could not be loaded/);
  assert.doesNotMatch(html, /STEM applications/);
});

test("dashboard registry selects the programme head dashboard only for that group", () => {
  for (const [group, expected] of [["Head Programme Accreditation", "head-dashboard"], ["Human Resource", "hr-dashboard"], ["Staff", "My workspace"]]) {
    const load = createLoader({
      "next/link": "a",
      "@/components/ui/button": { Button: "button" },
      "@/components/ui/card": { Card: "section", CardContent: "div", CardHeader: "header", CardTitle: "h2" },
      "@/redux/features/authApiSlice": { useRetrieveUserQuery: () => ({ data: { first_name: "Test", groups: [{ name: group }] } }) },
      "./human-resource-dashboard": () => React.createElement("div", null, "hr-dashboard"),
      "./programme-accreditation-dashboard": () => React.createElement("div", null, "head-dashboard"),
    });
    const Dashboard = load("src/app/dashboard/dashboard-content.tsx").default;
    const html = renderToStaticMarkup(React.createElement(Dashboard));
    assert.ok(html.includes(expected), group);
    if (group !== "Head Programme Accreditation") assert.doesNotMatch(html, /head-dashboard/);
  }
});

test("dashboard register sends all active filters, sorting and pagination", async (t) => {
  const requests = [];
  const api = createApi({ reducerPath: "programmeDashboardTest", endpoints: () => ({}), tagTypes: ["InvoicedApplications"],
    baseQuery: async (url) => { requests.push(new URL(url, "http://imis.test")); return { data: { results: [], next: null, count: 0 } }; } });
  createLoader({ "../services/apiSlice": { apiSlice: api } })("src/redux/features/programme-api-slice.ts");
  const store = configureStore({ reducer: { [api.reducerPath]: api.reducer }, middleware: (getDefault) => getDefault().concat(api.middleware) });
  t.after(() => store.dispatch(api.util.resetApiState()));
  await store.dispatch(api.endpoints.getProgrammeHeadDashboardRegister.initiate({ page: 2, pageSize: 50,
    search: "science", institution: "3", programme_category: "stem", status: "reviewed", ordering: "programme_name" })).unwrap();
  assert.equal(requests[0].pathname, "/programmes/head-dashboard/");
  assert.deepEqual(Object.fromEntries(requests[0].searchParams), { page: "2", page_size: "50", search: "science",
    institution: "3", programme_category: "stem", status: "reviewed", ordering: "programme_name" });
});
