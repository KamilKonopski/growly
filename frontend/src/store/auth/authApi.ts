import { createApi } from "@reduxjs/toolkit/query/react";

import { baseQueryWithAuth } from "../baseQueryWithAuth";

import type {
  AuthResponse,
  CheckEmailRequest,
  LoginRequest,
  RegisterRequest,
  User,
} from "./authApi.types";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: baseQueryWithAuth,
  tagTypes: ["User"],
  endpoints: (builder) => ({
    login: builder.mutation<AuthResponse, LoginRequest>({
      query: (body) => ({ url: "/auth/login", method: "POST", body }),
    }),
    logout: builder.mutation<{ message: string }, void>({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
    }),
    register: builder.mutation<AuthResponse, RegisterRequest>({
      query: (body) => ({ url: "/auth/register", method: "POST", body }),
    }),
    checkEmail: builder.mutation<{ available: boolean }, CheckEmailRequest>({
      query: (body) => ({ url: "/auth/check-email", method: "POST", body }),
    }),
    me: builder.query<User, void>({
      query: () => "/auth/me",
      providesTags: ["User"],
    }),
    updateProfile: builder.mutation<
      { message: string; user: User },
      { name: string }
    >({
      query: (body) => ({
        url: "/auth/update-profile",
        method: "PUT",
        body,
      }),
      invalidatesTags: ["User"],
    }),
    changePassword: builder.mutation<
      { message: string },
      { currentPassword: string; newPassword: string }
    >({
      query: (body) => ({
        url: "/auth/change-password",
        method: "PUT",
        body,
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useLogoutMutation,
  useRegisterMutation,
  useCheckEmailMutation,
  useMeQuery,
  useUpdateProfileMutation,
  useChangePasswordMutation,
} = authApi;
