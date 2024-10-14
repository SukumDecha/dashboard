import {
  BarChart3Icon,
  FileTextIcon,
  PackageIcon,
  UsersIcon,
} from "lucide-react";
import useSale from "../../hooks/useSale";
import { useFilter } from "../../hooks/useFilter";
import { calculateGrowthRate, formatNumber } from "../../utils/number.utils";

const cardColors = {
  pink: "bg-pink-100",
  yellow: "bg-yellow-100",
  green: "bg-green-100",
  purple: "bg-purple-100",
};

const iconBgColors = {
  pink: "bg-pink-300",
  yellow: "bg-yellow-300",
  green: "bg-green-300",
  purple: "bg-purple-300",
};

const MetricCard = ({ icon, value, label, change, color }) => (
  <div
    className={`${cardColors[color]} rounded-lg shadow-md overflow-hidden flex`}
  >
    <div className="flex flex-col p-6">
      <div
        className={`w-12 h-12 rounded-full ${iconBgColors[color]} flex items-center justify-center mb-4`}
      >
        {icon}
      </div>
      <h3 className="mb-1 text-2xl font-bold">{value}</h3>
      <p className="mb-2 text-gray-600">{label}</p>
      <p className="mt-auto text-sm text-blue-600">{change}</p>
    </div>
  </div>
);

const Component = () => {
  const { selectedDate } = useFilter();

  let { currentData, previousData } = useSale(selectedDate, "day");

  if (!currentData || !previousData) {
    return <p>Loading...</p>;
  }

  currentData = currentData[0] || {};
  previousData = previousData[0] || {};

  return (
    <div className="w-full h-full p-4 mx-auto ">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-indigo-900">
            Today&apos;s Sales
          </h1>
          <p className="text-gray-600">Sales Summary</p>
        </div>
        <button className="flex items-center px-4 py-2 text-gray-700 transition-colors border border-gray-300 rounded-md hover:bg-gray-50">
          <FileTextIcon className="w-4 h-4 mr-2" />
          Export
        </button>
      </div>
      <div className="grid grid-cols-1 gap-6 mt-auto md:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          icon={<BarChart3Icon className="w-6 h-6 text-pink-500" />}
          value={`$${formatNumber(currentData.totalSales || "N/A")}`}
          label="Total Sales"
          change={
            calculateGrowthRate(
              previousData.totalSales || 0,
              currentData.totalSales || 0,
              "day"
            ) || "N/A"
          }
          color="pink"
        />
        <MetricCard
          icon={<FileTextIcon className="w-6 h-6 text-yellow-500" />}
          value={formatNumber(currentData.totalOrders || "N/A")}
          label="Total Orders"
          change={
            calculateGrowthRate(
              previousData.totalOrders || 0,
              currentData.totalOrders || 0,
              "day"
            ) || "N/A"
          }
          color="yellow"
        />
        <MetricCard
          icon={<PackageIcon className="w-6 h-6 text-green-500" />}
          value={formatNumber(currentData.productsSold || "N/A")}
          label="Products Sold"
          change={
            calculateGrowthRate(
              previousData.productsSold || 0,
              currentData.productsSold || 0,
              "day"
            ) || "N/A"
          }
          color="green"
        />
        <MetricCard
          icon={<UsersIcon className="w-6 h-6 text-purple-500" />}
          value={formatNumber(currentData.newCustomers || "N/A")}
          label="New Customers"
          change={
            calculateGrowthRate(
              previousData.newCustomers || 0,
              currentData.newCustomers || 0,
              "day"
            ) || "N/A"
          }
          color="purple"
        />
      </div>
    </div>
  );
};

export default Component;
