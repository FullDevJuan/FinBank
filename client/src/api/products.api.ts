import type { Product } from "../types/product.types";
import getAuthHeaders from "../utils/getAuthHeaders";
const PRODUCTS_SERVICE_URL = import.meta.env.VITE_PRODUCTS_SERVICE_URL;

export async function getProducts() {
  try {
    const req = await fetch(`${PRODUCTS_SERVICE_URL}/api/products`, {
      headers: getAuthHeaders(),
    });
    const data = await req.json();
    return data;
  } catch (error) {
    console.log(error);
    return { msg: "Error al cargar los productos. Intente más tarde." };
  }
}

export async function saveProduct(body: Product) {
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
    const req = await fetch(
      `${PRODUCTS_SERVICE_URL}/api/products/create`,
      options
    );
    const res = await req.json();
    return res;
  } catch (error) {
    console.log(error);
  }
}

export async function updateProduct(body: Product) {
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
    const req = await fetch(
      `${PRODUCTS_SERVICE_URL}/api/products/update`,
      options
    );
    const res = await req.json();
    return res;
  } catch (error) {
    console.log(error);
  }
}
