import { pool } from "../../../../core/db.js";
import bcrypt from "bcrypt";

export async function read(req, res) {
  try {
    const { rows } = await pool.query("SELECT * FROM users");
    res.json(rows);
  } catch (error) {
    console.log(error);
  }
}

export async function create(req, res) {
  const { body } = req;

  // Validar que todos los campos requeridos existan
  const requiredFields = ["name", "username", "email", "edad", "rol", "pass"];
  const missingFields = requiredFields.filter((field) => !body[field]);

  if (missingFields.length > 0) {
    return res.status(400).json({
      msg: "Faltan campos requeridos",
      fields: missingFields,
    });
  }

  try {
    // Verificar si el email ya existe
    const emailCheck = await pool.query(
      "SELECT email FROM users WHERE email = $1",
      [body.email]
    );

    if (emailCheck.rows.length > 0) {
      return res.status(400).json({
        msg: "El email ya está registrado",
      });
    }

    const hashedPassword = await bcrypt.hash(body.pass, 10);

    const query = {
      text: "INSERT INTO users (name, username, email, edad, rol, pass) VALUES ($1, $2, $3, $4, $5, $6)",
      values: [
        body.name,
        body.username,
        body.email,
        body.edad,
        body.rol,
        hashedPassword,
      ],
    };

    const result = await pool.query(query);

    res.status(201).json({
      msg: "Usuario creado exitosamente",
      user: result.rows[0],
    });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({
      msg: "Error al crear el usuario",
      error: error.message,
    });
  }
}

export async function update(req, res) {
  const { body } = req;

  try {
    const query = {
      text: `UPDATE users SET
      name = $1, 
      username = $2, 
      email = $3, 
      edad = $4, 
      pass = $5, 
      rol = $6
      WHERE id = $7`,
      values: [
        body.name,
        body.username,
        body.email,
        body.edad,
        body.pass,
        body.rol,
        body.id,
      ],
    };

    const result = await pool.query(query);
    res.json({ msg: "user updated" });
  } catch (error) {
    console.log(error);
  }
}

export async function verifyUser(email) {
  try {
    const query = {
      text: "SELECT * FROM users WHERE email = $1",
      values: [email],
    };
    const { rows } = await pool.query(query);
    return rows[0] || null;
  } catch (error) {
    console.error("Error verificando usuario:", error);
    throw error;
  }
}
