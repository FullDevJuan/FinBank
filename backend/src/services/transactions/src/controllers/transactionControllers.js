import { pool } from "../../../../../../shared/config/db.js";

export async function read(req, res) {
  try {
    const { rows } = await pool.query("SELECT * FROM transactions");
    res.json(rows);
  } catch (error) {
    console.log(error);
    res.status(500).send("Error fetching transactions");
  }
}
