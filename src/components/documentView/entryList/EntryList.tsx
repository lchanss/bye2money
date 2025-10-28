import { useMemo, useState } from "react";

import EntryDailyGroupList from "./EntryDailyGroupList";
import EntrySummary from "./EntrySummary";

import type { GetEntryListResponse } from "@/apis/entry";
import type { EntryType } from "@/types";

type EntryListProps = {
  entryList: GetEntryListResponse;
};

type FilterType = Record<EntryType, boolean>;

export default function EntryList({ entryList }: EntryListProps) {
  const [filter, setFilter] = useState<FilterType>({
    income: true,
    expense: true,
  });

  const filteredEntryList = useMemo(() => {
    return filterEntryList(entryList, filter);
  }, [entryList, filter]);

  const toggleFilter = (type: EntryType) => {
    setFilter((prev) => ({ ...prev, [type]: !prev[type] }));
  };

  return (
    <div>
      <EntrySummary
        summary={filteredEntryList.summary}
        filter={filter}
        onChangeFilter={toggleFilter}
      />
      <EntryDailyGroupList dailyGroups={filteredEntryList.dailyGroups} />
    </div>
  );
}

const filterEntryList = (
  data: GetEntryListResponse,
  filter: FilterType,
): GetEntryListResponse => {
  // 둘 다 체크되어 있으면 원본 반환
  if (filter.income && filter.expense) return data;

  // 둘 다 체크 안 되어 있으면 빈 데이터
  if (!filter.income && !filter.expense) {
    return {
      summary: { totalIncome: 0, totalExpense: 0, totalCount: 0 },
      dailyGroups: [],
    };
  }

  // 필터링된 dailyGroups 생성
  const filteredGroups: GetEntryListResponse["dailyGroups"] = data.dailyGroups
    .map((group) => {
      const filteredEntries = group.entries.filter((entry) => {
        if (filter.income && entry.entryType === "income") return true;
        if (filter.expense && entry.entryType === "expense") return true;
        return false;
      });

      const dailySummary = {
        income: filter.income ? group.dailySummary.income : 0,
        expense: filter.expense ? group.dailySummary.expense : 0,
      };

      return {
        ...group,
        dailySummary,
        entries: filteredEntries,
      };
    })
    .filter((group) => group.entries.length > 0); // 빈 날짜 제거

  // 전체 summary 재계산
  const summary: GetEntryListResponse["summary"] = {
    ...data.summary,
    totalCount: filteredGroups.reduce(
      (sum, group) => sum + group.entries.length,
      0,
    ),
  };

  return {
    summary,
    dailyGroups: filteredGroups,
  };
};
