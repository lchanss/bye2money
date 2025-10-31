import MinusIcon from "@/assets/icons/minus.svg?react";
import PlusIcon from "@/assets/icons/plus.svg?react";
import LabeledField from "@/components/common/LabeledField";
import TextInput from "@/components/common/textInput/TextInput";
import type { EntryType } from "@/types";
import { formatAmount, localeStringToNumber } from "@/utils";

type AmountFieldProps = {
  value: number;
  onChange: (newValue: number) => void;
  entryType: EntryType;
  toggleEntryType: () => void;
};

export default function AmountField({
  value,
  onChange,
  entryType,
  toggleEntryType,
}: AmountFieldProps) {
  return (
    <LabeledField label="금액" htmlFor="amount" width="w-[134px]">
      <div className="flex items-center gap-2">
        <button onClick={toggleEntryType}>
          {entryType === "income" ? (
            <PlusIcon width={16} height={16} />
          ) : (
            <MinusIcon width={16} height={16} />
          )}
        </button>
        <TextInput
          type="text"
          id="amount"
          className="text-semibold-12 w-full text-right"
          value={formatAmount(value)}
          onChange={(e) => onChange(localeStringToNumber(e.target.value) || 0)}
          textAreaOnly
        />
        <span className="leading-4">원</span>
      </div>
    </LabeledField>
  );
}
