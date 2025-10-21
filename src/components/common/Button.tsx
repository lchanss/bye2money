import CheckIcon from "@/assets/icons/check.svg?react";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  text?: string;
  showIcon?: boolean;
  size?: "small" | "medium" | "large";
  buttonType?: "container" | "outline" | "ghost";
  color?: string;
};

// TODO: 타입에 따라 스타일 차별화
export default function Button({
  text,
  showIcon = true,
  size = "medium",
  buttonType = "ghost",
  color = "bg-neutral-text-default",
  disabled = false,
  className = "",
  ...props
}: ButtonProps) {
  const sizeClass =
    size === "small"
      ? "text-semibold-12 gap-1"
      : size === "medium"
        ? "text-semibold-16 gap-2"
        : "text-serif-48 gap-2";

  return (
    <button
      className={`${sizeClass} flex items-center justify-center rounded-md ${text && "px-4 py-2"} hover:opacity-80 active:opacity-64 disabled:opacity-32 ${className}`}
      disabled={disabled}
      {...props}
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
