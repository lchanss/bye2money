import Dropdown from "@/components/common/DropDown";
import LabeledField from "@/components/common/LabledInput";

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
      <Dropdown
        options={paymentMethods}
        value={value}
        onChange={onChange}
        menuClassName="mt-4.5"
      />
    </LabeledField>
  );
}
