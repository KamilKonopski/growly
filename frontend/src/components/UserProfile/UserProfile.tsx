import { useSelector } from "react-redux";

import type { RootState } from "../../store/store";

import styles from "./UserProfile.module.css";

const UserProfile = () => {
  const user = useSelector((state: RootState) => state.app.user);
  return (
    <section className={styles.container}>
      <div className={styles["info-container"]}>
        <div className={styles.avatar}>
          <img src="/placeholder.png" alt="avatar placeholder" />
        </div>
        <div className={styles["info-text"]}>
          <p>Twoje imię: {user?.name}</p>
          <p>Twój email: {user?.email}</p>
          <p>
            Członek od:{" "}
            {new Date(user?.createdAt ?? Date.now()).toLocaleDateString(
              "pl-PL",
            )}
          </p>
          <button className={styles["edit-btn"]} disabled>
            Edytuj profil
          </button>
        </div>
        <div className={styles.line}></div>
        <div className={styles["security-container"]}>
          <h2>Bezpieczeństwo konta</h2>
          <div className={styles["password-container"]}>
            <div className={styles.password}>
              <p className={styles["password-text"]}>Hasło</p>
              <p className={styles["password-subtext"]}>
                Zmień swoje hasło by zalogować się do konta
              </p>
            </div>
            <button className={styles["change-btn"]} disabled>
              Zmień hasło
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UserProfile;
