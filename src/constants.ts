import type { Category, EntryType } from "./types";

export const CATEGORIES: Record<EntryType, Category[]> = {
  expense: [
    "생활",
    "쇼핑/뷰티",
    "의료/건강",
    "식비",
    "교통",
    "문화/여가",
    "미분류",
  ],
  income: ["월급", "기타 수입", "용돈"],
} as const;
