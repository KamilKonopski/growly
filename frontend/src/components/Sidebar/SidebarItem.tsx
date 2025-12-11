import { NavLink } from "react-router-dom";

import styles from "./SidebarItem.module.css";

interface SidebarItemProps {
  icon: React.ReactNode;
  label: string;
  to?: string;
  href?: string;
}

const SidebarItem = ({ icon, label, to, href }: SidebarItemProps) => {
  const content = (
    <div className={styles.item}>
      <span className={styles.icon}>{icon}</span>
      <span className={styles.tooltip}>{label}</span>
    </div>
  );

  if (to) {
    return (
      <NavLink
        to={to}
        className={({ isActive }) =>
          isActive ? `${styles.link} ${styles.active}` : styles.link
        }
      >
        {content}
      </NavLink>
    );
  }
  if (href) {
    return (
      <a
        className={styles.link}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
      >
        {content}
      </a>
    );
  }
};

export default SidebarItem;
