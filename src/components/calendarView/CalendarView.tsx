import Calendar from "./Calendar";
import MonthSummary from "./MonthSummary";
import Fallback from "../common/Fallback";

import { useDateContext } from "@/contexts/date/DateContext";
import { useEntryContext } from "@/contexts/entry/EntryContext";

export default function CalendarView() {
  const { entryList } = useEntryContext();
  const { currentDate } = useDateContext();

  if (!entryList) return <Fallback />;

  return (
    <div>
      <Calendar dailyGroups={entryList.dailyGroups} date={currentDate} />
      <MonthSummary summary={entryList.summary} />
    </div>
  );
}
