import { motion } from "framer-motion";

import DashboardActivity from "./DashboardActivity/DashboardActivity";
import DashboardHabits from "./DashboardHabits/DashboardHabits";
import DashboardQuote from "./DashboardQuote/DashboardQuote";

import { componentMountVariants } from "../Habits/config";

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
          {/* Tutaj będzie DashboardLearning */}
        </div>
      </div>

      <DashboardActivity />
    </motion.section>
  );
};

export default Dashboard;
