import { apiSlice } from "../services/apiSlice";

const buildQs = (params?: ListParams) => {
  const p = params ?? {};
  const search = new URLSearchParams();
  if (p.page !== undefined) search.set("page", String(p.page));
  if (p.pageSize !== undefined) search.set("page_size", String(p.pageSize));
  if (p.search) search.set("search", p.search);
  if (p.ordering) search.set("ordering", p.ordering);
  return search.toString();
};

const appraisalApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // ── Appraisals list / CRUD ─────────────────────────────────────────────────
    getAppraisals: builder.query<ListResponse<PerformanceAppraisal>, ListParams>({
      query: (params) => {
        const qs = buildQs(params);
        return `/appraisals/performance-appraisals/${qs ? `?${qs}` : ""}`;
      },
      providesTags: ["Appraisal"],
    }),
    getMyAppraisals: builder.query<ListResponse<PerformanceAppraisal>, ListParams>({
      query: (params) => {
        const qs = buildQs(params);
        return `/appraisals/performance-appraisals/my-appraisals/${qs ? `?${qs}` : ""}`;
      },
      providesTags: ["Appraisal"],
    }),
    getAppraiserReviews: builder.query<ListResponse<PerformanceAppraisal>, ListParams>({
      query: (params) => {
        const qs = buildQs(params);
        return `/appraisals/performance-appraisals/appraiser-reviews/${qs ? `?${qs}` : ""}`;
      },
      providesTags: ["Appraisal"],
    }),
    getReviewerReviews: builder.query<ListResponse<PerformanceAppraisal>, ListParams>({
      query: (params) => {
        const qs = buildQs(params);
        return `/appraisals/performance-appraisals/reviewer-reviews/${qs ? `?${qs}` : ""}`;
      },
      providesTags: ["Appraisal"],
    }),
    getDirectorReviews: builder.query<ListResponse<PerformanceAppraisal>, ListParams>({
      query: (params) => {
        const qs = buildQs(params);
        return `/appraisals/performance-appraisals/director-reviews/${qs ? `?${qs}` : ""}`;
      },
      providesTags: ["Appraisal"],
    }),
    getExecutiveReviews: builder.query<ListResponse<PerformanceAppraisal>, ListParams>({
      query: (params) => {
        const qs = buildQs(params);
        return `/appraisals/performance-appraisals/executive-reviews/${qs ? `?${qs}` : ""}`;
      },
      providesTags: ["Appraisal"],
    }),
    getAppraisalById: builder.query<PerformanceAppraisal, number>({
      query: (id) => `/appraisals/performance-appraisals/${id}/`,
      providesTags: (_r, _e, id) => [{ type: "Appraisal", id }],
    }),
    createAppraisal: builder.mutation<PerformanceAppraisal, Partial<PerformanceAppraisal>>({
      query: (data) => ({ url: "/appraisals/performance-appraisals/", method: "POST", body: data }),
      invalidatesTags: ["Appraisal"],
    }),
    updateAppraisal: builder.mutation<PerformanceAppraisal, { id: number; data: Partial<PerformanceAppraisal> }>({
      query: ({ id, data }) => ({ url: `/appraisals/performance-appraisals/${id}/`, method: "PATCH", body: data }),
      invalidatesTags: (_r, _e, { id }) => [{ type: "Appraisal", id }, "Appraisal"],
    }),
    deleteAppraisal: builder.mutation<void, number>({
      query: (id) => ({ url: `/appraisals/performance-appraisals/${id}/`, method: "DELETE" }),
      invalidatesTags: ["Appraisal"],
    }),

    // ── Status transitions ─────────────────────────────────────────────────────
    submitSelfAssessment: builder.mutation<PerformanceAppraisal, { id: number; comment?: string }>({
      query: ({ id, ...body }) => ({ url: `/appraisals/performance-appraisals/${id}/submit-self-assessment/`, method: "POST", body }),
      invalidatesTags: ["Appraisal"],
    }),
    submitAppraiserReview: builder.mutation<PerformanceAppraisal, { id: number; supervisor_remarks?: string; appraiser_comment?: string }>({
      query: ({ id, ...body }) => ({ url: `/appraisals/performance-appraisals/${id}/submit-appraiser-review/`, method: "POST", body }),
      invalidatesTags: ["Appraisal"],
    }),
    submitReviewerComment: builder.mutation<PerformanceAppraisal, { id: number; comment: string }>({
      query: ({ id, ...body }) => ({ url: `/appraisals/performance-appraisals/${id}/submit-reviewer-comment/`, method: "POST", body }),
      invalidatesTags: ["Appraisal"],
    }),
    submitDirectorComment: builder.mutation<PerformanceAppraisal, { id: number; comment: string }>({
      query: ({ id, ...body }) => ({ url: `/appraisals/performance-appraisals/${id}/submit-director-comment/`, method: "POST", body }),
      invalidatesTags: ["Appraisal"],
    }),
    submitExecutiveComment: builder.mutation<PerformanceAppraisal, { id: number; comment: string }>({
      query: ({ id, ...body }) => ({ url: `/appraisals/performance-appraisals/${id}/submit-executive-comment/`, method: "POST", body }),
      invalidatesTags: ["Appraisal"],
    }),

    // ── Outputs ───────────────────────────────────────────────────────────────
    createOutput: builder.mutation<AppraisalOutput, Partial<AppraisalOutput>>({
      query: (data) => ({ url: "/appraisals/appraisal-outputs/", method: "POST", body: data }),
      invalidatesTags: ["Appraisal"],
    }),
    updateOutput: builder.mutation<AppraisalOutput, { id: number; data: Partial<AppraisalOutput> }>({
      query: ({ id, data }) => ({ url: `/appraisals/appraisal-outputs/${id}/`, method: "PATCH", body: data }),
      invalidatesTags: ["Appraisal"],
    }),
    deleteOutput: builder.mutation<void, number>({
      query: (id) => ({ url: `/appraisals/appraisal-outputs/${id}/`, method: "DELETE" }),
      invalidatesTags: ["Appraisal"],
    }),

    // ── Competency Ratings ────────────────────────────────────────────────────
    createCompetency: builder.mutation<CompetencyRating, Partial<CompetencyRating>>({
      query: (data) => ({ url: "/appraisals/competency-ratings/", method: "POST", body: data }),
      invalidatesTags: ["Appraisal"],
    }),
    updateCompetency: builder.mutation<CompetencyRating, { id: number; data: Partial<CompetencyRating> }>({
      query: ({ id, data }) => ({ url: `/appraisals/competency-ratings/${id}/`, method: "PATCH", body: data }),
      invalidatesTags: ["Appraisal"],
    }),
    deleteCompetency: builder.mutation<void, number>({
      query: (id) => ({ url: `/appraisals/competency-ratings/${id}/`, method: "DELETE" }),
      invalidatesTags: ["Appraisal"],
    }),

    // ── Improvement Areas ─────────────────────────────────────────────────────
    createImprovementArea: builder.mutation<ImprovementArea, Partial<ImprovementArea>>({
      query: (data) => ({ url: "/appraisals/improvement-areas/", method: "POST", body: data }),
      invalidatesTags: ["Appraisal"],
    }),
    updateImprovementArea: builder.mutation<ImprovementArea, { id: number; data: Partial<ImprovementArea> }>({
      query: ({ id, data }) => ({ url: `/appraisals/improvement-areas/${id}/`, method: "PATCH", body: data }),
      invalidatesTags: ["Appraisal"],
    }),
    deleteImprovementArea: builder.mutation<void, number>({
      query: (id) => ({ url: `/appraisals/improvement-areas/${id}/`, method: "DELETE" }),
      invalidatesTags: ["Appraisal"],
    }),

    // ── Next Year Plans ───────────────────────────────────────────────────────
    createNextYearPlan: builder.mutation<NextYearPlan, Partial<NextYearPlan>>({
      query: (data) => ({ url: "/appraisals/next-year-plans/", method: "POST", body: data }),
      invalidatesTags: ["Appraisal"],
    }),
    updateNextYearPlan: builder.mutation<NextYearPlan, { id: number; data: Partial<NextYearPlan> }>({
      query: ({ id, data }) => ({ url: `/appraisals/next-year-plans/${id}/`, method: "PATCH", body: data }),
      invalidatesTags: ["Appraisal"],
    }),
    deleteNextYearPlan: builder.mutation<void, number>({
      query: (id) => ({ url: `/appraisals/next-year-plans/${id}/`, method: "DELETE" }),
      invalidatesTags: ["Appraisal"],
    }),

    // ── Qualifications & Trainings ────────────────────────────────────────────
    createInitialQualification: builder.mutation<AppraisalQualification, Partial<AppraisalQualification>>({
      query: (data) => ({ url: "/appraisals/initial-qualifications/", method: "POST", body: data }),
      invalidatesTags: ["Appraisal"],
    }),
    deleteInitialQualification: builder.mutation<void, number>({
      query: (id) => ({ url: `/appraisals/initial-qualifications/${id}/`, method: "DELETE" }),
      invalidatesTags: ["Appraisal"],
    }),
    createAdditionalQualification: builder.mutation<AppraisalQualification, Partial<AppraisalQualification>>({
      query: (data) => ({ url: "/appraisals/additional-qualifications/", method: "POST", body: data }),
      invalidatesTags: ["Appraisal"],
    }),
    deleteAdditionalQualification: builder.mutation<void, number>({
      query: (id) => ({ url: `/appraisals/additional-qualifications/${id}/`, method: "DELETE" }),
      invalidatesTags: ["Appraisal"],
    }),
    createTraining: builder.mutation<AppraisalTraining, Partial<AppraisalTraining>>({
      query: (data) => ({ url: "/appraisals/trainings/", method: "POST", body: data }),
      invalidatesTags: ["Appraisal"],
    }),
    deleteTraining: builder.mutation<void, number>({
      query: (id) => ({ url: `/appraisals/trainings/${id}/`, method: "DELETE" }),
      invalidatesTags: ["Appraisal"],
    }),

    // ── Comments ──────────────────────────────────────────────────────────────
    createComment: builder.mutation<AppraisalComment, Partial<AppraisalComment>>({
      query: (data) => ({ url: "/appraisals/appraisal-comments/", method: "POST", body: data }),
      invalidatesTags: ["Appraisal"],
    }),
  }),
});

