import DailyGroupHeader from "./DailyGroupHeader";

import type { DailyGroup } from "@/types";

type EntryDailyGroupProps = {
  dailyGroup: DailyGroup;
};

export default function EntryDailyGroup({ dailyGroup }: EntryDailyGroupProps) {
  return (
    <div>
      <DailyGroupHeader
        date={dailyGroup.date}
        income={dailyGroup.dailySummary.income}
        expense={dailyGroup.dailySummary.expense}
      />
    </div>
  );
}
