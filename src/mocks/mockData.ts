import type { GetEntryListResponse } from "./handlers";

export const MOCK_ENTRY_LIST: GetEntryListResponse = {
  summary: {
    totalIncome: 2798180,
    totalExpense: 765780,
    totalCount: 8,
  },
  dailyGroups: [
    {
      date: "2024-08-14",
      dailySummary: {
        income: 0,
        expense: 56240,
      },
      entries: [
        {
          id: 1,
          date: "2024-08-14T05:23:00",
          amount: 10900,
          description: "스트리밍 서비스 정기 결제",
          paymentMethod: "현대카드",
          category: "문화/여가",
          entryType: "expense",
        },
        {
          id: 2,
          date: "2024-08-14T00:15:00",
          amount: 45340,
          description: "우월 교통비 결제",
          paymentMethod: "현대카드",
          category: "교통",
          entryType: "expense",
        },
      ],
    },
    {
      date: "2024-08-13",
      dailySummary: {
        income: 0,
        expense: 10000,
      },
      entries: [
        {
          id: 3,
          date: "2024-08-13T09:30:00",
          amount: 10000,
          description: "온라인 세미나 신청",
          paymentMethod: "현대카드",
          category: "미분류",
          entryType: "expense",
        },
      ],
    },
    {
      date: "2024-08-10",
      dailySummary: {
        income: 2010580,
        expense: 9500,
      },
      entries: [
        {
          id: 4,
          date: "2024-08-10T14:20:00",
          amount: 9500,
          description: "전자금융수수료 감면",
          paymentMethod: "현대카드",
          category: "식비",
          entryType: "expense",
        },
        {
          id: 5,
          date: "2024-08-10T09:00:00",
          amount: 2010580,
          description: "8월 급여",
          paymentMethod: "현금",
          category: "월급",
          entryType: "income",
        },
      ],
    },
    {
      date: "2024-08-09",
      dailySummary: {
        income: 0,
        expense: 690040,
      },
      entries: [
        {
          id: 6,
          date: "2024-08-09T16:45:00",
          amount: 19140,
          description: "두유 4개",
          paymentMethod: "현대카드",
          category: "식비",
          entryType: "expense",
        },
        {
          id: 7,
          date: "2024-08-09T10:30:00",
          amount: 500000,
          description: "8월 월세",
          paymentMethod: "현대카드",
          category: "생활",
          entryType: "expense",
        },
        {
          id: 8,
          date: "2024-08-09T10:20:00",
          amount: 170900,
          description: "건강보험료",
          paymentMethod: "계좌이체",
          category: "의료/건강",
          entryType: "expense",
        },
      ],
    },
  ],
};
