import { useRef, useEffect, useState } from "react";

import ChevronDownIcon from "@/assets/icons/chevron-down.svg?react";

type DropdownProps = {
  options: string[];
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  className?: string;
  menuClassName?: string;
};

export default function Dropdown({
  options,
  value,
  onChange,
  placeholder = "선택하세요",
  className = "",
  menuClassName = "",
}: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const displayText = value || placeholder;

  const closeDropdown = () => setIsOpen(false);
  const toggleDropdown = () => setIsOpen((prev) => !prev);

  // 외부 클릭 감지
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        closeDropdown();
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  const handleSelect = (option: string) => {
    onChange?.(option);
    closeDropdown();
  };

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      {/* 선택된 값 표시 */}
      <button
        className="text-semibold-12 flex w-full items-center justify-between gap-1 rounded-lg"
        onClick={toggleDropdown}
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

      {/* 드롭다운 옵션 목록 */}
      {isOpen && (
        <div
          className={`border-neutral-border-default absolute top-full right-0 left-0 z-10 max-h-60 overflow-auto border bg-white shadow-lg ${menuClassName}`}
        >
          {options.map((option, index) => (
            <div
              key={index}
              className="text-semibold-12 hover:bg-neutral-surface-point cursor-pointer px-4 py-2"
              onClick={() => handleSelect(option)}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
