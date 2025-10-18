export type Transaction = {
  date: string;
  amount: number;
  description: string;
  paymentMethod: string;
  category: string;
  transactionType: TransactionType;
};

export type TransactionType = "income" | "expense";
