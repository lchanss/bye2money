import Dropdown from "@/components/common/DropDown";
import LabeledField from "@/components/common/LabeledField";

type CategoryFieldProps = {
  value: string;
  onChange: (newValue: string) => void;
  categories: string[];
};

export default function CategoryField({
  value,
  onChange,
  categories,
}: CategoryFieldProps) {
  return (
    <LabeledField label="분류" htmlFor="category" width="w-[104px]">
      <Dropdown
        options={categories}
        value={value}
        onChange={onChange}
        menuClassName="mt-4.5"
      />
    </LabeledField>
  );
}
