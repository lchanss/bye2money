import { Fragment, useEffect, useState } from "react";

import AmountField from "./AmountField";
import CategoryField from "./CategoryField";
import DateField from "./DateField";
import DescriptionField from "./DescriptionField";
import PaymentMethodField from "./PaymentMethodField";

import {
  createEntry,
  getPaymentMethods,
  type PostEntryRequest,
} from "@/apis/entry";
import Button from "@/components/common/Button";
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
export default function EntryForm() {
  const [entry, setEntry] = useState<EntryFormData>(initialEntry);
  const categories = CATEGORIES[entry.entryType];
  const [paymentMethods, setPaymentMethods] = useState<string[]>([]);

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

  const handleAddEntry = async () => {
    try {
      await createEntry(entry as PostEntryRequest); // validation을 마쳤으므로 type assertion 사용
      resetEntry();
      alert("거래 내역을 추가했습니다.");
    } catch (error) {
      console.log("Failed to create entry:", error);
      alert("거래 내역 추가에 실패했습니다.");
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
        value={entry.paymentMethod}
        onChange={(newValue) => handleEntryChange("paymentMethod", newValue)}
        paymentMethods={paymentMethods}
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
        const methods = await getPaymentMethods();
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
        onClick={handleAddEntry}
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
