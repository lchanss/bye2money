import { useState, type PropsWithChildren } from "react";

import { DateContext } from "./DateContext";

const today = new Date();

export default function DateProvider({ children }: PropsWithChildren) {
  const [currentDate, setCurrentDate] = useState<Date>(today);

  return (
    <DateContext.Provider
      value={{
        currentDate,
        changeDate: setCurrentDate,
      }}
    >
      {children}
    </DateContext.Provider>
  );
}
