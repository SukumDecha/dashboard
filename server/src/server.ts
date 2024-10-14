import express from "express";

import salesRoutes from "./routes/sale.route";
import revenueRoutes from "./routes/revenue.route";
import customerRoutes from "./routes/customer.route";
import productRoutes from "./routes/product.route";
import countrySalesRoutes from "./routes/country-sale.route";
import targetRoutes from "./routes/target-reality.route";
import serviceLevelRoutes from "./routes/service-volume.route";
import cors from "cors";
const app = express();

app.use(express.json());

app.use(cors());

app.use("/api/sales", salesRoutes);
app.use("/api/revenue", revenueRoutes);
app.use("/api/customers", customerRoutes);
app.use("/api/products", productRoutes);
app.use("/api/country-sales", countrySalesRoutes);
app.use("/api/targets", targetRoutes);
app.use("/api/service-levels", serviceLevelRoutes);

const PORT = process.env.PORT || 4001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
