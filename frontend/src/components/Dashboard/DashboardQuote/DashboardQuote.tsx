import { useDashboard } from "../../../store/hooks/useDashboard";

import styles from "./DashboardQuote.module.css";

const DashboardQuote = () => {
  const { quote } = useDashboard();

  return (
    <div className={styles.container}>
      <p className={styles.text}>{quote?.text}</p>
      <p className={styles.author}>- {quote?.author}</p>
    </div>
  );
};

export default DashboardQuote;
