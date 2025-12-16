import { apiSlice } from "../services/apiSlice";

const commonApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getDistricts: builder.query<District[], void>({
      query: () => "/common/districts/",
    }),
    getRegions: builder.query<Region[], void>({
      query: () => "/common/regions/",
    }),
    getEmployeeDropdown: builder.query<EmployeeDropdown[], void>({
      query: () => "/hr/employees/employee-dropdown/",
    }),
  }),
});

export const { useGetDistrictsQuery, useGetRegionsQuery, useGetEmployeeDropdownQuery } = commonApiSlice;