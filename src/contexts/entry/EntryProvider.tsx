import {
  useState,
  useCallback,
  type PropsWithChildren,
  useEffect,
} from "react";

import { EntryContext } from "./EntryContext";

import { getEntryList, type GetEntryListResponse } from "@/apis/entry";
import type { Entry } from "@/types";

export default function EntryProvider({ children }: PropsWithChildren) {
  const [entryList, setEntryList] = useState<GetEntryListResponse | null>(null);
  const [selectedEntry, setSelectedEntry] = useState<Entry | null>(null);

  const fetchEntryList = useCallback(async () => {
    try {
      const data = await getEntryList();
      setEntryList(data);
    } catch (error) {
      console.log("Failed to fetch entry list:", error);
      throw error;
    }
  }, []);

  const selectEntry = (entry: Entry | null) => {
    setSelectedEntry(entry);
  };

  useEffect(() => {
    fetchEntryList();
  }, [fetchEntryList]);

  return (
    <EntryContext.Provider
      value={{
        entryList,
        fetchEntryList,
        selectedEntry,
        selectEntry,
      }}
    >
      {children}
    </EntryContext.Provider>
  );
}
