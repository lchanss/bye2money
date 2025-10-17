type LabeledInputProps = {
  label: string;
  htmlFor: string;
  width?: string;
  children: React.ReactNode;
};

export default function LabeledInput({
  label,
  htmlFor,
  width,
  children,
}: LabeledInputProps) {
  return (
    <div>
      <label
        htmlFor={htmlFor}
        className={`text-light-12 flex flex-col gap-1 ${width}`}
      >
        {label}
      </label>
      {children}
    </div>
  );
}
