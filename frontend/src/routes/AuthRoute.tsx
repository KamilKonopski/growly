import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../store/store";
import type { JSX } from "react";

interface AuthRouteProps {
  children: JSX.Element;
  requireAuth: boolean; // true = chronione, false = publiczne
}

const AuthRoute = ({ children, requireAuth }: AuthRouteProps) => {
  const user = useSelector((state: RootState) => state.app.user);

  if (requireAuth && !user) {
    return <Navigate to="/auth" replace />;
  }

  if (!requireAuth && user) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

export default AuthRoute;
