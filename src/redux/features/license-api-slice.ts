import { licensingApplications, LicensingApplicationType, LicensingQueueKind, LicensingQueueResponse, LicensingReviewer, LicensingAssignmentFilters } from "@/lib/licensing";
import { LicensingReviewInput, LicensingReviewResponse } from "@/lib/licensing-review";
import { apiSlice } from "../services/apiSlice";
import { ProcessingInput, ProcessingState, ProcessingQueue } from "@/lib/licensing-processing";
import { LicensingApplicationStatus, LicensingStatusEndpoint } from "@/lib/licensing-status";

const buildListQuery = (path: string, params?: ListParams) => {
  const p = params ?? {};
  const search = new URLSearchParams();

  if (p.page !== undefined) search.set("page", String(p.page));
  if (p.pageSize !== undefined) search.set("page_size", String(p.pageSize));
  if (p.search) search.set("search", p.search);
  if (p.ordering) search.set("ordering", p.ordering);

  const qs = search.toString();
  return `${path}${qs ? `?${qs}` : ""}`;
};

const LicenseApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getLicensingApplicationStatus: builder.query<LicensingApplicationStatus, { endpoint: LicensingStatusEndpoint; id: number }>({
      query: ({ endpoint, id }) => `/licenses/${endpoint}/${id}/application-status/`,
    }),
    getLicensingProcessingQueue: builder.query<ProcessingQueue, { applicationType: LicensingApplicationType; page: number; search: string; pageSize?: number; ordering?: string; queue?: string }>({
      query: ({ applicationType, page, search, pageSize, ordering, queue }) => {
        const path = buildListQuery(`/licenses/${licensingApplications[applicationType].endpoint}/processing-queue/`, { page, search, pageSize, ordering });
        return `${path}&queue=${encodeURIComponent(queue ?? "all")}`;
      },
    }),
    getLicensingProcessing: builder.query<ProcessingState, { applicationType: LicensingApplicationType; id: number }>({
      query: ({ applicationType, id }) => `/licenses/${licensingApplications[applicationType].endpoint}/${id}/processing/`,
    }),
    saveLicensingProcessing: builder.mutation<ProcessingState, { applicationType: LicensingApplicationType; id: number; data: ProcessingInput }>({
      query: ({ applicationType, id, data }) => ({ url: `/licenses/${licensingApplications[applicationType].endpoint}/${id}/processing/`, method: "POST", body: data }),
    }),
    getLicensingPreliminaryReview: builder.query<LicensingReviewResponse, { applicationType: LicensingApplicationType; id: number }>({
      query: ({ applicationType, id }) => `/licenses/${licensingApplications[applicationType].endpoint}/${id}/preliminary-review/`,
    }),
    saveLicensingPreliminaryReview: builder.mutation<LicensingReviewResponse, { applicationType: LicensingApplicationType; id: number; data: LicensingReviewInput }>({
      query: ({ applicationType, id, data }) => ({
        url: `/licenses/${licensingApplications[applicationType].endpoint}/${id}/preliminary-review/`, method: "POST", body: data,
      }),
    }),

    getLicensingQueue: builder.query<LicensingQueueResponse, {
      applicationType: LicensingApplicationType; queue: LicensingQueueKind; page: number; search?: string;
      pageSize?: number; institution?: string; status?: string;
      reviewStatus?: string;
    }>({
      query: ({ applicationType, queue, page, search, pageSize = 10, institution, status, reviewStatus }) => {
        const path = buildListQuery(`/licenses/${licensingApplications[applicationType].endpoint}/${queue}/`, { page, pageSize, search });
        const filters = new URLSearchParams();
        if (institution) filters.set("institution", institution);
        if (status) filters.set("status", status);
        if (reviewStatus) filters.set("review_status", reviewStatus);
        return path + (filters.size ? `&${filters}` : "");
      },
    }),
    getLicensingAssignmentFilters: builder.query<LicensingAssignmentFilters, LicensingApplicationType>({
      query: (applicationType) => `/licenses/${licensingApplications[applicationType].endpoint}/assignment-filter-options/`,
    }),
    assignLicensingReviewers: builder.mutation<{ message: string; assigned_count: number; changed_count: number }, {
      applicationType: LicensingApplicationType; userId: number; applications: number[];
    }>({
      query: ({ applicationType, userId, applications }) => ({
        url: `/licenses/${licensingApplications[applicationType].endpoint}/assign-desk-reviewer/`,
        method: 'POST', body: { userId, applications },
      }),
    }),


    retrieveODAIInterimAuthority: builder.query<InterimAuthority, number>({
      query: (id) => `/licenses/interim-authority-odai/${id}/`,
    }),
    getODAIProvisionalLicenses: builder.query<ListResponse<UniversityProvisionalLicense>, ListParams>({
      query: (params) => buildListQuery('/licenses/provisional-license-odai/', params),
    }),
    retrieveODAIProvisionalLicense: builder.query<UniversityProvisionalLicense, number>({
      query: (id) => `/licenses/provisional-license-odai/${id}/`,
    }),
    getODAICharterApplications: builder.query<ListResponse<CharterApplication>, ListParams>({
      query: (params) => buildListQuery('/licenses/charter-application-odai/', params),
    }),
    retrieveODAICharterApplication: builder.query<CharterApplication, number>({
      query: (id) => `/licenses/charter-application-odai/${id}/`,
    }),

    getIntrimAuthorities: builder.query<
      ListResponse<InterimAuthority>,
      ListParams
    >({
      query: (params) =>
        buildListQuery(
          "/licenses/interim-authority/submitted-applications/",
          params,
        ),
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

    getProvisionalLicenses: builder.query<
      ListResponse<UniversityProvisionalLicense>,
      ListParams
    >({
      query: (params) =>
        buildListQuery("/licenses/university-provisional-license/", params),
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
      ListResponse<CharterApplication>,
      ListParams
    >({
      query: (params) =>
        buildListQuery("/licenses/charter-application/", params),
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
    getDeskReviewers: builder.query<LicensingReviewer[], { applicationType: LicensingApplicationType } | void>({
      query: (params) => params?.applicationType
        ? `/licenses/desk-reviewers/?review_permission=${licensingApplications[params.applicationType].reviewPermission}`
        : `/licenses/desk-reviewers/`,
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
    //get interim authority ODAI applications
    getODAIInterimAuthorities: builder.query<
      ListResponse<InterimAuthority>,
      ListParams
    >({
      query: (params) =>
        buildListQuery(
          "/licenses/interim-authority-odai/submitted-applications/",
          params,
        ),
    }),
  }),
});

export const {
  useGetLicensingApplicationStatusQuery,
  useGetLicensingProcessingQueueQuery,
  useGetLicensingProcessingQuery,
  useSaveLicensingProcessingMutation,
  useGetLicensingPreliminaryReviewQuery,
  useSaveLicensingPreliminaryReviewMutation,
  useGetLicensingAssignmentFiltersQuery,
  useGetLicensingQueueQuery,
  useAssignLicensingReviewersMutation,
  useRetrieveODAIInterimAuthorityQuery,
  useGetODAIProvisionalLicensesQuery,
  useRetrieveODAIProvisionalLicenseQuery,
  useGetODAICharterApplicationsQuery,
  useRetrieveODAICharterApplicationQuery,
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
  useGetODAIInterimAuthoritiesQuery,
} = LicenseApiSlice;
