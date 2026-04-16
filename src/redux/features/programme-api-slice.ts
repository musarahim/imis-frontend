import { apiSlice } from "../services/apiSlice";
const ProgrammeApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProgrammeAccreditations: builder.query<
      ListRespornse<ProgrammeAccreditation>,
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
        return `/programmes/programme-accreditation/submitted-applications/${qs ? `?${qs}` : ""}`;
      },
    }),
    getProgrammeAccreditationsUnderReview: builder.query<
      ListRespornse<ProgrammeAccreditation>,
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
        return `/programmes/programme-accreditation/under-review/${qs ? `?${qs}` : ""}`;
      },
    }),
    getProgrammeAccreditationsUnderAssessment: builder.query<
      ListRespornse<ProgrammeAccreditation>,
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
        return `/programmes/programme-accreditation/under-assessment/${qs ? `?${qs}` : ""}`;
      },
    }),
    retrieveProgrammeAccreditation: builder.query<
      ProgrammeAccreditation,
      number
    >({
      query: (id) => `/programmes/programme-accreditation/${id}/`,
    }),
    patchProgrammeAccreditation: builder.mutation<
      ProgrammeAccreditation,
      { id: number; data: Partial<FormData> }
    >({
      query: ({ id, data }) => ({
        url: `/programmes/programme-accreditation/${id}/`,
        method: "PATCH",
        body: data,
      }),
    }),
    createProgrammeAccreditation: builder.mutation<
      ProgrammeAccreditation,
      Partial<FormData>
    >({
      query: (data) => ({
        url: `/programmes/programme-accreditation/`,
        method: "POST",
        body: data,
      }),
    }),
    getProgrammeReviewers: builder.query<Reviewer[], void>({
      query: () => `/programmes/programme-reviewers/`,
    }),
    assignReviewers: builder.mutation<
      ReviewerAssignment,
      { userId: number; applications: number[] }
    >({
      query: ({ userId, applications }) => ({
        url: `/programmes/programme-accreditation/assign-reviewer/`,
        method: "POST",
        body: { userId, applications },
      }),
    }),
    assignAssessors: builder.mutation<
      ReviewerAssignment,
      { userId: number; applications: number[] }
    >({
      query: ({ userId, applications }) => ({
        url: `/programmes/programme-accreditation/assign-assessor/`,
        method: "POST",
        body: { userId, applications },
      }),
    }),

    createPreliminaryReview: builder.mutation({
      query: (args: PreliminaryReview) => ({
        url: "/programmes/preliminary-reviews/",
        method: "POST",
        body: args,
      }),
    }),

    getPreliminaryReviews: builder.query<
      ListRespornse<PreliminaryReview>,
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
        return `/programmes/preliminary-reviews/${qs ? `?${qs}` : ""}`;
      },
    }),
    retrievePreliminaryReview: builder.query<PreliminaryReview, number>({
      query: (id) => `/programmes/preliminary-reviews/${id}/`,
    }),
    //programme assessment
    createProgrammeAssessment: builder.mutation({
      query: (args: ProgrammeAssessment) => ({
        url: "/programmes/programme-assessments/",
        method: "POST",
        body: args,
      }),
    }),

    getProgrammeAssessments: builder.query<
      ListRespornse<ProgrammeAssessment>,
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
        return `/programmes/programme-assessments/${qs ? `?${qs}` : ""}`;
      },
    }),
    retrieveProgrammeAssessment: builder.query<ProgrammeAssessment, number>({
      query: (id) => `/programmes/programme-assessments/${id}/`,
    }),
    getProgrammeAssessors: builder.query<Reviewer[], void>({
      query: () => `/programmes/programme-assessors/`,
    }),

    getProgrammesReadyForAccessment: builder.query<
      ListRespornse<ProgrammeAccreditation>,
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
        return `/programmes/programme-accreditation/ready-for-assessment/${qs ? `?${qs}` : ""}`;
      },
    }),
    getProgressedToDirectorateApplications: builder.query<
      ListRespornse<ProgrammeAccreditation>,
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
        return `/programmes/programme-accreditation/progressed-to-directorate/${qs ? `?${qs}` : ""}`;
      },
    }),
    getProgressedToManagementApplications: builder.query<
      ListRespornse<ProgrammeAccreditation>,
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
        return `/programmes/programme-accreditation/progressed-to-management/${qs ? `?${qs}` : ""}`;
      },
    }),

    retrieveDirectorateApplication: builder.query<
      ProgrammeAccreditation,
      number
    >({
      query: (id) =>
        `/programmes/programme-accreditation/${id}/progressed-to-directorate-details/`,
    }),
    //progressed to management details
    retrieveManagementApplication: builder.query<
      ProgrammeAccreditation,
      number
    >({
      query: (id) =>
        `/programmes/programme-accreditation/${id}/progressed-to-management-details/`,
    }),

    addDirectorateDecision: builder.mutation({
      query: ({
        id,
        data,
      }: {
        id: number;
        data: { status: string; comment: string };
      }) => ({
        url: `/programmes/programme-accreditation/${id}/add-director-comment/`,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useGetProgrammeAccreditationsQuery,
  useRetrieveProgrammeAccreditationQuery,
  usePatchProgrammeAccreditationMutation,
  useCreateProgrammeAccreditationMutation,
  useGetProgrammeReviewersQuery,
  useAssignReviewersMutation,
  useGetProgrammeAccreditationsUnderReviewQuery,
  useCreatePreliminaryReviewMutation,
  useGetPreliminaryReviewsQuery,
  useRetrievePreliminaryReviewQuery,
  useGetProgrammeAssessorsQuery,
  useGetProgrammesReadyForAccessmentQuery,
  useAssignAssessorsMutation,
  useGetProgrammeAccreditationsUnderAssessmentQuery,
  useCreateProgrammeAssessmentMutation,
  useGetProgrammeAssessmentsQuery,
  useRetrieveProgrammeAssessmentQuery,
  useGetProgressedToDirectorateApplicationsQuery,
  useRetrieveDirectorateApplicationQuery,
  useAddDirectorateDecisionMutation,
  useGetProgressedToManagementApplicationsQuery,
  useRetrieveManagementApplicationQuery,
} = ProgrammeApiSlice;
