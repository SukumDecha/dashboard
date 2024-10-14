import { ShoppingBagIcon, TicketIcon } from "lucide-react";
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
import useTargetVolume from "../../hooks/useTargetVolume";
import { formatNumber } from "../../utils/number.utils";
import { months } from "../../utils/date.utils";

const colorVariants = {
  green: "text-green-200",
  yellow: "text-yellow-200",
};

const bgVariants = {
  green: "bg-green-100",
  yellow: "bg-yellow-100",
};

const Chart = ({ data }) => (
  <div className="w-full">
    <ResponsiveContainer width="100%" height={300}>
      <BarChart
        data={data}
        margin={{
          top: 0,
          right: 0,
          left: 5,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis
          tickFormatter={(tick) => {
            return formatNumber(tick);
          }}
        />

        <Tooltip
          cursor={{ fill: "transparent" }}
          formatter={(value) => new Intl.NumberFormat("en").format(value)}
        />

        <Legend
          payload={[
            {
              value: "Reality Sales",
              type: "square",
              id: "realitySales",
              color: "#4ade80",
            },
            {
              value: "Target Sales",
              type: "square",
              id: "targetSales",
              color: "#fbbf24",
            },
          ]}
        />
        <Bar dataKey="realitySales" fill="#4ade80" radius={[10, 10, 0, 0]} />
        <Bar dataKey="targetSales" fill="#fbbf24" radius={[10, 10, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  </div>
);

const Badge = ({ title, description, value, Icon, color }) => (
  <div className="flex items-center justify-between p-4 bg-white rounded-md shadow">
    {/* Left */}
    <div className="flex items-center space-x-4">
      {/* Icon */}
      <div
        className={`${colorVariants[color]} w-12 h-12 flex items-center justify-center`}
      >
        <Icon className="w-8 h-8" />
      </div>

      {/* Titles */}
      <div className="flex flex-col">
        <h2 className="text-lg font-bold">{title}</h2>
        <p className="text-gray-500">{description}</p>
      </div>
    </div>

    {/* Right */}
    <div
      className={`${bgVariants[color]} px-4 py-2 rounded-lg text-lg font-bold`}
    >
      {value}
    </div>
  </div>
);

const Component = () => {
  const { selectedDate } = useFilter();
  const { targets } = useTargetVolume(selectedDate);

  if (!targets) return <p>No Target And Volume Found.</p>;

  const data = targets.map((target) => ({
    ...target,
    month: new Date(target.date).toLocaleString("default", {
      month: "short",
    }),
  }));

  const newData = months.map((month) => {
    const target = data.find((d) => d.month === month);
    if (target) return target;
    return { month, targetSales: 0, realitySales: 0 };
  });

  const totalTarget = newData
    .reduce((acc, curr) => acc + curr.targetSales, 0)
    .toFixed(2);
  const totalVolume = newData
    .reduce((acc, curr) => acc + curr.realitySales, 0)
    .toFixed(2);

  return (
    <div className="w-full h-full p-6 mx-auto">
      <h2 className="mb-4 text-2xl font-bold">Target vs Reality</h2>

      {/* Chart component */}
      <Chart data={newData} />

      {/* Badge list */}
      <div className="flex flex-col gap-4 mt-6">
        <Badge
          title="Reality Sales"
          description="Global"
          value={formatNumber(totalTarget) || "N/A"}
          color="green"
          Icon={ShoppingBagIcon}
        />
        <Badge
          title="Target Sales"
          description="Commercial"
          value={formatNumber(totalVolume) || "N/A"}
          color="yellow"
          Icon={TicketIcon}
        />
      </div>
    </div>
  );
};

export default Component;
