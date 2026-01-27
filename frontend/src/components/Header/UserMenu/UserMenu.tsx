import { Link } from "react-router-dom";

import { useAuth } from "../../../store/hooks/useAuth";

import styles from "./UserMenu.module.css";

interface UserMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const UserMenu = ({ isOpen, onClose }: UserMenuProps) => {
  const { logout } = useAuth();

  return (
    <div className={`${styles.menu} ${isOpen ? styles.open : ""}`}>
      <Link to="/profile" className={styles.link} onClick={onClose}>
        Profil
      </Link>

      <button
        onClick={() => {
          logout();
          onClose();
        }}
        className={styles.logout}
      >
        Wyloguj mnie
      </button>
    </div>
  );
};

export default UserMenu;
