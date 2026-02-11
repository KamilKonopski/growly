import { useSelector } from "react-redux";
import { motion } from "framer-motion";

import { useMeQuery } from "../../store/auth/authApi";
import type { RootState } from "../../store/store";

import ProfileInfoSection from "./ProfileInfoSection/ProfileInfoSection";
import SecuritySection from "./SecuritySection/SecuritySection";

import { componentMountVariants } from "../../common/config/config";

import styles from "./UserProfile.module.css";

const UserProfile = () => {
  const demoUser = useSelector((state: RootState) => state.app.user);
  const mode = useSelector((state: RootState) => state.app.mode);

  const { data: backendUser } = useMeQuery(undefined, {
    skip: mode !== "backend",
  });

  const user = mode === "backend" ? backendUser : demoUser;

  return (
    <motion.section
      variants={componentMountVariants}
      initial="hidden"
      animate="visible"
      className={styles.container}
    >
      <div className={styles["info-container"]}>
        <ProfileInfoSection user={user} mode={mode} />
        <div className={styles.line} />
        <SecuritySection mode={mode} />
      </div>
    </motion.section>
  );
};

export default UserProfile;
