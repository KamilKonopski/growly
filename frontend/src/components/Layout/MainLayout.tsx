import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

import { useMeQuery } from "../../store/auth/authApi";
import type { RootState } from "../../store/store";

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
        <header className={styles.header}>
          <div className={styles.logo}>Growly</div>
          <div className={styles.section}>Dashboard</div>
          <div className={styles.user}>
            <span>Witaj {user?.name}!</span>
            <img src="/avatar.png" alt="avatar" className={styles.avatar} />
          </div>
        </header>
        <main className={styles.content}>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
