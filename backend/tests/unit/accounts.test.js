import express from "express";
import request from "supertest";
import { pool } from "../../../shared/config/db.js";

// Mock del pool (sobrescribimos método query) antes de importar controladores
pool.query = async () => ({ rows: [] });

let app;

describe("Pruebas de cuentas (usando controladores reales)", () => {
  beforeAll(async () => {
    const controllers = await import(
      "../../src/services/accounts/src/controllers/accountControllers.js"
    );
    app = express();
    app.use(express.json());
    app.get("/api/cuentas", controllers.read);
  });

  // MATCHER 2: Obtener cuentas (usa read de accountControllers)
  test("Obtener lista de cuentas retorna array con status 200", async () => {
    const res = await request(app).get("/api/cuentas");
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThanOrEqual(0);
  });
});
