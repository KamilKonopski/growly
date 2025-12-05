import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../store/store";

import Dashboard from "../components/Dashboard/Dashboard";
import NotFound from "../components/NotFound/NotFound";
import Authentication from "../components/Authentication/Authentication";
import AuthRoute from "./AuthRoute";
import MainLayout from "../components/Layout/MainLayout";

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
          element={
            <AuthRoute requireAuth={true}>
              <MainLayout />
            </AuthRoute>
          }
        >
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
