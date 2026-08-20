import { Router, Request, Response } from "express";
import { pool } from "../db";
import { Customer, Product } from "../types";

const router = Router();

// GET /api/v1/products
router.get("/", async (req: Request, res: Response) => {
  const { category } = req.query;

  try {
    let queryText = 'SELECT * FROM product';
    const queryParams: (string | number)[] = [];

    if (category && typeof category === 'string') {
      queryText += ' WHERE category ILIKE $1';
      queryParams.push(category);
    }

    queryText += ' ORDER BY product_id ASC';

    const result = await pool.query<Product>(queryText, queryParams);
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
});

// GET /api/v1/products/:id
router.get("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const result = await pool.query<Product>(
      "SELECT * FROM product WHERE product_id = $1",
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
});

// POST /api/v1/products
router.post("/", async(req: Request, res: Response) => {
    const { product_id, product_name, category, unit_price }: Product = req.body;
    try {
        const result = await pool.query(
            `INSERT INTO product (product_id, product_name, category, unit_price)
            VALUES ($1, $2, $3, $4)
            RETURNING *`,
            [product_id, product_name, category, unit_price]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
});

// PATCH /api/v1/products/:id/price
router.patch("/:id/price", async (req: Request, res: Response) => {
  const { id } = req.params;
  const { unit_price } = req.body;

  if (unit_price === undefined || typeof unit_price !== "number") {
    return res.status(400).json({ error: "unit_price is required and must be a number" });
  }

  try {
    const result = await pool.query<Product>(
      "UPDATE product SET unit_price = $1 WHERE product_id = $2 RETURNING *",
      [unit_price, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
});

export default router;

