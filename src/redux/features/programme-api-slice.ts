import { apiSlice } from "../services/apiSlice";
import type { ProgrammeDashboardSummary, ProgrammeDashboardApplication, ProgrammeDashboardFilters, ProgrammeDashboardParams } from "@/types/programme-dashboard";
const ProgrammeApiSlice = apiSlice.injectEndpoints({
  // Fast Refresh reuses the API instance, so replace its old query definitions.
  overrideExisting: process.env.NODE_ENV === "development",
  endpoints: (builder) => ({
    getProgrammeHeadDashboardSummary: builder.query<ProgrammeDashboardSummary, void>({
      query: () => "/programmes/head-dashboard/summary/",
      providesTags: ["InvoicedApplications"],
    }),
    getProgrammeHeadDashboardFilters: builder.query<ProgrammeDashboardFilters, void>({
      query: () => "/programmes/head-dashboard/filter-options/",
      providesTags: ["InvoicedApplications"],
    }),
    getProgrammeHeadDashboardRegister: builder.query<ListResponse<ProgrammeDashboardApplication>, ProgrammeDashboardParams>({
      query: (params) => {
        const query = new URLSearchParams();
        if (params.page) query.set("page", String(params.page));
        if (params.pageSize) query.set("page_size", String(params.pageSize));
        for (const key of ["search", "institution", "programme_category", "status", "ordering"] as const) {
          if (params[key]) query.set(key, params[key]);
        }
        return `/programmes/head-dashboard/?${query}`;
      },
      providesTags: ["InvoicedApplications"],
    }),
    getProgrammeAccreditations: builder.query<
      ListResponse<ProgrammeAccreditation>,
      ListParams & { institution?: string; programme_category?: string }
    >({
      query: (params) => {
        const p = params ?? {};
        const search = new URLSearchParams();

        if (p.page !== undefined) search.set("page", String(p.page));
        if (p.pageSize !== undefined)
          search.set("page_size", String(p.pageSize));
        if (p.search) search.set("search", p.search);
        if (p.institution) search.set("institution", p.institution);
        if (p.programme_category) search.set("programme_category", p.programme_category);
        if (p.ordering) search.set("ordering", p.ordering);

        const qs = search.toString();
        return `/programmes/programme-accreditation/submitted-applications/${qs ? `?${qs}` : ""}`;
      },
    }),
    getSubmittedApplicationFilterOptions: builder.query<{
      institutions: { id: number; name: string }[];
      programme_categories: { value: string; label: string }[];
    }, void>({
      query: () => "/programmes/programme-accreditation/submitted-application-filter-options/",
    }),
    getProgrammeAccreditationsUnderReview: builder.query<
      ListResponse<ProgrammeAccreditation>,
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

    //ready for invoicing
    getProgrammesReadyForInvoice: builder.query<
      ListResponse<ProgrammeAccreditation>,
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
        return `/programmes/programme-accreditation/ready-for-invoicing/${qs ? `?${qs}` : ""}`;
      },
    }),
    // end of applications ready for invoicing
    getProgrammeAccreditationsUnderAssessment: builder.query<
      ListResponse<ProgrammeAccreditation>,
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
    getProgrammeReviewers: builder.query<ProgrammeReviewer[], void>({
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
      ListResponse<PreliminaryReview>,
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
      ListResponse<ProgrammeAssessment>,
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
    getProgrammeAssessors: builder.query<ProgrammeAssessor[], void>({
      query: () => `/programmes/programme-assessors/`,
    }),

    getProgrammesReadyForAccessment: builder.query<
      ListResponse<ProgrammeAccreditation>,
      ListParams & { institution?: string; programme_category?: string; tier_displine?: string }
    >({
      query: (params) => {
        const p = params ?? {};
        const search = new URLSearchParams();

        if (p.page !== undefined) search.set("page", String(p.page));
        if (p.pageSize !== undefined)
          search.set("page_size", String(p.pageSize));
        if (p.search) search.set("search", p.search);
        if (p.institution) search.set("institution", p.institution);
        if (p.programme_category) search.set("programme_category", p.programme_category);
        if (p.tier_displine) search.set("tier_displine", p.tier_displine);
        if (p.ordering) search.set("ordering", p.ordering);

        const qs = search.toString();
        return `/programmes/programme-accreditation/ready-for-assessment/${qs ? `?${qs}` : ""}`;
      },
    }),
    getAssessmentApplicationFilterOptions: builder.query<{
      institutions: { id: number; name: string }[];
      programme_categories: { value: string; label: string }[];
      tier_disciplines: { value: string; label: string }[];
    }, void>({
      query: () => "/programmes/programme-accreditation/assessment-application-filter-options/",
    }),
    getProgressedToDirectorateApplications: builder.query<
      ListResponse<ProgrammeAccreditation>,
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
      ListResponse<ProgrammeAccreditation>,
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

    addProgrammeAssessmentInvoice: builder.mutation<DeskReviewInvoice, { institution_id: number; lines: DeskReviewInvoiceLine[] }>({
      query: (body) => ({ url: `/programmes/programme-assessment-invoices/`, method: "POST", body }),
      invalidatesTags: ["InvoicedApplications"],
    }),
    deskReviewCreationOptions: builder.query<{ can_create: boolean; institutions: { id: number; name: string }[]; payment_instructions?: DeskReviewInvoice['payment_instructions'] }, void>({
      query: () => `/programmes/programme-assessment-invoices/creation-options/`,
      providesTags: ["InvoicedApplications"],
    }),
    availableDeskReviewProgrammes: builder.query<InvoiceEligibleProgramme[], number>({
      query: (id) => `/programmes/programme-assessment-invoices/available-programmes/?institution_id=${id}`,
      providesTags: ["InvoicedApplications"],
    }),
    downloadDeskReviewInvoice: builder.mutation<string, number>({
      query: (id) => ({
        url: `/programmes/programme-assessment-invoices/${id}/pdf/`,
        responseHandler: async (response) => response.ok ? URL.createObjectURL(await response.blob()) : response.json(),
      }),
    }),

    addInvoice: builder.mutation<
      Invoice,
      { id: number; data: Omit<Invoice, "id"> }
    >({
      query: ({ id, data }: { id: number; data: Omit<Invoice, "id"> }) => {
        const formData = new FormData();
        if (data.invoice_items?.length) {
          formData.append("invoice_items", JSON.stringify(data.invoice_items));
          formData.append("application", String(id));
          data.invoice_items.forEach((item, index) => {
            formData.append(
              `invoice_items[${index}][item_type]`,
              String(item.item_type),
            );
            formData.append(
              `invoice_items[${index}][persons_number]`,
              String(item.persons_number),
            );
            formData.append(
              `invoice_items[${index}][number_of_days]`,
              String(item.number_of_days),
            );
            formData.append(`invoice_items[${index}][rate]`, String(item.rate));
          });
        }
        return {
          url: `/programmes/programme-invoices/`,
          method: "POST",
          body: formData,
        };
      },
    }),
    applicationInvoices: builder.query<ListResponse<Invoice>, ListParams>({
      query: (params) => {
        const p = params ?? {};
        const search = new URLSearchParams();

        if (p.page !== undefined) search.set("page", String(p.page));
        if (p.pageSize !== undefined)
          search.set("page_size", String(p.pageSize));
        if (p.search) search.set("search", p.search);
        if (p.ordering) search.set("ordering", p.ordering);

        const qs = search.toString();
        return `/programmes/programme-invoices/${qs ? `?${qs}` : ""}`;
      },
      providesTags: [{ type: "InvoicedApplications", id: "LIST" }],
    }),
    retrieveProgrammeInvoice: builder.query<Invoice, number>({
      query: (id) => `/programmes/programme-invoices/${id}/`,
    }),
    reconcileInvoice: builder.mutation({
      query: ({ id }: { id: number }) => ({
        url: `/programmes/programme-invoices/${id}/reconcile-invoice/`,
        method: "POST",
      }),
      invalidatesTags: [{ type: "InvoicedApplications", id: "LIST" }],
    }),
    retrieveProgressedToManagementDetails: builder.query<
      ProgrammeAccreditation,
      number
    >({
      query: (id) =>
        `/programmes/programme-accreditation/${id}/progressed-to-management-details/`,
    }),
    invoiceItemTypes: builder.query<InvoiceItemType[], void>({
      query: () => `/programmes/invoice-types/`,
    }),
    //reviewed applications
    getReviewedApplications: builder.query<
      ListResponse<ProgrammeAccreditation>,
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
        return `/programmes/programme-accreditation/reviewed-applications/${qs ? `?${qs}` : ""}`;
      },
    }),

    getDeskReviewInvoices: builder.query<
      ListResponse<DeskReviewInvoice>,
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
        return `/programmes/programme-assessment-invoices/${qs ? `?${qs}` : ""}`;
      },
      providesTags: [{ type: "InvoicedApplications", id: "REVIEW_LIST" }],
    }),
    retrieveDeskReviewInvoice: builder.query<DeskReviewInvoice, number>({
      query: (id) => `/programmes/programme-assessment-invoices/${id}/`,
      providesTags: (_result, _error, id) => [{ type: "InvoicedApplications", id: `REVIEW_${id}` }],
    }),
    updateDeskReviewInvoice: builder.mutation<DeskReviewInvoice, { id: number; lines: DeskReviewInvoiceLine[] }>({
      query: ({ id, lines }) => ({
        url: `/programmes/programme-assessment-invoices/${id}/`,
        method: "PATCH",
        body: { lines },
      }),
      invalidatesTags: (_result, _error, { id }) => [
        { type: "InvoicedApplications", id: "REVIEW_LIST" },
        { type: "InvoicedApplications", id: `REVIEW_${id}` },
      ],
    }),
    sendDeskReviewInvoice: builder.mutation<DeskReviewInvoice, number>({
      query: (id) => ({ url: `/programmes/programme-assessment-invoices/${id}/send-invoice/`, method: "POST" }),
      invalidatesTags: (_result, _error, id) => [
        { type: "InvoicedApplications", id: "REVIEW_LIST" },
        { type: "InvoicedApplications", id: `REVIEW_${id}` },
      ],
    }),
    acknowledgeDeskReviewPayment: builder.mutation<DeskReviewInvoice, { id: number; verified_amount: string }>({
      query: ({ id, verified_amount }) => ({ url: `/programmes/programme-assessment-invoices/${id}/reconcile-invoice/`, method: "POST", body: { verified_amount } }),
      invalidatesTags: ["InvoicedApplications"],
    }),
  }),
});

