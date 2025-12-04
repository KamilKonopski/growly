import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type {
  AuthResponse,
  CheckEmailRequest,
  LoginRequest,
  RegisterRequest,
  User,
} from "./authApi.types";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api/auth" }),
  endpoints: (builder) => ({
    login: builder.mutation<AuthResponse, LoginRequest>({
      query: (body) => ({ url: "/login", method: "POST", body }),
    }),
    register: builder.mutation<AuthResponse, RegisterRequest>({
      query: (body) => ({ url: "/register", method: "POST", body }),
    }),
    checkEmail: builder.mutation<{ available: boolean }, CheckEmailRequest>({
      query: (body) => ({ url: "/check-email", method: "POST", body }),
    }),
    me: builder.query<User, void>({
      query: () => "/me",
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useCheckEmailMutation,
  useMeQuery,
} = authApi;
