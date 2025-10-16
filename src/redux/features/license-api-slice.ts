import { apiSlice } from "../services/apiSlice";

const LicenseApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getIntrimAuthorities: builder.query<ListRespornse<IntrimAuthority>, ListParams>({
    query: (params) => {
        const p = params ?? {};
        const search = new URLSearchParams();

        if (p.page !== undefined) search.set("page", String(p.page));
        if (p.pageSize !== undefined) search.set("page_size", String(p.pageSize));
        if (p.search) search.set("search", p.search);
        if (p.ordering) search.set("ordering", p.ordering);

        const qs = search.toString();
        return `/licenses/intrim-authority/${qs ? `?${qs}` : ""}`;
      },
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