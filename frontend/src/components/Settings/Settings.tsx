import { motion } from "framer-motion";

import { useSelector } from "react-redux";
import type { RootState } from "../../store/store";

import { componentMountVariants } from "../../common/config/config";

import styles from "./Settings.module.css";

const Settings = () => {
  const mode = useSelector((state: RootState) => state.app.mode);

  return (
    <motion.section
      variants={componentMountVariants}
      initial="hidden"
      animate="visible"
      className={styles.container}
    >
      <div className={styles["settings-container"]}>
        <div className={styles.mode}>
          <p>Tryb aplikacji: {mode === "backend" ? "local backend" : "demo"}</p>
        </div>
        <div className={styles["info-container"]}>
          <p>
            Autor:{" "}
            <a href="https://github.com/kamilkonopski" target="_blank">
              Kamil Konopski
            </a>
          </p>
          <span className={styles.version}>v1.0.0</span>
        </div>
      </div>
    </motion.section>
  );
};

export default Settings;
