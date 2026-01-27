import { motion } from "framer-motion";

import DashboardActivity from "./DashboardActivity/DashboardActivity";
import DashboardHabits from "./DashboardHabits/DashboardHabits";
import DashboardLearningPaths from "./DashboardLearningPaths/DashboardLearningPaths";
import DashboardQuote from "./DashboardQuote/DashboardQuote";

import { componentMountVariants } from "../../common/config/config";

import styles from "./Dashboard.module.css";

const Dashboard = () => {
  return (
    <motion.section
      variants={componentMountVariants}
      initial="hidden"
      animate="visible"
    >
      <DashboardQuote />

      <div className={styles.wrapper}>
        <div className={styles.habits}>
          <DashboardHabits />
        </div>

        <div className={styles.learning}>
          <DashboardLearningPaths />
        </div>
      </div>

      <DashboardActivity />
    </motion.section>
  );
};

export default Dashboard;
