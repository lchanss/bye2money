import CheckIcon from "@/assets/icons/check.svg?react";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  text?: string;
  showIcon?: boolean;
  size?: ButtonSize;
  buttonType?: "container" | "outline" | "ghost";
  color?: string;
};

type ButtonSize = "small" | "medium" | "large";

const SIZE_CLASS: Record<ButtonSize, string> = {
  small: "text-semibold-12 gap-1",
  medium: "text-semibold-16 gap-2",
  large: "text-serif-48 gap-2",
} as const;

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
  const sizeClass = SIZE_CLASS[size];

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
