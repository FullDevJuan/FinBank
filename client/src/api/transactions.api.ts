import getAuthHeaders from "../utils/getAuthHeaders";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export async function getTransactions() {
  try {
    const req = await fetch(`${BACKEND_URL}/transactions`, {
      headers: getAuthHeaders(),
    });
    const data = req.json();
    return data;
  } catch (error) {
    console.log(error);
    return { msg: "Error al cargar transacciones. Intente más tarde." };
  }
}

export async function getAccountTransactions(accountId: string) {
  try {
    const req = await fetch(
      `${BACKEND_URL}/accounts/search/transactions/${accountId}`,
      {
        headers: getAuthHeaders(),
      }
    );
    const data = await req.json();
    return data;
  } catch (error) {
    console.log(error);
    return { msg: "Error al cargar transacciones de la cuenta." };
  }
}

export async function getAllAccounts() {
  try {
    const req = await fetch(`${BACKEND_URL}/accounts`, {
      headers: getAuthHeaders(),
    });
    const data = await req.json();
    return data;
  } catch (error) {
    console.log(error);
    return { msg: "Error al cargar las cuentas." };
  }
}

export async function createTransaction(body: {
  account_id: string;
  transaction_type: string;
  amount: number;
  details: Record<string, any>;
  user_id?: string | null;
}) {
  try {
    const user = JSON.parse(sessionStorage.getItem("user") || "{}");
    const options = {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify({
        ...body,
        user_id: user.id || null,
      }),
    };
    const req = await fetch(`${BACKEND_URL}/transactions/create`, options);
    const res = await req.json();
    return res;
  } catch (error) {
    console.log(error);
    return { msg: "Error al crear la transacción." };
  }
}
