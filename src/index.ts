import express from "express";
import dotenv from "dotenv";

import customerRoutes from "./routes/customer";
/*
import orderRoutes from "./routes/orders";
import productRoutes from "./routes/product";
import orderItemRoutes from "./routes/order_item";
import vendorRoutes from "./routes/vendor";
import suppliesRoutes from "./routes/supplies";
*/
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use("/api/v1/customers", customerRoutes);
/*
app.use("/api/v1/orders", orderRoutes);
app.use("/api/v1/products", productRoutes);
app.use("/api/v1/order-items", orderItemRoutes);
app.use("/api/v1/vendors", vendorRoutes);
app.use("/api/v1/supplies", suppliesRoutes);
*/

app.listen(PORT, () => {
  console.log(`Ecommerce & Logistics API server running on http://localhost:${PORT}`);
});