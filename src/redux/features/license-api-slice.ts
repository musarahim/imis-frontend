import { apiSlice } from "../services/apiSlice";

const LicenseApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getIntrimAuthorities: builder.query<IntrimAuthority[], void>({
      query: () => "/licenses/intrim-authority/",
    }),
    retrieveIntrimAuthority: builder.query<IntrimAuthority, number>({
        query: (id) => `/licenses/intrim-authority/${id}/`,
    }),
    patchIntrimAuthority: builder.mutation<IntrimAuthority, {id: number, data: Partial<IntrimAuthority>}>({
        query: ({id, data}) => ({
            url: `/licenses/intrim-authority/${id}/`,
            method: 'PATCH',
            body: data,
        }),
    }),
    createIntrimAuthority: builder.mutation<IntrimAuthority, Partial<IntrimAuthority>>({
        query: (data) => ({
            url: `/licenses/intrim-authority/`,
            method: 'POST',
            body: data,
        }),
    }),
  }),
});

export const { useGetIntrimAuthoritiesQuery, useRetrieveIntrimAuthorityQuery, usePatchIntrimAuthorityMutation, useCreateIntrimAuthorityMutation } = LicenseApiSlice;