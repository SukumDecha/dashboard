import TotalSaleChart from "../Chart/TotalSaleChart";
import TotalRevenueChart from "../Chart/TotalRevenueChart";
import TargetChart from "../Chart/TargetChart";
import TopProductsChart from "../Chart/TopProductChart";
import VolumeServiceChart from "../Chart/VolumeServiceChart";
import CustomerStatisfactionChart from "../Chart/CustomerSatisfyChart";
import VisitorInsightsChart from "../Chart/VisitorInsightChart";
import CountrySaleChart from "../chart/CountrySaleChart";

const GridLayout = () => {
  return (
    <div className="grid w-full grid-cols-1 gap-4 p-4 md:grid-cols-2 xl:grid-cols-7 bg-primary-300">
      {/* Sales and Customer Insight */}
      <div className="row-span-4 bg-white shadow-md xl:col-span-4 xl:row-span-12 rounded-xl">
        <TotalSaleChart />
      </div>
      <div className="row-span-4 bg-white shadow-md xl:row-span-12 xl:col-span-3 rounded-xl">
        <VisitorInsightsChart />
      </div>

      {/* Totals Revenue, Customer Satisfaction, Target vs Reality */}
      <div className="row-span-4 bg-white shadow-md xl:row-span-12 xl:col-span-3 rounded-xl">
        <TotalRevenueChart />
      </div>
      <div className="row-span-4 bg-white shadow-md xl:row-span-12 xl:col-span-2 rounded-2xl">
        <CustomerStatisfactionChart />
      </div>
      <div className="row-span-4 bg-white shadow-md xl:row-span-12 xl:col-span-2 rounded-2xl">
        <TargetChart />
      </div>

      {/* Top Products, Sales Mapping by Country, Volume vs Service Level */}
      <div className="row-span-4 bg-white shadow-md xl:row-span-12 xl:col-span-3 rounded-2xl">
        <TopProductsChart />
      </div>
      <div className="row-span-4 bg-white shadow-md xl:row-span-12 xl:col-span-2 rounded-2xl">
        <CountrySaleChart />
      </div>
      <div className="row-span-4 bg-white shadow-md xl:row-span-12 xl:col-span-2 rounded-2xl">
        <VolumeServiceChart />
      </div>
    </div>
  );
};

export default GridLayout;
