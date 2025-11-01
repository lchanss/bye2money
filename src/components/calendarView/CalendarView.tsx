import Calendar from "./Calendar";

import { useEntryContext } from "@/contexts/entry/EntryContext";

export default function CalendarView() {
  const { entryList } = useEntryContext();

  return (
    <div>
      <Calendar dailyGroups={entryList?.dailyGroups || []} /> <div></div>
    </div>
  );
}
