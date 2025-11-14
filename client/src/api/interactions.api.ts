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

export async function saveInteraction(body: {
  customer_id: string;
  interaction_type: string;
  subject: string;
  description: string;
  outcome: string;
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
    const req = await fetch(`${BACKEND_URL}/interactions/create`, options);
    const res = await req.json();
    return res;
  } catch (error) {
    console.log(error);
    return { msg: "Error al crear la interacción." };
  }
}

export async function updateInteraction(body: {
  id: string;
  customer_id: string;
  interaction_type: string;
  subject: string;
  description: string;
  outcome: string;
  user_id?: string | null;
}) {
  try {
    const user = JSON.parse(sessionStorage.getItem("user") || "{}");
    const options = {
      method: "PUT",
      headers: getAuthHeaders(),
      body: JSON.stringify({
        ...body,
        user_id: user.id || null,
      }),
    };
    const req = await fetch(`${BACKEND_URL}/interactions/update`, options);
    const res = await req.json();
    return res;
  } catch (error) {
    console.log(error);
    return { msg: "Error al actualizar la interacción." };
  }
}

export async function getCustomers() {
  try {
    const req = await fetch(`${BACKEND_URL}/customers`, {
      headers: getAuthHeaders(),
    });
    const data = await req.json();
    return data;
  } catch (error) {
    console.log(error);
    return { msg: "Error al cargar clientes." };
  }
}
