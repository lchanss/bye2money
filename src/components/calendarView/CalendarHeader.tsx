const DAYS = ["일", "월", "화", "수", "목", "금", "토"] as const;

export default function CalendarHeader() {
  return (
    <div className="divide-neutral-border-default flex h-12 w-212 divide-x">
      {DAYS.map((day) => (
        <HeaderCell day={day} key={day} />
      ))}
    </div>
  );
}

function HeaderCell({ day }: { day: (typeof DAYS)[number] }) {
  return (
    <div className="bg-neutral-surface-default text-light-12 flex flex-1 items-center justify-center">
      {day}
    </div>
  );
}
