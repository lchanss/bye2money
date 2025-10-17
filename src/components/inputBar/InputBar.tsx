import { useState } from "react";

import LabeledInput from "../common/LabledInput";

import MinusIcon from "@/assets/icons/minus.svg?react";

type Transaction = {
  date: string;
  amount: number;
  description: string;
  paymentMethod: string;
  category: string;
};

const initialTransaction: Transaction = {
  date: "",
  amount: 0,
  description: "",
  paymentMethod: "",
  category: "",
};

export default function InputBar() {
  const [transaction, setTransaction] =
    useState<Transaction>(initialTransaction);

  const handleTransactionChange = (
    field: keyof Transaction,
    value: string | number,
  ) => {
    setTransaction((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <form className="bg-neutral-surface-default border-neutral-border-default flex h-19 gap-6 divide-x-1 border px-6 py-4 [&>*:not(:last-child)]:pr-6">
      <DateField
        value={transaction.date}
        onChange={(newValue) => handleTransactionChange("date", newValue)}
      />
      <AmountField
        value={transaction.amount}
        onChange={(newValue) => handleTransactionChange("amount", newValue)}
      />
      <DescriptionField
        value={transaction.description}
        onChange={(newValue) =>
          handleTransactionChange("description", newValue)
        }
      />
      <PaymentMethodField
        value={transaction.paymentMethod}
        onChange={(newValue) =>
          handleTransactionChange("paymentMethod", newValue)
        }
      />
      <CategoryField
        value={transaction.category}
        onChange={(newValue) => handleTransactionChange("category", newValue)}
      />
    </form>
  );
}

type DateFieldProps = {
  value: string;
  onChange: (newValue: string) => void;
};

function DateField({ value, onChange }: DateFieldProps) {
  return (
    <LabeledInput label="일자" htmlFor="date" width="w-[88px]">
      <input
        type="date"
        id="date"
        className="text-semibold-12"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </LabeledInput>
  );
}

type AmountFieldProps = {
  value: number;
  onChange: (newValue: number) => void;
};

function AmountField({ value, onChange }: AmountFieldProps) {
  return (
    <LabeledInput label="금액" htmlFor="amount" width="w-[134px]">
      <div className="flex justify-between">
        <button>
          <MinusIcon />
        </button>
        <div className="flex gap-1">
          <input
            type="text"
            id="amount"
            className="text-semibold-12 w-full"
            onChange={(e) => onChange(Number(e.target.value))}
          />
          원
        </div>
      </div>
    </LabeledInput>
  );
}

type DescriptionFieldProps = {
  value: string;
  onChange: (newValue: string) => void;
};

function DescriptionField({ value, onChange }: DescriptionFieldProps) {
  return (
    <LabeledInput label="내용" htmlFor="description" width="w-[160px]">
      <input
        type="text"
        id="description"
        className="text-semibold-12"
        placeholder="입력하세요"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </LabeledInput>
  );
}

type PaymentMethodFieldProps = {
  value: string;
  onChange: (newValue: string) => void;
};

function PaymentMethodField({ value, onChange }: PaymentMethodFieldProps) {
  return (
    <LabeledInput label="결제수단" htmlFor="payment-method" width="w-[104px]">
      <select
        id="payment-method"
        className="text-semibold-12"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="card">신용카드</option>
        <option value="bank">계좌이체</option>
        <option value="cash">현금</option>
      </select>
    </LabeledInput>
  );
}

type CategoryFieldProps = {
  value: string;
  onChange: (newValue: string) => void;
};

function CategoryField({ value, onChange }: CategoryFieldProps) {
  return (
    <LabeledInput label="카테고리" htmlFor="category" width="w-[104px]">
      <select
        id="category"
        className="text-semibold-12"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="food">식비</option>
        <option value="transport">교통비</option>
        <option value="entertainment">오락비</option>
      </select>
    </LabeledInput>
  );
}
