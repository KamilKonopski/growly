import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

import { useMeQuery } from "../../store/auth/authApi";
import type { RootState } from "../../store/store";

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
    <div className={styles["app-layout"]}>
      <aside className={styles.sidebar}>
        <div>
          <button title="Dashboard">🏠</button>
          <button title="Statystyki">📊</button>
          <button title="Ustawienia">⚙️</button>
        </div>
        <footer>
          <a
            href="https://github.com/kamilkonopski"
            className={styles["github-link"]}
            target="_blank"
            rel="noopener noreferrer"
          >
            🐱
          </a>
          <p>v0.1.0</p>
        </footer>
      </aside>

      <div className={styles.main}>
        <header className={styles.header}>
          <div className={styles.logo}>Growly</div>
          <div className={styles["section-title"]}>Dashboard</div>
          <div className={styles["user-actions"]}>
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
