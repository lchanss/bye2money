import { Fragment, useEffect, useState } from "react";

import AmountField from "./AmountField";
import CategoryField from "./CategoryField";
import DateField from "./DateField";
import DescriptionField from "./DescriptionField";
import PaymentMethodField from "./PaymentMethodField";

import { createEntry, getPaymentMethods } from "@/apis/entry";
import Button from "@/components/common/Button";
import Divider from "@/components/common/Divider";
import { CATEGORIES } from "@/constants";
import type { Entry } from "@/types";
import { formatDate } from "@/utils";

const initialEntry: Entry = {
  date: formatDate(new Date()),
  amount: 0,
  description: "",
  paymentMethod: "",
  category: "",
  entryType: "expense",
};

export default function EntryForm() {
  const [entry, setEntry] = useState<Entry>(initialEntry);
  const categories = CATEGORIES[entry.entryType];
  const [paymentMethods, setPaymentMethods] = useState<string[]>([]);

  const toggleTransactionType = () => {
    setEntry((prev) => ({
      ...prev,
      entryType: prev.entryType === "income" ? "expense" : "income",
      paymentMethod: "",
    }));
  };

  const handleTransactionChange = <K extends keyof Entry>(
    field: K,
    value: Entry[K],
  ) => {
    setEntry((prev) => ({ ...prev, [field]: value }));
  };

  const resetTransaction = () => {
    setEntry(initialEntry);
  };

  const handleAddTransaction = async () => {
    try {
      await createEntry(entry);
      resetTransaction();
      alert("거래 내역을 추가했습니다.");
    } catch (error) {
      console.log("Failed to create transaction:", error);
      alert("거래 내역 추가에 실패했습니다.");
    }
  };

  const renderFields = () => {
    const fields = [
      <DateField
        value={entry.date}
        onChange={(newValue) => handleTransactionChange("date", newValue)}
      />,
      <AmountField
        value={entry.amount}
        onChange={(newValue) => handleTransactionChange("amount", newValue)}
        transactionType={entry.entryType}
        toggleTransactionType={toggleTransactionType}
      />,
      <DescriptionField
        value={entry.description}
        onChange={(newValue) =>
          handleTransactionChange("description", newValue)
        }
      />,
      <PaymentMethodField
        value={entry.paymentMethod}
        onChange={(newValue) =>
          handleTransactionChange("paymentMethod", newValue)
        }
        paymentMethods={paymentMethods}
      />,
      <CategoryField
        value={entry.category}
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
        disabled={!isTransactionValid(entry)}
        onClick={handleAddTransaction}
      />
    </form>
  );
}

const isTransactionValid = (transaction: Entry) => {
  return (
    transaction.date !== "" &&
    transaction.paymentMethod !== "" &&
    transaction.category !== ""
  );
};
