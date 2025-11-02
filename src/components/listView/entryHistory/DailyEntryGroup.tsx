import DailyEntryGroupHeader from "./DailyEntryGroupHeader";
import EntryList from "./EntryList";

import type { DailyGroup } from "@/types";

type DailyEntryGroupProps = {
  dailyGroup: DailyGroup;
};

export default function DailyEntryGroup({ dailyGroup }: DailyEntryGroupProps) {
  return (
    <div>
      <DailyEntryGroupHeader
        date={dailyGroup.date}
        income={dailyGroup.dailySummary.income}
        expense={dailyGroup.dailySummary.expense}
      />
      <EntryList entries={dailyGroup.entries} />
    </div>
  );
}
