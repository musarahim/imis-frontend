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
    getEmployeeDetails: builder.query<Employee, number>({
      query: (id) => `/hr/employees/${id}/employee-details/`,
    }),
    createEmployee: builder.mutation<Employee, FormData>({
      query: (data) => ({
        url: "/hr/employees/",
        method: "POST",
        body: data,
      }),
    }),
    updateEmployee: builder.mutation<Employee, { id: number; data: FormData }>({
      query: ({ id, data }) => ({
        url: `/hr/employees/${id}/`,
        method: "PUT",
        body: data,
      }),
    }),
    deleteEmployee: builder.mutation<void, number>({
      query: (id) => ({
        url: `/hr/employees/${id}/`,
        method: "DELETE",
      }),
    }),
    getUserDropdown: builder.query<Reviewer[], void>({
      query: () => "/hr/user-dropdown/",
    }),

    getDirectorates: builder.query<Directorate[], void>({
      query: () => "/hr/directorates/",
    }),
    getDepartments: builder.query<
      Department[],
      { directorate_id: string } | void
    >({
      query: (params) =>
        params?.directorate_id
          ? `/hr/departments/?directorate_id=${params.directorate_id}`
          : "/hr/departments/",
    }),
    getDesignations: builder.query<Designation[], void>({
      query: () => "/hr/designations/",
    }),
    getSupervisorDropdown: builder.query<EmployeeDropdown[], void>({
      query: () => "/hr/employee-dropdown/",
    }),
  }),
});

export const {
  useGetEmployeesQuery,
  useGetEmployeeByIdQuery,
  useCreateEmployeeMutation,
  useUpdateEmployeeMutation,
  useDeleteEmployeeMutation,
  useGetUserDropdownQuery,
  useGetDirectoratesQuery,
  useGetDepartmentsQuery,
  useGetDesignationsQuery,
  useGetSupervisorDropdownQuery,
  useGetEmployeeDetailsQuery,
} = hrApiSlice;
