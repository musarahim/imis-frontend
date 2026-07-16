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

const hrApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getEmployees: builder.query<ListResponse<Employee>, ListParams>({
      query: (params) => buildListQuery("/hr/employees/", params),
    }),
    getEmployeeById: builder.query<Employee, number>({
      query: (id) => `/hr/employees/${id}/`,
    }),
  }),
});

export const { useGetEmployeesQuery, useGetEmployeeByIdQuery } = hrApiSlice;
