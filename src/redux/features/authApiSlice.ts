import { apiSlice } from "../services/apiSlice";

const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    retrieveUser: builder.query<User, void>({
      query: () => "/users/me/",
    }),

    login: builder.mutation({
      query: ({ username, password }) => ({
        url: "/auth/login/",
        method: "POST",
        body: { username, password },
      }),
    }),
    twofactor: builder.mutation({
      query: ({ ephemeral_token, code }) => ({
        url: "/accounts/login/jwt/code/",
        method: "POST",
        body: { ephemeral_token, code },
      }),
    }),
    register: builder.mutation({
      query: (args:User) => ({
        url: "/users/",
        method: "POST",
        body: args,
      }),
    }),
    verify: builder.mutation({
      query: () => ({
        url: "/accounts/jwt/verify/",
        method: "POST",
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: "/accounts/logout/",
        method: "POST",
      }),
    }),
    activation: builder.mutation({
      query: ({ uid, token }) => ({
        url: "/users/activation/",
        method: "POST",
        body: { uid, token },
      }),
    }),
    resetPassword: builder.mutation({
      query: ({ email }) => ({
        url: "/users/reset_password/",
        method: "POST",
        body: { email },
      }),
    }),
    resetPasswordConfirm: builder.mutation({
      query: ({ uid, token, new_password, re_new_password }) => ({
        url: "/users/reset_password_confirm/",
        method: "POST",
        body: { uid, token, new_password, re_new_password },
      }),
    }),
    userPartialUpdate: builder.mutation({
      query: (args:User) => ({
        url: "/users/me/",
        method: "PATCH",
        body: args,
      }),
    }),

    changePassword : builder.mutation({
      query: ({ current_password, new_password, re_new_password }) => ({
        url: "/users/set_password/",
        method: "POST",
        body: { current_password, new_password, re_new_password },
      }),
    }),

  }),
});

export const {
  useRetrieveUserQuery,
  useLoginMutation,
  useTwofactorMutation,
  useRegisterMutation,
  useVerifyMutation,
  useLogoutMutation,
  useActivationMutation,
  useResetPasswordMutation,
  useResetPasswordConfirmMutation,
  useUserPartialUpdateMutation,
  useChangePasswordMutation,
} = authApiSlice;