import express from "express";
import request from "supertest";
import { pool } from "../../../shared/config/db.js";

// Mock del pool (sobrescribimos método query) antes de importar controladores
pool.query = async () => ({ rows: [] });

let app;

describe("Pruebas de transacciones (usando controladores reales)", () => {
  beforeAll(async () => {
    const controllers = await import(
      "../../src/services/transactions/src/controllers/transactionControllers.js"
    );
    app = express();
    app.use(express.json());
    app.post("/api/transacciones", controllers.createTransaction);
  });

  test("MOCK: createTransaction responde correctamente para transferencia válida", async () => {
    const res = await request(app)
      .post("/api/transacciones")
      .send({
        account_id: "550e8400-e29b-41d4-a716-446655440000",
        transaction_type: "transfer",
        amount: 500,
        details: {
          destination_account_id: "550e8400-e29b-41d4-a716-446655440001",
        },
      });
    expect([200, 201]).toContain(res.statusCode);
    expect(res.body).toHaveProperty("msg");
    expect(res.body.msg).toMatch(/Transaction/);
    expect(typeof res.body.msg).toBe("string");
  });
});
