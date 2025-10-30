import { http, HttpResponse, delay } from "msw";

import { MOCK_ENTRY_LIST } from "./mockData";

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

type PostEntryResponse = PostEntryRequest & {
  id: number;
  createdAt: string;
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

type Entry = {
  id: number;
  date: string;
  amount: number;
  description: string;
  paymentMethod: string;
  category: string;
  entryType: EntryType;
};

const MOCK_PAYMENT_METHODS: GetPaymentMethodsResponse = [
  "신용카드",
  "체크카드",
  "계좌이체",
  "현금",
  "모바일페이",
];

export const handlers = [
  // GET /api/payment-methods
  http.get("/api/payment-methods", async () => {
    await delay(500);

    return HttpResponse.json<GetPaymentMethodsResponse>(MOCK_PAYMENT_METHODS);
  }),

  // POST /api/entry
  http.post("/api/entry", async ({ request }) => {
    await delay(500);

    const transaction = (await request.json()) as PostEntryRequest;

    if (!transaction.date || !transaction.amount) {
      return HttpResponse.json(
        { error: "필수 필드가 누락되었습니다" },
        { status: 400 },
      );
    }

    const response: PostEntryResponse = {
      id: Date.now(),
      ...transaction,
      createdAt: new Date().toISOString(),
    };

    return HttpResponse.json<PostEntryResponse>(response, {
      status: 201,
    });
  }),

  // GET /api/entry
  http.get("/api/entry", async () => {
    await delay(500);

    return HttpResponse.json<GetEntryListResponse>(MOCK_ENTRY_LIST);
  }),

  // DELETE /api/entry/:id
  http.delete("/api/entry/:id", async ({ params }) => {
    const { id } = params;
    const entryId = Number(id);

    // dailyGroups를 순회하며 해당 id의 entry 삭제
    MOCK_ENTRY_LIST.dailyGroups = MOCK_ENTRY_LIST.dailyGroups
      .map((group) => ({
        ...group,
        entries: group.entries.filter((entry) => entry.id !== entryId),
      }))
      .filter((group) => group.entries.length > 0); // 빈 그룹 제거

    // summary 재계산
    let totalIncome = 0;
    let totalExpense = 0;
    let totalCount = 0;

    MOCK_ENTRY_LIST.dailyGroups.forEach((group) => {
      group.entries.forEach((entry) => {
        totalCount++;
        if (entry.entryType === "income") {
          totalIncome += entry.amount;
        } else {
          totalExpense += entry.amount;
        }
      });

      // dailySummary도 재계산
      group.dailySummary = {
        income: group.entries
          .filter((e) => e.entryType === "income")
          .reduce((sum, e) => sum + e.amount, 0),
        expense: group.entries
          .filter((e) => e.entryType === "expense")
          .reduce((sum, e) => sum + e.amount, 0),
      };
    });

    MOCK_ENTRY_LIST.summary = {
      totalIncome,
      totalExpense,
      totalCount,
    };

    return new HttpResponse(null, { status: 204 });
  }),
];
