import type { BankAccount } from "../../types/account.type";
import { Wallet, User, CreditCard, TrendingUp, Circle } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface AccountCardProps {
  account: BankAccount;
}

export default function AccountCard({ account }: AccountCardProps) {
  const navigate = useNavigate();
  const formatCurrency = (amount: string): string => {
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      minimumFractionDigits: 0,
    }).format(parseFloat(amount));
  };

  const formatAccountNumber = (accountNumber: string): string => {
    return accountNumber.replace(/(\d{4})(?=\d)/g, "$1 ");
  };

  const getAccountTypeLabel = (): string => {
    return account.account_type === "ahorros" ? "Ahorros" : "Corriente";
  };

  const getStatusColor = (status: string): string => {
    switch (status) {
      case "activo":
        return "account-card__status--active";
      case "inactivo":
        return "account-card__status--inactive";
      case "bloqueado":
        return "account-card__status--blocked";
      case "cerrado":
        return "account-card__status--closed";
      default:
        return "account-card__status--active";
    }
  };

  const getStatusLabel = (status: string): string => {
    switch (status) {
      case "activo":
        return "Activo";
      case "inactivo":
        return "Inactivo";
      case "bloqueado":
        return "Bloqueado";
      case "cerrado":
        return "Cerrado";
      default:
        return "Activo";
    }
  };
  return (
    <article
      className="account-card"
      onClick={() => {
        console.log(account);
        navigate(`/dashboard/accounts/${account.id}`);
      }}
    >
      <div className="account-card__accent" />

      <div className="account-card__content">
        <div className="account-card__header">
          <div className="account-card__type-badge">
            <Wallet className="account-card__type-icon" />
            <span className="account-card__type-label">
              {getAccountTypeLabel()}
            </span>
          </div>
          <div
            className={`account-card__status ${getStatusColor(account.status)}`}
          >
            <Circle className="account-card__status-dot" />
            <span>{getStatusLabel(account.status)}</span>
          </div>
        </div>

        <div className="account-card__balance-section">
          <span className="account-card__balance-label">Saldo actual</span>
          <span className="account-card__balance">
            {formatCurrency(account.current_balance)}
          </span>
        </div>

        <div className="account-card__divider" />

        <div className="account-card__info">
          <div className="account-card__info-row">
            <User className="account-card__icon" />
            <div className="account-card__info-content">
              <span className="account-card__label">Titular</span>
              <span className="account-card__value">{account.customer}</span>
            </div>
          </div>

          <div className="account-card__info-row">
            <CreditCard className="account-card__icon" />
            <div className="account-card__info-content">
              <span className="account-card__label">Número de cuenta</span>
              <span className="account-card__value account-card__value--mono">
                {formatAccountNumber(account.account_number)}
              </span>
            </div>
          </div>

          <div className="account-card__info-row">
            <TrendingUp className="account-card__icon" />
            <div className="account-card__info-content">
              <span className="account-card__label">Producto</span>
              <span className="account-card__value">{account.product}</span>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
