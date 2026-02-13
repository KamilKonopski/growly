import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { BaseQueryFn } from "@reduxjs/toolkit/query";

import { logout } from "./slices/appSlice";

const isBackendEnabled = import.meta.env.VITE_ENABLE_BACKEND === "true";

const rawBaseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_API_URL,
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
  if (!isBackendEnabled) {
    return {
      error: {
        status: "CUSTOM_ERROR",
        error: "BACKEND_DISABLED",
      },
    };
  }

  const result = await rawBaseQuery(args, api, extraOptions);

  if (result.error?.status === 401) {
    localStorage.removeItem("token");
    api.dispatch(logout());
  }

  return result;
};
