import { useEffect } from "react";
import { getProducts } from "../api/products.api";

export default function Products() {
  useEffect(() => {
    getProducts();
  });

  return (
    <section className="content">
      <h1>Products Page.</h1>
    </section>
  );
}
