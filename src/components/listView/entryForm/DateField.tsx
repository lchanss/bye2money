import LabeledField from "@/components/common/LabeledField";

type DateFieldProps = {
  value: string;
  onChange: (newValue: string) => void;
};

export default function DateField({ value, onChange }: DateFieldProps) {
  return (
    <LabeledField label="일자" htmlFor="date" width="w-[88px]">
      <input
        type="date"
        id="date"
        className="text-semibold-12"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </LabeledField>
  );
}
