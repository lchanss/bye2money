import { getRequest } from ".";

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

const MOCK_PAYMENT_METHODS = [
  "신용카드",
  "체크카드",
  "계좌이체",
  "현금",
  "모바일페이",
];

export const getPaymentMethods =
  async (): Promise<GetPaymentMethodsResponse> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(MOCK_PAYMENT_METHODS);
      }, 500);
    });
  };

export const createTransaction = async (
  transaction: PostTransactionRequest,
) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(transaction);
    }, 500);
  });
};
