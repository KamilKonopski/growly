import Modal from "../../../common/components/Modal/Modal";
import EditProfileModal from "../EditProfileModal/EditProfileModal";
import ConfirmLeavingModal from "../../HabitCreation/ConfirmLeavingModal/ConfirmLeavingModal";

import { useModalWithDirtyForm } from "../../../common/hooks/useModalWithDirtyForm";

import type { User } from "../../../store/auth/authApi.types";

import styles from "./ProfileInfoSection.module.css";

type ProfileInfoSectionProps = {
  user: User | null | undefined;
  mode: string | null;
};

const ProfileInfoSection = ({ user, mode }: ProfileInfoSectionProps) => {
  const modal = useModalWithDirtyForm();

  return (
    <>
      <div className={styles.avatar}>
        <img src="/placeholder.png" alt="avatar placeholder" />
      </div>

      <div className={styles["info-text"]}>
        <p>Twoje imię: {user?.name}</p>
        <p>Twój email: {user?.email}</p>
        <p>
          Członek od:{" "}
          {new Date(user?.createdAt ?? Date.now()).toLocaleDateString("pl-PL")}
        </p>

        <button
          className={styles["edit-btn"]}
          onClick={modal.openModal}
          disabled={mode !== "backend"}
        >
          Edytuj profil
        </button>
      </div>

      <Modal isOpen={modal.open} keepMounted onClose={modal.attemptClose}>
        <EditProfileModal
          name={user?.name}
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

export default ProfileInfoSection;
