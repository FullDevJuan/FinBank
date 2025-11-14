import type { Customer } from "../types/customer.type";
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

export async function saveCustomer(body: Customer) {
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
    const req = await fetch(`${BACKEND_URL}/customers/create`, options);
    const res = await req.json();
    return res;
  } catch (error) {
    console.log(error);
  }
}

export async function updateCustomer(body: Customer) {
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
    const req = await fetch(`${BACKEND_URL}/customers/update`, options);
    const res = await req.json();
    return res;
  } catch (error) {
    console.log(error);
  }
}
