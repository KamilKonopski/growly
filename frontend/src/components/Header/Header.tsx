import { useLocation } from "react-router-dom";

import { getSectionName } from "../../common/utils/getSectionName";

import styles from "./Header.module.css";

interface HeaderProps {
  userName: string | undefined;
}

const Header = ({ userName }: HeaderProps) => {
  const location = useLocation();
  const sectionName = getSectionName(location.pathname);

  return (
    <header className={styles.header}>
      <p className={styles.logo}>Growly</p>
      <p className={styles.section}>{sectionName}</p>
      <div className={styles.user}>
        <p>Witaj {userName ?? "Gościu"}!</p>
        <img src="/avatar.png" alt="avatar" className={styles.avatar} />
      </div>
    </header>
  );
};

export default Header;
