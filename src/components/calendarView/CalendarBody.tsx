import { useMemo } from "react";

import type { DailyGroup } from "@/types";
import { formatAmount, formatAmountWithSign, formatDate } from "@/utils";

type CalendarBodyProps = {
  date: Date;
  dailyGroups: DailyGroup[];
};

type DateInfo = {
  date: Date;
  isCurrentMonth: boolean;
};

export default function CalendarBody({ date, dailyGroups }: CalendarBodyProps) {
  const weeks = generateCalendarDates(date);

  const dailyGroupMap = useMemo(() => {
    const map = new Map<string, DailyGroup>();
    dailyGroups.forEach((group) => {
      map.set(group.date, group);
    });
    return map;
  }, [dailyGroups]);

  return (
    <div className="divide-neutral-border-default flex w-212 flex-col divide-y">
      {weeks.map((week, weekIndex) => (
        <div
          key={weekIndex}
          className="divide-neutral-border-default flex divide-x"
        >
          {week.map((dateInfo) => {
            const dateKey = formatDate(dateInfo.date);
            const dailyGroup = dailyGroupMap.get(dateKey);

            return (
              <DateCell
                key={dateKey}
                dateInfo={dateInfo}
                dailySummary={dailyGroup?.dailySummary}
              />
            );
          })}
        </div>
      ))}
    </div>
  );
}

type DateCellProps = {
  dateInfo: DateInfo;
  dailySummary?: DailyGroup["dailySummary"];
};

function DateCell({ dateInfo, dailySummary }: DateCellProps) {
  const dailyTotal = dailySummary?.income
    ? dailySummary.income - dailySummary.expense
    : 0;

  return (
    <div
      className={`bg-neutral-surface-default flex h-30 flex-1 flex-col gap-4 p-2 ${
        !dateInfo.isCurrentMonth && "text-neutral-text-weak"
      }`}
    >
      <section className="flex-1">
        {dailySummary && (
          <>
            {dailySummary.income ? (
              <p className="text-brand-text-income">
                {formatAmount(dailySummary.income)}
              </p>
            ) : null}
            {dailySummary.expense ? (
              <p className="text-brand-text-expense">
                {formatAmountWithSign(dailySummary.expense, "expense")}
              </p>
            ) : null}
            {dailyTotal ? (
              <p className="text-neutral-text-default">
                {formatAmount(dailyTotal)}
              </p>
            ) : null}
          </>
        )}
      </section>
      <div className="text-serif-14 text-right">{dateInfo.date.getDate()}</div>
    </div>
  );
}

const DAYS_PER_WEEK = 7;

const generateCalendarDates = (currentDate: Date): DateInfo[][] => {
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth(); // 0-11
  const firstDayOfMonth = new Date(year, month, 1);

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
      date: new Date(year, month - 1, lastDateOfPrevMonth - i),
      isCurrentMonth: false,
    });
  }

  // 현재 달 날짜들
  for (let i = 1; i <= lastDate; i++) {
    dates.push({
      date: new Date(year, month, i),
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
      date: new Date(year, month + 1, i),
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
