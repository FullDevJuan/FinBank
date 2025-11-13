import { type Transaction } from "../../types/transaction.type.ts";
import TransactionRow from "./TransactionRow";

interface TransactionListProps {
  transactions: Transaction[] | null;
}

export default function TransactionList({
  transactions,
}: TransactionListProps) {
  return (
    <div className="transactions-list">
      {transactions?.map((transaction) => (
        <TransactionRow key={transaction.id} transaction={transaction} />
      ))}
    </div>
  );
}
