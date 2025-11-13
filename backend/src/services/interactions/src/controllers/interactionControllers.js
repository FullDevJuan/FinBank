import { pool } from "../../../../../../shared/config/db.js";

export async function read(req, res) {
  const query = `SELECT 
    ci.id,
    c.name AS customer,
    u.username AS user,
    ci.interaction_type,
    ci.subject,
    ci.description,
    ci.outcome,
    ci.created_at AS date
    FROM customer_interactions ci 
    INNER JOIN customers c ON ci.customer_id = c.id
    INNER JOIN users u ON ci.user_id = u.id`;
  try {
    const { rows } = await pool.query(query);
    res.json(rows);
  } catch (error) {
    console.error("Error fetching interactions:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

// TODO: registrar interaccion
export async function createInteraction(req, res) {
  const { body } = req;
  try {
    const query = {
      text: `INSERT INTO customer_interactions (customer_id, user_id, interaction_type, subject, description, outcome) VALUES ($1, $2, $3, $4, $5, $6)`,
      values: [
        body.customer_id,
        body.user_id,
        body.interaction_type,
        body.subject,
        body.description,
        body.outcome,
      ],
    };
    const { rows } = await pool.query(query);
    res.status(200).json({ msg: "Interaction successfully created" });
  } catch (error) {
    console.error("Error creating interaction:", error);
    res.status(500).json({
      msg: "Error creating interaction",
      error: error.message,
    });
  }
}

// TODO: actualizar interaccion
export async function updateInteraction(req, res) {
  const { body } = req;

  try {
    const query = {
      text: `UPDATE customer_interactions SET
      customer_id = $1,
      interaction_type = $2,
      subject = $3,
      description = $4,
      outcome = $5
      WHERE id = $6`,
      values: [
        body.customer_id,
        body.interaction_type,
        body.subject,
        body.description,
        body.outcome,
        body.id,
      ],
    };
    const { rows } = await pool.query(query);
    res.status(200).json({
      msg: "Interaction successfully updated",
    });
  } catch (error) {
    console.log("Error updating interaction:", error);
    res.status(500).json({
      msg: "Error updating interaction",
      error: error.message,
    });
  }
}
