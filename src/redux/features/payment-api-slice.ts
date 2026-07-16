import { apiSlice } from "../services/apiSlice";

interface ListParams {
  page?: number;
  pageSize?: number;
  application_code?: string;
  ordering?: string;
}

const PaymentApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPaymentPRNs: builder.query<ListResponse<PaymentPRN>, ListParams>({
      query: (params) => {
        const p = params ?? {};
        const search = new URLSearchParams();

        if (p.page !== undefined) search.set("page", String(p.page));
        if (p.pageSize !== undefined)
          search.set("page_size", String(p.pageSize));
        if (p.application_code)
          search.set("application_code", p.application_code);
        if (p.ordering) search.set("ordering", p.ordering);

        const qs = search.toString();
        return `/payments/application-prns/${qs ? `?${qs}` : ""}`;
      },
    }),
    retrievePaymentPRN: builder.query<PaymentPRN, number>({
      query: (id) => `/payments/application-prns/${id}/`,
    }),
  }),
});

export const { useGetPaymentPRNsQuery, useRetrievePaymentPRNQuery } =
  PaymentApiSlice;
