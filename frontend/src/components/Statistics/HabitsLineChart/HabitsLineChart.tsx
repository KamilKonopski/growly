import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import BaseCard from "../../../common/components/BaseCard/BaseCard";
import CustomTooltip from "../../../common/components/CustomTooltip/CustomTooltip";
import EmptyState from "../../../common/components/EmptyState/EmptyState";

import { useStats } from "../../../store/hooks/useStats";

const HabitsLineChart = () => {
  const { habitStats } = useStats();

  if (!habitStats) return null;

  const hasData = habitStats.dailyCompletions.some((d) => d.count > 0);

  return (
    <BaseCard>
      <p>Nawyki - ostatnie 7 dni</p>
      {!hasData ? (
        <EmptyState>
          <p>Brak danych</p>
        </EmptyState>
      ) : (
        <ResponsiveContainer width="100%" height={240}>
          <LineChart data={habitStats.dailyCompletions}>
            <XAxis dataKey="date" />
            <YAxis allowDecimals={false} />
            <Tooltip content={<CustomTooltip />} />
            <Line
              type="monotone"
              dataKey="count"
              stroke="var(--color-primary)"
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      )}
    </BaseCard>
  );
};

export default HabitsLineChart;
