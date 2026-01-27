import { useDispatch, useSelector } from "react-redux";

import {
  useLoginMutation,
  useRegisterMutation,
  useCheckEmailMutation,
  useLogoutMutation,
  authApi,
} from "../auth/authApi";

import { setUser, setMode, logout as logoutAction } from "../slices/appSlice";

import type { RootState } from "../store";

export const useAuth = () => {
  const dispatch = useDispatch();
  const mode = useSelector((state: RootState) => state.app.mode);

  const [loginMutation] = useLoginMutation();
  const [logoutMutation] = useLogoutMutation();
  const [registerMutation] = useRegisterMutation();
  const [checkEmailMutation] = useCheckEmailMutation();

  const login = async (email: string, password: string) => {
    const res = await loginMutation({ email, password }).unwrap();
    if (res.user && res.token) {
      localStorage.setItem("token", res.token);
      dispatch(setUser(res.user));
      dispatch(setMode("backend"));
    }
    return res;
  };

  const logout = async () => {
    try {
      if (mode === "backend") {
        await logoutMutation().unwrap();
      }
    } catch (e) {
      console.warn("Logout backend error (ignored)", e);
    } finally {
      localStorage.removeItem("token");

      dispatch(logoutAction());

      dispatch(authApi.util.resetApiState());
    }
  };

  const register = async (
    name: string,
    email: string,
    password: string,
    confirmPassword: string,
  ) => {
    const res = await registerMutation({
      name,
      email,
      password,
      confirmPassword,
    }).unwrap();
    return res;
  };

  const checkEmail = async (email: string) => {
    const res = await checkEmailMutation({ email }).unwrap();
    return res.available;
  };

  const demoLogin = () => {
    const demoUser = {
      id: "demo-user",
      name: "Demówka",
      email: "demo@example.com",
    };
    dispatch(setUser(demoUser));
    dispatch(setMode("demo"));
  };

  return { login, logout, register, checkEmail, demoLogin };
};
