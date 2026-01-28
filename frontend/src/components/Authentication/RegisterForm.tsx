import { useState, useEffect } from "react";
import { motion } from "framer-motion";

import { useAuth } from "../../store/hooks/useAuth";
import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";

import styles from "./Authentication.module.css";

interface RegisterFormProps {
  onRegistered: () => void;
}

const RegisterForm = ({ onRegistered }: RegisterFormProps) => {
  const [regName, setRegName] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regPassword, setRegPassword] = useState("");
  const [regConfirm, setRegConfirm] = useState("");
  const [lastCheckedEmail, setLastCheckedEmail] = useState("");

  const [errors, setErrors] = useState<string[]>([]);
  const [info, setInfo] = useState("");
  const [loading, setLoading] = useState(false);
  const [emailAvailable, setEmailAvailable] = useState<boolean | null>(null);

  const { register, checkEmail } = useAuth();

  useEffect(() => {
    if (!regEmail) {
      setEmailAvailable(null);
      return;
    }

    const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(regEmail);
    if (!isValid) {
      setEmailAvailable(null);
      return;
    }

    if (regEmail === lastCheckedEmail) return;

    const timer = setTimeout(async () => {
      try {
        const available = await checkEmail(regEmail);
        setEmailAvailable(available);
        setLastCheckedEmail(regEmail);
      } catch {
        setEmailAvailable(null);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [checkEmail, lastCheckedEmail, regEmail]);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors([]);
    setInfo("");
    setLoading(true);

    try {
      const available = await checkEmail(regEmail);
      if (!available) {
        setErrors(["Ten email jest już zajęty"]);
        setLoading(false);
        return;
      }

      await register(regName, regEmail, regPassword, regConfirm);

      setInfo("Konto utworzone! Za 3 sekundy nastąpi przekierowanie...");
      setTimeout(() => {
        onRegistered();
      }, 3000);
    } catch (err) {
      const error = err as FetchBaseQueryError;
      const data = error.data as
        | { errors?: { msg: string }[]; message?: string }
        | undefined;

      if (data?.errors) {
        setErrors(data.errors.map((e) => e.msg));
      } else if (data?.message) {
        setErrors([data.message]);
      } else {
        setErrors(["Nie udało się utworzyć konta"]);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.35 }}
      onSubmit={handleRegister}
      className={styles.form}
    >
      {/* NAME */}
      <div className={styles.floatingGroup}>
        <input
          type="text"
          placeholder=" "
          className={`${styles.floatingInput} ${
            errors.some((e) => e.toLowerCase().includes("imię"))
              ? styles.inputError
              : ""
          }`}
          value={regName}
          onChange={(e) => setRegName(e.target.value)}
          required
        />
        <label className={styles.floatingLabel}>Imię</label>
      </div>

      {/* EMAIL */}
      <div className={styles.floatingGroup}>
        <input
          type="email"
          placeholder=" "
          value={regEmail}
          onChange={(e) => setRegEmail(e.target.value)}
          className={`${styles.floatingInput} 
      ${emailAvailable === false ? styles.inputError : ""}
      ${emailAvailable === true ? styles.inputSuccess : ""}
    `}
          required
        />
        <label className={styles.floatingLabel}>Email</label>
      </div>

      {/* EMAIL MESSAGE */}
      {regEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(regEmail) && (
        <p className={styles.errorList}>Podaj poprawny adres e-mail</p>
      )}

      {regEmail &&
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(regEmail) &&
        emailAvailable === false && (
          <p className={styles.errorList}>Ten email jest już zajęty</p>
        )}

      {regEmail &&
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(regEmail) &&
        emailAvailable === true && (
          <p className={styles.success}>Email jest dostępny ✓</p>
        )}

      {/* PASSWORD */}
      <div className={styles.floatingGroup}>
        <input
          type="password"
          placeholder=" "
          className={`${styles.floatingInput} ${
            errors.some((e) => e.toLowerCase().includes("hasło"))
              ? styles.inputError
              : ""
          }`}
          value={regPassword}
          onChange={(e) => setRegPassword(e.target.value)}
          required
        />
        <label className={styles.floatingLabel}>Hasło</label>
      </div>

      {/* CONFIRM */}
      <div className={styles.floatingGroup}>
        <input
          type="password"
          placeholder=" "
          className={`${styles.floatingInput} ${
            errors.some((e) => e.toLowerCase().includes("same"))
              ? styles.inputError
              : ""
          }`}
          value={regConfirm}
          onChange={(e) => setRegConfirm(e.target.value)}
          required
        />
        <label className={styles.floatingLabel}>Powtórz hasło</label>
      </div>

      {/* ERRORS */}
      {errors.length > 0 && (
        <ul className={styles.errorList}>
          {errors.map((err, idx) => (
            <li key={idx}>{err}</li>
          ))}
        </ul>
      )}

      {/* INFO */}
      {info && <p className={styles.info}>{info}</p>}

      <button className={styles.button} disabled={loading}>
        {loading ? "Tworzenie..." : "Utwórz konto"}
      </button>
    </motion.form>
  );
};

export default RegisterForm;
