import { pool } from "../../../../../../shared/config/db.js";
import bcrypt from "bcrypt";
import { logAudit } from "../../../../../../shared/utils/auditLogger.js";

export async function read(req, res) {
  try {
    const { rows } = await pool.query("SELECT * FROM users");
    res.status(200).json(rows);
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

    // Log audit
    await logAudit({
      user_id: body.user_id,
      action: "CREATE",
      affected_table: "users",
      description: `Created user: ${body.email}`,
    });

    res.status(201).json({
      msg: "Usuario creado exitosamente",
      user: result.rows[0],
    });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({
      msg: "Error creating user",
      error: error.message,
    });
  }
}

export async function update(req, res) {
  const { body } = req;

  try {
    let passValue = body.pass;

    // Si se proporciona una contraseña, hashearla
    if (body.pass && body.pass.trim() !== "") {
      passValue = await bcrypt.hash(body.pass, 10);
    } else {
      // Si no se proporciona contraseña, obtener la actual de la base de datos
      const currentUser = await pool.query(
        "SELECT pass FROM users WHERE id = $1",
        [body.id]
      );
      if (currentUser.rows.length > 0) {
        passValue = currentUser.rows[0].pass;
      } else {
        return res.status(404).json({ msg: "User not found" });
      }
    }

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
        passValue,
        body.rol,
        body.id,
      ],
    };

    await pool.query(query);

    // Log audit
    await logAudit({
      user_id: body.user_id,
      action: "UPDATE",
      affected_table: "users",
      description: `Updated user with id: ${body.id}`,
    });

    res.status(200).json({ msg: "User successfully updated" });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({
      msg: "Error updating user",
      error: error.message,
    });
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
