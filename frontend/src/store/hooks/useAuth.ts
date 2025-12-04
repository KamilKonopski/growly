import { useDispatch } from "react-redux";
import {
  useLoginMutation,
  useRegisterMutation,
  useCheckEmailMutation,
} from "../auth/authApi";
import { setUser, setMode } from "../appSlice";

export const useAuth = () => {
  const dispatch = useDispatch();
  const [loginMutation] = useLoginMutation();
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

  const register = async (
    name: string,
    email: string,
    password: string,
    confirmPassword: string
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

  return { login, register, checkEmail, demoLogin };
};
