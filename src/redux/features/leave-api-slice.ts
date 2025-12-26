import { apiSlice } from "../services/apiSlice";

const leaveApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getLeaveTypes: builder.query<LeaveType[], void>({
      query: () => "/leave/leave-types/",
    }),
  createLeaveSchedule: builder.mutation({
      query: (args:LeaveSchedule) => ({
        url: "/leave/leave-applications/schedule/",
        method: "POST",
        body: args,
      }),
    }),
    getLeaveSchedules: builder.query<LeaveSchedule[], void>({
      query: () => "/leave/leave-applications/schedules/",
    }),
    createLeaveApplication: builder.mutation({
      query: (args: LeaveApplication) => ({
        url: "/leave/leave-applications/",
        method: "POST",
        body: args,
      }),
    }),
    patchLeaveApplication: builder.mutation({
      query: ({id, ...patch}: {id: number} & Partial<LeaveApplication>) => ({
        url: `/leave/leave-applications/${id}/`,
        method: "PATCH",
        body: patch,
      }),
    }), 
    approveLeaveDelegation: builder.mutation({
      query: ({id, ...patch}: {id: number} & Partial<LeaveApplication>) => ({
        url: `/leave/leave-applications/${id}/approve_delegation/`,
        method: "POST",
        body: patch,
      }),
    }),
    approveLeaveSupervisor: builder.mutation({
      query: ({id, ...patch}: {id: number} & Partial<LeaveApplication>) => ({
        url: `/leave/leave-applications/${id}/approve_supervisor/`,
        method: "POST",
        body: patch,
      }),
    }),
    
  approveLeaveDirector: builder.mutation({
      query: ({id, ...patch}: {id: number} & Partial<LeaveApplication>) => ({
        url: `/leave/leave-applications/${id}/approve_director/`,
        method: "POST",
        body: patch,
      }),
    }),
  approveLeaveHr: builder.mutation({
      query: ({id, ...patch}: {id: number} & Partial<LeaveApplication>) => ({
        url: `/leave/leave-applications/${id}/approve_hr/`,
        method: "POST",
        body: patch,
      }),
    }),
    getLeaveApplications: builder.query<ListRespornse<LeaveApplication>, ListParams>({
       query: (params) => {
        const p = params ?? {};
        const search = new URLSearchParams();

        if (p.page !== undefined) search.set("page", String(p.page));
        if (p.pageSize !== undefined) search.set("page_size", String(p.pageSize));
        if (p.search) search.set("search", p.search);
        if (p.ordering) search.set("ordering", p.ordering);

        const qs = search.toString();
        return `/leave/leave-applications/${qs ? `?${qs}` : ""}`;
      },
    }),

    retrieveLeaveApplication: builder.query<LeaveApplication, number>({
      query: (id) => `/leave/leave-applications/${id}/`,
    }),

  getLeaveDelegations: builder.query<ListRespornse<LeaveApplication>, ListParams>({
        query: (params) => {
          const p = params ?? {};
          const search = new URLSearchParams();

          if (p.page !== undefined) search.set("page", String(p.page));
          if (p.pageSize !== undefined) search.set("page_size", String(p.pageSize));
          if (p.search) search.set("search", p.search);
          if (p.ordering) search.set("ordering", p.ordering);

          const qs = search.toString();
          return `/leave/leave-applications/delegations/${qs ? `?${qs}` : ""}`;
        },
      }),

    getSupervisorApprovals: builder.query<ListRespornse<LeaveApplication>, ListParams>({
        query: (params) => {
          const p = params ?? {};
          const search = new URLSearchParams();

          if (p.page !== undefined) search.set("page", String(p.page));
          if (p.pageSize !== undefined) search.set("page_size", String(p.pageSize));
          if (p.search) search.set("search", p.search);
          if (p.ordering) search.set("ordering", p.ordering);

          const qs = search.toString();
          return `/leave/leave-applications/supervisor-approvals/${qs ? `?${qs}` : ""}`;
        },
      }),
  getDirectorApprovals: builder.query<ListRespornse<LeaveApplication>, ListParams>({
        query: (params) => {
          const p = params ?? {};
          const search = new URLSearchParams();

          if (p.page !== undefined) search.set("page", String(p.page));
          if (p.pageSize !== undefined) search.set("page_size", String(p.pageSize));
          if (p.search) search.set("search", p.search);
          if (p.ordering) search.set("ordering", p.ordering);

          const qs = search.toString();
          return `/leave/leave-applications/director-approvals/${qs ? `?${qs}` : ""}`;
        },
      }),

    getHrApprovals: builder.query<ListRespornse<LeaveApplication>, ListParams>({
        query: (params) => {
          const p = params ?? {};
          const search = new URLSearchParams();

          if (p.page !== undefined) search.set("page", String(p.page));
          if (p.pageSize !== undefined) search.set("page_size", String(p.pageSize));
          if (p.search) search.set("search", p.search);
          if (p.ordering) search.set("ordering", p.ordering);

          const qs = search.toString();
          return `/leave/leave-applications/hr-approvals/${qs ? `?${qs}` : ""}`;
        },
      }),
   
    }),
});

export const { 
  useGetLeaveTypesQuery, 
  useCreateLeaveScheduleMutation, 
  useGetLeaveSchedulesQuery,
  useCreateLeaveApplicationMutation,
  usePatchLeaveApplicationMutation,
  useGetLeaveApplicationsQuery,
  useGetLeaveDelegationsQuery,
  useRetrieveLeaveApplicationQuery,
  useApproveLeaveDelegationMutation,
  useGetSupervisorApprovalsQuery,
  useApproveLeaveSupervisorMutation,
  useGetDirectorApprovalsQuery,
  useApproveLeaveDirectorMutation,
  useGetHrApprovalsQuery,
  useApproveLeaveHrMutation,
} = leaveApiSlice;