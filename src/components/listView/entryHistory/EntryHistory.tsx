import { useMemo, useState } from "react";

import DailyEntryGroupList from "./DailyEntryGroupList";
import EntrySummary from "./EntrySummary";

import type { GetEntryListResponse } from "@/apis/entry";
import Fallback from "@/components/common/Fallback";
import type { DailyGroup, Entry, EntryType } from "@/types";

type EntryHistoryProps = {
  entryList: GetEntryListResponse;
};

type FilterType = Record<EntryType, boolean>;

export default function EntryHistory({ entryList }: EntryHistoryProps) {
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
    <div className="mx-6">
      <EntrySummary
        summary={filteredEntryList.summary}
        filter={filter}
        onChangeFilter={toggleFilter}
      />
      {filteredEntryList.dailyGroups.length === 0 ? (
        <Fallback message="거래 내역이 없습니다. 거래 내역을 추가해보세요!" />
      ) : (
        <DailyEntryGroupList dailyGroups={filteredEntryList.dailyGroups} />
      )}
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

  const filteredGroups = data.dailyGroups
    .map((group) => filterDailyGroup(group, filter))
    .filter((group) => filterEmptyGroup(group));

  const summary = recalculateTotalSummary(data.summary, filteredGroups);

  return {
    summary,
    dailyGroups: filteredGroups,
  };
};

const filterEntries = (entries: Entry[], filter: FilterType): Entry[] => {
  return entries.filter((entry) => {
    if (filter.income && entry.entryType === "income") return true;
    if (filter.expense && entry.entryType === "expense") return true;
    return false;
  });
};

const calculateDailySummary = (
  originalSummary: DailyGroup["dailySummary"],
  filter: FilterType,
): DailyGroup["dailySummary"] => {
  return {
    income: filter.income ? originalSummary.income : 0,
    expense: filter.expense ? originalSummary.expense : 0,
  };
};

const filterDailyGroup = (
  group: DailyGroup,
  filter: FilterType,
): DailyGroup => {
  return {
    ...group,
    dailySummary: calculateDailySummary(group.dailySummary, filter),
    entries: filterEntries(group.entries, filter),
  };
};

const filterEmptyGroup = (group: DailyGroup) => {
  return group.entries.length > 0;
};

const recalculateTotalSummary = (
  originalSummary: GetEntryListResponse["summary"],
  filteredGroups: DailyGroup[],
): GetEntryListResponse["summary"] => {
  const totalCount = filteredGroups.reduce(
    (sum, group) => sum + group.entries.length,
    0,
  );

  return {
    ...originalSummary,
    totalCount,
  };
};
