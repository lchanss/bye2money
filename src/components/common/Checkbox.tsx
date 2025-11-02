import CheckboxIcon from "@/assets/icons/checkbox.svg?react";
import UncheckboxIcon from "@/assets/icons/uncheckbox.svg?react";

type CheckboxProps = {
  label: string;
  checked: boolean;
  onChange: () => void;
};

export default function Checkbox({ label, checked, onChange }: CheckboxProps) {
  return (
    <label className="flex cursor-pointer items-center gap-1">
      <input type="checkbox" checked={checked} onChange={onChange} />
      <span className="flex items-center justify-center">
        {checked ? (
          <CheckboxIcon width={16} height={16} />
        ) : (
          <UncheckboxIcon width={16} height={16} />
        )}
      </span>
      <span className="text-light-12">{label}</span>
    </label>
  );
}
