import ListView from "./components/listView/ListView";
import Layout from "./components/layout/Layout";
import { useViewContext } from "./contexts/ViewContext";

function App() {
  const { view } = useViewContext();

  return <Layout>{view === "list" ? <ListView /> : null}</Layout>;
}

export default App;
