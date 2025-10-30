import { pool } from "../../../../../../shared/config/db.js";

export async function read(req, res) {
  const query = `SELECT c.name AS customer, cp.current_balance, cp.status, fp.name AS product, a.account_type, a.account_number FROM accounts a INNER JOIN customer_products cp ON a.customer_product_id = cp.id INNER JOIN customers c ON cp.customer_id = c.id INNER JOIN financial_products fp ON cp.product_id = fp.id`;
  try {
    const { rows } = await pool.query(query);
    res.json(rows);
  } catch (error) {
    res.status(500).json({ msg: "Internal Server Error" });
    console.log(error);
  }
}
