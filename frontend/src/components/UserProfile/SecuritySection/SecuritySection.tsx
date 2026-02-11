import Modal from "../../../common/components/Modal/Modal";
import ChangePasswordModal from "../ChangePasswordModal/ChangePasswordModal";
import ConfirmLeavingModal from "../../HabitCreation/ConfirmLeavingModal/ConfirmLeavingModal";

import { useModalWithDirtyForm } from "../../../common/hooks/useModalWithDirtyForm";

import styles from "./SecuritySection.module.css";

type Props = {
  mode: string | null;
};

const SecuritySection = ({ mode }: Props) => {
  const modal = useModalWithDirtyForm();

  return (
    <>
      <div className={styles["security-container"]}>
        <h2>Bezpieczeństwo konta</h2>
        <div className={styles["password-container"]}>
          <div className={styles.password}>
            <p className={styles["password-text"]}>Hasło</p>
            <p className={styles["password-subtext"]}>
              Zmień swoje hasło by zalogować się do konta
            </p>
          </div>
          <button
            className={styles["change-btn"]}
            onClick={modal.openModal}
            disabled={mode !== "backend"}
          >
            Zmień hasło
          </button>
        </div>
      </div>
      <Modal isOpen={modal.open} keepMounted onClose={modal.attemptClose}>
        <ChangePasswordModal
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

export default SecuritySection;
