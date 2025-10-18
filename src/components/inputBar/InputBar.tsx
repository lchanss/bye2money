import { Fragment, useState } from "react";

import Dropdown from "../common/DropDown";

import MinusIcon from "@/assets/icons/minus.svg?react";
import PlusIcon from "@/assets/icons/plus.svg?react";
import Button from "@/components/common/Button";
import Divider from "@/components/common/Divider";
import LabeledField from "@/components/common/LabledInput";
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
  const categories =
    transaction.transactionType === "expense"
      ? ["식비", "교통비", "통신비"]
      : ["급여", "상여", "기타"];

  const toggleTransactionType = () => {
    setTransaction((prev) => ({
      ...prev,
      transactionType: prev.transactionType === "income" ? "expense" : "income",
      category: "",
      paymentMethod: "",
    }));
  };

  const handleTransactionChange = (
    field: keyof Transaction,
    value: string | number,
  ) => {
    setTransaction((prev) => ({ ...prev, [field]: value }));
  };

  const renderFields = () => {
    const fields = [
      <DateField
        value={transaction.date}
        onChange={(newValue) => handleTransactionChange("date", newValue)}
      />,
      <AmountField
        value={transaction.amount}
        onChange={(newValue) => handleTransactionChange("amount", newValue)}
        transactionType={transaction.transactionType}
        toggleTransactionType={toggleTransactionType}
      />,
      <DescriptionField
        value={transaction.description}
        onChange={(newValue) =>
          handleTransactionChange("description", newValue)
        }
      />,
      <PaymentMethodField
        value={transaction.paymentMethod}
        onChange={(newValue) =>
          handleTransactionChange("paymentMethod", newValue)
        }
      />,
      <CategoryField
        value={transaction.category}
        onChange={(newValue) => handleTransactionChange("category", newValue)}
        categories={categories}
      />,
    ];

    return fields.map((field, index) => (
      <Fragment key={index}>
        {field}
        {index < fields.length - 1 && <Divider orientation="vertical" />}
      </Fragment>
    ));
  };

  return (
    <div className="bg-neutral-surface-default border-neutral-border-default flex h-20 gap-6 border px-6 py-4">
      {renderFields()}
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
    <LabeledField label="일자" htmlFor="date" width="w-[88px]">
      <input
        type="date"
        id="date"
        className="text-semibold-12"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </LabeledField>
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
    <LabeledField label="금액" htmlFor="amount" width="w-[134px]">
      <div className="flex items-center gap-2">
        <button onClick={toggleTransactionType}>
          {transactionType === "income" ? (
            <PlusIcon width={16} height={16} />
          ) : (
            <MinusIcon width={16} height={16} />
          )}
        </button>
        <TextInput
          type="text"
          id="amount"
          className="text-semibold-12 w-full text-right"
          value={value.toLocaleString()}
          onChange={(e) => onChange(localeStringToNumber(e.target.value) || 0)}
          textAreaOnly
        />
        <span className="leading-4">원</span>
      </div>
    </LabeledField>
  );
}

type DescriptionFieldProps = {
  value: string;
  onChange: (newValue: string) => void;
};

function DescriptionField({ value, onChange }: DescriptionFieldProps) {
  const MAX_LENGTH = 32;
  const textCount = `${value.length}/${MAX_LENGTH}`;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    if (newValue.length <= MAX_LENGTH) {
      onChange(newValue);
    }
  };

  return (
    <LabeledField
      label="내용"
      htmlFor="description"
      width="w-[160px]"
      helperText={textCount}
    >
      <TextInput
        id="description"
        className="text-semibold-12"
        value={value}
        onChange={handleChange}
        placeholder="입력하세요"
        textAreaOnly
      />
    </LabeledField>
  );
}

type PaymentMethodFieldProps = {
  value: string;
  onChange: (newValue: string) => void;
};

function PaymentMethodField({ value, onChange }: PaymentMethodFieldProps) {
  return (
    <LabeledField label="결제수단" htmlFor="payment-method" width="w-[104px]">
      <Dropdown
        options={["신용카드", "계좌이체", "현금"]}
        value={value}
        onChange={onChange}
        menuClassName="mt-4.5"
      />
    </LabeledField>
  );
}

type CategoryFieldProps = {
  value: string;
  onChange: (newValue: string) => void;
  categories: string[];
};

function CategoryField({ value, onChange, categories }: CategoryFieldProps) {
  return (
    <LabeledField label="카테고리" htmlFor="category" width="w-[104px]">
      <Dropdown
        options={categories}
        value={value}
        onChange={onChange}
        menuClassName="mt-4.5"
      />
    </LabeledField>
  );
}

const isTransactionValid = (transaction: Transaction): boolean => {
  return (
    transaction.date !== "" &&
    transaction.paymentMethod !== "" &&
    transaction.category !== ""
  );
};
