import { useState } from "react";

import AppTitle from "./AppTitle";
import MonthNavigator from "./MonthNavigator";
import ViewSelector from "./ViewSelector";

const today = new Date();

// TODO: 전역 상태로 날짜 관리
export default function Header() {
  const [date, setDate] = useState(today);

  const handlePrevClick = () => {
    const prevMonth = new Date(date.getFullYear(), date.getMonth() - 1, 1);
    setDate(prevMonth);
  };

  const handleNextClick = () => {
    const nextMonth = new Date(date.getFullYear(), date.getMonth() + 1, 1);
    setDate(nextMonth);
  };

  return (
    <header className="bg-colorchip-80 flex h-54 items-center justify-center gap-44 pt-10 pb-16">
      <AppTitle />
      <MonthNavigator
        date={date}
        onPrevClick={handlePrevClick}
        onNextClick={handleNextClick}
      />
      <ViewSelector />
    </header>
  );
}
