import MinusIcon from "@/assets/icons/minus.svg?react";
import PlusIcon from "@/assets/icons/plus.svg?react";
import LabeledField from "@/components/common/LabeledField";
import TextInput from "@/components/common/TextInput";
import type { EntryType } from "@/types";
import { localeStringToNumber } from "@/utils";

type AmountFieldProps = {
  value: number;
  onChange: (newValue: number) => void;
  transactionType: EntryType;
  toggleTransactionType: () => void;
};

export default function AmountField({
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
