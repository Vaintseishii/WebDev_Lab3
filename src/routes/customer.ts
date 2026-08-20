import { Router, Request, Response } from "express";
import { pool } from "../db";
import { Customer } from "../types";

const router = Router();

// GET /api/v1/customers
router.get("/", async (req: Request, res: Response) => {
  try {
    const result = await pool.query<Customer>(
      "SELECT * FROM customer ORDER BY customer_id"
    );
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
});

// GET /api/v1/customers/:id




export default router;