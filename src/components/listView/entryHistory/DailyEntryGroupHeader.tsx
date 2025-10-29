import { formatAmount, formatDateToKorean } from "@/utils";

type DailyEntryGroupHeaderProps = {
  date: string;
  expense: number;
  income: number;
};

export default function DailyEntryGroupHeader({
  date,
  expense,
  income,
}: DailyEntryGroupHeaderProps) {
  return (
    <h4 className="text-serif-14 mb-4 flex items-center justify-between">
      <span>{formatDateToKorean(date)}</span>
      <div className="flex items-center gap-2">
        {expense > 0 && <AmountLabel type="expense" amount={expense} />}
        {income > 0 && <AmountLabel type="income" amount={income} />}
      </div>
    </h4>
  );
}

type AmountLabelProps = {
  type: "income" | "expense";
  amount: number;
};

function AmountLabel({ type, amount }: AmountLabelProps) {
  const label = type === "income" ? "수입" : "지출";

  return (
    <div className="flex items-center gap-2">
      <span>{label}</span>
      <span>{formatAmount(amount)}원</span>
    </div>
  );
}
