import { Home, ListChecks, BookOpen, BarChart3, Settings } from "lucide-react";

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
      </footer>
    </aside>
  );
};

export default Sidebar;