export const {
  useGetProgrammeHeadDashboardSummaryQuery,
  useGetProgrammeHeadDashboardFiltersQuery,
  useGetProgrammeHeadDashboardRegisterQuery,
  useLazyGetProgrammeHeadDashboardRegisterQuery,
  useGetAssessmentApplicationFilterOptionsQuery,
  useDeskReviewCreationOptionsQuery,
  useAvailableDeskReviewProgrammesQuery,
  useDownloadDeskReviewInvoiceMutation,
  useGetProgrammeAccreditationsQuery,
  useLazyGetProgrammeAccreditationsQuery,
  useGetSubmittedApplicationFilterOptionsQuery,
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
  useAddInvoiceMutation,
  useApplicationInvoicesQuery,
  useReconcileInvoiceMutation,
  useGetProgrammesReadyForInvoiceQuery,
  useRetrieveProgressedToManagementDetailsQuery,
  useInvoiceItemTypesQuery,
  useGetReviewedApplicationsQuery,
  useRetrieveProgrammeInvoiceQuery,
  useAddProgrammeAssessmentInvoiceMutation,
  useGetDeskReviewInvoicesQuery,
  useRetrieveDeskReviewInvoiceQuery,
  useUpdateDeskReviewInvoiceMutation,
  useSendDeskReviewInvoiceMutation,
  useAcknowledgeDeskReviewPaymentMutation,
} = ProgrammeApiSlice;
