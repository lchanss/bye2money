import DailyEntryGroup from "./DailyEntryGroup";

import type { GetEntryListResponse } from "@/apis/entry";

type EntryDailyGroupListProps = {
  dailyGroups: GetEntryListResponse["dailyGroups"];
};

export default function DailyEntryGroupList({
  dailyGroups,
}: EntryDailyGroupListProps) {
  return (
    <div>
      {dailyGroups.map((group) => (
        <DailyEntryGroup dailyGroup={group} key={group.date} />
      ))}
    </div>
  );
}
