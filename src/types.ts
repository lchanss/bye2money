export type Entry = {
  date: string;
  amount: number;
  description: string;
  paymentMethod: string;
  category: string;
  entryType: EntryType;
};

export type EntryType = "income" | "expense";

export type ViewType = "documents" | "calendar" | "charts";

type Response = {
  entries: Entry[];
  totalCount: number;
  totalIncome: number;
  totalExpense: number;
};

type Response2 = {
  entries: {
    date: string;
    entries: Entry[];
  }[];
  totalCount: number;
  totalIncome: number;
  totalExpense: number;
};
