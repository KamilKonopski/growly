import { useState } from "react";
import { Plus } from "lucide-react";

import ConfirmLeavingModal from "../HabitCreation/ConfirmLeavingModal/ConfirmLeavingModal";
import Modal from "../../common/components/Modal/Modal";
import PathList from "./PathList/PathList";
import PathCreationModal from "./PathCreation/PathCreationModal";

import { useModalWithDirtyForm } from "../../common/hooks/useModalWithDirtyForm";

import type { LearningPath } from "../../common/types/learning";

import styles from "./Learning.module.css";

const Learning = () => {
  const modal = useModalWithDirtyForm();
  const [editingPath, setEditingPath] = useState<LearningPath | null>(null);

  const openAdd = () => {
    setEditingPath(null);
    modal.openModal();
  };

  return (
    <>
      <section className={styles.container}>
        <div className={styles["button_container"]}>
          <button className={styles.button} onClick={openAdd}>
            <Plus /> Dodaj ścieżkę
          </button>
        </div>
        <PathList />
      </section>
      <Modal isOpen={modal.open} keepMounted onClose={modal.attemptClose}>
        <PathCreationModal
          path={editingPath}
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

export default Learning;
