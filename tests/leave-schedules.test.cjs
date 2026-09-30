const assert = require("node:assert/strict");
const { test } = require("node:test");
const { configureStore } = require("@reduxjs/toolkit");
const createLoader = require("./load-typescript.cjs");

const schedule = {
  id: 1, leave_type: "Annual", leave_days: 2,
  start_date: "2026-09-29", end_date: "2026-09-30",
};

function setupApi(t, { fail = false, initial = [] } = {}) {
  const previousHost = process.env.NEXT_PUBLIC_HOST;
  process.env.NEXT_PUBLIC_HOST = "http://leave.test";
  const load = createLoader();
  load("src/redux/features/leave-api-slice.ts");
  const { apiSlice: api } = load("src/redux/services/apiSlice.ts");
  let schedules = initial;
  let reads = 0;
  t.mock.method(globalThis, "fetch", async (request) => {
    const url = new URL(request.url);
    if (request.method === "GET" && url.pathname.endsWith("/schedules/")) {
      reads++;
      return Response.json(schedules);
    }
    if (request.method === "POST" && url.pathname.endsWith("/schedule/")) {
      if (fail) return Response.json({ leave_days: ["Invalid"] }, { status: 400 });
      schedules = [schedule];
      return Response.json(schedule, { status: 201 });
    }
    if (request.method === "PATCH" && url.pathname.endsWith("/1/")) {
      assert.equal((await request.json()).status, "submitted");
      schedules = [];
      return Response.json({ ...schedule, status: "submitted" });
    }
    throw new Error(`Unexpected request: ${request.method} ${url}`);
  });
  const store = configureStore({
    reducer: { [api.reducerPath]: api.reducer },
    middleware: (getDefault) => getDefault().concat(api.middleware),
  });
  t.after(() => {
    store.dispatch(api.util.resetApiState());
    if (previousHost === undefined) delete process.env.NEXT_PUBLIC_HOST;
    else process.env.NEXT_PUBLIC_HOST = previousHost;
  });
  return { api, store, reads: () => reads };
}

async function finishQueries(store, api) {
  await Promise.all(store.dispatch(api.util.getRunningQueriesThunk()));
}

test("creating a schedule refreshes the active calendar query", async (t) => {
  const { api, store, reads } = setupApi(t);
  await store.dispatch(api.endpoints.getLeaveSchedules.initiate()).unwrap();
  await store.dispatch(api.endpoints.createLeaveSchedule.initiate(schedule)).unwrap();
  await finishQueries(store, api);
  assert.equal(reads(), 2);
  assert.deepEqual(api.endpoints.getLeaveSchedules.select()(store.getState()).data, [schedule]);
});

test("a rejected save preserves the cached schedules without refetching", async (t) => {
  const { api, store, reads } = setupApi(t, { fail: true, initial: [schedule] });
  await store.dispatch(api.endpoints.getLeaveSchedules.initiate()).unwrap();
  await assert.rejects(store.dispatch(api.endpoints.createLeaveSchedule.initiate(schedule)).unwrap());
  await finishQueries(store, api);
  assert.equal(reads(), 1);
  assert.deepEqual(api.endpoints.getLeaveSchedules.select()(store.getState()).data, [schedule]);
});

test("submitting a planned schedule refreshes the calendar and removes it", async (t) => {
  const { api, store, reads } = setupApi(t, { initial: [schedule] });
  await store.dispatch(api.endpoints.getLeaveSchedules.initiate()).unwrap();
  await store.dispatch(api.endpoints.patchLeaveApplication.initiate({ id: 1, status: "submitted" })).unwrap();
  await finishQueries(store, api);
  assert.equal(reads(), 2);
  assert.deepEqual(api.endpoints.getLeaveSchedules.select()(store.getState()).data, []);
});

function setupForm(t, { fail = false, isLoading = false } = {}) {
  const close = t.mock.fn();
  const success = t.mock.fn();
  const error = t.mock.fn();
  const trigger = t.mock.fn(() => {
    // RTK mutations resolve with { error }; only unwrap rejects on an API error.
    const result = fail ? { error: { status: 400 } } : { data: schedule };
    return Object.assign(Promise.resolve(result), {
      unwrap: () => fail ? Promise.reject(result.error) : Promise.resolve(result.data),
    });
  });
  t.mock.method(console, "log", () => {});
  t.mock.method(console, "error", () => {});
  const load = createLoader({
    "@/components/forms": {
      AppForm: "form", DatePicker: "date-picker", InputField: "input-field",
      SelectField: "select-field", SubmitButton: "submit-button",
    },
    "@/components/ui/button": { Button: "button" },
    "@/hooks": { useDropdownData: () => ({ leave_types: [] }) },
    "@/redux/features/leave-api-slice": { useCreateLeaveScheduleMutation: () => [trigger, { isLoading }] },
    "react-toastify": { toast: { success, error } },
  });
  const CalendarForm = load("src/app/leave/leave-schedule/CalenderForm.tsx").default;
  const form = CalendarForm({ start: new Date(2026, 8, 29), end: new Date(2026, 8, 30), onCancel: close });
  return { form, close, success, error, trigger };
}

test("successful form submission closes the dialog and reports success", async (t) => {
  const { form, close, success, error, trigger } = setupForm(t);
  await form.props.onSubmit(schedule);
  assert.equal(trigger.mock.callCount(), 1);
  assert.equal(close.mock.callCount(), 1);
  assert.equal(success.mock.callCount(), 1);
  assert.equal(error.mock.callCount(), 0);
});

test("failed form submission keeps the dialog open and reports an error", async (t) => {
  const { form, close, success, error } = setupForm(t, { fail: true });
  await form.props.onSubmit(schedule);
  assert.equal(close.mock.callCount(), 0);
  assert.equal(success.mock.callCount(), 0);
  assert.equal(error.mock.callCount(), 1);
});

test("the submit control reflects the mutation loading state", (t) => {
  const { form } = setupForm(t, { isLoading: true });
  const actions = form.props.children.at(-1);
  const submit = actions.props.children.find((child) => child.type === "submit-button");
  assert.equal(submit.props.isLoading, true);
});
