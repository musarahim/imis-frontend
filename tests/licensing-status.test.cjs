const test = require("node:test");
const assert = require("node:assert/strict");
const React = require("react");
const { renderToStaticMarkup } = require("react-dom/server");
const createLoader = require("./load-typescript.cjs");

const helpers = createLoader()("src/lib/licensing-status.ts");
const primitive = (tag) => ({ children, variant, ...props }) => React.createElement(tag, props, children);
const { ApplicationStatusContent } = createLoader({
  "@/lib/licensing-status": helpers,
  "@/redux/features/license-api-slice": {},
  "@/components/ui/badge": { Badge: primitive("span") },
  "@/components/ui/button": { Button: primitive("button") },
  "@/components/ui/card": { Card: primitive("section"), CardContent: primitive("div"), CardDescription: primitive("p"), CardHeader: primitive("header"), CardTitle: primitive("h2") },
})("src/components/licensing/ApplicationStatus.tsx");

test("institution status displays the next required action and newest recorded status first", () => {
  const data = {
    application_code: "UNI/2026/001", status: "Awaiting Your Clarification", action_required: true,
    next_step: "Respond to the NCHE clarification letter.", updated_at: "2026-10-25T09:00:00Z",
    history: [
      { id: 1, status: "Submitted", recorded_at: "2026-10-24T09:00:00Z" },
      { id: 2, status: "Awaiting Your Clarification", recorded_at: "2026-10-25T09:00:00Z" },
    ],
    notes: "Internal staff findings must not appear", evidence: { report: "Confidential" },
  };
  const html = renderToStaticMarkup(React.createElement(ApplicationStatusContent, { data }));
  assert.match(html, /Action Required/);
  assert.match(html, /Respond to the NCHE clarification letter/);
  assert.doesNotMatch(html, /Internal staff|Confidential/);
  const history = html.slice(html.indexOf("Status History"));
  assert.ok(history.indexOf("Awaiting Your Clarification") < history.indexOf("Submitted"));
});

test("legacy status dates remain explicitly unknown", () => {
  const html = renderToStaticMarkup(React.createElement(ApplicationStatusContent, { data: {
    application_code: "OLD/001", status: "Submitted", action_required: false, next_step: "Await review", updated_at: null,
    history: [{ id: null, status: "Submitted", recorded_at: null }],
  } }));
  assert.match(html, /Date not recorded/);
  assert.match(html, /What Happens Next/);
  assert.doesNotMatch(html, /Updated:/);
});
