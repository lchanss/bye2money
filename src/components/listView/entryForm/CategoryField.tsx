import type { EntryFormData } from "./EntryForm";

import LabeledField from "@/components/common/LabeledField";
import SelectBox from "@/components/common/SelectBox";
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
      <SelectBox
        options={categories}
        value={value}
        onChange={onChange}
        menuClassName="mt-4.5"
      />
    </LabeledField>
  );
}
