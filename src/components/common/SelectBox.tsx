import ChevronDownIcon from "@/assets/icons/chevron-down.svg?react";
import Dropdown from "@/components/common/Dropdown";

type SelectBoxProps<T> = {
  options: T[];
  value: T | null;
  onChange: (value: T) => void;
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
        <SelectBoxTrigger
          displayText={displayText}
          isOpen={isOpen}
          hasValue={!!value}
        />
      )}
      className={className}
      bodyClassName={menuClassName}
    >
      {(close) => (
        <ul>
          {options.map((option) => (
            <SelectBoxItem
              option={option}
              onClick={() => {
                onChange(option);
                close();
              }}
            />
          ))}
        </ul>
      )}
    </Dropdown>
  );
}

type SelectBoxTriggerProps = {
  displayText: string;
  hasValue: boolean;
  isOpen: boolean;
};

function SelectBoxTrigger({
  displayText,
  hasValue,
  isOpen,
}: SelectBoxTriggerProps) {
  return (
    <button
      className="text-semibold-12 flex w-full items-center justify-between gap-1"
      type="button"
    >
      <span className={`${!hasValue && "text-neutral-text-weak"}`}>
        {displayText}
      </span>
      <ChevronDownIcon
        className={`transition-transform ${isOpen && "rotate-180"}`}
        width={16}
        height={16}
      />
    </button>
  );
}

type SelectBoxItemProps<T> = {
  option: T;
  onClick: () => void;
};

function SelectBoxItem<T extends string>({
  option,
  onClick,
}: SelectBoxItemProps<T>) {
  return (
    <li
      className="text-semibold-12 hover:bg-neutral-surface-point cursor-pointer px-4 py-2"
      onClick={onClick}
    >
      {option}
    </li>
  );
}
