import { Router, Request, Response } from "express";
import { pool } from "../db";
import { Order } from "../types";

const router = Router();

// GET /api/v1/orders
router.get("/", async (req: Request, res: Response) => {
  try {
    const result = await pool.query<Order>(
      "SELECT * FROM orders ORDER BY order_id"
    );
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
});

// GET /api/v1/orders/customer/:customerId
router.get("/customer/:customer_id", async (req: Request, res: Response) => {
  const { customer_id } = req.params;

  try {
    const result = await pool.query<Order>(
      "SELECT * FROM orders WHERE customer_id = $1 ORDER BY order_id ASC",
      [customer_id]
    );
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
});

// POST /api/v1/orders
router.post("/", async (req: Request, res: Response) => {
  const { order_id, customer_id, order_date, shipping_city }: Order = req.body;

  if (!order_id || !customer_id) {
    return res.status(400).json({ error: "order_id and customer_id are required" });
  }

  try {
    const result = await pool.query<Order>(
      `INSERT INTO orders (order_id, customer_id, order_date, shipping_city)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
      [order_id, customer_id, order_date, shipping_city]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    const err = error as { code?: string; message: string };

    if (err.code === "23505") {
      return res.status(400).json({ error: "order_id already exists" });
    }
    if (err.code === "23503") {
      return res.status(400).json({ error: "customer_id does not exist" });
    }

    res.status(500).json({ error: err.message });
  }
});

// DELETE /api/v1/orders/:id
router.delete('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      `DELETE FROM orders
       WHERE order_id = $1
       RETURNING *`,
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Order not found' });
    }
    res.json(result.rows[0]);
  } catch (error) {
    const err = error as { code?: string; message: string };

    if (err.code === '23503') {
      return res.status(400).json({ error: 'Cannot delete order: it still has associated order items' });
    }

    res.status(500).json({ error: err.message });
  }
});

export default router;