import express from "express";
import request from "supertest";
import { pool } from "../../../shared/config/db.js";

// Mock del pool (sobrescribimos método query) antes de importar controladores
pool.query = async () => ({ rows: [] });

let app;

describe("Pruebas de interacciones (usando controladores reales)", () => {
  beforeAll(async () => {
    const controllers = await import(
      "../../src/services/interactions/src/controllers/interactionControllers.js"
    );
    app = express();
    app.use(express.json());
    app.post("/api/interacciones", controllers.createInteraction);
    app.get("/api/interacciones", controllers.read);
  });

  test("Registrar una acción correctamente", async () => {
    const res = await request(app).post("/api/interacciones").send({
      customer_id: 1,
      user_id: 1,
      interaction_type: "llamada",
      subject: "Consulta",
      description: "Cliente pregunta por saldo",
      outcome: "Resuelto",
    });
    expect([200, 201]).toContain(res.statusCode);
    expect(res.body).toHaveProperty("msg");
    expect(typeof res.body.msg).toBe("string");
  });
});
