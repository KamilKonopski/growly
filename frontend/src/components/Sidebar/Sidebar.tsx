import {
  Home,
  ListChecks,
  BookOpen,
  BarChart3,
  Settings,
  SquarePlus,
} from "lucide-react";

import SidebarItem from "./SidebarItem";

import styles from "./Sidebar.module.css";

const Sidebar = () => {
  return (
    <aside className={styles.sidebar}>
      <div className={styles["nav_items"]}>
        <SidebarItem icon={<Home />} label="Dashboard" to="/dashboard" />
        <SidebarItem icon={<ListChecks />} label="Nawyki" to="/habits" />
        <SidebarItem icon={<BookOpen />} label="Nauka" to="/learning" />
        <SidebarItem icon={<BarChart3 />} label="Statystyki" to="/stats" />
      </div>
      <footer className={styles.footer}>
        <SidebarItem icon={<Settings />} label="Ustawienia" to="/settings" />
        <SidebarItem
          icon={<SquarePlus size={26} />}
          label="Mój Github"
          href="https://github.com/kamilkonopski"
        />
        <span className={styles.version}>v0.1.0</span>
      </footer>
    </aside>
  );
};

export default Sidebar;
