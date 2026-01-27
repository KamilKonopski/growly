import { Link } from "react-router-dom";

import EmptyState from "../../../common/components/EmptyState/EmptyState";

import styles from "./DashboardSection.module.css";

interface DashboardSectionProps {
  title: string;
  isEmpty: boolean;
  emptyText: string;
  actionLabel: string;
  actionTo: string;
  children?: React.ReactNode;
}

const DashboardSection = ({
  title,
  isEmpty,
  emptyText,
  actionLabel,
  actionTo,
  children,
}: DashboardSectionProps) => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h3 className={styles.title}>{title}</h3>
      </div>

      {isEmpty ? (
        <EmptyState>
          <p>{emptyText}</p>
        </EmptyState>
      ) : (
        children
      )}

      <div className={styles.actions}>
        <Link className={styles.button} to={actionTo}>
          {actionLabel}
        </Link>
      </div>
    </div>
  );
};

export default DashboardSection;
