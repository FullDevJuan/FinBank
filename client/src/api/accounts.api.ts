import getAuthHeaders from "../utils/getAuthHeaders";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export async function getAccounts() {
  try {
    const req = await fetch(`${BACKEND_URL}/accounts`, {
      headers: getAuthHeaders(),
    });

    const data = await req.json();
    return data;
  } catch (error) {
    console.log(error);
    return { msg: "Error al cargar las cuentas. Intente más tarde" };
  }
}
