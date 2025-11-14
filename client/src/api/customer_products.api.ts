import getAuthHeaders from "../utils/getAuthHeaders";
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export async function getCustomerProducts(customerId: string) {
  try {
    const req = await fetch(`${BACKEND_URL}/customer_products/${customerId}`, {
      headers: getAuthHeaders(),
    });

    const data = await req.json();
    return data;
  } catch (error) {
    console.log(error);
    return { msg: "Error al cargar los productos del cliente." };
  }
}

export async function registerProductToCustomer(body: {
  customer_id: string;
  product_id: string;
  status: string;
  current_balance: number;
  profitability: number;
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
    const req = await fetch(
      `${BACKEND_URL}/customer_products/register`,
      options
    );
    const res = await req.json();
    return res;
  } catch (error) {
    console.log(error);
  }
}
