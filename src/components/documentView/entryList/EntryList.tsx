import { useState } from "react";

import type { GetEntryListResponse } from "@/apis/entry";
import Checkbox from "@/components/common/Checkbox";
import type { EntryType } from "@/types";

type EntryListProps = {
  entryList: GetEntryListResponse;
};

export default function EntryList({ entryList }: EntryListProps) {
  const [filter, setFilter] = useState<Record<EntryType, boolean>>({
    income: true,
    expense: true,
  });

  const toggleFilter = (type: EntryType) => {
    setFilter((prev) => ({ ...prev, [type]: !prev[type] }));
  };

  return (
    <div>
      <EntrySummary
        summary={entryList.summary}
        filter={filter}
        onChangeFilter={toggleFilter}
      />
      <div></div>
    </div>
  );
}

type EntrySummaryProps = {
  summary: GetEntryListResponse["summary"];
  filter: Record<EntryType, boolean>;
  onChangeFilter: (type: EntryType) => void;
};

function EntrySummary({ summary, filter, onChangeFilter }: EntrySummaryProps) {
  const { totalCount, totalIncome, totalExpense } = summary;

  return (
    <div className="mx-6 mb-10 flex items-center justify-between">
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
