import { apiSlice } from "../services/apiSlice";

const LicenseApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getIntrimAuthorities: builder.query<
      ListRespornse<IntrimAuthority>,
      ListParams
    >({
      query: (params) => {
        const p = params ?? {};
        const search = new URLSearchParams();

        if (p.page !== undefined) search.set("page", String(p.page));
        if (p.pageSize !== undefined)
          search.set("page_size", String(p.pageSize));
        if (p.search) search.set("search", p.search);
        if (p.ordering) search.set("ordering", p.ordering);

        const qs = search.toString();
        return `/licenses/interim-authority/submitted-applications/${qs ? `?${qs}` : ""}`;
      },
    }),
    retrieveIntrimAuthority: builder.query<IntrimAuthority, number>({
      query: (id) => `/licenses/intrim-authority/${id}/`,
    }),
    patchIntrimAuthority: builder.mutation<
      IntrimAuthority,
      { id: number; data: Partial<FormData> }
    >({
      query: ({ id, data }) => ({
        url: `/licenses/intrim-authority/${id}/`,
        method: "PATCH",
        body: data,
      }),
    }),
    createIntrimAuthority: builder.mutation<IntrimAuthority, Partial<FormData>>(
      {
        query: (data) => ({
          url: `/licenses/intrim-authority/`,
          method: "POST",
          body: data,
        }),
      },
    ),

    // University Provisional License Endpoints
    getProvisionalLicenses: builder.query<
      ListRespornse<UniversityProvisionalLicense>,
      ListParams
    >({
      query: (params) => {
        const p = params ?? {};
        const search = new URLSearchParams();

        if (p.page !== undefined) search.set("page", String(p.page));
        if (p.pageSize !== undefined)
          search.set("page_size", String(p.pageSize));
        if (p.search) search.set("search", p.search);
        if (p.ordering) search.set("ordering", p.ordering);

        const qs = search.toString();
        return `/licenses/university-provisional-license/${qs ? `?${qs}` : ""}`;
      },
    }),

    retrieveProvisionalLicense: builder.query<
      UniversityProvisionalLicense,
      number
    >({
      query: (id) => `/licenses/university-provisional-license/${id}/`,
    }),
    patchProvisionalLicense: builder.mutation<
      UniversityProvisionalLicense,
      { id: number; data: Partial<FormData> }
    >({
      query: ({ id, data }) => ({
        url: `/licenses/university-provisional-license/${id}/`,
        method: "PATCH",
        body: data,
      }),
    }),
    createProvisionalLicense: builder.mutation<
      UniversityProvisionalLicense,
      Partial<FormData>
    >({
      query: (data) => ({
        url: `/licenses/university-provisional-license/`,
        method: "POST",
        body: data,
      }),
    }),

    //university charter application endpoints
    getCharterApplications: builder.query<
      ListRespornse<CharterApplication>,
      ListParams
    >({
      query: (params) => {
        const p = params ?? {};
        const search = new URLSearchParams();

        if (p.page !== undefined) search.set("page", String(p.page));
        if (p.pageSize !== undefined)
          search.set("page_size", String(p.pageSize));
        if (p.search) search.set("search", p.search);
        if (p.ordering) search.set("ordering", p.ordering);

        const qs = search.toString();
        return `/licenses/charter-application/${qs ? `?${qs}` : ""}`;
      },
    }),
    retrieveCharterApplication: builder.query<CharterApplication, number>({
      query: (id) => `/licenses/charter-application/${id}/`,
    }),
    patchCharterApplication: builder.mutation<
      CharterApplication,
      { id: number; data: Partial<FormData> }
    >({
      query: ({ id, data }) => ({
        url: `/licenses/charter-application/${id}/`,
        method: "PATCH",
        body: data,
      }),
    }),
    createCharterApplication: builder.mutation<
      CharterApplication,
      Partial<FormData>
    >({
      query: (data) => ({
        url: `/licenses/charter-application/`,
        method: "POST",
        body: data,
      }),
    }),
    createInterimChat: builder.mutation({
      query: (args: ChatMessage) => ({
        url: "/licenses/interim-discussion/",
        method: "POST",
        body: args,
      }),
    }),
    getInterimChatMessages: builder.query<
      ChatMessage[],
      { application_id: number }
    >({
      query: ({ application_id }) =>
        `/licenses/interim-discussion/?application_id=${application_id}`,
    }),

    // ODAI Charter Application Endpoints
  }),
});

export const {
  useGetIntrimAuthoritiesQuery,
  useRetrieveIntrimAuthorityQuery,
  usePatchIntrimAuthorityMutation,
  useCreateIntrimAuthorityMutation,
  useGetProvisionalLicensesQuery,
  useRetrieveProvisionalLicenseQuery,
  usePatchProvisionalLicenseMutation,
  useCreateProvisionalLicenseMutation,
  useCreateCharterApplicationMutation,
  useGetCharterApplicationsQuery,
  useRetrieveCharterApplicationQuery,
  usePatchCharterApplicationMutation,
  useCreateInterimChatMutation,
  useGetInterimChatMessagesQuery,
} = LicenseApiSlice;
