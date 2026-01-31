import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../../store/hooks/useAuth";
import type { RootState } from "../../store/store";
import { clearLogoutFlag } from "../../store/slices/appSlice";

import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

import styles from "./Authentication.module.css";

const Authentication = () => {
  const [mode, setMode] = useState<"login" | "register">("login");
  const [isFirstMount, setIsFirstMount] = useState(true);
  const dispatch = useDispatch();
  const justLoggedOut = useSelector(
    (state: RootState) => state.app.justLoggedOut,
  );

  useEffect(() => {
    if (justLoggedOut) {
      const timer = setTimeout(() => {
        dispatch(clearLogoutFlag());
      }, 1200);

      return () => clearTimeout(timer);
    }
  }, [justLoggedOut, dispatch]);

  const navigate = useNavigate();
  const { demoLogin } = useAuth();

  useEffect(() => {
    const timer = setTimeout(() => setIsFirstMount(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  const switchToLogin = () => setMode("login");

  const handleDemoLogin = () => {
    demoLogin();
    navigate("/dashboard");
  };

  return (
    <div className={styles.container}>
      {/* LOGO */}
      <div className={styles.container__welcome}>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2 }}
          className={styles.logo}
        >
          Growly
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 1 }}
          className={styles.subtitle}
        >
          Śledź swoje nawyki. Rozwijaj się każdego dnia
        </motion.p>
      </div>

      {justLoggedOut && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Pomyślnie wylogowano!
        </motion.div>
      )}

      {/* TABS */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.5 }}
        className={styles.tabs}
      >
        <button
          className={`${styles.tab} ${
            mode === "login" ? styles.activeTab : ""
          }`}
          onClick={() => setMode("login")}
        >
          Logowanie
        </button>

        <button
          className={`${styles.tab} ${
            mode === "register" ? styles.activeTab : ""
          }`}
          onClick={() => setMode("register")}
        >
          Rejestracja
        </button>

        <motion.div className={styles.tabUnderline} layout />
      </motion.div>

      {/* FORMS */}
      <div className={styles.formWrapper}>
        <motion.div key={mode} layout>
          {mode === "login" ? (
            <LoginForm isFirstMount={isFirstMount} />
          ) : (
            <RegisterForm onRegistered={switchToLogin} />
          )}
        </motion.div>
      </div>

      {/* DEMO */}
      <div className={styles.demoSection}>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8, duration: 0.6 }}
          className={styles.demoInfo}
        >
          Tryb demo nie zapisuje zmian i resetuje się po odświeżeniu.
        </motion.p>

        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.0, duration: 0.6 }}
          className={styles.demoButton}
          onClick={handleDemoLogin}
        >
          Uruchom wersję demo
        </motion.button>
      </div>
    </div>
  );
};

export default Authentication;
