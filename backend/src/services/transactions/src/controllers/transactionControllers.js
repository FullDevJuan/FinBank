import { pool } from "../../../../../../shared/config/db.js";

export async function read(req, res) {
  try {
    const { rows } = await pool.query(`SELECT 
    a.account_number,
    a.account_type,
    t.amount,
    t.transaction_type,
    t.created_at AS date,
    (SELECT a.account_number FROM accounts a WHERE a.id = (t.details->>'destination_account_id')::uuid) AS destination_account_number
    FROM accounts a
    INNER JOIN transactions t ON a.id = t.account_id`);

    res.status(200).json(rows);
  } catch (error) {
    console.log(error);
    res.status(500).send("Error fetching transactions");
  }
}

// TODO: registrar transaccion
export async function createTransaction(req, res) {
  const { body } = req;
  try {
    const query = {
      text: `INSERT INTO transactions (account_id, transaction_type, amount, details) VALUES ($1, $2, $3, $4)`,
      values: [
        body.account_id,
        body.transaction_type,
        body.amount,
        body.details,
      ],
    };
    const { rows } = await pool.query(query);
    res.status(200).json({ msg: "Transaction successfully created" });
  } catch (error) {
    console.error("Error creating transaction:", error);
    res.status(500).json({
      msg: "Error creating transaction",
      error: error.message,
    });
  }
}
