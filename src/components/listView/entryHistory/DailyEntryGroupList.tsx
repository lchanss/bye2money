import DailyEntryGroup from "./DailyEntryGroup";

import type { GetEntryListResponse } from "@/apis/entry";

type EntryDailyGroupListProps = {
  dailyGroups: GetEntryListResponse["dailyGroups"];
};

export default function DailyEntryGroupList({
  dailyGroups,
}: EntryDailyGroupListProps) {
  return (
    <div className="flex flex-col gap-10">
      {dailyGroups.map((group) => (
        <DailyEntryGroup dailyGroup={group} key={group.date} />
      ))}
    </div>
  );
}
