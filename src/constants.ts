import type { TransactionType } from "./types";

export const CATEGORIES: Record<TransactionType, string[]> = {
  expense: [
    "식비",
    "교통비",
    "통신비",
    "주거비",
    "의료비",
    "교육비",
    "문화생활비",
    "기타",
  ],
  income: ["급여", "상여", "용돈", "기타"],
} as const;
