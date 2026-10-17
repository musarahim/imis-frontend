const assert = require("node:assert/strict");
const { test } = require("node:test");
const React = require("react");
const { renderToStaticMarkup } = require("react-dom/server");
const createLoader = require("./load-typescript.cjs");
const { configureStore } = require("@reduxjs/toolkit");
const { createApi } = require("@reduxjs/toolkit/query/react");

function render({ error = false, rows = [], assigned = 0 } = {}) {
  const css = new Proxy({}, { get: (_, key) => String(key) });
  const load = createLoader({
    "next/link": ({ children, ...props }) => React.createElement("a", props, children),
    "./programme-accreditation-dashboard.module.css": { __esModule: true, default: css },
    "./preliminary-reviewer-dashboard.module.css": { __esModule: true, default: css },
    "@/redux/features/programme-api-slice": {
      useGetReviewerDashboardSummaryQuery: () => ({ data: error ? undefined : { totals: { assigned, pending: assigned, completed: 0, institutions: assigned ? 1 : 0 }, stages: [] }, isError: error, refetch() {} }),
      useGetReviewerDashboardApplicationsQuery: () => ({ currentData: error ? undefined : { count: rows.length, results: rows }, isError: error, refetch() {} }),
    },
  });
  const Dashboard = load("src/app/dashboard/preliminary-reviewer-dashboard.tsx").default;
  return renderToStaticMarkup(React.createElement(Dashboard, { user: { first_name: "Reviewer" } }));
}

test("reviewer dashboard shows personal workload and honest empty state", () => {
  const html = render();
  for (const text of ["My preliminary reviews", "Pending reviews", "Reviews completed", "Current application statuses", "No applications are awaiting your review."]) assert.ok(html.includes(text), text);
  assert.doesNotMatch(html, /NaN|Infinity/);
});

test("pending applications link directly to review and show the current status", () => {
  const html = render({ assigned: 1, rows: [{ id: 7, programme_name: "Computing", application_number: "PGAC/7", institution: "Example University", date_submitted: "2026-10-17", status_label: "Returned for Review", has_review: true, review_pending: true, reviewed_at: "2026-10-16" }] });
  assert.match(html, /Returned for Review/);
  assert.match(html, /Continue review/);
  assert.match(html, /href="\/programmes\/programme-accreditation\/7\/review"/);
});

test("reviewer failures display retry actions rather than zero statistics", () => {
  const html = render({ error: true });
  assert.match(html, /Review statistics could not be loaded/);
  assert.match(html, /Your applications could not be loaded/);
  assert.doesNotMatch(html, /No applications are awaiting your review/);
});

test("reviewer queries use the scoped endpoint and serialize queue search and pagination", async (t) => {
  const requests = [];
  const api = createApi({ reducerPath: "reviewerTest", endpoints: () => ({}), tagTypes: ["InvoicedApplications"], baseQuery: async (url) => { requests.push(new URL(url, "http://imis.test")); return { data: {} }; } });
  createLoader({ "../services/apiSlice": { apiSlice: api } })("src/redux/features/programme-api-slice.ts");
  const store = configureStore({ reducer: { [api.reducerPath]: api.reducer }, middleware: (getDefault) => getDefault().concat(api.middleware) });
  t.after(() => store.dispatch(api.util.resetApiState()));
  await store.dispatch(api.endpoints.getReviewerDashboardApplications.initiate({ page: 2, search: "Science & Arts", queue: "pending" })).unwrap();
  assert.equal(requests[0].pathname, "/programmes/reviewer-dashboard/");
  assert.deepEqual(Object.fromEntries(requests[0].searchParams), { page: "2", search: "Science & Arts", queue: "pending" });
});
