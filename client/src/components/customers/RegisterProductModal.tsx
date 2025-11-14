import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { getProducts } from "../../api/products.api";
import { registerProductToCustomer } from "../../api/customer_products.api";
import type { Product } from "../../types/product.types";
import Span from "../common/Span";

type RegisterProductFormData = {
  product_id: string;
  status: string;
  current_balance: number;
  profitability: number;
  details?: Record<string, unknown>;
};

interface RegisterProductProps {
  customerId: string;
  onClose: () => void;
  onSuccess: () => void;
}

export default function RegisterProductModal({
  customerId,
  onClose,
  onSuccess,
}: RegisterProductProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterProductFormData>({
    defaultValues: {
      product_id: "",
      status: "activo",
      current_balance: 0,
      profitability: 0,
      details: {},
    },
  });

  useEffect(() => {
    getProducts()
      .then((data) => {
        if (!data.msg) {
          setProducts(data);
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const onSubmit = async (data: RegisterProductFormData) => {
    try {
      const response = await registerProductToCustomer({
        customer_id: customerId,
        product_id: data.product_id,
        status: data.status,
        current_balance: data.current_balance,
        profitability: data.profitability,
        details: data.details || {},
      });

      alert(response?.msg || "Product registered successfully");
      onSuccess();
      onClose();
    } catch (error) {
      alert("Error registering product");
      console.error(error);
    }
  };

  return (
    <div className="modal">
      <div className="modalContent registerProductModal">
        <div className="modalHeader">
          <h2>Register Product to Customer</h2>
          <button onClick={onClose} className="closeButton">
            ×
          </button>
        </div>

        {isLoading ? (
          <p>Loading products...</p>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="modalForm">
            <div>
              <label htmlFor="product_id">Product</label>
              <select
                id="product_id"
                {...register("product_id", {
                  required: {
                    value: true,
                    message: "Required field",
                  },
                })}
              >
                <option value="">Select a product</option>
                {products.map((product) => (
                  <option key={product.id} value={product.id}>
                    {product.name}
                  </option>
                ))}
              </select>
              {errors.product_id && (
                <Span>{String(errors.product_id.message)}</Span>
              )}
            </div>

            <div>
              <label htmlFor="status">Status</label>
              <select
                id="status"
                {...register("status", {
                  required: {
                    value: true,
                    message: "Required field",
                  },
                })}
              >
                <option value="activo">Active</option>
                <option value="inactivo">Inactive</option>
                <option value="suspendido">Suspended</option>
              </select>
              {errors.status && <Span>{String(errors.status.message)}</Span>}
            </div>

            <div>
              <label htmlFor="current_balance">Current Balance</label>
              <input
                type="number"
                id="current_balance"
                step="0.01"
                {...register("current_balance", {
                  valueAsNumber: true,
                  min: {
                    value: 0,
                    message: "Balance must be positive",
                  },
                })}
              />
              {errors.current_balance && (
                <Span>{String(errors.current_balance.message)}</Span>
              )}
            </div>

            <div>
              <label htmlFor="profitability">Profitability</label>
              <input
                type="number"
                id="profitability"
                step="0.01"
                {...register("profitability", {
                  valueAsNumber: true,
                })}
              />
              {errors.profitability && (
                <Span>{String(errors.profitability.message)}</Span>
              )}
            </div>

            <button type="submit" className="save">
              Register Product
            </button>
            <button type="button" className="cancelSave" onClick={onClose}>
              Cancel
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
