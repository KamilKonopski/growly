import styles from "./CustomTooltip.module.css";

type CustomTooltipProps = {
  active?: boolean;
  label?: string;
  payload?: { value?: number }[];
};

const CustomTooltip = ({ active, payload, label }: CustomTooltipProps) => {
  if (!active || !payload || payload.length === 0) return null;

  return (
    <div className={styles.tooltip}>
      <strong>{label}</strong>
      <div>{payload[0].value} wykonań</div>
    </div>
  );
};

export default CustomTooltip;
