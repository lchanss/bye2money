export type Entry = {
  id: number;
  date: string;
  amount: number;
  description: string;
  paymentMethod: string;
  category: Category;
  entryType: EntryType;
};

export type EntryType = "income" | "expense";

export type ViewType = "list" | "calendar" | "charts";

export type DailyGroup = {
  date: string; // (YYYY-MM-DD)
  dailySummary: {
    income: number;
    expense: number;
  };
  entries: Entry[];
};

export type Category =
  | "생활"
  | "쇼핑/뷰티"
  | "의료/건강"
  | "식비"
  | "교통"
  | "문화/여가"
  | "미분류"
  | "월급"
  | "기타 수입"
  | "용돈";
