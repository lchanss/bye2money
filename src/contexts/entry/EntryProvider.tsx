import {
  useState,
  useCallback,
  type PropsWithChildren,
  useEffect,
} from "react";

import { EntryContext } from "./EntryContext";

import { useDateContext } from "../date/DateContext";

import { getEntryList, type GetEntryListResponse } from "@/apis/entry";
import type { Entry } from "@/types";

export default function EntryProvider({ children }: PropsWithChildren) {
  const [entryList, setEntryList] = useState<GetEntryListResponse | null>(null);
  const [selectedEntry, setSelectedEntry] = useState<Entry | null>(null);
  const { currentDate } = useDateContext();

  const fetchEntryList = useCallback(async (year: number, month: number) => {
    try {
      const data = await getEntryList({ year, month });
      setEntryList(data);
    } catch (error) {
      console.log("Failed to fetch entry list:", error);
      throw error;
    }
  }, []);

  const selectEntry = (entry: Entry | null) => {
    setSelectedEntry(entry);
  };

  const refetchEntryList = useCallback(async () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1;
    await fetchEntryList(year, month);
  }, [fetchEntryList, currentDate]);

  useEffect(() => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1;
    fetchEntryList(year, month);
  }, [fetchEntryList, currentDate]);

  return (
    <EntryContext.Provider
      value={{
        entryList,
        refetchEntryList,
        selectedEntry,
        selectEntry,
      }}
    >
      {children}
    </EntryContext.Provider>
  );
}
