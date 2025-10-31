import type { VariantProps } from "class-variance-authority";

import { textInputVariants } from "./textInput.variants";

type TextInputProps = React.InputHTMLAttributes<HTMLInputElement> &
  VariantProps<typeof textInputVariants> & {
    error?: boolean;
    textAreaOnly?: boolean;
  };

export default function TextInput({
  error = false,
  textAreaOnly = false,
  disabled = false,
  className = "",
  ...props
}: TextInputProps) {
  const getState = () => {
    if (disabled) return "disabled";
    if (error) return "error";
    return "enabled";
  };

  return (
    <input
      type="text"
      disabled={disabled}
      className={textInputVariants({
        inputType: textAreaOnly ? "textAreaOnly" : "default",
        state: getState(),
        className,
      })}
      {...props}
    />
  );
}
