import LeftIcon from "@/assets/icons/chevron-left.svg?react";
import RightIcon from "@/assets/icons/chevron-right.svg?react";

export default function MonthNavigator() {
  return (
    <div className="flex items-center justify-center gap-6">
      <button aria-label="이전 달" className="cursor-pointer">
        <LeftIcon width={32} height={32} />
      </button>
      <time className="flex w-30 flex-col items-center justify-center gap-1">
        <span className="text-light-14">2023</span>
        <span className="text-serif-48">8</span>
        <span className="text-light-14">August</span>
      </time>
      <button aria-label="다음 달" className="cursor-pointer">
        <RightIcon width={32} height={32} />
      </button>
    </div>
  );
}
