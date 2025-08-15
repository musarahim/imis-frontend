import { apiSlice } from "../services/apiSlice";

const commonApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getDistricts: builder.query<District[], void>({
      query: () => "/common/districts/",
    }),
  }),
});

export const { useGetDistrictsQuery } = commonApiSlice;