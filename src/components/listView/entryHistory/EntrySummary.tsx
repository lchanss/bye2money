import type { GetEntryListResponse } from "@/apis/entry";
import Checkbox from "@/components/common/Checkbox";
import type { EntryType } from "@/types";

type EntrySummaryProps = {
  summary: GetEntryListResponse["summary"];
  filter: Record<EntryType, boolean>;
  onChangeFilter: (type: EntryType) => void;
};

export default function EntrySummary({
  summary,
  filter,
  onChangeFilter,
}: EntrySummaryProps) {
  const { totalCount, totalIncome, totalExpense } = summary;

  return (
    <div className="mb-10 flex items-center justify-between">
      <span>전체 내역 {totalCount}건</span>
      <div className="flex items-center gap-3">
        <Checkbox
          checked={filter.income}
          label={`수입 ${totalIncome.toLocaleString()}`}
          onChange={() => onChangeFilter("income")}
        />
        <Checkbox
          checked={filter.expense}
          label={`지출 ${totalExpense.toLocaleString()}`}
          onChange={() => onChangeFilter("expense")}
        />
      </div>
    </div>
  );
}
