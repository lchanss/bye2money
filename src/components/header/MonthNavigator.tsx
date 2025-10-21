import LeftIcon from "@/assets/icons/chevron-left.svg?react";
import RightIcon from "@/assets/icons/chevron-right.svg?react";

type MonthNavigatorProps = {
  date: Date;
  onPrevClick: () => void;
  onNextClick: () => void;
};

export default function MonthNavigator({
  date,
  onPrevClick,
  onNextClick,
}: MonthNavigatorProps) {
  return (
    <div className="flex items-center justify-center gap-6">
      <button aria-label="이전 달" onClick={onPrevClick}>
        <LeftIcon width={32} height={32} />
      </button>
      <time className="flex w-30 flex-col items-center justify-center gap-1">
        <span className="text-light-14">{date.getFullYear()}</span>
        <span className="text-serif-48">{date.getMonth() + 1}</span>
        <span className="text-light-14">
          {date.toLocaleString("en-US", { month: "long" })}
        </span>
      </time>
      <button aria-label="다음 달" onClick={onNextClick}>
        <RightIcon width={32} height={32} />
      </button>
    </div>
  );
}
