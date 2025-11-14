import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getAccounts } from "../../api/accounts.api";
import AccountTransactionsList from "./AccountTransactionsList";
import CreateTransactionModal from "../transactions/CreateTransactionModal";
import { ChevronLeft } from "lucide-react";

interface Account {
  id: string;
  account_number: string;
  account_type: string;
  customer: string;
  product: string;
  status: string;
  current_balance: number;
}

export default function AccountDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [account, setAccount] = useState<Account | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showTransactionModal, setShowTransactionModal] = useState(false);
  const [transactionRefresh, setTransactionRefresh] = useState(0);

  useEffect(() => {
    const loadAccount = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await getAccounts();
        if (Array.isArray(data)) {
          const foundAccount = data.find((acc: Account) => acc.id === id);
          if (foundAccount) {
            setAccount(foundAccount);
          } else {
            setError("Account not found");
          }
        } else {
          setError("Failed to load accounts");
        }
      } catch (err) {
        setError("Error loading account details");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    loadAccount();
  }, [id]);

  if (isLoading) {
    return (
      <section className="content">
        <p>Loading account details...</p>
      </section>
    );
  }

  if (error || !account) {
    return (
      <section className="content">
        <button className="backButton" onClick={() => navigate(-1)}>
          <ChevronLeft size={20} />
          Back
        </button>
        <p className="Error">{error || "Account not found"}</p>
      </section>
    );
  }

  const formatCurrency = (amount: number): string => {
    return `$${parseFloat(String(amount || 0)).toFixed(2)}`;
  };

  const handleTransactionSuccess = () => {
    setTransactionRefresh((prev) => prev + 1);
  };

  return (
    <section className="content">
      <button className="backButton" onClick={() => navigate(-1)}>
        <ChevronLeft size={20} />
        Back
      </button>

      <div className="accountDetailContainer">
        <div className="accountDetailHeader">
          <div className="accountDetailHeaderInfo">
            <h1>{account.account_number}</h1>
            <p className="accountDetailSubtitle">
              {account.customer} • {account.product}
            </p>
          </div>
          <div className="accountDetailBalance">
            <p className="balanceLabel">Current Balance</p>
            <p className="balanceAmount">
              {formatCurrency(account.current_balance)}
            </p>
          </div>
        </div>

        <div className="accountDetailGrid">
          <div className="accountDetailCard">
            <h3>Account Information</h3>
            <div className="accountDetailInfo">
              <div className="infoRow">
                <span className="infoLabel">Account Number</span>
                <span className="infoValue">{account.account_number}</span>
              </div>
              <div className="infoRow">
                <span className="infoLabel">Account Type</span>
                <span className="infoValue">{account.account_type}</span>
              </div>
              <div className="infoRow">
                <span className="infoLabel">Customer</span>
                <span className="infoValue">{account.customer}</span>
              </div>
              <div className="infoRow">
                <span className="infoLabel">Product</span>
                <span className="infoValue">{account.product}</span>
              </div>
              <div className="infoRow">
                <span className="infoLabel">Status</span>
                <span
                  className={`statusBadge statusBadge--${account.status?.toLowerCase()}`}
                >
                  {account.status}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            marginTop: "15px",
          }}
        >
          <button
            onClick={() => setShowTransactionModal(true)}
            className="save"
          >
            + Register Transaction
          </button>
        </div>

        <AccountTransactionsList
          accountId={account.id}
          refreshTrigger={transactionRefresh}
        />

        {showTransactionModal && (
          <CreateTransactionModal
            accountId={account.id}
            onClose={() => setShowTransactionModal(false)}
            onSuccess={handleTransactionSuccess}
          />
        )}
      </div>
    </section>
  );
}
