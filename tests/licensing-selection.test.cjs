const test = require("node:test");
const assert = require("node:assert/strict");
const load = require("./load-typescript.cjs")();
const { toggleLicensingSelection, licensingWorkloadProjection } = load("src/lib/licensing.ts");

test("licensing selection persists across pages and page deselection preserves other selections", () => {
  const first = { id: 1, application_code: "First" };
  const second = { id: 2, application_code: "Second" };
  const third = { id: 3, application_code: "Third" };
  const pageOne = toggleLicensingSelection({}, [first, second], true);
  const pageTwo = toggleLicensingSelection(pageOne, [third], true);
  assert.deepEqual(Object.keys(pageTwo), ["1", "2", "3"]);
  assert.deepEqual(Object.keys(toggleLicensingSelection(pageTwo, [first, second], false)), ["3"]);
  assert.deepEqual(Object.keys(pageOne), ["1", "2"]);
});

test("repeated page selections do not duplicate application IDs", () => {
  const row = { id: 5 };
  const selected = toggleLicensingSelection({}, [row], true);
  assert.deepEqual(Object.keys(toggleLicensingSelection(selected, [row], true)), ["5"]);
});

test("licensing workload projections do not double count assignments already held by the selected reviewer", () => {
  const reviewer = { id: 5, assigned_application_count: 7 };
  const selected = [
    { id: 1, status_code: "prelim_review", desk_reviewer: 5 },
    { id: 2, status_code: "prelim_review", desk_reviewer: 6 },
    { id: 3, status_code: "submitted", desk_reviewer: null },
  ];
  assert.deepEqual(licensingWorkloadProjection(reviewer, selected), { assigned: 7, additions: 2, projected: 9 });
  assert.deepEqual(licensingWorkloadProjection({ id: 6, assigned_application_count: 0 }, []), { assigned: 0, additions: 0, projected: 0 });
});
