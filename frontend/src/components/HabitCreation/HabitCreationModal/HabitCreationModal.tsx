import { useState, useEffect, useMemo } from "react";

import { useHabits } from "../../../store/hooks/useHabits";
import type { CreateHabitRequest } from "../../../store/habits/habitsApi.types";

import type { Habit } from "../../../common/types/habit";

import styles from "./HabitCreationModal.module.css";

interface HabitCreactionModalProps {
  onClose: () => void;
  onCloseAttempt: () => void;
  onDirtyChange: (dirty: boolean) => void;
  habit?: Habit | null;
}

const HabitCreationModal = ({
  onClose,
  onCloseAttempt,
  onDirtyChange,
  habit,
}: HabitCreactionModalProps) => {
  const { createHabit, updateHabit } = useHabits();

  const [name, setName] = useState(habit?.name ?? "");
  const [frequency, setFrequency] = useState<
    "daily" | "weekly" | "every_x_days"
  >(habit?.frequency ?? "daily");
  const [intervalDays, setIntervalDays] = useState(habit?.intervalDays ?? 2);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (habit) {
      setName(habit.name);
      setFrequency(habit.frequency);
      setIntervalDays(habit.intervalDays ?? 2);
    } else {
      setName("");
      setFrequency("daily");
      setIntervalDays(2);
    }
  }, [habit]);

  const initialValues = useMemo(
    () => ({
      name: habit?.name ?? "",
      frequency: habit?.frequency ?? "daily",
      intervalDays: habit?.intervalDays ?? 2,
    }),
    [habit]
  );

  const isDirty =
    name !== initialValues.name ||
    frequency !== initialValues.frequency ||
    intervalDays !== initialValues.intervalDays;

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
      intervalDays: frequency === "every_x_days" ? intervalDays : 1,
    };

    if (habit) {
      await updateHabit(habit.id, payload);
    } else {
      await createHabit(payload);
    }

    setLoading(false);
    onClose();
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>
        {habit ? "Edytuj nawyk" : "Dodaj nowy nawyk"}
      </h2>
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
            <option value="weekly">Raz w tygodniu</option>
            <option value="every_x_days">Co X dni</option>
          </select>
        </label>
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
            {loading ? "Zapisywanie..." : habit ? "Zapisz zmiany" : "Dodaj"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default HabitCreationModal;
