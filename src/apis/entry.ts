import { deleteRequest, getRequest, postRequest, putRequest } from ".";

import type { DailyGroup, EntryType } from "@/types";

type GetPaymentMethodsResponse = string[];

export type PostEntryRequest = {
  date: string;
  amount: number;
  description: string;
  paymentMethod: string;
  category: string;
  entryType: EntryType;
};

export type PutEntryRequest = {
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

export const getPaymentMethods = () => {
  return getRequest<GetPaymentMethodsResponse>("/payment-methods");
};

export const getEntryList = () => {
  return getRequest<GetEntryListResponse>("/entry");
};

export const createEntry = (entry: PostEntryRequest) => {
  return postRequest("/entry", entry);
};

export const updateEntry = (id: number, entry: PutEntryRequest) => {
  return putRequest(`/entry/${id}`, entry);
};

export const deleteEntry = (id: number) => {
  return deleteRequest(`/entry/${id}`);
};
