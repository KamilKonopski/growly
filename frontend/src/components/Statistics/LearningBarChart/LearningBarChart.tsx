import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import BaseCard from "../../../common/components/BaseCard/BaseCard";
import CustomTooltip from "../../../common/components/CustomTooltip/CustomTooltip";
import EmptyState from "../../../common/components/EmptyState/EmptyState";

import { useStats } from "../../../store/hooks/useStats";

const LearningBarChart = () => {
  const { learningStats } = useStats();

  if (!learningStats) return null;

  const data = learningStats.progressPerPath.slice(0, 5);

  return (
    <BaseCard>
      <p>Progres nauki</p>
      {!data.length ? (
        <EmptyState>
          <p>Brak danych</p>
        </EmptyState>
      ) : (
        <ResponsiveContainer width="100%" height={260}>
          <BarChart data={data}>
            <XAxis dataKey="name" />
            <YAxis domain={[0, 100]} />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="progress" fill="var(--color-secondary)" />
          </BarChart>
        </ResponsiveContainer>
      )}
    </BaseCard>
  );
};

export default LearningBarChart;
