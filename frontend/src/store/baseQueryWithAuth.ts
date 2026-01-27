import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { BaseQueryFn } from "@reduxjs/toolkit/query";

import { logout } from "./slices/appSlice";

const rawBaseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:5000/api",
  prepareHeaders: (headers) => {
    const token = localStorage.getItem("token");
    if (token) headers.set("Authorization", `Bearer ${token}`);
    return headers;
  },
});

export const baseQueryWithAuth: BaseQueryFn = async (
  args,
  api,
  extraOptions,
) => {
  const result = await rawBaseQuery(args, api, extraOptions);

  if (result.error?.status === 401) {
    localStorage.removeItem("token");
    api.dispatch(logout());
  }

  return result;
};
