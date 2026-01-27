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
    }),
  }),
});

export const {
  useLoginMutation,
  useLogoutMutation,
  useRegisterMutation,
  useCheckEmailMutation,
  useMeQuery,
} = authApi;
