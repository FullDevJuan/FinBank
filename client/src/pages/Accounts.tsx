import { useEffect, useState } from "react";
import type { BankAccount } from "../types/account.type";
import AccountCard from "../components/accounts/AccountCard";
import { getAccounts } from "../api/accounts.api";
import "./accounts.css";

export default function Accounts() {
  const [accounts, setAccounts] = useState<BankAccount[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string>();

  useEffect(() => {
    getAccounts()
      .then((data) => {
        if (data.msg) {
          setError(data.msg);
          setAccounts(null);
        } else {
          setError("");
          setAccounts(data);
        }
      })
      .catch((error) => {
        setError(error);
        setAccounts(null);
      })
      .finally(() => {
        setIsLoading(false);
      });
  });
  return (
    <section className="content">
      <h1>Accounts Page.</h1>
      <section className="navbarOptions">
        <button className="create">Create account</button>
      </section>
      {isLoading && <p>Cargando clientes...</p>}
      {error && <p>{error}</p>}
      <div className="customers-grid">
        {accounts?.map((account) => (
          <AccountCard key={account.account_number} account={account} />
        ))}
      </div>
    </section>
  );
}
