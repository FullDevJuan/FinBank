import { pool } from "../../config/db.js";
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
  console.log(body);
  try {
    const query = {
      text: "INSERT INTO users (name, username, email, edad, rol, pass) VALUES ($1, $2, $3, $4, $5, $6)",
      values: [
        body.name,
        body.username,
        body.email,
        body.edad,
        body.rol,
        body.pass,
      ],
    };
    const result = await pool.query(query);
    res.json({ msg: "user created" });
    console.log(result);
  } catch (error) {
    console.log(error);
  }
}

export async function update(req, res) {
  const { body } = req;
  console.log(body);

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
    console.log(result);
  } catch (error) {
    console.log(error);
  }
}
