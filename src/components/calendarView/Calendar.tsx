import CalendarBody from "./CalendarBody";
import CalendarHeader from "./CalendarHeader";

import type { DailyGroup } from "@/types";

type CalendarProps = {
  dailyGroups: DailyGroup[];
};

export default function Calendar({ dailyGroups }: CalendarProps) {
  return (
    <section className="border-neutral-border-default divide-y border">
      <CalendarHeader />
      <CalendarBody date={new Date("2024-08-01")} dailyGroups={dailyGroups} />
    </section>
  );
}
