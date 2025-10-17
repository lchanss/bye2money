export default function MonthNavigator() {
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
