import { useState } from "react";

import Divider from "../common/Divider";

import MinusIcon from "@/assets/icons/minus.svg?react";
import PlusIcon from "@/assets/icons/plus.svg?react";
import Button from "@/components/common/Button";
import LabeledInput from "@/components/common/LabledInput";
import TextInput from "@/components/common/TextInput";
import type { Transaction, TransactionType } from "@/types";
import { formatDate, localeStringToNumber } from "@/utils";

const initialTransaction: Transaction = {
  date: formatDate(new Date()),
  amount: 0,
  description: "",
  paymentMethod: "",
  category: "",
  transactionType: "expense",
};

export default function InputBar() {
  const [transaction, setTransaction] =
    useState<Transaction>(initialTransaction);

  const toggleTransactionType = () => {
    setTransaction((prev) => ({
      ...prev,
      transactionType: prev.transactionType === "income" ? "expense" : "income",
    }));
  };

  const handleTransactionChange = (
    field: keyof Transaction,
    value: string | number,
  ) => {
    setTransaction((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="bg-neutral-surface-default border-neutral-border-default flex h-19 gap-6 border px-6 py-4">
      <div className="flex">
        <DateField
          value={transaction.date}
          onChange={(newValue) => handleTransactionChange("date", newValue)}
        />
        <Divider orientation="vertical" className="mx-6" />
        <AmountField
          value={transaction.amount}
          onChange={(newValue) => handleTransactionChange("amount", newValue)}
          transactionType={transaction.transactionType}
          toggleTransactionType={toggleTransactionType}
        />
        <Divider orientation="vertical" className="mx-6" />

        <DescriptionField
          value={transaction.description}
          onChange={(newValue) =>
            handleTransactionChange("description", newValue)
          }
        />
        <Divider orientation="vertical" className="mx-6" />

        <PaymentMethodField
          value={transaction.paymentMethod}
          onChange={(newValue) =>
            handleTransactionChange("paymentMethod", newValue)
          }
        />
        <Divider orientation="vertical" className="mx-6" />

        <CategoryField
          value={transaction.category}
          onChange={(newValue) => handleTransactionChange("category", newValue)}
        />
      </div>
      <Button showIcon disabled={!isTransactionValid(transaction)} />
    </div>
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
  transactionType: TransactionType;
  toggleTransactionType: () => void;
};

function AmountField({
  value,
  onChange,
  transactionType,
  toggleTransactionType,
}: AmountFieldProps) {
  return (
    <LabeledInput label="금액" htmlFor="amount" width="w-[134px]">
      <div className="flex items-center gap-2">
        <button onClick={toggleTransactionType}>
          {transactionType === "income" ? <PlusIcon /> : <MinusIcon />}
        </button>
        <TextInput
          type="text"
          id="amount"
          className="text-semibold-12 w-full text-right"
          value={value.toLocaleString()}
          onChange={(e) => onChange(localeStringToNumber(e.target.value) || 0)}
          textAreaOnly
        />
        원
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
      <TextInput
        id="description"
        className="text-semibold-12"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="입력하세요"
        textAreaOnly
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
        <option value="" disabled hidden>
          결제수단 선택
        </option>
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
        <option value="" disabled hidden>
          카테고리 선택
        </option>
        <option value="food">식비</option>
        <option value="transport">교통비</option>
        <option value="entertainment">오락비</option>
      </select>
    </LabeledInput>
  );
}

const isTransactionValid = (transaction: Transaction): boolean => {
  return (
    transaction.date !== "" &&
    transaction.description !== "" &&
    transaction.paymentMethod !== "" &&
    transaction.category !== ""
  );
};
