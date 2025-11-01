type CalendarBodyProps = {
  date: Date; // 해당 월의 첫날 (예: 2025-08-01)
};

type DateInfo = {
  date: number;
  isCurrentMonth: boolean;
};

export default function CalendarBody({ date }: CalendarBodyProps) {
  const weeks = generateCalendarDates(date);

  return (
    <div className="divide-neutral-border-default flex w-212 flex-col divide-y">
      {weeks.map((week, weekIndex) => (
        <div
          key={weekIndex}
          className="divide-neutral-border-default flex divide-x"
        >
          {week.map((dateInfo, dayIndex) => (
            <DateCell key={dayIndex} dateInfo={dateInfo} />
          ))}
        </div>
      ))}
    </div>
  );
}

function DateCell({ dateInfo }: { dateInfo: DateInfo }) {
  return (
    <div
      className={`bg-neutral-surface-default flex h-30 flex-1 flex-col gap-4 p-2 ${
        !dateInfo.isCurrentMonth && "opacity-40"
      }`}
    >
      <div className="flex-1 bg-amber-200">내역</div>
      <div className="text-serif-14 text-right">{dateInfo.date}</div>
    </div>
  );
}

const DAYS_PER_WEEK = 7;

const generateCalendarDates = (firstDayOfMonth: Date): DateInfo[][] => {
  const year = firstDayOfMonth.getFullYear();
  const month = firstDayOfMonth.getMonth(); // 0-11

  // 1. 해당 월의 첫날이 무슨 요일인지 (0=일요일)
  const firstDayOfWeek = firstDayOfMonth.getDay();

  // 2. 해당 월의 마지막 날짜
  const lastDate = new Date(year, month + 1, 0).getDate();

  // 3. 이전 달의 마지막 날짜
  const lastDateOfPrevMonth = new Date(year, month, 0).getDate();

  const dates: DateInfo[] = [];

  // 이전 달 날짜들
  for (let i = firstDayOfWeek - 1; i >= 0; i--) {
    dates.push({
      date: lastDateOfPrevMonth - i,
      isCurrentMonth: false,
    });
  }

  // 현재 달 날짜들
  for (let i = 1; i <= lastDate; i++) {
    dates.push({
      date: i,
      isCurrentMonth: true,
    });
  }

  // 다음 달 날짜들 (DAYS_PER_WEEK의 배수가 되도록)
  const totalCellsCount = dates.length;
  const imcompleteDaysCount = totalCellsCount % DAYS_PER_WEEK;
  const remainingCellsCount =
    imcompleteDaysCount === 0 ? 0 : DAYS_PER_WEEK - imcompleteDaysCount;
  for (let i = 1; i <= remainingCellsCount; i++) {
    dates.push({
      date: i,
      isCurrentMonth: false,
    });
  }

  // DAYS_PER_WEEK일씩 묶기
  const weeks: DateInfo[][] = [];
  for (let i = 0; i < dates.length; i += DAYS_PER_WEEK) {
    weeks.push(dates.slice(i, i + DAYS_PER_WEEK));
  }

  return weeks;
};
