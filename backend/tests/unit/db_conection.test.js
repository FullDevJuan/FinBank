import { pool } from "../../../shared/config/db.js";

afterAll(async () => {
  await pool.end();
});

test("Conexión a la base de datos funciona", async () => {
  const result = await pool.query("SELECT 1 + 1 AS result");
  expect(result.rows[0].result).toBe(2);
});
