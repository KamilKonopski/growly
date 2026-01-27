import { useState, useRef, useEffect } from "react";
import { useLocation } from "react-router-dom";

import UserMenu from "./UserMenu/UserMenu";

import { getSectionName } from "../../common/utils/getSectionName";

import styles from "./Header.module.css";

interface HeaderProps {
  userName: string | undefined;
}

const Header = ({ userName }: HeaderProps) => {
  const location = useLocation();
  const sectionName = getSectionName(location.pathname);

  const [menuOpen, setMenuOpen] = useState(false);
  const userRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (userRef.current && !userRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className={styles.header}>
      <p className={styles.logo}>Growly</p>
      <p className={styles.section}>{sectionName}</p>

      <div className={styles.user} ref={userRef}>
        <p>Witaj {userName ?? "Gościu"}!</p>
        <img
          src="/avatar.png"
          alt="avatar"
          className={styles.avatar}
          onClick={() => setMenuOpen((prev) => !prev)}
        />

        <UserMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
      </div>
    </header>
  );
};

export default Header;
