import { getRequest, postRequest } from ".";

import type { EntryType } from "@/types";

type GetPaymentMethodsResponse = string[];

type PostEntryRequest = {
  date: string;
  amount: number;
  description: string;
  paymentMethod: string;
  category: string;
  entryType: EntryType;
};

export const getPaymentMethods = () => {
  return getRequest<GetPaymentMethodsResponse>("/payment-methods");
};

export const createEntry = (entry: PostEntryRequest) => {
  return postRequest("/entry", entry);
};
