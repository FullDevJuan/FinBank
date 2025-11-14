import { pool } from "../../../../../../shared/config/db.js";
import { logAudit } from "../../../../../../shared/utils/auditLogger.js";

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
    res.status(200).json(rows);
  } catch (error) {
    console.error("Error executing query", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

// TODO: registrar producto a customer
export async function createCustomerProduct(req, res) {
  const { body } = req;

  try {
    const query = {
      text: `INSERT INTO customer_products (customer_id, product_id, status, current_balance, profitability, details) VALUES ($1, $2, $3, $4, $5, $6)`,
      values: [
        body.customer_id,
        body.product_id,
        body.status,
        body.current_balance,
        body.profitability,
        body.details,
      ],
    };
    const { rows } = await pool.query(query);

    // Log audit
    await logAudit({
      user_id: body.user_id || null,
      action: "CREATE",
      affected_table: "customer_products",
      description: `Registered product for customer: ${body.customer_id}`,
    });

    res.status(200).json({ msg: "Successful product registration" });
  } catch (error) {
    console.error("Error registering product:", error);
    res.status(500).json({
      msg: "Error registering product",
      error: error.message,
    });
  }
}
