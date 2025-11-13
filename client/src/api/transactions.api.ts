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
