import type { PropsWithChildren } from "react";

import Header from "./header/Header";

export default function Layout({ children }: PropsWithChildren) {
  return (
    <div className="text-neutral-text-default text-light-14 pb-40">
      <Header />
      <main className="mt-[-40px] flex flex-col items-center">{children}</main>
    </div>
  );
}
