import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "./auth/authApi";
import appReducer from "./slices/appSlice";
import { habitsApi } from "./habits/habitsApi";
import habitsReducer from "./slices/habitsSlice";

export const store = configureStore({
  reducer: {
    app: appReducer,
    [authApi.reducerPath]: authApi.reducer,
    [habitsApi.reducerPath]: habitsApi.reducer,
    habits: habitsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(authApi.middleware)
      .concat(habitsApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
