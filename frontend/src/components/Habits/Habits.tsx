import { useState } from "react";
import { Plus } from "lucide-react";

import ConfirmLeavingModal from "../HabitCreation/ConfirmLeavingModal/ConfirmLeavingModal";
import HabitCalendar from "./HabitCalendar/HabitCalendar";
import HabitCreationModal from "../HabitCreation/HabitCreationModal/HabitCreationModal";
import HabitList from "./HabitList/HabitList";
import HabitStats from "./HabitStats/HabitStats";
import Modal from "../../common/components/Modal/Modal";

import { useModalWithDirtyForm } from "../../common/hooks/useModalWithDirtyForm";

import type { Habit } from "../../common/types/habit";

import styles from "./Habits.module.css";

const Habits = () => {
  const modal = useModalWithDirtyForm();
  const [editingHabit, setEditingHabit] = useState<Habit | null>(null);

  const openAdd = () => {
    setEditingHabit(null);
    modal.openModal();
  };

  const openEdit = (habit: Habit) => {
    setEditingHabit(habit);
    modal.openModal();
  };

  return (
    <>
      <section className={styles.container}>
        <div className={styles["button_container"]}>
          <button className={styles.button} onClick={openAdd}>
            <Plus /> Dodaj nawyk
          </button>
        </div>
        <HabitList onEdit={openEdit} />
        <HabitCalendar />
        <HabitStats />
      </section>
      <Modal isOpen={modal.open} keepMounted onClose={modal.attemptClose}>
        <HabitCreationModal
          habit={editingHabit}
          isOpen={modal.open}
          shouldResetForm={modal.shouldResetForm}
          onClose={modal.forceClose}
          onCloseAttempt={modal.attemptClose}
          onDirtyChange={modal.setIsDirty}
        />
      </Modal>
      <Modal isOpen={modal.showConfirm} onClose={modal.confirmStay}>
        <ConfirmLeavingModal
          onCancel={modal.confirmStay}
          onConfirm={modal.confirmLeave}
        />
      </Modal>
    </>
  );
};

export default Habits;
