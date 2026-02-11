import { motion } from "framer-motion";

import { componentMountVariants } from "../../common/config/config";

import styles from "./Settings.module.css";

const Settings = () => {
  return (
    <motion.section
      variants={componentMountVariants}
      initial="hidden"
      animate="visible"
      className={styles.container}
    >
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
    </motion.section>
  );
};

export default Settings;
