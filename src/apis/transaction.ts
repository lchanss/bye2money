import { getRequest } from ".";

type GetPaymentMethodsResponse = string[];

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
