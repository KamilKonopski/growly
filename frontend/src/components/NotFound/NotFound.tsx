import { useNavigate } from "react-router-dom";

import styles from "./NotFound.module.css";

const NotFound = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate("/");
  };

  return (
    <div className={styles.container}>
      <h1>404</h1>
      <p>Strona nie istnieje 😕</p>
      <button onClick={handleGoHome}>Powrót do strony głównej</button>
    </div>
  );
};

export default NotFound;
