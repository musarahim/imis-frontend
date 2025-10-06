import { apiSlice } from "../services/apiSlice";

const LicenseApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getIntrimAuthorities: builder.query<IntrimAuthority[], void>({
      query: () => "/licenses/intrim-authority/",
    }),
    retrieveIntrimAuthority: builder.query<IntrimAuthority, number>({
        query: (id) => `/licenses/intrim-authority/${id}/`,
    }),
    patchIntrimAuthority: builder.mutation<IntrimAuthority, {id: string, data: Partial<FormData>}>({
        query: ({id, data}) => ({
            url: `/licenses/intrim-authority/${id}/`,
            method: 'PATCH',
            body: data,
        }),
    }),
    createIntrimAuthority: builder.mutation<IntrimAuthority, Partial<FormData>>({
        query: (data) => ({
            url: `/licenses/intrim-authority/`,
            method: 'POST',
            body: data,
        }),
    }),
  }),
});

export const { useGetIntrimAuthoritiesQuery, useRetrieveIntrimAuthorityQuery, usePatchIntrimAuthorityMutation, useCreateIntrimAuthorityMutation } = LicenseApiSlice;