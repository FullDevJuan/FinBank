import express from "express";
import request from "supertest";

const app = express();
app.use(express.json());

app.get("/api/ok", (req, res) => res.json({ status: "ok" }));

// Simula ruta inexistente
app.use((req, res) => res.status(404).json({ error: "Ruta no encontrada" }));

describe("Pruebas generales de errores", () => {
  // MATCHER 3: Ruta válida responde correctamente
  test("Ruta válida responde correctamente", async () => {
    const res = await request(app).get("/api/ok");
    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe("ok");
    expect(res.body).toHaveProperty("status");
    expect(typeof res.body.status).toBe("string");
  });
});
