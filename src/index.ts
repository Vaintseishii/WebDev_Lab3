import express from 'express';
import pieRoutes from './pieRoutes';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/api/Commerce', pieRoutes);

app.listen(PORT, () => {
  console.log(`Ecommerce & Logistics API server running on http://localhost:${PORT}`);
});