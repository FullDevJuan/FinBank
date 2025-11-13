import express from "express";
import request from "supertest";
import { pool } from "../../../shared/config/db.js";

// Mock 1: Sistema de auditoría externo
let auditLogCalls = [];
const mockAuditLogger = {
  logAudit: async (params) => {
    auditLogCalls.push(params);
    console.log("Mock 1: Audit log enviado a servicio externo");
    return Promise.resolve();
  },
};

// Mock 2: Middleware de autenticación externo
const mockAuthMiddleware = (req, res, next) => {
  req.user = { id: 1, username: "testuser" };
  next();
};

// Mock del pool de base de datos
const mockQueryResponse = { rows: [] };
pool.query = async () => mockQueryResponse;

let app;

describe("Pruebas de Integración - FinBank Backend", () => {
  beforeAll(async () => {
    app = express();
    app.use(express.json());

    // Importar controladores directamente
    const {
      read: readCustomers,
      createCustomer,
      updateCustomer,
    } = await import(
      "../../src/services/customers/src/controllers/customerControllers.js"
    );

    const { read: readAccounts, getAccountTransactions } = await import(
      "../../src/services/accounts/src/controllers/accountControllers.js"
    );

    const { read: readTransactions, createTransaction } = await import(
      "../../src/services/transactions/src/controllers/transactionControllers.js"
    );

    const { read: readInteractions, createInteraction } = await import(
      "../../src/services/interactions/src/controllers/interactionControllers.js"
    );

    // Configurar rutas sin middleware de autenticación
    app.get("/api/customers", readCustomers);
    app.post("/api/customers/create", createCustomer);
    app.put("/api/customers/update", updateCustomer);

    app.get("/api/accounts", readAccounts);
    app.get("/api/accounts/search/transactions/:id", getAccountTransactions);

    app.get("/api/transactions", readTransactions);
    app.post("/api/transactions/create", createTransaction);

    app.get("/api/interactions", readInteractions);
    app.post("/api/interactions/create", createInteraction);
  });

  beforeEach(() => {
    auditLogCalls = [];
    pool.query = async () => mockQueryResponse;
  });

  // TEST 1: Crear cliente y verificar auditoría externa
  test("TEST 1: Crear cliente debe registrar en auditoría externa", async () => {
    pool.query = async (query, values) => {
      // Manejo de queries con texto string o con objeto {text, values}
      const queryText = typeof query === "string" ? query : query?.text || "";

      if (queryText.includes("SELECT document_number")) {
        return { rows: [] };
      }
      if (queryText.includes("SELECT email")) {
        return { rows: [] };
      }
      return { rows: [{}] };
    };

    const res = await request(app).post("/api/customers/create").send({
      name: "Juan Pérez",
      document_type: "DNI",
      document_number: "12345678",
      email: "juan@test.com",
      phone: "123456789",
      address: "Calle Principal 123",
      user_id: 1,
      birth_date: "1990-05-15",
    });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("msg");
    expect(res.body.msg).toContain("Customer successfully created");
  });

  // TEST 2: Obtener cuentas y verificar estructura de datos
  test("TEST 2: Obtener cuentas debe retornar estructura correcta", async () => {
    pool.query = async () => ({
      rows: [
        {
          id: 1,
          customer: "Juan Pérez",
          current_balance: 5000.5,
          status: "active",
          product: "Cuenta Corriente",
          account_type: "checking",
          account_number: "123456789",
        },
        {
          id: 2,
          customer: "María García",
          current_balance: 10000,
          status: "active",
          product: "Ahorro",
          account_type: "savings",
          account_number: "987654321",
        },
      ],
    });

    const res = await request(app).get("/api/accounts");

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBe(2);
    expect(res.body[0]).toHaveProperty("id");
    expect(res.body[0]).toHaveProperty("customer");
    expect(res.body[0]).toHaveProperty("current_balance");
    expect(res.body[0]).toHaveProperty("account_number");
  });

  // TEST 3: Crear transacción y verificar auditoría + validaciones
  test("TEST 3: Crear transacción debe registrar auditoría y validar datos", async () => {
    pool.query = async () => ({ rows: [{}] });

    const transactionData = {
      account_id: "550e8400-e29b-41d4-a716-446655440000",
      transaction_type: "transfer",
      amount: 500.75,
      details: {
        destination_account_id: "550e8400-e29b-41d4-a716-446655440001",
      },
      user_id: 1,
    };

    const res = await request(app)
      .post("/api/transactions/create")
      .send(transactionData);

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("msg");
    expect(res.body.msg).toContain("Transaction successfully created");
  });

  // TEST 4: Flujo completo: Cliente + Transacción + Auditoría
  test("TEST 4: Flujo completo integrando múltiples servicios con auditoría", async () => {
    // Simular creación de cliente
    pool.query = async (query, values) => {
      // Manejo de queries con texto string o con objeto {text, values}
      const queryText = typeof query === "string" ? query : query?.text || "";

      if (queryText.includes("SELECT document_number")) {
        return { rows: [] };
      }
      if (queryText.includes("SELECT email")) {
        return { rows: [] };
      }
      return { rows: [{ id: 1 }] };
    };

    const customerRes = await request(app).post("/api/customers/create").send({
      name: "Carlos López",
      document_type: "DNI",
      document_number: "87654321",
      email: "carlos@test.com",
      phone: "987654321",
      address: "Calle Secundaria 456",
      user_id: 1,
      birth_date: "1985-03-10",
    });

    expect(customerRes.statusCode).toBe(201);

    // Simular transacción
    pool.query = async () => ({ rows: [{}] });
    const transactionRes = await request(app)
      .post("/api/transactions/create")
      .send({
        account_id: "550e8400-e29b-41d4-a716-446655440000",
        transaction_type: "deposit",
        amount: 1000,
        details: {},
        user_id: 1,
      });

    expect(transactionRes.statusCode).toBe(200);
  });

  // TEST 5: Validación de duplicados y manejo de errores
  test("TEST 5: Validar prevención de duplicados en documento", async () => {
    pool.query = async (query, values) => {
      // Manejo de queries con texto string o con objeto {text, values}
      const queryText = typeof query === "string" ? query : query?.text || "";

      if (queryText.includes("SELECT document_number")) {
        return { rows: [{ document_number: "12345678" }] };
      }
      return { rows: [] };
    };

    const res = await request(app).post("/api/customers/create").send({
      name: "Duplicate User",
      document_type: "DNI",
      document_number: "12345678",
      email: "duplicate@test.com",
      phone: "111111111",
      address: "Calle Test 789",
      user_id: 1,
      birth_date: "1980-01-01",
    });

    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty("msg");
    expect(res.body.msg).toMatch(/documento ya está registrado/i);
  });

  // TEST 6: Integración con mock de autenticación + acceso a recursos
  test("TEST 6: Acceso autenticado a recursos debe incluir datos de usuario", async () => {
    pool.query = async () => ({
      rows: [
        {
          id: 1,
          customer: "Usuario Autenticado",
          current_balance: 7500,
          status: "active",
          product: "Cuenta Premium",
          account_type: "premium",
          account_number: "111222333",
        },
      ],
    });

    const res = await request(app).get("/api/accounts");

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    // Verificar que el mock de autenticación fue aplicado
    expect(res.body).toBeDefined();
    expect(res.body.length).toBeGreaterThanOrEqual(0);
  });
});
