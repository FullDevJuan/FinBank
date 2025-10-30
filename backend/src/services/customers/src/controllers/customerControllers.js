import { pool } from "../../../../../../shared/config/db.js";

export async function read(req, res) {
  try {
    const { rows } = await pool.query("SELECT * FROM customers");
    res.json(rows);
  } catch (error) {
    res.status(500).send("Error fetching customers");
    console.log(error);
  }
}
