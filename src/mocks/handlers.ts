import { http, HttpResponse, delay } from "msw";

import { MOCK_ENTRY_LIST, MOCK_PAYMENT_METHODS } from "./mockData";

import type { EntryType } from "@/types";

export type GetPaymentMethodListResponse = string[];

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

type PutEntryRequest = {
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

type Entry = {
  id: number;
  date: string;
  amount: number;
  description: string;
  paymentMethod: string;
  category: string;
  entryType: EntryType;
};

export const handlers = [
  // GET /api/payment-method
  http.get("/api/payment-method", async () => {
    await delay(500);

    return HttpResponse.json<GetPaymentMethodListResponse>(
      MOCK_PAYMENT_METHODS,
    );
  }),

  // POST /api/payment-method
  http.post("/api/payment-method", async ({ request }) => {
    await delay(500);

    const { method } = (await request.json()) as { method: string };

    if (!method || method.trim() === "") {
      return HttpResponse.json(
        { error: "결제수단 이름이 필요합니다" },
        { status: 400 },
      );
    }

    // 중복 체크
    if (MOCK_PAYMENT_METHODS.includes(method)) {
      return HttpResponse.json(
        { error: "이미 존재하는 결제수단입니다" },
        { status: 409 },
      );
    }

    MOCK_PAYMENT_METHODS.push(method);

    return HttpResponse.json({ method }, { status: 201 });
  }),

  // DELETE /api/payment-method/:method
  http.delete("/api/payment-method/:method", async ({ params }) => {
    await delay(500);

    const { method } = params;
    const decodedMethod = decodeURIComponent(method as string);

    const index = MOCK_PAYMENT_METHODS.indexOf(decodedMethod);

    if (index === -1) {
      return HttpResponse.json(
        { error: "결제수단을 찾을 수 없습니다" },
        { status: 404 },
      );
    }

    MOCK_PAYMENT_METHODS.splice(index, 1);

    return new HttpResponse(null, { status: 204 });
  }),

  // GET /api/entry
  http.get("/api/entry", async () => {
    await delay(500);

    return HttpResponse.json<GetEntryListResponse>(MOCK_ENTRY_LIST);
  }),

  // POST /api/entry
  http.post("/api/entry", async ({ request }) => {
    await delay(500);

    const newEntry = (await request.json()) as PostEntryRequest;

    if (!newEntry.date || !newEntry.amount) {
      return HttpResponse.json(
        { error: "필수 필드가 누락되었습니다" },
        { status: 400 },
      );
    }

    // 새 entry 생성
    const createdEntry: Entry = {
      id: Date.now(),
      ...newEntry,
    };

    // 날짜에서 일자만 추출 (YYYY-MM-DD)
    const entryDate = newEntry.date.split("T")[0];

    // 해당 날짜의 그룹 찾기
    const existingGroupIndex = MOCK_ENTRY_LIST.dailyGroups.findIndex(
      (group) => group.date === entryDate,
    );

    if (existingGroupIndex !== -1) {
      // 기존 그룹이 있으면 해당 그룹에 추가
      MOCK_ENTRY_LIST.dailyGroups[existingGroupIndex].entries.push(
        createdEntry,
      );

      // 해당 그룹의 dailySummary 업데이트
      const group = MOCK_ENTRY_LIST.dailyGroups[existingGroupIndex];
      if (newEntry.entryType === "income") {
        group.dailySummary.income += newEntry.amount;
      } else {
        group.dailySummary.expense += newEntry.amount;
      }

      // 날짜순으로 정렬 (최신순)
      group.entries.sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
      );
    } else {
      // 새 그룹 생성
      const newGroup: DailyGroup = {
        date: entryDate,
        dailySummary: {
          income: newEntry.entryType === "income" ? newEntry.amount : 0,
          expense: newEntry.entryType === "expense" ? newEntry.amount : 0,
        },
        entries: [createdEntry],
      };

      MOCK_ENTRY_LIST.dailyGroups.push(newGroup);

      // 날짜순으로 정렬 (최신순)
      MOCK_ENTRY_LIST.dailyGroups.sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
      );
    }

    // 전체 summary 업데이트
    if (newEntry.entryType === "income") {
      MOCK_ENTRY_LIST.summary.totalIncome += newEntry.amount;
    } else {
      MOCK_ENTRY_LIST.summary.totalExpense += newEntry.amount;
    }
    MOCK_ENTRY_LIST.summary.totalCount += 1;

    const response: PostEntryResponse = {
      id: createdEntry.id,
      ...newEntry,
      createdAt: new Date().toISOString(),
    };

    return HttpResponse.json<PostEntryResponse>(response, {
      status: 201,
    });
  }),

  // PUT /api/entry/:id
  http.put("/api/entry/:id", async ({ params, request }) => {
    const { id } = params;
    const entryId = Number(id);
    const updatedData = (await request.json()) as PutEntryRequest;

    // 해당 entry 찾아서 업데이트
    let updatedEntry: Entry | null = null;

    MOCK_ENTRY_LIST.dailyGroups = MOCK_ENTRY_LIST.dailyGroups.map((group) => ({
      ...group,
      entries: group.entries.map((entry) => {
        if (entry.id === entryId) {
          updatedEntry = { ...entry, ...updatedData, id: entryId };
          return updatedEntry;
        }
        return entry;
      }),
    }));

    if (!updatedEntry) {
      return HttpResponse.json({ error: "Entry not found" }, { status: 404 });
    }

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

    return HttpResponse.json(updatedEntry);
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
