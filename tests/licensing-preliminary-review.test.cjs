const test = require("node:test");
const assert = require("node:assert/strict");
const React = require("react");
const { renderToStaticMarkup } = require("react-dom/server");
const createLoader = require("./load-typescript.cjs");
const helpers = createLoader()("src/lib/licensing-review.ts");

test("dynamic review values distinguish false, zero and missing values", () => {
  assert.equal(helpers.licensingFieldText(false), "No");
  assert.equal(helpers.licensingFieldText(0), "0");
  assert.equal(helpers.licensingFieldText(null), "Not provided");
  assert.equal(helpers.licensingFieldText(true), "Yes");
});

test("empty notes are omitted while unfinished clarifications remain available for validation", () => {
  assert.deepEqual(helpers.prepareLicensingObservations({
    empty: { finding: "note", comment: " " },
    note: { finding: "note", comment: " Keep this note " },
    clarification: { finding: "clarification", comment: " " },
  }), {
    note: { finding: "note", comment: "Keep this note" },
    clarification: { finding: "clarification", comment: "" },
  });
});

function loadReview() {
  const primitive = (tag) => ({ children, variant, ...props }) => React.createElement(tag, props, children);
  return createLoader({
    "@/lib/licensing-review": helpers,
    "@/lib/licensing": createLoader()("src/lib/licensing.ts"),
    "@/components/ui/button": { Button: primitive("button") },
    "@/components/ui/input": { Input: primitive("input") },
    "@/components/ui/dialog": { Dialog: () => null, DialogContent: primitive("div"), DialogHeader: primitive("div"), DialogTitle: primitive("h2"), DialogDescription: primitive("p") },
    "@/redux/features/license-api-slice": {},
    "next/navigation": { useRouter: () => ({ push() {} }) },
    "react-toastify": { toast: { success() {}, error() {} } },
  })("src/components/licensing/LicensingPreliminaryReview.tsx");
}

test("submitted field HTML is escaped and document links require HTTP or HTTPS", () => {
  const { ReviewFieldValue } = loadReview();
  const render = (kind, value) => renderToStaticMarkup(React.createElement(ReviewFieldValue, { field: { key: "test", label: "Test", section: "Test", kind, value } }));
  assert.doesNotMatch(render("text", "<script>alert(1)</script>"), /<script>/);
  assert.match(render("text", "<script>alert(1)</script>"), /&lt;script&gt;/);
  assert.doesNotMatch(render("file", "javascript:alert(1)"), /<a /);
  assert.match(render("file", "https://files.example.test/land-title.pdf"), /Open submitted document/);
  assert.match(render("boolean", false), /No/);
});
