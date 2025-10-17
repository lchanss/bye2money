import AppTitle from "./AppTitle";
import MonthNavigator from "./MonthNavigator";
import ViewSelector from "./ViewSelector";

export default function Header() {
  return (
    <header className="bg-colorchip-80 flex h-54 items-center justify-center gap-44 pt-10 pb-16">
      <AppTitle />
      <MonthNavigator />
      <ViewSelector />
    </header>
  );
}
