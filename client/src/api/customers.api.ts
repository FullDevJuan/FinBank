import getAuthHeaders from "../utils/getAuthHeaders";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export async function getCustomers() {
  try {
    const req = await fetch(`${BACKEND_URL}/customers`, {
      headers: getAuthHeaders(),
    });

    const data = await req.json();
    return data;
  } catch (error) {
    console.log(error);
    return { msg: "Error al cargar los clientes. Intente más tarde." };
  }
}
