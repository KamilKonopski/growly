import HabitCard from "../HabitCard/HabitCard";
import { easeOut, motion } from "framer-motion";

import { useHabits } from "../../../store/hooks/useHabits";

import type { Habit } from "../types/habit";

import styles from "./HabitList.module.css";

const listVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: easeOut },
  },
};

interface HabitListProps {
  onEdit: (habit: Habit) => void;
}

const HabitList = ({ onEdit }: HabitListProps) => {
  const { habits, logs } = useHabits();

  return habits.length ? (
    <motion.div
      className={styles.container}
      variants={listVariants}
      initial="hidden"
      animate="visible"
    >
      {habits.map((habit) => (
        <HabitCard
          key={habit.id}
          habit={habit}
          logs={logs}
          variants={itemVariants}
          onEdit={() => onEdit(habit)}
        />
      ))}
    </motion.div>
  ) : (
    <p>Nie masz żadnych nawyków. Dodaj pierwszy nawyk.</p>
  );
};

export default HabitList;
