import getAuthHeaders from "../utils/getAuthHeaders";
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export async function getInteractions() {
  try {
    const req = await fetch(`${BACKEND_URL}/interactions`, {
      headers: getAuthHeaders(),
    });
    const data = await req.json();
    return data;
  } catch (error) {
    console.log(error);
    return { msg: "Error al cargar las interacciones. Intente más tarde." };
  }
}
