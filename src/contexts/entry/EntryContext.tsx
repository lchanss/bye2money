import { createContext, useContext } from "react";

import type { GetEntryListResponse } from "@/apis/entry";
import type { Entry } from "@/types";

type EntryContextData = {
  entryList: GetEntryListResponse | null;
  refetchEntryList: () => Promise<void>;
  selectedEntry: Entry | null;
  selectEntry: (entry: Entry | null) => void;
};

export const EntryContext = createContext<EntryContextData>({
  entryList: null,
  refetchEntryList: async () => {
    throw new Error("EntryContext not provided");
  },
  selectedEntry: null,
  selectEntry: () => {
    throw new Error("EntryContext not provided");
  },
});

EntryContext.displayName = "Entry";

export const useEntryContext = () => useContext(EntryContext);
