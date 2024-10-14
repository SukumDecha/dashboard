import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useFilter } from "../../hooks/useFilter";
import useRevenue from "../../hooks/useRevenue";
import { days } from "../../utils/date.utils";
import { formatNumber } from "../../utils/number.utils";

const prepareChartData = (chartData, days) => {
  return days.map((day) => {
    const revenue = chartData.find((data) => data.day === day);
    return revenue || { day, onlineSales: 0, offlineSales: 0 };
  });
};

const TotalRevenueChart = ({ currentData }) => {
  const chartData = Object.values(currentData);

  const newAggregatedData = prepareChartData(chartData, days);

  return (
    <ResponsiveContainer width="100%" height={500}>
      <BarChart
        data={newAggregatedData}
        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="5 0" />
        <XAxis dataKey="day" />
        <YAxis
          tickFormatter={(value) => `${formatNumber(value)}`}
          domain={[0, "dataMax + 5"]}
        />
        <Tooltip
          cursor={{ fill: "transparent" }}
          formatter={(value, label) => [`${formatNumber(value)}`, label]}
          labelFormatter={(label) => `Day: ${label}`}
        />
        <Legend />
        <Bar
          dataKey="onlineSales"
          fill="#60A5FA"
          name="Online Sales"
          barSize={20}
        />
        <Bar
          dataKey="offlineSales"
          fill="#4ADE80"
          name="Offline Sales"
          barSize={20}
        />
      </BarChart>
    </ResponsiveContainer>
  );
};

// Main component to render the chart with fetched data
const Component = () => {
  const { selectedDate } = useFilter();
  const { currentData } = useRevenue(selectedDate);

  if (!Array.isArray(currentData) || currentData.length === 0) {
    return <p>No data available</p>;
  }

  return (
    <div className="h-full p-4 mx-auto">
      <h2 className="mb-2 text-2xl font-bold">Total Revenues</h2>
      <TotalRevenueChart currentData={currentData} />
    </div>
  );
};

export default Component;
