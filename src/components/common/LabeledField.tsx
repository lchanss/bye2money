import type { PropsWithChildren } from "react";

type LabeledFieldProps = {
  label: string;
  htmlFor: string;
  width?: string;
  helperText?: string;
};

export default function LabeledField({
  label,
  htmlFor,
  width,
  helperText,
  children,
}: PropsWithChildren<LabeledFieldProps>) {
  return (
    <div className={width}>
      <div className="mb-1 flex justify-between">
        <label htmlFor={htmlFor} className="text-light-12">
          {label}
        </label>
        {helperText && (
          <span className="text-light-12 text-neutral-text-weak">
            {helperText}
          </span>
        )}
      </div>
      {children}
    </div>
  );
}
