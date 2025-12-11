import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

import { useMeQuery } from "../../store/auth/authApi";
import type { RootState } from "../../store/store";

import Header from "../Header/Header";
import Sidebar from "../Sidebar/Sidebar";

import styles from "./MainLayout.module.css";

const MainLayout = () => {
  const mode = useSelector((state: RootState) => state.app.mode);
  const demoUser = useSelector((state: RootState) => state.app.user);

  const { data: backendUser, isLoading } = useMeQuery(undefined, {
    skip: mode !== "backend",
  });

  if (mode === "backend" && isLoading) {
    return <div>Ładowanie...</div>;
  }

  const user = mode === "backend" ? backendUser : demoUser;

  return (
    <div className={styles.layout}>
      <Sidebar />
      <div className={styles.main}>
        <Header userName={user?.name} />
        <main className={styles.content}>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
