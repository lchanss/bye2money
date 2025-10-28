import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "./App.tsx";

import "./index.css";
import ViewProvider from "./contexts/ViewProvider.tsx";

async function enableMocking() {
  if (import.meta.env.MODE !== "development") {
    return;
  }

  const { worker } = await import("./mocks/browser.ts");

  return worker.start({
    onUnhandledRequest: "bypass", // 처리되지 않은 요청은 그대로 통과
  });
}

enableMocking().then(() => {
  createRoot(document.getElementById("root")!).render(
    <StrictMode>
      <ViewProvider>
        <App />
      </ViewProvider>
    </StrictMode>,
  );
});
