import { BarChart, Bar, ResponsiveContainer, Tooltip } from "recharts";
import { useFilter } from "../../hooks/useFilter";
import useServiceVolume from "../../hooks/useServiceVolume";

export default function VolumeServiceChart() {
  const { selectedDate } = useFilter();
  const { data } = useServiceVolume(selectedDate);

  if (!data || data.length === 0) return <p>No Service and Volumes found.</p>;

  const services = data
    .reduce((acc, entry) => acc + (parseFloat(entry.services) || 0), 0)
    .toFixed(2);
  const volumes = data
    .reduce((acc, entry) => acc + (parseFloat(entry.volume) || 0), 0)
    .toFixed(2);
    
  return (
    <div className="h-full max-w-full p-4 mx-auto">
      <h2 className="mb-4 text-2xl font-bold text-white">
        Volume vs Service Level
      </h2>
      <div className="p-4">
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={data}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <Tooltip cursor={{ fill: "transparent" }} />
            <Bar dataKey="services" stackId="a" fill="#4ADE80" barSize={20} />
            <Bar dataKey="volume" stackId="a" fill="#60A5FA" barSize={20} />
          </BarChart>
        </ResponsiveContainer>
        <div className="mt-2">
          {/* Header */}
          <div className="flex items-center justify-center">
            <div className="relative flex flex-col justify-center">
              <div className="flex items-center pr-4 border-r-2 border-gray-300">
                <div className="w-4 h-4 mr-2 bg-blue-400 rounded-full"></div>
                <p className="text-base text-slate-300">Volumes</p>
              </div>
              <div className="inset-0 ml-6 text-sm font-bold text-black">
                {volumes}
              </div>
            </div>

            <div className="relative flex flex-col justify-center pl-4">
              <div className="flex items-center">
                <div className="w-4 h-4 mr-2 bg-green-400 rounded-full"></div>
                <p className="text-base text-slate-300">Services</p>
              </div>
              <div className="inset-0 ml-6 text-sm font-bold text-black">
                {services}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
