import { pool } from "../../../../shared/config/db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

async function verifyUser(email) {
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

export async function login(req, res) {
  const { email, pass } = req.body;

  try {
    const user = await verifyUser(email);

    if (!user) {
      return res.status(404).json({ msg: "Usuario no encontrado" });
    }

    // Verificar contraseña con bcrypt
    const isValidPassword = await bcrypt.compare(pass, user.pass);

    if (!isValidPassword) {
      return res.status(401).json({ msg: "Contraseña incorrecta" });
    }

    // Crear el token JWT con información del usuario
    const token = jwt.sign(
      {
        id: user.id,
        username: user.username || user.email,
        rol: user.rol,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_EXPIRES_IN || "24h",
      }
    );
    // Enviar respuesta exitosa con los datos del usuario
    res.json({
      msg: "Login exitoso",
      token,
      user: {
        id: user.id,
        name: user.name,
        username: user.username,
        email: user.email,
        rol: user.rol,
      },
    });
  } catch (error) {
    console.error("Error en login:", error);
    res.status(500).json({ msg: "Error en el servidor" });
  }
}
