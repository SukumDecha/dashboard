import { DataGrid } from "@mui/x-data-grid";
import useSale from "../hooks/useSale";

const columns = [
  {
    field: "id",
    headerName: "Product ID",
    width: 90,
  },
  {
    field: "totalSales",
    headerName: "Total Sales",
    width: 110,
    type: "number",
    valueGetter: (value) => `$${value}`,
  },
  {
    field: "totalOrders",
    headerName: "Total Orders",
    width: 110,
    type: "number",
  },
  {
    field: "productsSold",
    headerName: "Products Sold",
    width: 110,
    type: "number",
  },
  {
    field: "newCustomers",
    headerName: "New Customers",
    width: 150,
    type: "number",
  },
];

const SaleDashboard = () => {
  const { currentData } = useSale("2021-09-01", undefined, true);

  if (!currentData) {
    return (
      <div className="py-4 text-center text-red-500">
        Error fetching sales data
      </div>
    );
  }

  return (
    <div className="flex flex-col p-8">
      <h2 className="mb-2 text-2xl font-bold">Sale Dashboard</h2>
      <DataGrid
        rows={currentData}
        columns={columns}
        getRowId={(row) => row.id}
        checkboxSelection
        className="mt-5 text-gray-700 bg-white border border-gray-200 rounded-lg shadow"
      />
    </div>
  );
};

export default SaleDashboard;
