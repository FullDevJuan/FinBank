export type AccountStatus = "activo" | "inactivo" | "bloqueado" | "cerrado";
export type AccountType = "ahorros" | "corriente";

export interface BankAccount {
  id: string;
  customer: string;
  current_balance: string;
  status: AccountStatus;
  product: string;
  account_type: AccountType;
  account_number: string;
}
