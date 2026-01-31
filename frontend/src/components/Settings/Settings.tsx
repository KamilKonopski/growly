import styles from "./Settings.module.css";

const Settings = () => {
  return (
    <section className={styles.container}>
      <div className={styles["settings-container"]}>
        <div className={styles["info-container"]}>
          <p>
            Autor:{" "}
            <a href="https://github.com/kamilkonopski" target="_blank">
              Kamil Konopski
            </a>
          </p>
          <span className={styles.version}>v0.1.0</span>
        </div>
      </div>
    </section>
  );
};

export default Settings;
