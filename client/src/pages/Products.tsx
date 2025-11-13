import { useEffect, useState } from "react";
import { getProducts } from "../api/products.api";
import { type Product } from "../types/product.types.ts";
import ProductCard from "../components/products/ProductCard";
import "./products.css";
import { useNavigate } from "react-router-dom";

export default function Products() {
  const [products, setProducts] = useState<Product[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string>();
  const navigate = useNavigate();

  useEffect(() => {
    getProducts()
      .then((data) => {
        if (data.msg) {
          setError(data.msg);
          setProducts(null);
        } else {
          setError("");
          setProducts(data);
        }
      })
      .catch((error) => {
        setError(error);
        setProducts(null);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <section className="content">
      <h1>Products Page.</h1>
      <section className="navbarOptions">
        <button
          onClick={() => {
            navigate("/dashboard/products/create");
          }}
          className="create"
        >
          Create product
        </button>
      </section>
      {isLoading && <p>Cargando productos...</p>}
      {error && <p>{error}</p>}
      <div className="products-grid">
        {products?.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
