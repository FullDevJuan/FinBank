import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { createTransaction, getAllAccounts } from "../../api/transactions.api";
import Span from "../common/Span";

interface Account {
  id: string;
  account_number: string;
  customer: string;
}

type CreateTransactionFormData = {
  transaction_type: string;
  amount: number;
  description: string;
  destination_account_id?: string;
};

interface CreateTransactionModalProps {
  accountId: string;
  onClose: () => void;
  onSuccess: () => void;
}

export default function CreateTransactionModal({
  accountId,
  onClose,
  onSuccess,
}: CreateTransactionModalProps) {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [isLoadingAccounts, setIsLoadingAccounts] = useState(true);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<CreateTransactionFormData>({
    defaultValues: {
      transaction_type: "deposito",
      amount: 0,
      description: "",
      destination_account_id: "",
    },
  });

  const transactionType = watch("transaction_type");

  useEffect(() => {
    const loadAccounts = async () => {
      try {
        setIsLoadingAccounts(true);
        const data = await getAllAccounts();
        if (Array.isArray(data)) {
          // Filtrar la cuenta actual para no permitir transferencia a sí misma
          const filteredAccounts = data.filter(
            (acc: Account) => acc.id !== accountId
          );
          setAccounts(filteredAccounts);
        }
      } catch (error) {
        console.error("Error loading accounts:", error);
      } finally {
        setIsLoadingAccounts(false);
      }
    };

    loadAccounts();
  }, [accountId]);

  const onSubmit = async (data: CreateTransactionFormData) => {
    try {
      const response = await createTransaction({
        account_id: accountId,
        transaction_type: data.transaction_type,
        amount: parseFloat(String(data.amount)),
        details: {
          description: data.description,
          destination_account_id:
            data.transaction_type === "transferencia"
              ? data.destination_account_id
              : null,
        },
      });

      alert(response?.msg || "Transaction created successfully");
      onSuccess();
      onClose();
    } catch (error) {
      alert("Error creating transaction");
      console.error(error);
    }
  };

  return (
    <div className="modal">
      <div className="modalContent registerProductModal">
        <div className="modalHeader">
          <h2>Register Transaction</h2>
          <button onClick={onClose} className="closeButton">
            ×
          </button>
        </div>

        {isLoadingAccounts ? (
          <p>Loading accounts...</p>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="modalForm">
            <div>
              <label htmlFor="transaction_type">Transaction Type</label>
              <select
                id="transaction_type"
                {...register("transaction_type", {
                  required: {
                    value: true,
                    message: "Required field",
                  },
                })}
              >
                <option value="deposito">Depósito</option>
                <option value="retiro">Retiro</option>
                <option value="transferencia">Transferencia</option>
              </select>
              {errors.transaction_type && (
                <Span>{String(errors.transaction_type.message)}</Span>
              )}
            </div>

            <div>
              <label htmlFor="amount">Amount</label>
              <input
                type="number"
                id="amount"
                step="0.01"
                {...register("amount", {
                  required: {
                    value: true,
                    message: "Required field",
                  },
                  min: {
                    value: 0.01,
                    message: "Amount must be greater than 0",
                  },
                })}
              />
              {errors.amount && <Span>{String(errors.amount.message)}</Span>}
            </div>

            <div>
              <label htmlFor="description">Description</label>
              <input
                type="text"
                id="description"
                {...register("description", {
                  required: {
                    value: true,
                    message: "Required field",
                  },
                })}
              />
              {errors.description && (
                <Span>{String(errors.description.message)}</Span>
              )}
            </div>

            {transactionType === "transferencia" && (
              <div>
                <label htmlFor="destination_account_id">
                  Destination Account
                </label>
                <select
                  id="destination_account_id"
                  {...register("destination_account_id", {
                    required: {
                      value: true,
                      message: "Required field for transfers",
                    },
                  })}
                >
                  <option value="">Select an account</option>
                  {accounts.map((account) => (
                    <option key={account.id} value={account.id}>
                      {account.account_number} - {account.customer}
                    </option>
                  ))}
                </select>
                {errors.destination_account_id && (
                  <Span>{String(errors.destination_account_id.message)}</Span>
                )}
              </div>
            )}

            <button type="submit" className="save">
              Create Transaction
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
