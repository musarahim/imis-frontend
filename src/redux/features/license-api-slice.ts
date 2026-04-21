import { apiSlice } from "../services/apiSlice";

const LicenseApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getIntrimAuthorities: builder.query<
      ListRespornse<InterimAuthority>,
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
    retrieveInterimAuthority: builder.query<InterimAuthority, number>({
      query: (id) => `/licenses/interim-authority/${id}/`,
    }),
    patchInterimAuthority: builder.mutation<
      InterimAuthority,
      { id: number; data: Partial<FormData> }
    >({
      query: ({ id, data }) => ({
        url: `/licenses/interim-authority/${id}/`,
        method: "PATCH",
        body: data,
      }),
    }),
    createInterimAuthority: builder.mutation<
      InterimAuthority,
      Partial<FormData>
    >({
      query: (data) => ({
        url: `/licenses/interim-authority/`,
        method: "POST",
        body: data,
      }),
    }),

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

    //license application reviewer
    getDeskReviewers: builder.query<Reviewer[], void>({
      query: () => `/licenses/desk-reviewers/`,
    }),
    assignInterimAuthorityReviewers: builder.mutation<
      ReviewerAssignment,
      { userId: number; applications: number[] }
    >({
      query: ({ userId, applications }) => ({
        url: `/licenses/interim-authority/assign-desk-reviewer/`,
        method: "POST",
        body: { userId, applications },
      }),
    }),
  }),
});

export const {
  useGetIntrimAuthoritiesQuery,
  useRetrieveInterimAuthorityQuery,
  usePatchInterimAuthorityMutation,
  useCreateInterimAuthorityMutation,
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
  useGetDeskReviewersQuery,
  useAssignInterimAuthorityReviewersMutation,
} = LicenseApiSlice;
