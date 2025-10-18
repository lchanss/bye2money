import CheckIcon from "@/assets/icons/check.svg?react";

type ButtonProps = {
  text?: string;
  showIcon?: boolean;
  size?: "small" | "medium" | "large";
  type?: "container" | "outline" | "ghost";
  color?: string;
  disabled?: boolean;
};

// TODO: 타입에 따라 스타일 차별화
// TODO: cn 함수로 클래스네임 관리
export default function Button({
  text,
  showIcon = true,
  size = "medium",
  type = "ghost",
  color = "bg-neutral-text-default",
  disabled = false,
}: ButtonProps) {
  const sizeClass =
    size === "small"
      ? "text-semibold-12 gap-1"
      : size === "medium"
        ? "text-semibold-16 gap-2"
        : "text-serif-48 gap-2";

  console.log(disabled);
  return (
    <button
      className={`${sizeClass} flex items-center justify-center rounded-md px-4 py-2 hover:opacity-80 active:opacity-64 disabled:opacity-32`}
      disabled={disabled}
    >
      {showIcon && (
        <div
          className={`flex items-center justify-center rounded-full p-2 ${color}`}
        >
          <CheckIcon stroke="#ffffff" />
        </div>
      )}
      {text}
    </button>
  );
}
