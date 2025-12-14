import {
  ResponsiveContainer,
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";
import CustomTooltip from "../CustomTooltip/CustomTooltip";
import styles from "./HabitBarChart.module.css";

interface HabitBarChartProps {
  data: { name: string; value: number }[];
}

const HabitBarChart = ({ data }: HabitBarChartProps) => {
  return (
    <div className={styles.chartWrapper}>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} maxBarSize={50}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" hide />
          <YAxis hide />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <Bar
            dataKey="value"
            name="Liczba wykonań"
            fill="var(--color-secondary)"
            radius={[6, 6, 0, 0]}
            isAnimationActive
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default HabitBarChart;
