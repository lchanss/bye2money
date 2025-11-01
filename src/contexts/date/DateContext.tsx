import {
  createContext,
  useContext,
  type Dispatch,
  type SetStateAction,
} from "react";

type DateContextData = {
  currentDate: Date;
  changeDate: Dispatch<SetStateAction<Date>>;
};

export const DateContext = createContext<DateContextData>({
  currentDate: new Date(),
  changeDate: () => {
    throw new Error("DateContext not provided");
  },
});

DateContext.displayName = "Date";

export const useDateContext = () => useContext(DateContext);
