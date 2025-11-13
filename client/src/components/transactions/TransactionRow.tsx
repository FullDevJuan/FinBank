import {
  ArrowDownCircle,
  ArrowUpCircle,
  ArrowRightLeft,
  Calendar,
  CreditCard,
  Hash,
} from "lucide-react";
import { type Transaction } from "../../types/transaction.type.ts";

interface TransactionRowProps {
  transaction: Transaction;
}

export default function TransactionRow({ transaction }: TransactionRowProps) {
  const formatCurrency = (amount: string): string => {
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      minimumFractionDigits: 0,
    }).format(parseFloat(amount));
  };

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString("es-CO", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const formatTime = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleTimeString("es-CO", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  const formatAccountNumber = (accountNumber: string): string => {
    if (accountNumber === "N/A") return accountNumber;
    return `****${accountNumber.slice(-4)}`;
  };

  const getTransactionIcon = () => {
    switch (transaction.transaction_type) {
      case "deposito":
        return <ArrowDownCircle className="transaction-row__type-icon" />;
      case "retiro":
        return <ArrowUpCircle className="transaction-row__type-icon" />;
      case "transferencia":
        return <ArrowRightLeft className="transaction-row__type-icon" />;
      default:
        return <ArrowRightLeft className="transaction-row__type-icon" />;
    }
  };

  const getTransactionLabel = (): string => {
    switch (transaction.transaction_type) {
      case "deposito":
        return "Depósito";
      case "retiro":
        return "Retiro";
      case "transferencia":
        return "Transferencia";
      default:
        return "Transacción";
    }
  };

  const getTransactionClass = (): string => {
    switch (transaction.transaction_type) {
      case "deposito":
        return "transaction-row__type--deposit";
      case "retiro":
        return "transaction-row__type--withdrawal";
      case "transferencia":
        return "transaction-row__type--transfer";
      default:
        return "";
    }
  };

  const getAmountClass = (): string => {
    switch (transaction.transaction_type) {
      case "deposito":
        return "transaction-row__amount--positive";
      case "retiro":
        return "transaction-row__amount--negative";
      case "transferencia":
        return "transaction-row__amount--neutral";
      default:
        return "";
    }
  };

  const getAmountPrefix = (): string => {
    switch (transaction.transaction_type) {
      case "deposito":
        return "+";
      case "retiro":
        return "-";
      case "transferencia":
        return "";
      default:
        return "";
    }
  };

  return (
    <article className="transaction-row">
      <div className="transaction-row__content">
        <div className="transaction-row__main">
          <div className={`transaction-row__type ${getTransactionClass()}`}>
            {getTransactionIcon()}
            <span className="transaction-row__type-label">
              {getTransactionLabel()}
            </span>
          </div>

          <div className="transaction-row__details">
            <div className="transaction-row__detail-group">
              <CreditCard className="transaction-row__detail-icon" />
              <div className="transaction-row__detail-content">
                <span className="transaction-row__detail-label">
                  Cuenta origen
                </span>
                <span className="transaction-row__detail-value">
                  {formatAccountNumber(transaction.account_number)} (
                  {transaction.account_type})
                </span>
              </div>
            </div>

            {transaction.destination_account_number !== "N/A" && (
              <div className="transaction-row__detail-group">
                <ArrowRightLeft className="transaction-row__detail-icon" />
                <div className="transaction-row__detail-content">
                  <span className="transaction-row__detail-label">
                    Cuenta destino
                  </span>
                  <span className="transaction-row__detail-value">
                    {formatAccountNumber(
                      transaction.destination_account_number
                    )}
                  </span>
                </div>
              </div>
            )}

            <div className="transaction-row__detail-group">
              <Calendar className="transaction-row__detail-icon" />
              <div className="transaction-row__detail-content">
                <span className="transaction-row__detail-label">Fecha</span>
                <span className="transaction-row__detail-value">
                  {formatDate(transaction.date)} ·{" "}
                  {formatTime(transaction.date)}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="transaction-row__amount-section">
          <span className={`transaction-row__amount ${getAmountClass()}`}>
            {getAmountPrefix()}
            {formatCurrency(transaction.amount)}
          </span>
          <div className="transaction-row__id">
            <Hash className="transaction-row__id-icon" />
            <span className="transaction-row__id-text">
              {transaction.id.slice(0, 8)}
            </span>
          </div>
        </div>
      </div>
    </article>
  );
}
