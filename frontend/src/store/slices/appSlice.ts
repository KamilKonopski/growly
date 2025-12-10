import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { User } from "../auth/authApi.types";

interface AppState {
  user: User | null;
  mode: "demo" | "backend" | null;
}

const initialState: AppState = {
  user: null,
  mode: null,
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<User>) {
      state.user = action.payload;
    },
    setMode(state, action: PayloadAction<"demo" | "backend">) {
      state.mode = action.payload;
    },
    logout(state) {
      state.user = null;
      state.mode = null;
    },
  },
});

export const { setUser, setMode, logout } = appSlice.actions;
export default appSlice.reducer;
