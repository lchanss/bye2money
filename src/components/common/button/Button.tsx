import type { VariantProps } from "class-variance-authority";

import { buttonVariants, iconVariants } from "./button.variants";

import CheckIcon from "@/assets/icons/check.svg?react";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & {
    text?: string;
    showIcon?: boolean;
  };

const ICON_SIZE = {
  small: 12,
  medium: 16,
  large: 24,
} as const;

export default function Button({
  text,
  showIcon = true,
  size = "medium",
  buttonType = "ghost",
  color = "default",
  flexible = true,
  disabled = false,
  className = "",
  ...props
}: ButtonProps) {
  return (
    <button
      className={buttonVariants({
        buttonType,
        size,
        color,
        flexible,
        className: `${text && "px-4 py-2"} ${className}`,
      })}
      disabled={disabled}
      {...props}
      type="button"
    >
      {showIcon && (
        <div className={iconVariants({ color, size })}>
          <CheckIcon
            stroke="#ffffff"
            width={ICON_SIZE[size || "medium"]}
            height={ICON_SIZE[size || "medium"]}
          />
        </div>
      )}
      {text}
    </button>
  );
}
