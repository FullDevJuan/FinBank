import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CustomerCard from "../components/customers/CustomerCard";
import type { Customer } from "../types/customer.type";
import { getCustomers } from "../api/customers.api";
import "./customers.css";

export default function Customers() {
  const [customers, setCustomers] = useState<Customer[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string>();
  const navigate = useNavigate();

  useEffect(() => {
    getCustomers()
      .then((data) => {
        if (data.msg) {
          setError(data.msg);
          setCustomers(null);
        } else {
          setError("");
          setCustomers(data);
        }
      })
      .catch((error) => {
        setError(error);
        setCustomers(null);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);
  return (
    <section className="content">
      <h1>Customers Page</h1>
      <section className="navbarOptions">
        <button
          className="create"
          onClick={() => {
            navigate("/dashboard/customers/create");
          }}
        >
          Create customer
        </button>
      </section>
      {isLoading && <p>Cargando clientes...</p>}
      {error && <p>{error}</p>}
      <div className="customers-grid">
        {customers?.map((customer) => (
          <CustomerCard key={customer.id} customer={customer} />
        ))}
      </div>
    </section>
  );
}
