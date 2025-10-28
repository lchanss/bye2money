import type { GetEntryListResponse } from "@/apis/entry";

type EntryDailyGroupListProps = {
  dailyGroups: GetEntryListResponse["dailyGroups"];
};

export default function EntryDailyGroupList({
  dailyGroups,
}: EntryDailyGroupListProps) {
  return (
    <div>
      daily group list
      <div></div>
    </div>
  );
}
