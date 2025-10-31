import LabeledField from "@/components/common/LabeledField";
import SelectBox from "@/components/common/SelectBox";

type PaymentMethodFieldProps = {
  value: string;
  onChange: (newValue: string) => void;
  paymentMethods: string[];
};

export default function PaymentMethodField({
  value,
  onChange,
  paymentMethods,
}: PaymentMethodFieldProps) {
  return (
    <LabeledField label="결제수단" htmlFor="payment-method" width="w-[104px]">
      <SelectBox
        options={paymentMethods}
        value={value}
        onChange={onChange}
        menuClassName="mt-4.5"
      />
    </LabeledField>
  );
}
