const React = require("react");
const { renderToStaticMarkup } = require("react-dom/server");
const createLoader = require("./load-typescript.cjs");

// Sample data for component checks and local visual previews, never production data.
const summary = {
  totals: { applications: 42, institutions: 7, reviewed: 28, ready_for_assessment: 9,
    payment_verification: 5, stem: 25, humanities: 15, unspecified: 2, latest_submission: "2026-10-16T12:00:00Z" },
  stages: [
    { value: "submitted", label: "Submitted", count: 4 },
    { value: "under_review", label: "Under Review", count: 10 },
    { value: "reviewed", label: "Reviewed", count: 12 },
    { value: "under_assessment", label: "Under Assessment", count: 7 },
    { value: "invoice_reconciled", label: "Invoice Reconciled", count: 9 },
  ],
  top_institutions: [
    { id: 1, name: "Alpha University", applications: 16, reviewed: 10 },
    { id: 2, name: "Beta University", applications: 10, reviewed: 8 },
    { id: 3, name: "Gamma University", applications: 6, reviewed: 4 },
    { id: 4, name: "Delta Institute of Technology", applications: 4, reviewed: 2 },
    { id: 5, name: "Epsilon University", applications: 3, reviewed: 2 },
    { id: 6, name: "Zeta University", applications: 2, reviewed: 1 },
    { id: 7, name: "Eta University", applications: 1, reviewed: 1 },
  ],
  generated_at: "2026-10-17T09:00:00Z",
};
const row = {
  id: 1, application_number: "PGAC/2026/001", programme_name: "Bachelor of Science in Computer Science",
  institution: "Alpha University", institution_id: 1, date_submitted: "2026-10-16T12:00:00Z",
  programme_category: "stem", programme_category_label: "STEM", program_level: "Bachelors",
  status: "invoice_reconciled", status_label: "Invoice Reconciled", invoice_number: "052/PROG/2026", payment_status: "Fully verified",
};

function renderDashboard({ tab = "overview", summaryError = false, rows = [row] } = {}) {
  const css = new Proxy({}, { get: (_, key) => String(key) });
  const load = createLoader({
    react: { ...React, useState: (initial) => React.useState(initial === "overview" ? tab : initial) },
    "next/link": ({ children, ...props }) => React.createElement("a", props, children),
    "react-toastify": { toast: { success() {}, info() {}, error() {} } },
    "./programme-accreditation-dashboard.module.css": { __esModule: true, default: css },
    "@/lib/csv": createLoader()("src/lib/csv.ts"),
    "@/redux/features/programme-api-slice": {
      useGetProgrammeHeadDashboardSummaryQuery: () => ({ data: summaryError ? undefined : summary, isError: summaryError, refetch() {} }),
      useGetProgrammeHeadDashboardFiltersQuery: () => ({ data: {
        institutions: summary.top_institutions, programme_categories: [{ value: "stem", label: "STEM" }], statuses: summary.stages,
      }, refetch() {} }),
      useGetProgrammeHeadDashboardRegisterQuery: () => ({ currentData: { count: rows.length, results: rows, next: null, previous: null }, refetch() {} }),
      useLazyGetProgrammeHeadDashboardRegisterQuery: () => [() => ({ unwrap: async () => ({ results: rows, next: null }) })],
    },
  });
  const Dashboard = load("src/app/dashboard/programme-accreditation-dashboard.tsx").default;
  return renderToStaticMarkup(React.createElement(Dashboard, { user: { first_name: "Programme Head", username: "head" } }));
}

module.exports = { summary, row, renderDashboard };
