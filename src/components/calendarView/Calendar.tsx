import CalendarBody from "./CalendarBody";
import CalendarHeader from "./CalendarHeader";

import type { DailyGroup } from "@/types";

type CalendarProps = {
  dailyGroups: DailyGroup[];
  date: Date;
};

export default function Calendar({ dailyGroups, date }: CalendarProps) {
  return (
    <section className="border-neutral-border-default divide-y border">
      <CalendarHeader />
      <CalendarBody date={date} dailyGroups={dailyGroups} />
    </section>
  );
}
