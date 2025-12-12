import { useState, useEffect } from "react";
import { useHabits } from "../../../store/hooks/useHabits";
import type { CreateHabitRequest } from "../../../store/habits/habitsApi.types";

import styles from "./HabitCreationModal.module.css";

interface HabitCreactionModalProps {
  onClose: () => void;
  onCloseAttempt: () => void;
  onDirtyChange: (dirty: boolean) => void;
}

const HabitCreationModal = ({
  onClose,
  onCloseAttempt,
  onDirtyChange,
}: HabitCreactionModalProps) => {
  const { createHabit } = useHabits();

  const [name, setName] = useState("");
  const [frequency, setFrequency] = useState<
    "daily" | "weekly" | "every_x_days"
  >("daily");
  const [timesPerWeek, setTimesPerWeek] = useState(3);
  const [intervalDays, setIntervalDays] = useState(2);
  const [loading, setLoading] = useState(false);

  const isDirty =
    name !== "" ||
    frequency !== "daily" ||
    timesPerWeek !== 3 ||
    intervalDays !== 2;

  useEffect(() => {
    onDirtyChange(isDirty);
  }, [isDirty, onDirtyChange]);

  const handleCloseAttemptInternal = () => {
    if (!isDirty) onClose();
    else onCloseAttempt();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const payload: CreateHabitRequest = {
      name,
      frequency,
      timesPerWeek: frequency === "weekly" ? timesPerWeek : undefined,
      intervalDays: frequency === "every_x_days" ? intervalDays : 1,
    };

    await createHabit(payload);
    setLoading(false);
    onClose();
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Dodaj nowy nawyk</h2>
      <form className={styles.form} onSubmit={handleSubmit}>
        <label className={styles.label}>
          Nazwa nawyku
          <input
            className={styles.input}
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Np. Medytacja"
            required
          />
        </label>
        <label className={styles.label}>
          Częstotliwość
          <select
            className={styles.select}
            value={frequency}
            onChange={(e) =>
              setFrequency(
                e.target.value as "daily" | "weekly" | "every_x_days"
              )
            }
          >
            <option value="daily">Codziennie</option>
            <option value="weekly">Kilka razy w tygodniu</option>
            <option value="every_x_days">Co X dni</option>
          </select>
        </label>
        {frequency === "weekly" && (
          <label className={styles.label}>
            Ile razy w tygodniu?
            <input
              type="number"
              className={styles.input}
              min={1}
              max={7}
              value={timesPerWeek}
              onChange={(e) => setTimesPerWeek(Number(e.target.value))}
            />
          </label>
        )}
        {frequency === "every_x_days" && (
          <label className={styles.label}>
            Co ile dni?
            <input
              type="number"
              className={styles.input}
              min={1}
              value={intervalDays}
              onChange={(e) => setIntervalDays(Number(e.target.value))}
            />
          </label>
        )}
        <div className={styles.actions}>
          <button
            type="button"
            className={styles.cancel}
            onClick={handleCloseAttemptInternal}
          >
            Anuluj
          </button>
          <button type="submit" className={styles.submit} disabled={loading}>
            {loading ? "Zapisywanie..." : "Dodaj"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default HabitCreationModal;
