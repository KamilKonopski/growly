import { useState } from "react";
import { Plus } from "lucide-react";

import HabitList from "./HabitList/HabitList";
import HabitCreationModal from "../HabitCreation/HabitCreationModal/HabitCreationModal";
import ConfirmLeavingModal from "../HabitCreation/ConfirmLeavingModal/ConfirmLeavingModal";
import Modal from "../../common/components/Modal/Modal";

import styles from "./Habits.module.css";

const Habits = () => {
  const [openModal, setOpenModal] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [shouldReopen, setShouldReopen] = useState(false);
  const [isDirty, setIsDirty] = useState(false);

  const handleOpenModal = () => setOpenModal(true);
  const handleForceCloseModal = () => setOpenModal(false);

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
    setShowConfirm(false);
    setShouldReopen(false);
  };

  return (
    <>
      <section className={styles.container}>
        <div className={styles["button_container"]}>
          <button className={styles.button} onClick={handleOpenModal}>
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
      <Modal isOpen={openModal} keepMounted onClose={handleCloseAttempt}>
        <HabitCreationModal
          onClose={handleForceCloseModal}
          onCloseAttempt={handleCloseAttempt}
          onDirtyChange={setIsDirty}
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
