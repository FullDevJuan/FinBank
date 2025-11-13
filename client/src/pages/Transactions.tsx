import { useEffect, useState } from "react";
import type { Transaction } from "../types/transaction.type";
import { getTransactions } from "../api/transactions.api";
import TransactionList from "../components/transactions/TransactionList";
import "./transactions.css";

export default function Transactions() {
  const [transactions, setTransactions] = useState<Transaction[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string>();

  useEffect(() => {
    getTransactions()
      .then((data) => {
        if (data.msg) {
          setError(data.msg);
          setTransactions(null);
        } else {
          setError("");
          setTransactions(data);
        }
      })
      .catch((error) => {
        setError(error);
        setTransactions(null);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);
  return (
    <section className="content">
      <h1>Transactions Page.</h1>
      <section className="navbarOptions">
        <button className="create">Create transaction</button>
      </section>
      {isLoading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      <TransactionList transactions={transactions} />
    </section>
  );
}
