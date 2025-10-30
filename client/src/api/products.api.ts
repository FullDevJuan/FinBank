const PRODUCTS_SERVICE_URL = import.meta.env.VITE_PRODUCTS_SERVICE_URL;

export async function getProducts() {
  try {
    const req = await fetch(`${PRODUCTS_SERVICE_URL}/api/products`);
    const data = await req.json();
    console.log(data);
  } catch (error) {
    console.log(error);
  }
}
