import AppTitle from "./AppTitle";
import MonthNavigator from "./MonthNavigator";
import ViewSelector from "./ViewSelector";

import { useDateContext } from "@/contexts/date/DateContext";

export default function Header() {
  const { currentDate, changeDate } = useDateContext();

  const handlePrevClick = () => {
    const prevMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() - 1,
      1,
    );
    changeDate(prevMonth);
  };

  const handleNextClick = () => {
    const nextMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1,
      1,
    );
    changeDate(nextMonth);
  };

  return (
    <header className="bg-colorchip-80 flex h-54 items-center justify-center gap-44 pt-10 pb-16">
      <AppTitle />
      <MonthNavigator
        date={currentDate}
        onPrevClick={handlePrevClick}
        onNextClick={handleNextClick}
      />
      <ViewSelector />
    </header>
  );
}
