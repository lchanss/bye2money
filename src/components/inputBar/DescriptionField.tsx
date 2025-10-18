import LabeledField from "@/components/common/LabledInput";
import TextInput from "@/components/common/TextInput";

type DescriptionFieldProps = {
  value: string;
  onChange: (newValue: string) => void;
};

export default function DescriptionField({
  value,
  onChange,
}: DescriptionFieldProps) {
  const MAX_LENGTH = 32;
  const textCount = `${value.length}/${MAX_LENGTH}`;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    if (newValue.length <= MAX_LENGTH) {
      onChange(newValue);
    }
  };

  return (
    <LabeledField
      label="내용"
      htmlFor="description"
      width="w-[160px]"
      helperText={textCount}
    >
      <TextInput
        id="description"
        className="text-semibold-12"
        value={value}
        onChange={handleChange}
        placeholder="입력하세요"
        textAreaOnly
      />
    </LabeledField>
  );
}
