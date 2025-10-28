import DocumentView from "./components/documentView/DocumentView";
import Layout from "./components/layout/Layout";
import { useViewContext } from "./contexts/ViewContext";

function App() {
  const { view } = useViewContext();

  return <Layout>{view === "documents" ? <DocumentView /> : null}</Layout>;
}

export default App;
