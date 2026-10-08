const assert = require("node:assert/strict");
const { test } = require("node:test");
const createLoader = require("./load-typescript.cjs");
const { getProfileCompletion, isEntered, completionPercentage } = createLoader()("src/app/profile/profile-completion.ts");

test("blank values are missing but zero distance is entered", () => {
  for (const value of [null, undefined, "", "   ", NaN]) assert.equal(isEntered(value), false);
  assert.equal(isEntered(0), true);
  const progress = getProfileCompletion({ distance_from_work: 0, address: "  " });
  const address = progress.sections.find((section) => section.id === "residential_address");
  assert.equal(address.completed, 1);
  assert.ok(address.missing.includes("Address"));
  assert.ok(!address.missing.includes("Distance from work"));
});

test("empty optional record sections do not prevent completion", () => {
  const progress = getProfileCompletion({
    system_account: "1", directorate: "1", department: "1", designation: "1",
    employee_number: "EMP-1", date_of_birth: "1990-01-01", gender: "female",
    nationality: "1", religion: "1", tribe: "1", marital_status: "single", joining_date: "2020-01-01",
    district: "1", county: "1", sub_county: "1", parish: "1", village: "1", distance_from_work: 0, address: "Main Road",
    district_of_origin: "1", county_of_origin: "1", sub_county_of_origin: "1", parish_of_origin: "1", village_of_origin: "1", address_of_origin: "Main Road",
    next_of_kin_name: "Jane", next_of_kin_relationship: "1", next_of_kin_date_of_birth: "1980-01-01",
    occupation: "Teacher", work_place: "School", next_of_kin_phone_number: "+256700000000", next_of_kin_address: "Main Road",
    contact_person_name: "John", contact_person_relationship: "1", contact_person_telephone: "+256700000000",
    father_name: "John", father_status: "deceased", mother_name: "Jane", mother_status: "alive",
    nin: "CM000000000000", bank_name: "Bank", branch: "Main", account_name: "Jane", account_number: "1234", account_type: "savings",
    dependents: [], education_histories: [], work_histories: [], referees: [],
  });
  assert.equal(progress.percentage, 100);
  assert.equal(progress.remaining, 0);
  assert.equal(progress.total, 45);
});

test("incomplete optional records identify the entry and missing fields", () => {
  const progress = getProfileCompletion({ referees: [{ name: "Jane", position: "Manager", place_of_work: " " }] });
  const referees = progress.sections.find((section) => section.id === "referees");
  assert.equal(referees.total, 3);
  assert.equal(referees.completed, 2);
  assert.deepEqual(referees.missing, ["Entry 1: place of work"]);
});

test("rounding never reports 100 percent when a field remains", () => {
  assert.equal(completionPercentage(199, 200), 99);
  assert.equal(completionPercentage(200, 200), 100);
  assert.equal(completionPercentage(0, 0), 0);
});

test("live document progress counts a selected upload and identifies missing names", () => {
  const document = { name: "certificate.pdf" };
  const progress = getProfileCompletion({ documents: [{ name: "", document }] }, true);
  const documents = progress.sections.find((section) => section.id === "documents");
  assert.equal(documents.completed, 1);
  assert.deepEqual(documents.missing, ["Entry 1: name"]);
  assert.ok(!getProfileCompletion({}).sections.some((section) => section.id === "documents"));
});
