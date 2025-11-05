import type { DailyGroup, DateInfo } from "@/types";
import { formatAmount } from "@/utils";

type DateCellProps = {
  dateInfo: DateInfo;
  dailySummary?: DailyGroup["dailySummary"];
  isToday: boolean;
};

export default function DateCell({
  dateInfo,
  dailySummary,
  isToday,
}: DateCellProps) {
  return (
    <div
      className={`${isToday ? "bg-neutral-surface-point" : "bg-neutral-surface-default"} flex h-30 flex-1 flex-col gap-4 p-2 ${
        !dateInfo.isCurrentMonth && "text-neutral-text-weak"
      }`}
    >
      <DailySummarySection dailySummary={dailySummary} />
      <DateText date={dateInfo.date} />
    </div>
  );
}

type DailySummarySectionProps = {
  dailySummary?: DailyGroup["dailySummary"];
};

function DailySummarySection({ dailySummary }: DailySummarySectionProps) {
  const dailyTotal = dailySummary?.income
    ? dailySummary.income - dailySummary.expense
    : 0;

  return (
    <section className="flex-1">
      {dailySummary && (
        <>
          {dailySummary.income > 0 && (
            <AmountText
              amount={dailySummary.income}
              color="text-brand-text-income"
            />
          )}
          {dailySummary.expense > 0 && (
            <AmountText
              amount={0 - dailySummary.expense}
              color="text-brand-text-expense"
            />
          )}
          {dailyTotal != 0 && (
            <AmountText amount={dailyTotal} color="text-neutral-text-default" />
          )}
        </>
      )}
    </section>
  );
}

type AmountTextProps = {
  amount: number;
  color: string;
};

function AmountText({ amount, color }: AmountTextProps) {
  return <p className={`${color}`}>{formatAmount(amount)}</p>;
}

type DateTextProps = {
  date: Date;
};

function DateText({ date }: DateTextProps) {
  return <div className="text-serif-14 text-right">{date.getDate()}</div>;
}
