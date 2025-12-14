import styles from "./RangeSwitch.module.css";

interface RangeSwitchProps {
  ranges: number[];
  selected: number;
  onChange: (value: number) => void;
}

const RangeSwitch = ({ ranges, selected, onChange }: RangeSwitchProps) => {
  return (
    <div className={styles["range-switch"]}>
      {ranges.map((r) => (
        <button
          key={r}
          onClick={() => onChange(r)}
          className={r === selected ? styles.active : ""}
        >
          {r} dni
        </button>
      ))}
    </div>
  );
};

export default RangeSwitch;
