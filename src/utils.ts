import type { EntryType } from "./types";

export const localeStringToNumber = (str: string) =>
  Number(str.replace(/,/g, ""));

export const formatDate = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const DAYS = ["일", "월", "화", "수", "목", "금", "토"] as const;

export const formatDateToKorean = (dateString: string) => {
  const date = new Date(dateString);
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const dayOfWeek = DAYS[date.getDay()];

  return `${month}월 ${day}일 ${dayOfWeek}요일`;
};

export const formatAmount = (amount: number) => {
  return amount.toLocaleString("ko-KR");
};

export const formatAmountWithSign = (amount: number, entryType: EntryType) => {
  const sign = entryType === "income" ? "" : "-";
  return `${sign} ${amount.toLocaleString("ko-KR")}`;
};
