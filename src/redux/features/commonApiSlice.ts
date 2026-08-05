import { apiSlice } from "../services/apiSlice";

const commonApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getDistricts: builder.query<District[], void>({
      query: () => "/common/districts/",
    }),

    getCounties: builder.query<County[], { district_id: string } | void>({
      query: (params) =>
        params?.district_id
          ? `/common/counties/?district_id=${params.district_id}`
          : "/common/counties/",
    }),
    getSubCounties: builder.query<SubCounty[], { county_id: string } | void>({
      query: (params) =>
        params?.county_id
          ? `/common/sub-counties/?county_id=${params.county_id}`
          : "/common/sub-counties/",
    }),
    getParishes: builder.query<Parish[], { sub_county_id: string } | void>({
      query: (params) =>
        params?.sub_county_id
          ? `/common/parishes/?sub_county_id=${params.sub_county_id}`
          : "/common/parishes/",
    }),
    getVillages: builder.query<Village[], { parish_id: string } | void>({
      query: (params) =>
        params?.parish_id
          ? `/common/villages/?parish_id=${params.parish_id}`
          : "/common/villages/",
    }),
    getRegions: builder.query<Region[], void>({
      query: () => "/common/regions/",
    }),
    getEmployeeDropdown: builder.query<EmployeeDropdown[], void>({
      query: () => "/hr/employees/employee-dropdown/",
    }),
    getTitles: builder.query<Title[], void>({
      query: () => "/common/titles/",
    }),
    getNationalities: builder.query<Nationality[], void>({
      query: () => "/common/nationalities/",
    }),
    getReligions: builder.query<Religion[], void>({
      query: () => "/common/religions/",
    }),
    getTribes: builder.query<Tribe[], void>({
      query: () => "/common/tribes/",
    }),
    getRelationships: builder.query<Relationship[], void>({
      query: () => "/common/relationships/",
    }),
    getFinancialYears: builder.query<FinancialYear[], void>({
      query: () => "/common/financial-years/",
    }),
  }),
});

export const {
  useGetDistrictsQuery,
  useGetRegionsQuery,
  useGetEmployeeDropdownQuery,
  useGetTitlesQuery,
  useGetNationalitiesQuery,
  useGetReligionsQuery,
  useGetTribesQuery,
  useGetRelationshipsQuery,
  useGetCountiesQuery,
  useGetSubCountiesQuery,
  useGetParishesQuery,
  useGetVillagesQuery,
  useGetFinancialYearsQuery,
} = commonApiSlice;
