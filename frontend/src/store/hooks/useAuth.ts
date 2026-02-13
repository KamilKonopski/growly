import { useDispatch, useSelector } from "react-redux";

import {
  useLoginMutation,
  useRegisterMutation,
  useCheckEmailMutation,
  useLogoutMutation,
  authApi,
  useUpdateProfileMutation,
  useChangePasswordMutation,
} from "../auth/authApi";

import { setUser, setMode, logout as logoutAction } from "../slices/appSlice";

import type { RootState } from "../store";

export const useAuth = () => {
  const dispatch = useDispatch();
  const mode = useSelector((state: RootState) => state.app.mode);

  const isBackendEnabled = import.meta.env.VITE_ENABLE_BACKEND === "true";

  const [loginMutation] = useLoginMutation();
  const [logoutMutation] = useLogoutMutation();
  const [registerMutation] = useRegisterMutation();
  const [checkEmailMutation] = useCheckEmailMutation();
  const [updateProfileMutation] = useUpdateProfileMutation();
  const [changePasswordMutation] = useChangePasswordMutation();

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
    if (!isBackendEnabled) {
      return true;
    }

    const res = await checkEmailMutation({ email }).unwrap();
    return res.available;
  };

  const updateProfile = async (name: string) => {
    const res = await updateProfileMutation({ name }).unwrap();
    dispatch(setUser(res.user));
    return res;
  };

  const changePassword = async (
    currentPassword: string,
    newPassword: string,
  ) => {
    return await changePasswordMutation({
      currentPassword,
      newPassword,
    }).unwrap();
  };

  const demoLogin = () => {
    const demoUser = {
      id: "demo-user",
      name: "Demówka",
      email: "demo@example.com",
      createdAt: "01.01.2026",
    };
    dispatch(setUser(demoUser));
    dispatch(setMode("demo"));
  };

  return {
    login,
    logout,
    register,
    checkEmail,
    updateProfile,
    changePassword,
    demoLogin,
  };
};
