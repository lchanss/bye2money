import React from "react";

type TextInputProps = React.InputHTMLAttributes<HTMLInputElement> & {
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
  const baseStyles = textAreaOnly
    ? "h-4 placeholder:text-semibold-12 placeholder:text-neutral-text-weak focus:outline-none bg-transparent"
    : "rounded-lg px-4 py-2 placeholder:text-semibold-12 placeholder:text-neutral-text-weak focus:outline-none";
  const stateStyles = textAreaOnly
    ? ""
    : error
      ? "border border-danger-border-default bg-white"
      : disabled
        ? "bg-neutral-surface-weak text-neutral-text-weak cursor-default"
        : "bg-neutral-surface-point border border-transparent";

  return (
    <input
      type="text"
      disabled={disabled}
      className={`${baseStyles} ${stateStyles} ${className}`}
      {...props}
    />
  );
}
