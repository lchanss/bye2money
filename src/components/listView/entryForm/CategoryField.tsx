import type { EntryFormData } from "./EntryForm";

import Dropdown from "@/components/common/DropDown";
import LabeledField from "@/components/common/LabeledField";
import type { Category } from "@/types";

type CategoryFieldProps = {
  value: EntryFormData["category"];
  onChange: (newValue: Category) => void;
  categories: Category[];
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
