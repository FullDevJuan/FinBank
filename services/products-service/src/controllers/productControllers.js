import { pool } from "../../../../shared/config/db.js";

export async function read(req, res) {
  try {
    const { rows } = await pool.query("SELECT * FROM financial_products");
    res.status(200).json(rows);
  } catch (error) {
    res.status(500).json({ error: "Error interno del servidor" });
  }
}
