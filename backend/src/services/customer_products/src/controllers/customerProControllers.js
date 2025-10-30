import { pool } from "../../../../../../shared/config/db.js";

export async function read(req, res) {
  const { id } = req.params;
  const query = `SELECT 
    c.id AS customer_id,
    c.name AS customer,
    fp.name AS product,
    fp.product_type,
    fp.interest_rate,
    cp.current_balance,
    cp.profitability,
    cp.details,
    fp.details AS product_details,
    cp.acquisition_date,
    cp.status
    FROM customer_products cp
    INNER JOIN customers c ON cp.customer_id = c.id
    INNER JOIN financial_products fp ON cp.product_id = fp.id
    WHERE c.id = '${id}'`;

  try {
    const { rows } = await pool.query(query);
    if (rows.length === 0)
      return res.status(404).json({
        error: "No customer products found for the given customer ID",
      });
    res.json(rows);
  } catch (error) {
    console.error("Error executing query", error);
    res.status(500).json({ error: "Internal server error" });
  }
}
