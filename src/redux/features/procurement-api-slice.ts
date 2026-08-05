import { apiSlice } from "../services/apiSlice";
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

const procurementApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProcurementItems: builder.query<
      ListResponse<ProcurementItem>,
      ListParams
    >({
      query: (params) =>
        buildListQuery("/procurement/procurement-items/", params),
    }),
    //items without pagination
    getProcurementItemsDropdown: builder.query<ProcurementItem[], void>({
      query: () => "/procurement/procurement-items/items-dropdown/",
    }),
    getProcurementItemById: builder.query<ProcurementItem, number>({
      query: (id) => `/procurement/procurement-items/${id}/`,
    }),
    createProcurementItem: builder.mutation<ProcurementItem, FormData>({
      query: (data) => ({
        url: "/procurement/procurement-items/",
        method: "POST",
        body: data,
      }),
    }),
    updateProcurementItem: builder.mutation<
      ProcurementItem,
      { id: number; data: FormData }
    >({
      query: ({ id, data }) => ({
        url: `/procurement/procurement-items/${id}/`,
        method: "PUT",
        body: data,
      }),
    }),
    deleteProcurementItem: builder.mutation<void, number>({
      query: (id) => ({
        url: `/procurement/procurement-items/${id}/`,
        method: "DELETE",
      }),
    }),
    getProcurementBudgets: builder.query<
      ListResponse<ProcurementBudget>,
      ListParams
    >({
      query: (params) =>
        buildListQuery("/procurement/procurement-budgets/", params),
    }),
    getProcurementBudgetById: builder.query<ProcurementBudget, number>({
      query: (id) => `/procurement/procurement-budgets/${id}/`,
    }),
    createProcurementBudget: builder.mutation<ProcurementBudget, FormData>({
      query: (data) => ({
        url: "/procurement/procurement-budgets/",
        method: "POST",
        body: data,
      }),
    }),
    updateProcurementBudget: builder.mutation<
      ProcurementBudget,
      { id: number; data: FormData }
    >({
      query: ({ id, data }) => ({
        url: `/procurement/procurement-budgets/${id}/`,
        method: "PUT",
        body: data,
      }),
    }),
    deleteProcurementBudget: builder.mutation<void, number>({
      query: (id) => ({
        url: `/procurement/procurement-budgets/${id}/`,
        method: "DELETE",
      }),
    }),
    getProcurementExpenditures: builder.query<
      ListResponse<ProcurementExpenditure>,
      ListParams
    >({
      query: (params) =>
        buildListQuery("/procurement/procurement-expenditures/", params),
    }),

    getProcurementExpenditureById: builder.query<
      ProcurementExpenditure,
      number
    >({
      query: (id) => `/procurement/procurement-expenditures/${id}/`,
    }),
    createProcurementExpenditure: builder.mutation<
      ProcurementExpenditure,
      FormData
    >({
      query: (data) => ({
        url: "/procurement/procurement-expenditures/",
        method: "POST",
        body: data,
      }),
    }),
    updateProcurementExpenditure: builder.mutation<
      ProcurementExpenditure,
      { id: number; data: FormData }
    >({
      query: ({ id, data }) => ({
        url: `/procurement/procurement-expenditures/${id}/`,
        method: "PUT",
        body: data,
      }),
    }),
    getProcurementBudgetsDropdown: builder.query<BudgetDropdown[], void>({
      query: () => "/procurement/procurement-budgets/budgets-dropdown/",
    }),
  }),
});

export const {
  useGetProcurementItemsQuery,
  useGetProcurementItemByIdQuery,
  useCreateProcurementItemMutation,
  useUpdateProcurementItemMutation,
  useDeleteProcurementItemMutation,
  useGetProcurementBudgetsQuery,
  useGetProcurementBudgetByIdQuery,
  useCreateProcurementBudgetMutation,
  useUpdateProcurementBudgetMutation,
  useDeleteProcurementBudgetMutation,
  useGetProcurementItemsDropdownQuery,
  useGetProcurementExpendituresQuery,
  useCreateProcurementExpenditureMutation,
  useUpdateProcurementExpenditureMutation,
  useGetProcurementBudgetsDropdownQuery,
  useGetProcurementExpenditureByIdQuery,
} = procurementApiSlice;
