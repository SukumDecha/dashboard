import { VectorMap } from "@react-jvectormap/core";
import { worldMill } from "@react-jvectormap/world";
import { useFilter } from "../../hooks/useFilter";
import { formatNumber } from "../../utils/number.utils";
import useCountrySale from "../../hooks/useCountrySale";

const CountrySaleChart = () => {
  const { selectedDate } = useFilter();
  const { mapSales } = useCountrySale(selectedDate);

  const colorScale = ["#FFA800", "#F64E60", "#00AB9A", "#6993FF", "#8950FC"];

  if (!mapSales) return "Loading...";

  const countries = mapSales.reduce((acc, { country, sales }) => {
    const countryCode = country.substring(0, 2).toUpperCase();
    acc[countryCode] = (acc[countryCode] || 0) + sales;
    return acc;
  }, {});

  return (
    <div className="p-4">
      <h2 className="mb-4 text-lg font-semibold text-gray-800">
        Sales by Country
      </h2>
      <div className="w-full h-[700px]">
        <VectorMap
          map={worldMill}
          containerStyle={{
            width: "700px",
            height: "600px",
          }}
          backgroundColor="#282c34"
          series={{
            regions: [
              {
                scale: colorScale,
                values: countries,
                min: 0,
                max: Math.max(...Object.values(countries)),
              },
            ],
          }}
          onRegionTipShow={(event, label, code) => {
            const countrySales = countries[code] || 0;
            label.html(`
              <div style="background-color: black; border-radius: 6px; min-height: 50px; width: 125px; color: white; padding-left: 10px">
                <p>
                  <b>${label.html()}</b>
                </p>
                <p>Sales: $${formatNumber(countrySales)}</p>
              </div>`);
          }}
        />
      </div>
    </div>
  );
};

export default CountrySaleChart;
