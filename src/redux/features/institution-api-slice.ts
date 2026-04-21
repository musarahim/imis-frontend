import { apiSlice } from "../services/apiSlice";

const InstitutionApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getInstitutions: builder.query<ListRespornse<Institution>, void>({
      query: () => "/institutions/institutions/",
    }),
    retrieveInstitution: builder.query<Institution, number>({
      query: (id) => `/institutions/institutions/${id}/`,
    }),
    patchInstitution: builder.mutation<
      Institution,
      { id: number; data: Partial<Institution> }
    >({
      query: ({ id, data }) => ({
        url: `/institutions/institutions/${id}/`,
        method: "PATCH",
        body: data,
      }),
    }),
    createInstitution: builder.mutation<Institution, Partial<InterimAuthority>>(
      {
        query: (data) => ({
          url: `/institutions/institutions/`,
          method: "POST",
          body: data,
        }),
      },
    ),
  }),
});

export const {
  useCreateInstitutionMutation,
  useGetInstitutionsQuery,
  useRetrieveInstitutionQuery,
  usePatchInstitutionMutation,
} = InstitutionApiSlice;
