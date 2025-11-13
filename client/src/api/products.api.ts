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
