import { Fragment, useEffect, useState } from "react";

import AmountField from "./AmountField";
import CategoryField from "./CategoryField";
import DateField from "./DateField";
import DescriptionField from "./DescriptionField";
import PaymentMethodField from "./PaymentMethodField";

import { createTransaction, getPaymentMethods } from "@/apis/transaction";
import Button from "@/components/common/Button";
import Divider from "@/components/common/Divider";
import { CATEGORIES } from "@/constants";
import type { Transaction } from "@/types";
import { formatDate } from "@/utils";

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
  const categories = CATEGORIES[transaction.transactionType];
  const [paymentMethods, setPaymentMethods] = useState<string[]>([]);

  const toggleTransactionType = () => {
    setTransaction((prev) => ({
      ...prev,
      transactionType: prev.transactionType === "income" ? "expense" : "income",
      paymentMethod: "",
    }));
  };

  const handleTransactionChange = <K extends keyof Transaction>(
    field: K,
    value: Transaction[K],
  ) => {
    setTransaction((prev) => ({ ...prev, [field]: value }));
  };

  const resetTransaction = () => {
    setTransaction(initialTransaction);
  };

  const handleAddTransaction = async () => {
    try {
      await createTransaction(transaction);
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
        paymentMethods={paymentMethods}
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
    <div className="bg-neutral-surface-default border-neutral-border-default flex h-20 gap-6 border px-6 py-4">
      {renderFields()}
      <Button
        showIcon
        disabled={!isTransactionValid(transaction)}
        onClick={handleAddTransaction}
      />
    </div>
  );
}

const isTransactionValid = (transaction: Transaction) => {
  return (
    transaction.date !== "" &&
    transaction.paymentMethod !== "" &&
    transaction.category !== ""
  );
};
