import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "../components/Login/Login";
import Dashboard from "../components/Dashboard/Dashboard";
import NotFound from "../components/NotFound/NotFound";

import ProtectedRoute from "./ProtectedRoute";
import { useSelector } from "react-redux";
import type { RootState } from "../store/store";

const AppRoutes = () => {
  const user = useSelector((state: RootState) => state.app.user);

  return (
    <BrowserRouter>
      <Routes>
        {/* Dynamiczne przekierowanie z "/" */}
        <Route
          path="/"
          element={<Navigate to={user ? "/dashboard" : "/login"} replace />}
        />

        {/* Publiczne strony */}
        <Route path="/login" element={<Login />} />

        {/* Chronione strony */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        {/* Strona 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
