import { http, HttpResponse, delay } from "msw";

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
];
