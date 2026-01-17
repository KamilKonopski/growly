import { useState } from "react";
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

  const handleOpenModal = () => {
    setEditingPath(null);
    setOpenModal(true);
  };

  // const handleEditPath = (path: LearningPath) => {
  //   setEditingPath(path);
  //   setOpenModal(true);
  // };

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
            Dodaj ścieżkę
          </button>
        </div>
        <PathList />
      </section>
      <Modal isOpen={openModal} keepMounted onClose={handleCloseAttempt}>
        <PathCreationModal
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
