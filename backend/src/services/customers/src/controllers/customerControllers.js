import { pool } from "../../../../../../shared/config/db.js";

export async function read(req, res) {
  try {
    const query = `SELECT 
    c.id,
    c.name,
    c.document_type,
    c.document_number,
    c.email,
    c.phone,
    c.address,
    c.created_at,
    c.birth_date,
    u.username
    FROM customers c INNER JOIN users u ON c.user_id = u.id`;

    const { rows } = await pool.query(query);
    res.json(rows);
  } catch (error) {
    res.status(500).send("Error fetching customers");
    console.log(error);
  }
}

// TODO: crear customer
export async function createCustomer(req, res) {
  const { body } = req;
  try {
    // verificar si el numero de documento existe
    const doc_number_exist = await pool.query(
      "SELECT document_number FROM customers WHERE document_number = $1",
      [body.document_number]
    );

    if (doc_number_exist.rows.length > 0) {
      return res.status(400).json({
        msg: "El número de documento ya está registrado",
      });
    }

    // verificar el email
    const email_exist = await pool.query(
      "SELECT email FROM customers WHERE email = $1",
      [body.email]
    );

    if (email_exist.rows.length > 0) {
      return res.status(400).json({ msg: "El email ya está registrado" });
    }

    const query = {
      text: "INSERT INTO customers (name, document_type, document_number, email, phone, address, user_id, birth_date) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)",
      values: [
        body.name,
        body.document_type,
        body.document_number,
        body.email,
        body.phone,
        body.address,
        body.user_id,
        body.birth_date,
      ],
    };
    const { rows } = await pool.query(query);
    res.status(201).json({ msg: "Customer successfully created" });
  } catch (error) {
    console.error("Error creating customer:", error);
    res.status(500).json({
      msg: "Error creating customer",
      error: error.message,
    });
  }
}

// TODO: actualizar customer
export async function updateCustomer(req, res) {
  const { body } = req;

  try {
    const query = {
      text: `UPDATE customers SET
      name = $1,
      document_type = $2,
      document_number = $3,
      email = $4,
      phone = $5,
      address = $6,
      birth_date = $7
      WHERE id = $8`,
      values: [
        body.name,
        body.document_type,
        body.document_number,
        body.email,
        body.phone,
        body.address,
        body.birth_date,
        body.id,
      ],
    };
    const { rows } = await pool.query(query);
    res.status(200).json({ msg: "Customer successfully updated" });
  } catch (error) {
    console.error("Error updating customer:", error);
    res.status(500).json({
      msg: "Error updating customer",
      error: error.message,
    });
  }
}
