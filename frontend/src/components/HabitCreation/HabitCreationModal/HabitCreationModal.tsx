import { useMemo, useState } from "react";

import ErrorText from "../../../common/components/Form/ErrorText/ErrorText";
import Field from "../../../common/components/Form/Field/Field";
import FormActions from "../../../common/components/Form/FormActions/FormActions";
import FormModal from "../../../common/components/Form/FormModal/FormModal";

import { useDirtyForm } from "../../../common/hooks/useDirtyForm";
import { useFormValidation } from "../../../common/hooks/useFormValidation";

import { useHabits } from "../../../store/hooks/useHabits";

import type { Habit } from "../../../common/types/habit";

import styles from "./HabitCreationModal.module.css";

interface HabitCreationModalProps {
  habit?: Habit | null;
  isOpen: boolean;
  shouldResetForm: boolean;
  onClose: () => void;
  onCloseAttempt: () => void;
  onDirtyChange: (dirty: boolean) => void;
}

const HabitCreationModal = ({
  habit,
  isOpen,
  shouldResetForm,
  onClose,
  onCloseAttempt,
  onDirtyChange,
}: HabitCreationModalProps) => {
  const { createHabit, updateHabit } = useHabits();
  const [loading, setLoading] = useState(false);

  const initialValues = useMemo(
    () => ({
      name: habit?.name ?? "",
      frequency: habit?.frequency ?? "daily",
      intervalDays: habit?.intervalDays ?? 2,
    }),
    [habit],
  );

  const { values, setValues, isDirty } = useDirtyForm({
    isOpen,
    shouldResetForm,
    initialValues,
    onDirtyChange,
  });

  const validator = (v: typeof values) => {
    const errors: Partial<Record<keyof typeof values, string>> = {};

    if (!v.name.trim()) errors.name = "Nazwa jest wymagana";
    if (v.frequency === "every_x_days" && v.intervalDays < 2) {
      errors.intervalDays = "Minimum 2 dni";
    }

    return errors;
  };

  const { errors, validate, clearError } = useFormValidation(values, validator);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);

    const payload = {
      name: values.name,
      frequency: values.frequency,
      intervalDays:
        values.frequency === "every_x_days" ? values.intervalDays : 1,
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
    <FormModal
      title={habit ? "Edytuj nawyk" : "Dodaj nowy nawyk"}
      onSubmit={handleSubmit}
    >
      <Field label="Nazwa nawyku *">
        <input
          id="habit-name"
          className={styles.input}
          value={values.name}
          onChange={(e) => {
            clearError("name");
            setValues((v) => ({ ...v, name: e.target.value }));
          }}
        />
        <ErrorText message={errors.name} />
      </Field>
      <Field label="Częstotliwość">
        <select
          id="habit-frequency"
          className={styles.select}
          value={values.frequency}
          onChange={(e) =>
            setValues((v) => ({
              ...v,
              frequency: e.target.value as "daily" | "weekly" | "every_x_days",
            }))
          }
        >
          <option value="daily">Codziennie</option>
          <option value="weekly">Raz w tygodniu</option>
          <option value="every_x_days">Co X dni</option>
        </select>
      </Field>
      {values.frequency === "every_x_days" && (
        <Field label="Co ile dni?">
          <input
            id="habit-interval_days"
            className={styles.input}
            type="number"
            min={2}
            value={values.intervalDays}
            onChange={(e) => {
              clearError("intervalDays");
              setValues((v) => ({
                ...v,
                intervalDays: Number(e.target.value),
              }));
            }}
          />
          <ErrorText message={errors.intervalDays} />
        </Field>
      )}
      <FormActions
        loading={loading}
        submitLabel={habit ? "Zapisz zmiany" : "Dodaj"}
        onCancel={() => (isDirty ? onCloseAttempt() : onClose())}
      />
    </FormModal>
  );
};

export default HabitCreationModal;
