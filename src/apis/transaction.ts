import { getRequest, postRequest } from ".";

import type { TransactionType } from "@/types";

type GetPaymentMethodsResponse = string[];

type PostTransactionRequest = {
  date: string;
  amount: number;
  description: string;
  paymentMethod: string;
  category: string;
  transactionType: TransactionType;
};

export const getPaymentMethods = () => {
  return getRequest<GetPaymentMethodsResponse>("/payment-methods");
};

export const createTransaction = (transaction: PostTransactionRequest) => {
  return postRequest("/transactions", transaction);
};
