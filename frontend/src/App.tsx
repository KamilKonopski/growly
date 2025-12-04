import { useEffect } from "react";
import { useDispatch } from "react-redux";
import AppRoutes from "./routes/AppRoutes";
import { setUser, setMode } from "./store/appSlice";
import { jwtDecode } from "jwt-decode";

interface JwtUser {
  id: string;
  name: string;
  email: string;
  iat: number;
  exp: number;
}

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode<JwtUser>(token);
        dispatch(
          setUser({ id: decoded.id, name: decoded.name, email: decoded.email })
        );
        dispatch(setMode("backend"));
      } catch (err) {
        console.error("Błędny token w localStorage", err);
        localStorage.removeItem("token");
      }
    }
  }, [dispatch]);

  return <AppRoutes />;
};

export default App;
