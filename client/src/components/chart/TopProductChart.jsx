import { useFilter } from "../../hooks/useFilter";
import useTopProducts from "../../hooks/useTopProduct";
import { findPercentage } from "../../utils/number.utils";

const colorVariants = [
  "bg-[#3b82f6]",
  "bg-[#10b981]",
  "bg-[#8b5cf6]",
  "bg-[#f97316]",
];

const CustomBar = ({ popularity, color }) => {
  return (
    <div className="w-full h-1 transition-all duration-300 bg-gray-100 rounded-3xl">
      <div
        className={`${color} h-1 rounded-3xl`}
        style={{ width: `${popularity}%` }}
      ></div>
    </div>
  );
};

export default function TopProductsTable() {
  const { selectedDate } = useFilter();
  const { topProducts } = useTopProducts(selectedDate);

  if (!topProducts || topProducts.length === 0) {
    return <p>No Top products found!</p>;
  }

  const totalAmount = topProducts.reduce(
    (total, product) => total + product.sales,
    0
  );

  return (
    <div className="h-full max-w-full p-4 mx-auto">
      <h2 className="mb-4 text-2xl font-bold text-black">Top Products</h2>
      <div className="bg-white rounded-lg">
        <table className="w-full">
          <thead>
            <tr className="text-left border-b border-gray-200">
              <th className="px-6 py-3 text-xs font-medium tracking-wider text-gray-500 uppercase">
                #
              </th>
              <th className="px-6 py-3 text-xs font-medium tracking-wider text-gray-500 uppercase">
                Name
              </th>
              <th className="px-6 py-3 text-xs font-medium tracking-wider text-gray-500 uppercase">
                Popularity
              </th>
              <th className="px-6 py-3 text-xs font-medium tracking-wider text-gray-500 uppercase">
                Sales
              </th>
            </tr>
          </thead>
          <tbody>
            {topProducts.map((product, index) => {
              const popularity = ((product.sales / totalAmount) * 100).toFixed(
                1
              );
              return (
                <tr
                  key={product.id}
                  className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
                >
                  <td className="px-6 py-4 text-sm font-medium text-gray-900 whitespace-nowrap">
                    {index + 1}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                    {product.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <CustomBar
                      popularity={popularity}
                      color={colorVariants[index % colorVariants.length]}
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className="inline-flex px-2 py-1 text-xs font-semibold leading-5 rounded-full"
                      style={{
                        backgroundColor: `${
                          colorVariants[index % colorVariants.length]
                        }20`,
                        color: product.color,
                      }}
                    >
                      {findPercentage(product.sales, totalAmount)}%
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
