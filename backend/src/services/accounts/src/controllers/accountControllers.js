import { pool } from "../../../../../../shared/config/db.js";

export async function read(req, res) {
  const query = `SELECT 
  a.id,
  c.name AS customer, 
  cp.current_balance, 
  cp.status, 
  fp.name AS product, 
  a.account_type, 
  a.account_number 
  FROM accounts a 
  INNER JOIN customer_products cp ON a.customer_product_id = cp.id 
  INNER JOIN customers c ON cp.customer_id = c.id 
  INNER JOIN financial_products fp ON cp.product_id = fp.id`;
  try {
    const { rows } = await pool.query(query);
    res.status(200).json(rows);
  } catch (error) {
    res.status(500).json({ msg: "Internal Server Error" });
    console.log(error);
  }
}

// TODO: ver las transacciones de una cuenta
export async function getAccountTransactions(req, res) {
  const { id } = req.params;
  const query = `SELECT 
    t.transaction_type,
    t.amount, 
    t.description,
    (SELECT account_number FROM accounts WHERE id = (t.details->>'destination_account_id')::uuid) AS destination_account_number,
    t.created_at AS date 
    FROM transactions t WHERE t.account_id = '${id}'`;
  try {
    const { rows } = await pool.query(query);
    if (rows.length === 0) {
      return res
        .status(404)
        .json({ error: "No transactions for this account" });
    }

    res.status(200).json(rows);
  } catch (error) {
    console.error("Error executing query", error);
    res.status(500).json({ error: "Internal server error" });
  }
}
