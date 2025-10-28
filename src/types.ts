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
