import { useEffect, useState } from "react";
import { getAccountTransactions } from "../../api/transactions.api";
import { ArrowDownLeft, ArrowUpRight } from "lucide-react";

interface AccountTransaction {
  transaction_type: string;
  amount: number;
  description: string;
  destination_account_number: string | null;
  date: string;
}

interface AccountTransactionsListProps {
  accountId: string;
  refreshTrigger?: number;
}

export default function AccountTransactionsList({
  accountId,
  refreshTrigger = 0,
}: AccountTransactionsListProps) {
  const [transactions, setTransactions] = useState<AccountTransaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadTransactions = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await getAccountTransactions(accountId);
        if (Array.isArray(data)) {
          setTransactions(data);
        } else if (data.error) {
          setError(data.error);
          setTransactions([]);
        } else {
          setTransactions([]);
        }
      } catch (err) {
        setError("Failed to load account transactions");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    loadTransactions();
  }, [accountId, refreshTrigger]);

  if (isLoading) {
    return <p>Loading transactions...</p>;
  }

  if (error) {
    return <p className="Error">{error}</p>;
  }

  if (transactions.length === 0) {
    return <p>No transactions for this account</p>;
  }

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString("es-CO", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getTransactionIcon = (type: string) => {
    return type.toLowerCase() === "ingreso" ? (
      <ArrowDownLeft size={16} />
    ) : (
      <ArrowUpRight size={16} />
    );
  };

  return (
    <div className="accountTransactionsContainer">
      <h3>Account Transactions</h3>
      <table className="accountTransactionsTable">
        <thead>
          <tr>
            <th>Type</th>
            <th>Amount</th>
            <th>Description</th>
            <th>Destination</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction, index) => (
            <tr key={index}>
              <td>
                <div className="transactionTypeCell">
                  <span
                    className={`transactionIcon transactionIcon--${transaction.transaction_type.toLowerCase()}`}
                  >
                    {getTransactionIcon(transaction.transaction_type)}
                  </span>
                  <span>{transaction.transaction_type}</span>
                </div>
              </td>
              <td
                className={`textRight amount amount--${transaction.transaction_type.toLowerCase()}`}
              >
                {transaction.transaction_type.toLowerCase() === "ingreso"
                  ? "+"
                  : "-"}
                ${parseFloat(String(transaction.amount || 0)).toFixed(2)}
              </td>
              <td>{transaction.description}</td>
              <td>{transaction.destination_account_number || "N/A"}</td>
              <td className="dateCell">{formatDate(transaction.date)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