export const {
  useGetAppraisalsQuery,
  useGetMyAppraisalsQuery,
  useGetAppraiserReviewsQuery,
  useGetReviewerReviewsQuery,
  useGetDirectorReviewsQuery,
  useGetExecutiveReviewsQuery,
  useGetAppraisalByIdQuery,
  useCreateAppraisalMutation,
  useUpdateAppraisalMutation,
  useDeleteAppraisalMutation,
  useSubmitSelfAssessmentMutation,
  useSubmitAppraiserReviewMutation,
  useSubmitReviewerCommentMutation,
  useSubmitDirectorCommentMutation,
  useSubmitExecutiveCommentMutation,
  useCreateOutputMutation,
  useUpdateOutputMutation,
  useDeleteOutputMutation,
  useCreateCompetencyMutation,
  useUpdateCompetencyMutation,
  useDeleteCompetencyMutation,
  useCreateImprovementAreaMutation,
  useUpdateImprovementAreaMutation,
  useDeleteImprovementAreaMutation,
  useCreateNextYearPlanMutation,
  useUpdateNextYearPlanMutation,
  useDeleteNextYearPlanMutation,
  useCreateInitialQualificationMutation,
  useDeleteInitialQualificationMutation,
  useCreateAdditionalQualificationMutation,
  useDeleteAdditionalQualificationMutation,
  useCreateTrainingMutation,
  useDeleteTrainingMutation,
  useCreateCommentMutation,
} = appraisalApiSlice;
