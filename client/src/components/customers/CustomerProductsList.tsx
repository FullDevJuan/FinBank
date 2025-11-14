import { useEffect, useState } from "react";
import { getCustomerProducts } from "../../api/customer_products.api";

interface CustomerProduct {
  id: string;
  product_id: string;
  product: string;
  status: string;
  current_balance: number;
  profitability: number;
  created_at: string;
}

interface CustomerProductsListProps {
  customerId: string;
  refreshTrigger?: number;
}

export default function CustomerProductsList({
  customerId,
  refreshTrigger = 0,
}: CustomerProductsListProps) {
  const [products, setProducts] = useState<CustomerProduct[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await getCustomerProducts(customerId);
        if (Array.isArray(data)) {
          setProducts(data);
        } else {
          setProducts([]);
        }
      } catch (err) {
        setError("Failed to load customer products");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    loadProducts();
  }, [customerId, refreshTrigger]);

  if (isLoading) {
    return <p>Loading products...</p>;
  }

  if (error) {
    return <p className="Error">{error}</p>;
  }

  if (products.length === 0) {
    return <p>No products registered for this customer</p>;
  }

  return (
    <div className="customerProductsContainer">
      <h3>Customer Products</h3>
      <table className="customerProductsTable">
        <thead>
          <tr>
            <th>Product</th>
            <th>Status</th>
            <th>Balance</th>
            <th>Profitability</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr key={product.id || index}>
              <td>{product.product}</td>
              <td>
                <span className={`statusBadge statusBadge--${product.status}`}>
                  {product.status}
                </span>
              </td>
              <td className="textRight">
                ${parseFloat(String(product.current_balance || 0)).toFixed(2)}
              </td>
              <td className="textRight">
                {parseFloat(String(product.profitability || 0)).toFixed(2)}%
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
