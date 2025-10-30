import { pool } from "../../../../../../shared/config/db.js";

export async function read(req, res) {
  try {
    const { rows } = await pool.query("SELECT * FROM customer_interactions");
    res.json(rows);
  } catch (error) {
    console.error("Error fetching interactions:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}
