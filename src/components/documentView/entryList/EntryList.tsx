import type { GetEntryListResponse } from "@/apis/entry";
import type { Entry } from "@/types";

type EntryListProps = {
  entryList: GetEntryListResponse;
};

export default function EntryList({ entryList }: EntryListProps) {
  return (
    <div>
      EntryList
      <div></div>
    </div>
  );
}
