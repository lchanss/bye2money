export default function Header() {
  return (
    <header className="h-54 flex items-center bg-colorchip-80 pt-10 pb-16 justify-center gap-44">
      <AppTitle />
      <MonthNavigator />
      <ViewSelector />
    </header>
  );
}

function AppTitle() {
  return <h1 className="text-serif-24">Wise Wallet</h1>;
}

function MonthNavigator() {
  return (
    <div className="">
      <button aria-label="이전 달">‹</button>
      <time>
        <span className="text-light-14">2023</span>
        <span className="text-serif-48">8</span>
        <span className="text-light-14">August</span>
      </time>
      <button aria-label="다음 달">›</button>
    </div>
  );
}

function ViewSelector() {
  return (
    <div className="flex gap-1">
      <button>1</button>
      <button>2</button>
      <button>3</button>
    </div>
  );
}
