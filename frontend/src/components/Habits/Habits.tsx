import { useState, useEffect } from "react";
import { Plus } from "lucide-react";

import ConfirmLeavingModal from "../HabitCreation/ConfirmLeavingModal/ConfirmLeavingModal";
import HabitCalendar from "./HabitCalendar/HabitCalendar";
import HabitCreationModal from "../HabitCreation/HabitCreationModal/HabitCreationModal";
import HabitList from "./HabitList/HabitList";
import HabitStats from "./HabitStats/HabitStats";
import Modal from "../../common/components/Modal/Modal";

import type { Habit } from "../../common/types/habit";

import styles from "./Habits.module.css";

const Habits = () => {
  const [openModal, setOpenModal] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [shouldReopen, setShouldReopen] = useState(false);
  const [isDirty, setIsDirty] = useState(false);
  const [editingHabit, setEditingHabit] = useState<Habit | null>(null);
  const [shouldResetForm, setShouldResetForm] = useState(false);

  const handleOpenModal = () => {
    setEditingHabit(null);
    setShouldResetForm(true);
    setOpenModal(true);
  };

  const handleEditHabit = (habit: Habit) => {
    setEditingHabit(habit);
    setShouldResetForm(true);
    setOpenModal(true);
  };

  const handleForceCloseModal = () => {
    setIsDirty(false);
    setEditingHabit(null);
    setShouldResetForm(true);
    setOpenModal(false);
  };

  const handleCloseAttempt = () => {
    if (isDirty) {
      setOpenModal(false);
      setShowConfirm(true);
      setShouldReopen(true);
    } else {
      setOpenModal(false);
    }
  };

  const handleConfirmStay = () => {
    setShowConfirm(false);

    if (shouldReopen) {
      setOpenModal(true);
      setShouldReopen(false);
    }
  };

  const handleConfirmLeave = () => {
    setIsDirty(false);
    setEditingHabit(null);
    setShouldResetForm(true);
    setShowConfirm(false);
    setShouldReopen(false);
  };

  useEffect(() => {
    if (openModal) {
      setShouldResetForm(false);
    }
  }, [openModal]);

  return (
    <>
      <section className={styles.container}>
        <div className={styles.button_container}>
          <button className={styles.button} onClick={handleOpenModal}>
            <Plus />
            Dodaj nawyk
          </button>
        </div>

        <HabitList onEdit={handleEditHabit} />
        <HabitCalendar />
        <HabitStats />
      </section>

      <Modal isOpen={openModal} keepMounted onClose={handleCloseAttempt}>
        <HabitCreationModal
          isOpen={openModal}
          shouldResetForm={shouldResetForm}
          onClose={handleForceCloseModal}
          onCloseAttempt={handleCloseAttempt}
          onDirtyChange={setIsDirty}
          habit={editingHabit}
        />
      </Modal>

      <Modal isOpen={showConfirm} onClose={handleConfirmStay}>
        <ConfirmLeavingModal
          onCancel={handleConfirmStay}
          onConfirm={handleConfirmLeave}
        />
      </Modal>
    </>
  );
};

export default Habits;
