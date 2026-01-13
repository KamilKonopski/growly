export const today = () => new Date().toISOString().slice(0, 10);

export const diffInDays = (from: string, to: string): number => {
  return (
    Math.floor(new Date(to).getTime() - new Date(from).getTime()) /
    (1000 * 60 * 60 * 24)
  );
};

export const getStartOfWeek = (dateStr: string): string => {
  const date = new Date(dateStr);
  const day = date.getDay(); // 0 = sunday
  const diff = (day === 0 ? -6 : 1) - day;
  date.setDate(date.getDate() + diff);

  return date.toISOString().slice(0, 10);
};
