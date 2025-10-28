import { getRequest, postRequest } from ".";

import type { Entry, EntryType } from "@/types";

type GetPaymentMethodsResponse = string[];

type PostEntryRequest = {
  date: string;
  amount: number;
  description: string;
  paymentMethod: string;
  category: string;
  entryType: EntryType;
};

export type GetEntryListResponse = {
  summary: {
    totalIncome: number;
    totalExpense: number;
    totalCount: number;
  };
  dailyGroups: DailyGroup[];
};

type DailyGroup = {
  date: string; // (YYYY-MM-DD)
  dailySummary: {
    income: number;
    expense: number;
  };
  entries: Entry[];
};

export const getPaymentMethods = () => {
  return getRequest<GetPaymentMethodsResponse>("/payment-methods");
};

export const createEntry = (entry: PostEntryRequest) => {
  return postRequest("/entry", entry);
};

export const getEntryList = () => {
  return getRequest<GetEntryListResponse>("/entry");
};
