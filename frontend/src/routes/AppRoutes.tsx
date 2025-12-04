import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../store/store";

import Dashboard from "../components/Dashboard/Dashboard";
import NotFound from "../components/NotFound/NotFound";
import Authentication from "../components/Authentication/Authentication";
import AuthRoute from "./AuthRoute";

const AppRoutes = () => {
  const user = useSelector((state: RootState) => state.app.user);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<Navigate to={user ? "/dashboard" : "/auth"} replace />}
        />

        <Route
          path="/auth"
          element={
            <AuthRoute requireAuth={false}>
              <Authentication />
            </AuthRoute>
          }
        />

        <Route
          path="/dashboard"
          element={
            <AuthRoute requireAuth={true}>
              <Dashboard />
            </AuthRoute>
          }
        />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
