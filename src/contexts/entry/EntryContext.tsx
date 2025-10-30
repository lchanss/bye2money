import { createContext, useContext } from "react";

import type { GetEntryListResponse } from "@/apis/entry";
import type { Entry } from "@/types";

type EntryContextData = {
  entryList: GetEntryListResponse | null;
  fetchEntryList: () => Promise<void>;
  selectedEntry: Entry | null;
  selectEntry: (entry: Entry | null) => void;
};

export const EntryContext = createContext<EntryContextData>({
  entryList: null,
  fetchEntryList: async () => {
    throw new Error("EntryContext not provided");
  },
  selectedEntry: null,
  selectEntry: () => {
    throw new Error("EntryContext not provided");
  },
});

EntryContext.displayName = "Entry";

export const useEntryContext = () => useContext(EntryContext);
