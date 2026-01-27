import { useState } from "react";
import { motion } from "framer-motion";

import { useHabits } from "../../../store/hooks/useHabits";

import HabitCalendarFilters from "./HabitCalendarFilters/HabitCalendarFilters";
import HabitCalendarLegend from "./HabitCalendarLegend/HabitCalendarLegend";
import HabitCalendarMonthModal from "./HabitCalendarMonthModal/HabitCalendarMonthModal";
import HabitCalendarWeek from "./HabitCalendarWeek/HabitCalendarWeek";

import { componentMountVariants } from "../../../common/config/config";

import styles from "./HabitCalendar.module.css";

const HabitCalendar = () => {
  const [habitId, setHabitId] = useState<string | null>(null);
  const [week, setWeek] = useState(new Date());
  const [filter, setFilter] = useState<"all" | "done">("all");
  const [modalOpen, setModalOpen] = useState(false);

  const { habits, logs } = useHabits();

  return (
    <motion.div
      className={styles.wrapper}
      variants={componentMountVariants}
      initial="hidden"
      animate="visible"
    >
      <HabitCalendarFilters
        habits={habits}
        habitId={habitId}
        filter={filter}
        onHabitChange={setHabitId}
        onFilterChange={setFilter}
      />
      <HabitCalendarWeek
        week={week}
        habits={habits}
        habitId={habitId}
        logs={logs}
        filter={filter}
        onPrev={() => setWeek(new Date(week.getTime() - 7 * 864e5))}
        onNext={() => setWeek(new Date(week.getTime() + 7 * 864e5))}
      />
      <HabitCalendarLegend />
      <button className={styles.month_btn} onClick={() => setModalOpen(true)}>
        Widok miesięczny
      </button>
      <HabitCalendarMonthModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        habits={habits}
        habitId={habitId}
        logs={logs}
        filter={filter}
        onHabitChange={setHabitId}
        onFilterChange={setFilter}
      />
    </motion.div>
  );
};

export default HabitCalendar;
