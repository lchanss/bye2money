import { Fragment, useEffect, useState } from "react";

import AmountField from "./AmountField";
import CategoryField from "./CategoryField";
import DateField from "./DateField";
import DescriptionField from "./DescriptionField";
import PaymentMethodField from "./PaymentMethodField";

import {
  deletePaymentMethod,
  getPaymentMethodList,
} from "@/apis/paymentMethod";
import Button from "@/components/common/button/Button";
import Divider from "@/components/common/Divider";
import { CATEGORIES } from "@/constants";
import type { Category, Entry } from "@/types";
import { formatDate } from "@/utils";

const initialEntry: EntryFormData = {
  date: formatDate(new Date()),
  amount: 0,
  description: "",
  paymentMethod: "",
  category: null,
  entryType: "expense",
};

export type EntryFormData = Omit<Entry, "id" | "category"> & {
  category: Category | null;
};

type EntryFormProps = {
  initialData?: EntryFormData;
  onSubmit: (data: EntryFormData, id?: string) => Promise<void>;
};

export default function EntryForm({ initialData, onSubmit }: EntryFormProps) {
  const [entry, setEntry] = useState<EntryFormData>(
    initialData || initialEntry,
  );
  const categories = CATEGORIES[entry.entryType];
  const [paymentMethods, setPaymentMethods] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const toggleEntryType = () => {
    setEntry((prev) => ({
      ...prev,
      entryType: prev.entryType === "income" ? "expense" : "income",
      paymentMethod: "",
    }));
  };

  const handleEntryChange = <K extends keyof EntryFormData>(
    field: K,
    value: EntryFormData[K],
  ) => {
    setEntry((prev) => ({ ...prev, [field]: value }));
  };

  const resetEntry = () => {
    setEntry(initialEntry);
  };

  const handleSubmit = async () => {
    if (!isEntryValid(entry) || isSubmitting) return;

    setIsSubmitting(true);

    try {
      await onSubmit(entry);
      resetEntry();
    } catch (error) {
      console.log("Failed to submit:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeletePaymentMethod = async (method: string) => {
    try {
      await deletePaymentMethod(method);

      // 로컬 상태에서 삭제
      setPaymentMethods((prev) => prev.filter((m) => m !== method));

      // 현재 선택된 method가 삭제된 거라면 초기화
      if (entry.paymentMethod === method) {
        setEntry((prev) => ({ ...prev, paymentMethod: "" }));
      }
    } catch (error) {
      console.log("Failed to delete payment method:", error);
    }
  };

  const handleAddPaymentMethod = async () => {
    const newMethod = prompt("새로운 결제수단을 입력하세요:");
    if (!newMethod?.trim()) return;

    try {
      // TODO: 실제 API 호출 추가
      // await addPaymentMethod(newMethod);

      // 로컬 상태에 추가
      setPaymentMethods((prev) => [...prev, newMethod]);
    } catch (error) {
      console.log("Failed to add payment method:", error);
    }
  };

  const renderFields = () => {
    const fields = [
      <DateField
        value={entry.date}
        onChange={(newValue) => handleEntryChange("date", newValue)}
      />,
      <AmountField
        value={entry.amount}
        onChange={(newValue) => handleEntryChange("amount", newValue)}
        entryType={entry.entryType}
        toggleEntryType={toggleEntryType}
      />,
      <DescriptionField
        value={entry.description}
        onChange={(newValue) => handleEntryChange("description", newValue)}
      />,
      <PaymentMethodField
        methods={paymentMethods}
        selectedMethod={entry.paymentMethod}
        onSelect={(newValue) => handleEntryChange("paymentMethod", newValue)}
        onDelete={handleDeletePaymentMethod}
        onAdd={handleAddPaymentMethod}
      />,
      <CategoryField
        value={entry.category}
        onChange={(newValue) => handleEntryChange("category", newValue)}
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

  useEffect(() => {
    const fetchPaymentMethods = async () => {
      try {
        const methods = await getPaymentMethodList();
        setPaymentMethods(methods);
      } catch (error) {
        console.log("Failed to fetch payment methods:", error);
      }
    };
    fetchPaymentMethods();
  }, []);

  return (
    <form className="bg-neutral-surface-default border-neutral-border-default mb-8 flex h-20 gap-6 border px-6 py-4">
      {renderFields()}
      <Button
        showIcon
        disabled={!isEntryValid(entry)}
        onClick={handleSubmit}
        size="large"
      />
    </form>
  );
}

const isEntryValid = (entry: EntryFormData) => {
  return (
    entry.date !== "" &&
    entry.description.trim() !== "" &&
    entry.paymentMethod !== "" &&
    entry.category !== null
  );
};
