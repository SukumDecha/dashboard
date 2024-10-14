import {
  Area,
  AreaChart,
  Legend,
  ResponsiveContainer,
  Symbols,
  Tooltip,
} from "recharts";
import { useFilter } from "../../hooks/useFilter";
import { useCustomerSatisfaction } from "../../hooks/useCustomerSatisfaction";

const RenderCustomLegend = (props) => {
  const { data } = props;

  const totalThisMonth = data.reduce(
    (acc, curr) => acc + (curr.thisMonth || 0),
    0
  );
  const totalLastMonth = data.reduce(
    (acc, curr) => acc + (curr.lastMonth || 0),
    0
  );

  return (
    <>
      <hr className="my-4" />
      <ul className="flex justify-center gap-4">
        <li className="flex">
          <svg width={20} height={20} style={{ marginRight: 8 }}>
            <Symbols
              fill="#0095FF"
              cx={10}
              cy={10}
              size={200}
              type="circle"
              style={{ marginRight: 8 }}
            />
          </svg>
          <div className="flex flex-col">
            <span className="text-base text-slate-500">Last Month</span>
            <div className="font-medium">${totalLastMonth.toFixed(2)}</div>
          </div>
        </li>

        <li className="flex">
          <svg width={20} height={20} style={{ marginRight: 8 }}>
            <Symbols
              fill="#07E098"
              cx={10}
              cy={10}
              size={200}
              type="circle"
              style={{ marginRight: 8 }}
            />
          </svg>
          <div className="flex flex-col">
            <span className="text-base text-slate-500">This Month</span>
            <div className="font-medium">${totalThisMonth.toFixed(2)}</div>
          </div>
        </li>
      </ul>
    </>
  );
};

export default function CustomerStatisfactionChart() {
  const { selectedDate } = useFilter();

  const data = useCustomerSatisfaction(selectedDate);

  return (
    <div className="p-4">
      <div className="mb-2 text-2xl font-bold">Customer Satisfaction</div>
      <ResponsiveContainer width="100%" height={500}>
        <AreaChart data={data.customerSatisfactionData || []}>
          <defs>
            <linearGradient id="lastMonth" x1="0" y1="0" x2="0" y2="1">
              <stop offset="10%" stopColor="#0095FF" stopOpacity={0.3} />
              <stop offset="50%" stopColor="#0095FF" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="thisMonth" x1="0" y1="0" x2="0" y2="1">
              <stop offset="10%" stopColor="#07E098" stopOpacity={0.3} />
              <stop offset="50%" stopColor="#07E098" stopOpacity={0} />
            </linearGradient>
          </defs>

          <Legend
            content={
              <RenderCustomLegend data={data.customerSatisfactionData || []} />
            }
          />

          <Tooltip />

          <Area
            type="monotone"
            dataKey="lastMonth"
            stroke="#0095FF"
            strokeWidth={3}
            fillOpacity={1}
            fill="url(#lastMonth)"
          />
          <Area
            type="monotone"
            dataKey="thisMonth"
            stroke="#82ca9d"
            strokeWidth={3}
            fillOpacity={1}
            fill="url(#thisMonth)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
