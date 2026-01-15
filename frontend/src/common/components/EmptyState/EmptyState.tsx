import type { ReactNode } from "react";
import { motion, type Variants } from "framer-motion";

import styles from "./EmptyState.module.css";

interface EmptyStateProps {
  children: ReactNode;
  animationVariant?: Variants;
}

const EmptyState = ({ children, animationVariant }: EmptyStateProps) => {
  return (
    <motion.div
      className={styles["empty-state"]}
      variants={animationVariant}
      initial="hidden"
      animate="visible"
    >
      {children}
    </motion.div>
  );
};

export default EmptyState;
