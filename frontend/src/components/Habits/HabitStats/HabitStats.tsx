import { useMemo, useState, lazy, Suspense } from "react";
import { motion } from "framer-motion";

import RangeSwitch from "./RangeSwitch/RangeSwitch";
const HabitBarChart = lazy(() => import("./Charts/HabitBarChart"));
const HabitLineChart = lazy(() => import("./Charts/HabitLineChart"));

import { useHabits } from "../../../store/hooks/useHabits";
import { componentMountVariants, ranges } from "../config";
import {
  mapLogsPerHabit,
  mapLogsToTrend,
} from "./../../../common/utils/habitStats";

import styles from "./HabitStats.module.css";

const HabitStats = () => {
  const [lastDays, setLastDays] = useState(7);
  const { mode, habits, logs, getHabitLogsByRange } = useHabits();

  const startDate = useMemo(
    () =>
      new Date(Date.now() - (lastDays - 1) * 86400000)
        .toISOString()
        .slice(0, 10),
    [lastDays]
  );
  const endDate = useMemo(() => new Date().toISOString().slice(0, 10), []);

  const { data: rangeLogs } = getHabitLogsByRange(
    { startDate, endDate },
    { skip: mode !== "backend" }
  );

  const finalLogs = useMemo(
    () =>
      mode === "backend"
        ? rangeLogs ?? []
        : logs.filter((l) => l.date >= startDate && l.date <= endDate),
    [mode, rangeLogs, logs, startDate, endDate]
  );
  const perHabitData = useMemo(
    () => mapLogsPerHabit(habits, finalLogs, lastDays),
    [habits, finalLogs, lastDays]
  );
  const trendData = useMemo(
    () => mapLogsToTrend(finalLogs, lastDays),
    [finalLogs, lastDays]
  );

  if (!finalLogs.length) {
    return (
      <motion.div
        className={styles["empty-state"]}
        variants={componentMountVariants}
        initial="hidden"
        animate="visible"
      >
        <h3>Brak danych</h3>
        <p>Nie ma żadnych wykonań z ostatnich {lastDays} dni</p>
      </motion.div>
    );
  }

  return (
    <motion.div
      className={styles["habit-stats-wrapper"]}
      variants={componentMountVariants}
      initial="hidden"
      animate="visible"
    >
      <h2>Statystyki</h2>
      <RangeSwitch ranges={ranges} selected={lastDays} onChange={setLastDays} />
      <div className={styles["habit-stats-card"]}>
        <h3>Wykonania nawyków</h3>
        <Suspense fallback={<div>Ładowanie wykresu...</div>}>
          <HabitBarChart data={perHabitData} />
        </Suspense>
      </div>
      <div className={styles["habit-stats-card"]}>
        <h3>Trend wykonań</h3>
        <Suspense fallback={<div>Ładowanie wykresu...</div>}>
          <HabitLineChart data={trendData} />
        </Suspense>
      </div>
    </motion.div>
  );
};

export default HabitStats;
