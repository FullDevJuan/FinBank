import { pool } from "../../../../shared/config/db.js";
import { logAudit } from "../../../../shared/utils/auditLogger.js";

export async function read(req, res) {
  try {
    const { rows } = await pool.query("SELECT * FROM financial_products");
    res.status(200).json(rows);
  } catch (error) {
    res.status(500).json({ error: "Error interno del servidor" });
  }
}

// TODO: ver todos los clientes que tiene un producto
export async function getCustomersByProductId(req, res) {
  const { id } = req.params;
  const query = `SELECT 
    c.id AS customer_id,
    c.name AS customer,
    fp.name AS product,
    fp.product_type,
    fp.interest_rate,
    cp.current_balance,
    cp.profitability,
    cp.details AS customer_product_details,
    fp.details AS product_details,
    cp.acquisition_date,
    cp.status
    FROM customer_products cp
    INNER JOIN customers c ON cp.customer_id = c.id
    INNER JOIN financial_products fp ON cp.product_id = fp.id
    WHERE fp.id='${id}'`;
  try {
    const { rows } = await pool.query(query);
    if (rows.length === 0) {
      return res.status(404).json({ error: "No customers for this product" });
    }
    res.status(200).json(rows);
  } catch (error) {
    console.error("Error executing query", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

// TODO: crear producto
export async function createProduct(req, res) {
  const { body } = req;

  try {
    const query = {
      text: "INSERT INTO financial_products (name, product_type, description, interest_rate, status, details) VALUES ($1, $2, $3, $4, $5, $6)",
      values: [
        body.name,
        body.product_type,
        body.description,
        body.interest_rate,
        body.status,
        body.details,
      ],
    };

    const { rows } = await pool.query(query);

    // Log audit
    await logAudit({
      user_id: body.user_id,
      action: "CREATE",
      affected_table: "financial_products",
      description: `Created product: ${body.name}`,
    });

    res.status(201).json({
      msg: "Product successfully created",
      user: rows[0],
    });
  } catch (error) {
    console.error("Error creating product:", error);
    res.status(500).json({
      msg: "Error creating product",
      error: error.message,
    });
  }
}

// TODO: actualizar producto
export async function updateProduct(req, res) {
  const { body } = req;

  try {
    const query = {
      text: `UPDATE financial_products SET
      name = $1,
      product_type = $2,
      description = $3,
      interest_rate = $4,
      status = $5,
      details = $6
      WHERE id = $7`,
      values: [
        body.name,
        body.product_type,
        body.description,
        body.interest_rate,
        body.status,
        body.details,
        body.id,
      ],
    };

    const { rows } = await pool.query(query);

    // Log audit
    await logAudit({
      user_id: body.user_id,
      action: "UPDATE",
      affected_table: "financial_products",
      description: `Updated product with id: ${body.id}`,
    });

    res.status(200).json({ msg: "Product successfully updated" });
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).json({
      msg: "Error updating product",
      error: error.message,
    });
  }
}
