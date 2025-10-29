import {
  createContext,
  useContext,
  type Dispatch,
  type SetStateAction,
} from "react";

import type { ViewType } from "@/types";

type ViewContextData = {
  view: ViewType;
  setView: Dispatch<SetStateAction<ViewType>>;
};

export const ViewContext = createContext<ViewContextData>({
  view: "list",
  setView: () => {
    throw new Error("ViewContext not provided");
  },
});
ViewContext.displayName = "View";

export const useViewContext = () => useContext(ViewContext);
