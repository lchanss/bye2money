import type { PropsWithChildren } from "react";

import Layout from "./components/layout/Layout";
import ListView from "./components/listView/ListView";
import ModalProvider from "./contexts/modal/ModalProvider";
import { useViewContext } from "./contexts/view/ViewContext";
import ViewProvider from "./contexts/view/ViewProvider";

function Page() {
  const { view } = useViewContext();

  return <Layout>{view === "list" && <ListView />}</Layout>;
}

function Providers({ children }: PropsWithChildren) {
  return (
    <ViewProvider>
      <ModalProvider>{children}</ModalProvider>
    </ViewProvider>
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
