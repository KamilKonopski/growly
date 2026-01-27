import { motion } from "framer-motion";

import { componentMountVariants } from "../../config/config";

import styles from "./BaseCard.module.css";

interface BaseCardProps {
  children: React.ReactNode;
}

const BaseCard = ({ children }: BaseCardProps) => {
  return (
    <motion.article
      className={styles.card}
      variants={componentMountVariants}
      initial="hidden"
      animate="visible"
      whileHover={{
        y: -8,
        borderColor: "var(--color-primary)",
        transition: { duration: 0.2, ease: "easeOut" },
      }}
    >
      {children}
    </motion.article>
  );
};

export default BaseCard;
