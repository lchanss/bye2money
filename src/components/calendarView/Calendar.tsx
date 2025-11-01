import CalendarBody from "./CalendarBody";
import CalendarHeader from "./CalendarHeader";

export default function Calendar() {
  return (
    <section className="border-neutral-border-default divide-y border">
      <CalendarHeader />
      <CalendarBody date={new Date()} />
    </section>
  );
}
