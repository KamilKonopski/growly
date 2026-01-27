import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

import type { RootState } from "../store/store";

import Authentication from "../components/Authentication/Authentication";
import AuthRoute from "./AuthRoute";
import Dashboard from "../components/Dashboard/Dashboard";
import Habits from "../components/Habits/Habits";
import Learning from "../components/Learning/Learning";
import MainLayout from "../components/Layout/MainLayout";
import NotFound from "../components/NotFound/NotFound";
import Statistics from "../components/Statistics/Statistics";
import Settings from "../components/Settings/Settings";
import UserProfile from "../components/UserProfile/UserProfile";

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
          <Route path="/habits" element={<Habits />} />
          <Route path="/learning" element={<Learning />} />
          <Route path="/stats" element={<Statistics />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/profile" element={<UserProfile />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
