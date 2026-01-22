import { useEffect, useState } from "react";
import { Plus } from "lucide-react";

import ConfirmLeavingModal from "../HabitCreation/ConfirmLeavingModal/ConfirmLeavingModal";
import Modal from "../../common/components/Modal/Modal";
import PathList from "./PathList/PathList";
import PathCreationModal from "./PathCreation/PathCreationModal";

import type { LearningPath } from "../../common/types/learning";

import styles from "./Learning.module.css";

const Learning = () => {
  const [openModal, setOpenModal] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [shouldReopen, setShouldReopen] = useState(false);
  const [isDirty, setIsDirty] = useState(false);
  const [editingPath, setEditingPath] = useState<LearningPath | null>(null);
  const [shouldResetForm, setShouldResetForm] = useState(false);

  const handleOpenModal = () => {
    setEditingPath(null);
    setShouldResetForm(true);
    setOpenModal(true);
  };

  // const handleEditPath = (path: LearningPath) => {
  //   setEditingPath(path);
  //   setShouldResetForm(true);
  //   setOpenModal(true);
  // };

  const handleForceCloseModal = () => {
    setIsDirty(false);
    setEditingPath(null);
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
    setEditingPath(null);
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
        <div className={styles["button_container"]}>
          <button className={styles.button} onClick={handleOpenModal}>
            <Plus />
            Dodaj ścieżkę
          </button>
        </div>
        <PathList />
      </section>
      <Modal isOpen={openModal} keepMounted onClose={handleCloseAttempt}>
        <PathCreationModal
          isOpen={openModal}
          shouldResetForm={shouldResetForm}
          onClose={handleForceCloseModal}
          onCloseAttempt={handleCloseAttempt}
          onDirtyChange={setIsDirty}
          path={editingPath}
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

export default Learning;
