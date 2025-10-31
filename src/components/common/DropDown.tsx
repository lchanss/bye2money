import type { ReactNode } from "react";
import { useRef, useEffect, useState } from "react";

type DropdownProps = {
  trigger: (isOpen: boolean) => ReactNode;
  children: (close: () => void) => ReactNode;
  className?: string;
  bodyClassName?: string;
};

export default function Dropdown({
  trigger,
  children,
  className = "",
  bodyClassName = "",
}: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

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

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <div onClick={toggleDropdown}>{trigger(isOpen)}</div>

      {isOpen && (
        <div
          className={`border-neutral-border-default absolute top-full right-0 left-0 z-10 max-h-60 overflow-auto border bg-white shadow-lg ${bodyClassName}`}
        >
          {children(closeDropdown)}
        </div>
      )}
    </div>
  );
}
