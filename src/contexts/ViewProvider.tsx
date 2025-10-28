import { useState, type PropsWithChildren } from "react";

import { ViewContext } from "./ViewContext";

import type { ViewType } from "@/types";

export default function ViewProvider({ children }: PropsWithChildren) {
  const [view, setView] = useState<ViewType>("documents");

  return (
    <ViewContext.Provider value={{ view, setView }}>
      {children}
    </ViewContext.Provider>
  );
}
