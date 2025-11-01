import Calendar from "./Calendar";
import MonthSummary from "./MonthSummary";
import Fallback from "../common/Fallback";

import { useEntryContext } from "@/contexts/entry/EntryContext";

export default function CalendarView() {
  const { entryList } = useEntryContext();

  if (!entryList) return <Fallback />;

  return (
    <div>
      <Calendar dailyGroups={entryList.dailyGroups} />
      <MonthSummary summary={entryList.summary} />
    </div>
  );
}
