import type { GetEntryListResponse } from "@/apis/entry";
import { formatAmount } from "@/utils";

type MonthSummaryProps = {
  summary: GetEntryListResponse["summary"];
};

export default function MonthSummary({ summary }: MonthSummaryProps) {
  const { totalIncome, totalExpense } = summary;
  const total = totalIncome - totalExpense;

  return (
    <section className="mt-6 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <LabeledAmount label="총 수입" amount={totalIncome} />
        <LabeledAmount label="총 지출" amount={totalExpense} />
      </div>
      <LabeledAmount label="총합" amount={total} />
    </section>
  );
}

type LabeledAmountProps = {
  label: string;
  amount: number;
};

function LabeledAmount({ label, amount }: LabeledAmountProps) {
  return (
    <div className="text-serif-14">
      <span className="mr-2">{label}</span>
      <span>{formatAmount(amount)}원</span>
    </div>
  );
}
