import { Circle } from "lucide-react";
import styles from "./HabitCalendarLegend.module.css";

const HabitCalendarLegend = () => {
  return (
    <div className={styles.legend}>
      <span>
        <Circle fill="green" /> Wykonane
      </span>
      <span className={styles.soon}>
        <Circle fill="red" /> Niewykonane (SOON)
      </span>
    </div>
  );
};

export default HabitCalendarLegend;
