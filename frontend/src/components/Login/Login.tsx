import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./Login.module.css";

const Login = () => {
  const [mode, setMode] = useState<"login" | "register">("login");

  // Animacja wejścia formularza
  const formVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  };

  const [isFirstMount, setIsFirstMount] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsFirstMount(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={styles.container}>
      {/* --------------------------------------------
          SEKCJA POWITALNA
      --------------------------------------------- */}
      <div className={styles.container__welcome}>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
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

      {/* --------------------------------------------
          TABS — LOGOWANIE / REJESTRACJA
      --------------------------------------------- */}
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

        {/* animowana kreska */}
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

      {/* --------------------------------------------
          FORMULARZE (ANIMOWANE)
      --------------------------------------------- */}
      <div className={styles.formWrapper}>
        <AnimatePresence mode="wait">
          {mode === "login" ? (
            <motion.form
              key="login"
              variants={formVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{
                duration: isFirstMount ? 1 : 0.35,
                delay: isFirstMount ? 1.2 : 0,
              }}
              className={styles.form}
            >
              {/* EMAIL */}
              <div className={styles.floatingGroup}>
                <input
                  type="email"
                  id="login-email"
                  name="login-email"
                  placeholder=" "
                  className={styles.floatingInput}
                />
                <label htmlFor="login-email" className={styles.floatingLabel}>
                  Email
                </label>
              </div>

              {/* PASSWORD */}
              <div className={styles.floatingGroup}>
                <input
                  type="password"
                  id="login-password"
                  name="login-password"
                  placeholder=" "
                  className={styles.floatingInput}
                />
                <label
                  htmlFor="login-password"
                  className={styles.floatingLabel}
                >
                  Hasło
                </label>
              </div>

              <button className={styles.button}>Zaloguj się</button>
            </motion.form>
          ) : (
            <motion.form
              key="register"
              variants={formVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.35 }}
              className={styles.form}
            >
              {/* IMIĘ */}
              <div className={styles.floatingGroup}>
                <input
                  type="text"
                  id="register-name"
                  name="register-name"
                  placeholder=" "
                  className={styles.floatingInput}
                />
                <label htmlFor="register-name" className={styles.floatingLabel}>
                  Imię
                </label>
              </div>

              {/* EMAIL */}
              <div className={styles.floatingGroup}>
                <input
                  type="email"
                  id="register-email"
                  name="register-email"
                  placeholder=" "
                  className={styles.floatingInput}
                />
                <label
                  htmlFor="register-email"
                  className={styles.floatingLabel}
                >
                  Email
                </label>
              </div>

              {/* HASŁO */}
              <div className={styles.floatingGroup}>
                <input
                  type="password"
                  id="register-password"
                  name="register-password"
                  placeholder=" "
                  className={styles.floatingInput}
                />
                <label
                  htmlFor="register-password"
                  className={styles.floatingLabel}
                >
                  Hasło
                </label>
              </div>

              <button className={styles.button}>Utwórz konto</button>
            </motion.form>
          )}
        </AnimatePresence>
      </div>

      {/* --------------------------------------------
          TRYB DEMO
      --------------------------------------------- */}
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
        >
          Uruchom wersję demo
        </motion.button>
      </div>
    </div>
  );
};

export default Login;
