import { Router, Request, Response } from "express";
import { pool } from "../db";
import { Order_item } from "../types";

const router = Router();

// GET /api/v1/order-items/:orderId
router.get("/:orderId", async (req: Request, res: Response) => {
  const { orderId } = req.params;

  try {
    const result = await pool.query<Order_item>(
      "SELECT * FROM order_item WHERE order_id = $1 ORDER BY product_id ASC",
      [orderId]
    );
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
});

// POST /api/v1/order-items
router.post("/", async (req: Request, res: Response) => {
  const { order_id, product_id, quantity, discount }: Order_item = req.body;
  try {
    const result = await pool.query<Order_item>(
      `INSERT INTO order_item (order_id, product_id, quantity, discount)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
      [order_id, product_id, quantity, discount]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    const err = error as { code?: string; message: string };

    if (err.code === "23505") {
      return res.status(400).json({ error: "This order_id/product_id combination already exists" });
    }
    if (err.code === "23503") {
      return res.status(400).json({ error: "order_id or product_id does not exist" });
    }

    res.status(500).json({ error: err.message });
  }
});

export default router;