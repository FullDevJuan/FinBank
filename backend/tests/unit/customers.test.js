import express from "express";
import request from "supertest";
import { pool } from "../../../shared/config/db.js";

// Inyectamos un pool falso (sobrescribiendo el método query) antes de importar
// los controladores para evitar llamadas reales a la base de datos.
pool.query = async () => ({ rows: [] });

let app;

describe("Pruebas de clientes (usando controladores reales)", () => {
  beforeAll(async () => {
    // Importar controladores reales después de haber mockeado `db.pool`.
    const controllers = await import(
      "../../src/services/customers/src/controllers/customerControllers.js"
    );
    app = express();
    app.use(express.json());
    // Montamos las rutas que usan los controladores reales (sin middleware de auth)
    app.get("/api/clientes", controllers.read);
    app.post("/api/clientes/create", controllers.createCustomer);
  });

  beforeEach(() => {
    // Nada que resetear en memoria; el pool está mockeado.
  });

  // MATCHER 1: Registrar cliente válido (usa createCustomer)
  test("Registrar cliente válido retorna estado 201", async () => {
    const res = await request(app).post("/api/clientes/create").send({
      name: "Ana",
      document_type: "DNI",
      document_number: "12345678",
      email: "ana@test.com",
      phone: "123456789",
      address: "Calle Falsa 123",
      user_id: 1,
      birth_date: null,
    });
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("msg");
    expect(typeof res.body.msg).toBe("string");
    expect(res.body.msg).toMatch(
      /Customer successfully created|El número de documento/i
    );
  });
});
