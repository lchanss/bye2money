import EntryDailyGroup from "./EntryDailyGroup";

import type { GetEntryListResponse } from "@/apis/entry";

type EntryDailyGroupListProps = {
  dailyGroups: GetEntryListResponse["dailyGroups"];
};

export default function EntryDailyGroupList({
  dailyGroups,
}: EntryDailyGroupListProps) {
  return (
    <div>
      {dailyGroups.map((group) => (
        <EntryDailyGroup dailyGroup={group} key={group.date} />
      ))}
    </div>
  );
}
