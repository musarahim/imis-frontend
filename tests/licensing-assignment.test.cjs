const test = require("node:test");
const assert = require("node:assert/strict");
const React = require("react");
const { renderToStaticMarkup } = require("react-dom/server");
const { Formik } = require("formik");
const createLoader = require("./load-typescript.cjs");
const licensing = createLoader()("src/lib/licensing.ts");

test("reviewer cards share a workload scale and show honest reassignment totals", () => {
  const load = createLoader({ "@/lib/licensing": licensing });
  const Selection = load("src/components/licensing/LicensingReviewerSelection.tsx").default;
  const html = renderToStaticMarkup(React.createElement(Formik, { initialValues: { reviewer: "1" }, onSubmit() {} },
    React.createElement(Selection, {
      reviewers: [{ id: 1, name: "First Reviewer", assigned_application_count: 3 }, { id: 2, name: "Second Reviewer", assigned_application_count: 6 }],
      selectedApplications: [{ id: 1, status_code: "prelim_review", desk_reviewer: 1 }, { id: 2, status_code: "submitted", desk_reviewer: null }],
    }),
  ));
  assert.match(html, /After assignment: 4 \(3 current \+ 1 to add\)/);
  assert.equal((html.match(/aria-valuemax="6"/g) || []).length, 2);
  assert.match(html, /already assigned to this reviewer/);
  assert.match(html, /type="radio"/);
  assert.doesNotMatch(html, /NaN|Infinity/);
});

function renderAssignment({ reviewerError = false, rows = [] } = {}) {
  const primitive = (tag) => ({ children, variant, size, ...props }) => React.createElement(tag, props, children);
  const load = createLoader({
    "@/lib/licensing": licensing,
    "@/components/forms": { AppForm: ({ children, initialValues, onSubmit, validationSchema }) => React.createElement(Formik, { initialValues, onSubmit, validationSchema }, React.createElement("form", null, children)) },
    "@/components/ui/button": { Button: primitive("button") },
    "@/components/ui/input": { Input: primitive("input") },
    "@/components/ui/checkbox": { Checkbox: ({ onCheckedChange, ...props }) => React.createElement("input", { ...props, type: "checkbox", readOnly: true }) },
    "@/components/ui/separator": { Separator: () => React.createElement("hr") },
    "@/components/ui/table": Object.fromEntries(Object.entries({ Table: "table", TableHeader: "thead", TableBody: "tbody", TableHead: "th", TableRow: "tr", TableCell: "td" }).map(([name, tag]) => [name, primitive(tag)])),
    "next/navigation": { useRouter: () => ({ push() {} }) },
    "react-toastify": { toast: { success() {}, error() {} } },
    "@/redux/features/license-api-slice": {
      useGetLicensingQueueQuery: () => ({ currentData: { results: rows, count: rows.length, next: null, previous: null }, isFetching: false, refetch() {} }),
      useGetLicensingAssignmentFiltersQuery: () => ({ data: { institutions: [{ id: 1, name: "Example Institution" }], statuses: [{ value: "submitted", label: "Submitted" }] }, refetch() {} }),
      useGetDeskReviewersQuery: () => ({ data: reviewerError ? undefined : [{ id: 1, name: "First Reviewer", assigned_application_count: 3 }], error: reviewerError ? {} : undefined, isFetching: false, refetch() {} }),
      useAssignLicensingReviewersMutation: () => [() => ({ unwrap: async () => ({ message: "Assigned" }) }), { isLoading: false }],
    },
  });
  const Assignment = load("src/components/licensing/LicensingAssignmentForm.tsx").default;
  return renderToStaticMarkup(React.createElement(Assignment, { applicationType: "odai-interim" }));
}

test("licensing assignment uses the programme-style two-column form, filters, and reviewer cards", () => {
  const html = renderAssignment();
  for (const text of ["Assign Preliminary Reviewer", "Filter applications", "All institutions", "Application status", "Reset filters", "lg:flex-row", "lg:w-1/3", "Select Reviewer", "First Reviewer", "Selections are kept across searches, filters and pages."]) assert.ok(html.includes(text), text);
  assert.match(html, /No applications are awaiting assignment/);
  assert.doesNotMatch(html, /Programme category/);
});

test("reviewer workload failures show retry and disable assignment rather than inventing zero counts", () => {
  const html = renderAssignment({ reviewerError: true });
  assert.match(html, /Could not load reviewers and their workloads/);
  assert.match(html, /Retry/);
  assert.match(html, /<button[^>]*type="submit"[^>]*disabled=""/);
  assert.doesNotMatch(html, /role="progressbar"/);
});
