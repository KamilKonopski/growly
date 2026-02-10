import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";
import CustomTooltip from "../../../../common/components/CustomTooltip/CustomTooltip";

import styles from "./HabitLineChart.module.css";

interface HabitLineChartProps {
  data: { date: string; value: number }[];
}

const HabitLineChart = ({ data }: HabitLineChartProps) => {
  return (
    <div className={styles.chartWrapper}>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" hide />
          <YAxis hide />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <Line
            type="monotone"
            dataKey="value"
            name="Wykonania dzienne"
            stroke="var(--color-primary)"
            strokeWidth={2}
            dot={false}
            isAnimationActive
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default HabitLineChart;
