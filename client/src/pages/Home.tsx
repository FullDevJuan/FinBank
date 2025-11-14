import { useEffect, useState } from "react";
import {
  Users,
  CreditCard,
  TrendingUp,
  MessageSquare,
  DollarSign,
  MonitorCheck,
  MonitorOff,
} from "lucide-react";
import {
  getDashboardStats,
  getRecentTransactions,
  getRecentInteractions,
  getAccountsSummary,
} from "../api/home.api";
import type { Interaction } from "../types/interaction.type";
import "./home.css";

interface Transaction {
  id: string;
  account_number: string;
  amount: number;
  transaction_type: string;
  date: string;
}

interface StatCard {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  color: string;
}

export default function Home() {
  const [stats, setStats] = useState({
    totalCustomers: 0,
    totalAccounts: 0,
    totalTransactions: 0,
    totalInteractions: 0,
  });
  const [recentTransactions, setRecentTransactions] = useState<Transaction[]>(
    []
  );
  const [recentInteractions, setRecentInteractions] = useState<Interaction[]>(
    []
  );
  const [accountSummary, setAccountSummary] = useState({
    totalBalance: 0,
    accountsByStatus: { active: 0, inactive: 0 },
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        setIsLoading(true);
        const [dashboardStats, transactions, interactions, accounts] =
          await Promise.all([
            getDashboardStats(),
            getRecentTransactions(5),
            getRecentInteractions(5),
            getAccountsSummary(),
          ]);

        setStats(dashboardStats);
        setRecentTransactions(transactions);
        setRecentInteractions(interactions);
        setAccountSummary({
          totalBalance: accounts.totalBalance,
          accountsByStatus: accounts.accountsByStatus,
        });
      } catch (error) {
        console.error("Error loading dashboard data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadDashboardData();
  }, []);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("es-CO");
  };

  const statCards: StatCard[] = [
    {
      icon: <Users className="stat-card__icon" />,
      label: "Total Clientes",
      value: stats.totalCustomers,
      color: "blue",
    },
    {
      icon: <CreditCard className="stat-card__icon" />,
      label: "Total Cuentas",
      value: stats.totalAccounts,
      color: "green",
    },
    {
      icon: <TrendingUp className="stat-card__icon" />,
      label: "Total Transacciones",
      value: stats.totalTransactions,
      color: "purple",
    },
    {
      icon: <MessageSquare className="stat-card__icon" />,
      label: "Total Interacciones",
      value: stats.totalInteractions,
      color: "orange",
    },
  ];

  if (isLoading) {
    return (
      <section className="content">
        <h1>Welcome to FinBank CRM.</h1>
        <p>Loading dashboard data...</p>
      </section>
    );
  }

  return (
    <section className="content">
      <div className="home-header">
        <h1>Welcome to FinBank CRM.</h1>
        {/* <p>Your financial management dashboard</p> */}
      </div>

      {/* Statistics Cards */}
      <div className="stats-grid">
        {statCards.map((card, index) => (
          <div key={index} className={`stat-card stat-card--${card.color}`}>
            {card.icon}
            <div className="stat-card__content">
              <span className="stat-card__label">{card.label}</span>
              <span className="stat-card__value">{card.value}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Account Balance Summary */}
      <div className="dashboard-section">
        <h2>Resumen de Cuentas</h2>
        <div className="account-summary">
          <div className="summary-card">
            <DollarSign className="summary-icon" />
            <div className="summary-content">
              <span className="summary-label">Saldo Total</span>
              <span className="summary-value">
                {formatCurrency(accountSummary.totalBalance)}
              </span>
            </div>
          </div>
          <div className="summary-card">
            <MonitorCheck className="summary-icon" />
            <div className="summary-content">
              <span className="summary-label">Cuentas Activas</span>
              <span className="summary-value">
                {accountSummary.accountsByStatus.active}
              </span>
            </div>
          </div>
          <div className="summary-card">
            <MonitorOff className="summary-icon" />
            <div className="summary-content">
              <span className="summary-label">Cuentas Inactivas</span>
              <span className="summary-value">
                {accountSummary.accountsByStatus.inactive}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="dashboard-section">
        <h2>Transacciones Recientes</h2>
        {recentTransactions.length > 0 ? (
          <div className="recent-items">
            <table className="recent-table">
              <thead>
                <tr>
                  <th>Cuenta</th>
                  <th>Tipo</th>
                  <th>Monto</th>
                  <th>Fecha</th>
                </tr>
              </thead>
              <tbody>
                {recentTransactions.map((transaction) => (
                  <tr key={transaction.id}>
                    <td>{transaction.account_number}</td>
                    <td>{transaction.transaction_type}</td>
                    <td>{formatCurrency(transaction.amount)}</td>
                    <td>{formatDate(transaction.date)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="no-data">No recent transactions</p>
        )}
      </div>

      {/* Recent Interactions */}
      <div className="dashboard-section">
        <h2>Interacciones Recientes</h2>
        {recentInteractions.length > 0 ? (
          <div className="recent-items">
            <ul className="interaction-list">
              {recentInteractions.map((interaction) => (
                <li key={interaction.id} className="interaction-item">
                  <div className="interaction-item__header">
                    <span className="interaction-item__customer">
                      {interaction.customer}
                    </span>
                    <span className="interaction-item__type">
                      {interaction.interaction_type}
                    </span>
                  </div>
                  <p className="interaction-item__subject">
                    {interaction.subject}
                  </p>
                  <div className="interaction-item__footer">
                    <span className="interaction-item__date">
                      {formatDate(interaction.date)}
                    </span>
                    <span
                      className={`interaction-item__outcome interaction-item__outcome--${interaction.outcome}`}
                    >
                      {interaction.outcome}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <p className="no-data">No recent interactions</p>
        )}
      </div>
    </section>
  );
}
