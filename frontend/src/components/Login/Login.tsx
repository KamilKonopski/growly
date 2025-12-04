import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./Login.module.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../store/hooks/useAuth";
import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";

const Login = () => {
  const [mode, setMode] = useState<"login" | "register">("login");
  const [isFirstMount, setIsFirstMount] = useState(true);
  const navigate = useNavigate();
  const { login, register, demoLogin } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [regName, setRegName] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regPassword, setRegPassword] = useState("");
  const [regConfirm, setRegConfirm] = useState("");

  const [error, setError] = useState("");
  const [info, setInfo] = useState("");

  const [loading, setLoading] = useState(false);

  const formVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsFirstMount(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  // Login submit
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await login(email, password);
      navigate("/dashboard");
    } catch (err) {
      const error = err as FetchBaseQueryError;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      setError((error.data as any)?.message || "Błąd logowania");
    } finally {
      setLoading(false);
    }
  };

  // Register submit
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setInfo("");
    setLoading(true);

    try {
      await register(regName, regEmail, regPassword, regConfirm);

      setInfo("Konto utworzone! Za 3 sekundy nastąpi przekierowanie...");
      setTimeout(() => {
        setMode("login");
      }, 3000);
    } catch (err) {
      const error = err as FetchBaseQueryError;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      setError((error.data as any)?.message || "Nie udało się utworzyć konta");
    } finally {
      setLoading(false);
    }
  };

  // Demo
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

        <motion.div
          className={styles.tabUnderline}
          layout
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            opacity: { delay: 1.4, duration: 0.4 },
            y: { delay: 1.4, duration: 0.4 },
            layout: { type: "spring", stiffness: 300, damping: 25 },
          }}
        />
      </motion.div>

      {/* FORMY */}
      <div className={styles.formWrapper}>
        {error && <p className={styles.error}>{error}</p>}
        {info && <p className={styles.info}>{info}</p>}

        <AnimatePresence mode="wait">
          {mode === "login" ? (
            <motion.form
              key="loginForm"
              variants={formVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{
                duration: isFirstMount ? 1 : 0.35,
                delay: isFirstMount ? 1.2 : 0,
              }}
              className={styles.form}
              onSubmit={handleLogin}
            >
              {/* EMAIL */}
              <div className={styles.floatingGroup}>
                <input
                  type="email"
                  placeholder=" "
                  className={styles.floatingInput}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <label className={styles.floatingLabel}>Email</label>
              </div>

              {/* PASSWORD */}
              <div className={styles.floatingGroup}>
                <input
                  type="password"
                  placeholder=" "
                  className={styles.floatingInput}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <label className={styles.floatingLabel}>Hasło</label>
              </div>

              <button className={styles.button} disabled={loading}>
                {loading ? "Logowanie..." : "Zaloguj się"}
              </button>
            </motion.form>
          ) : (
            <motion.form
              key="registerForm"
              variants={formVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.35 }}
              className={styles.form}
              onSubmit={handleRegister}
            >
              <div className={styles.floatingGroup}>
                <input
                  type="text"
                  placeholder=" "
                  className={styles.floatingInput}
                  value={regName}
                  onChange={(e) => setRegName(e.target.value)}
                  required
                />
                <label className={styles.floatingLabel}>Imię</label>
              </div>

              <div className={styles.floatingGroup}>
                <input
                  type="email"
                  placeholder=" "
                  className={styles.floatingInput}
                  value={regEmail}
                  onChange={(e) => setRegEmail(e.target.value)}
                  required
                />
                <label className={styles.floatingLabel}>Email</label>
              </div>

              <div className={styles.floatingGroup}>
                <input
                  type="password"
                  placeholder=" "
                  className={styles.floatingInput}
                  value={regPassword}
                  onChange={(e) => setRegPassword(e.target.value)}
                  required
                />
                <label className={styles.floatingLabel}>Hasło</label>
              </div>

              <div className={styles.floatingGroup}>
                <input
                  type="password"
                  placeholder=" "
                  className={styles.floatingInput}
                  value={regConfirm}
                  onChange={(e) => setRegConfirm(e.target.value)}
                  required
                />
                <label className={styles.floatingLabel}>Powtórz hasło</label>
              </div>

              <button className={styles.button} disabled={loading}>
                {loading ? "Tworzenie..." : "Utwórz konto"}
              </button>
            </motion.form>
          )}
        </AnimatePresence>
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
          disabled={loading}
        >
          Uruchom wersję demo
        </motion.button>
      </div>
    </div>
  );
};

export default Login;
