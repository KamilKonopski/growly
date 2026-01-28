import { useState } from "react";
import { motion } from "framer-motion";
import { useAuth } from "../../store/hooks/useAuth";
import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import styles from "./Authentication.module.css";
import { useNavigate } from "react-router-dom";

interface Props {
  isFirstMount: boolean;
}

const LoginForm = ({ isFirstMount }: Props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errors, setErrors] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();

  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    setErrors([]);
    setLoading(true);

    try {
      const res = await login(email, password);

      if (res.user && res.token) {
        navigate("/dashboard", { replace: true });
      } else {
        setErrors(["Nie udało się zalogować"]);
      }
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
        setErrors(["Nie udało się zalogować"]);
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
      transition={{
        duration: isFirstMount ? 1 : 0.35,
        delay: isFirstMount ? 1.2 : 0,
      }}
      onSubmit={handleLogin}
      className={styles.form}
    >
      {/* EMAIL */}
      <div className={styles.floatingGroup}>
        <input
          type="email"
          placeholder=" "
          className={`${styles.floatingInput} ${
            errors.some((e) => e.toLowerCase().includes("email"))
              ? styles.inputError
              : ""
          }`}
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
          className={`${styles.floatingInput} ${
            errors.some((e) => e.toLowerCase().includes("hasło"))
              ? styles.inputError
              : ""
          }`}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <label className={styles.floatingLabel}>Hasło</label>
      </div>

      {/* ERRORS */}
      {errors.length > 0 && (
        <ul className={styles.errorList}>
          {errors.map((err, idx) => (
            <li key={idx}>{err}</li>
          ))}
        </ul>
      )}

      <button className={styles.button} disabled={loading}>
        {loading ? "Logowanie..." : "Zaloguj się"}
      </button>
    </motion.form>
  );
};

export default LoginForm;
