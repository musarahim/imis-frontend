import { apiSlice } from "../services/apiSlice";

const hrApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getEmployees: builder.query<Employee[], void>({
      query: () => "/hr/employees/",
    }),
    getEmployeeById: builder.query<Employee, number>({
      query: (id) => `/hr/employees/${id}/`,
    }),
  }),
});

export const { useGetEmployeesQuery, useGetEmployeeByIdQuery } = hrApiSlice;