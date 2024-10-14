export const formatNumber = (num) => {
  if (num === null || num === undefined) return "N/A";

  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + "m";
  } else if (num >= 1000) {
    return (num / 1000).toFixed(1) + "K";
  } else {
    return num.toString();
  }
};
export const findPercentage = (value, total) => {
  return ((value / total) * 100).toFixed(1);
};
export const calculateGrowthRate = (previous, current, groupBy) => {
  if (previous === 0 || current === 0) return "N/A";

  const diff = current - previous;
  const percentDiff = (diff / previous) * 100;

  const prefix = percentDiff >= 0 ? "+" : "";

  const suffix =
    groupBy === "day"
      ? "yesterday."
      : groupBy === "month"
      ? "last month."
      : "last year.";

  return `${prefix}${percentDiff.toFixed(2)}% from ${suffix}`;
};
