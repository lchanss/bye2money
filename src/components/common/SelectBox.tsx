import ChevronDownIcon from "@/assets/icons/chevron-down.svg?react";
import Dropdown from "@/components/common/Dropdown";

type SelectBoxProps<T> = {
  options: T[];
  value: T | null;
  onChange?: (value: T) => void;
  placeholder?: string;
  className?: string;
  menuClassName?: string;
};

export default function SelectBox<T extends string>({
  options,
  value,
  onChange,
  placeholder = "선택하세요",
  className = "",
  menuClassName = "",
}: SelectBoxProps<T>) {
  const displayText = value || placeholder;

  return (
    <Dropdown
      trigger={(isOpen) => (
        <button
          className="text-semibold-12 flex w-full items-center justify-between gap-1"
          type="button"
        >
          <span className={value ? "" : "text-neutral-text-weak"}>
            {displayText}
          </span>
          <ChevronDownIcon
            className={`transition-transform ${isOpen ? "rotate-180" : ""}`}
            width={16}
            height={16}
          />
        </button>
      )}
      className={className}
      bodyClassName={menuClassName}
    >
      {(close) => (
        <>
          {options.map((option) => (
            <div
              key={option}
              className="text-semibold-12 hover:bg-neutral-surface-point cursor-pointer px-4 py-2"
              onClick={() => {
                onChange?.(option);
                close();
              }}
            >
              {option}
            </div>
          ))}
        </>
      )}
    </Dropdown>
  );
}
