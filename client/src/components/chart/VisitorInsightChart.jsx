import {
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useFilter } from "../../hooks/useFilter";
import useVisitorInsight from "../../hooks/useVisitorInsight";
import { mapDataByMonth } from "../../utils/object.utils";
import { formatNumber } from "../../utils/number.utils";
import { months } from "../../utils/date.utils";

export default function VisitorInsightsChart() {
  const { selectedDate } = useFilter();
  const { visitors } = useVisitorInsight(selectedDate);

  if (!visitors) return <p>No visitor insight</p>;

  const aggregatedData = mapDataByMonth(visitors);

  const newAggregatedData = months.map((month) => {
    const visitor = aggregatedData.find((d) => d.month === month);
    if (visitor) return visitor;
    return { month, Loyal: 0, New: 0, Unique: 0 };
  });

  return (
    <div className="p-4">
      <div className="mb-2 text-xl font-semibold">Visitor Insights</div>
      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={newAggregatedData}>
          <XAxis dataKey="month" />
          <YAxis
            tickFormatter={(tick) => {
              return formatNumber(tick);
            }}
          />

          <Tooltip
            formatter={(value) => new Intl.NumberFormat("en").format(value)}
          />
          <Legend
            payload={[
              {
                value: "Loyal Customer",
                type: "square",
                id: "Loyal",
                color: "#A700FF",
              },
              {
                value: "New Customer",
                type: "square",
                id: "New",
                color: "#EF4444",
              },
              {
                value: "Unique Customer",
                type: "square",
                id: "Unique",
                color: "#3CD856",
              },
            ]}
          />

          {/* Loyal Customer */}
          <Line
            type="monotone"
            dataKey="Loyal"
            stroke="#A700FF"
            strokeWidth={4}
          />
          {/* New Customer */}
          <Line
            type="monotone"
            dataKey="New"
            stroke="#EF4444"
            strokeWidth={4}
          />
          {/* Unique Customer */}
          <Line
            type="monotone"
            dataKey="Unique"
            stroke="#3CD856"
            strokeWidth={4}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
