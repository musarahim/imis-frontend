const assert = require("node:assert/strict");
const { test } = require("node:test");
const { configureStore } = require("@reduxjs/toolkit");
const { createApi } = require("@reduxjs/toolkit/query/react");
const createLoader = require("./load-typescript.cjs");

function setup(t, { reload = false } = {}) {
  const previousMode = process.env.NODE_ENV;
  process.env.NODE_ENV = "development";
  const requests = [];
  const api = createApi({
    reducerPath: "assessorFilterTest",
    baseQuery: async (url) => {
      requests.push(new URL(url, "http://imis.test"));
      return { data: { count: 0, results: [] } };
    },
    endpoints: () => ({}),
  });
  if (reload) {
    // Simulate the query definition already in the store before Fast Refresh.
    api.injectEndpoints({ endpoints: (builder) => ({
      getProgrammesReadyForAccessment: builder.query({
        query: (params) => `/programmes/programme-accreditation/ready-for-assessment/?page=${params.page}&page_size=${params.pageSize}`,
      }),
    }) });
  }
  createLoader({ "../services/apiSlice": { apiSlice: api } })("src/redux/features/programme-api-slice.ts");
  const store = configureStore({
    reducer: { [api.reducerPath]: api.reducer },
    middleware: (getDefault) => getDefault().concat(api.middleware),
  });
  t.after(() => {
    store.dispatch(api.util.resetApiState());
    if (previousMode === undefined) delete process.env.NODE_ENV;
    else process.env.NODE_ENV = previousMode;
  });
  return { api, store, requests };
}

for (const reload of [false, true]) {
  test(`assessor dropdown filters reach the API${reload ? " after Fast Refresh" : " on initial load"}`, async (t) => {
    const { api, store, requests } = setup(t, { reload });
    await store.dispatch(api.endpoints.getProgrammesReadyForAccessment.initiate({
      page: 1, pageSize: 25, search: "science", institution: "7", programme_category: "stem", tier_displine: "computing",
    })).unwrap();
    assert.equal(requests.length, 1);
    assert.equal(requests[0].searchParams.get("institution"), "7");
    assert.equal(requests[0].searchParams.get("programme_category"), "stem");
    assert.equal(requests[0].searchParams.get("tier_displine"), "computing");
    assert.equal(requests[0].searchParams.get("search"), "science");
    await store.dispatch(api.endpoints.getProgrammesReadyForAccessment.initiate({
      page: 1, pageSize: 25, institution: "8", tier_displine: "business",
    })).unwrap();
    assert.equal(requests.length, 2);
    assert.equal(requests[1].searchParams.get("institution"), "8");
    assert.equal(requests[1].searchParams.get("tier_displine"), "business");
    assert.equal(requests[1].searchParams.has("programme_category"), false);
  });
}
