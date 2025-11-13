export type TransactionType = "deposito" | "retiro" | "transferencia";
export type AccountType = "ahorros" | "corriente";

export interface Transaction {
  id: string;
  account_number: string;
  account_type: AccountType;
  amount: string;
  transaction_type: TransactionType;
  date: string;
  destination_account_number: string;
}
