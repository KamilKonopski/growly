import { Plus } from "lucide-react";

import HabitList from "./HabitList/HabitList";

import styles from "./Habits.module.css";

const Habits = () => {
  return (
    <section className={styles.container}>
      <div className={styles["button_container"]}>
        <button className={styles.button}>
          <Plus />
          Dodaj nawyk
        </button>
      </div>
      <HabitList />
      <div>
        <p>Kalendarz</p>
      </div>
      <div>
        <p>Statystyki</p>
      </div>
    </section>
  );
};

export default Habits;
