import type { PropsWithChildren, ReactNode } from "react";

import CalendarView from "./components/calendarView/CalendarView";
import Layout from "./components/layout/Layout";
import ListView from "./components/listView/ListView";
import DateProvider from "./contexts/date/DateProvider";
import EntryProvider from "./contexts/entry/EntryProvider";
import ModalProvider from "./contexts/modal/ModalProvider";
import { useViewContext } from "./contexts/view/ViewContext";
import ViewProvider from "./contexts/view/ViewProvider";
import type { ViewType } from "./types";

const VIEW_MAP: Record<ViewType, ReactNode> = {
  list: <ListView />,
  calendar: <CalendarView />,
  charts: <div>Charts View</div>,
};

function Page() {
  const { view } = useViewContext();

  return <Layout>{VIEW_MAP[view]}</Layout>;
}

function Providers({ children }: PropsWithChildren) {
  return (
    <DateProvider>
      <ViewProvider>
        <ModalProvider>
          <EntryProvider>{children}</EntryProvider>
        </ModalProvider>
      </ViewProvider>
    </DateProvider>
  );
}

function App() {
  return (
    <Providers>
      <Page />
    </Providers>
  );
}

export default App;
