import ChevronDownIcon from "@/assets/icons/chevron-down.svg?react";
import ClosedIcon from "@/assets/icons/closed.svg?react";

import Dropdown from "@/components/common/Dropdown";
import LabeledField from "@/components/common/LabeledField";

type PaymentMethodFieldProps = {
  methods: string[];
  selectedMethod: string | null;
  onSelect: (method: string) => void;
  onDelete: (method: string) => void;
  onAdd: () => void;
  placeholder?: string;
};

export default function PaymentMethodField({
  methods,
  selectedMethod,
  onSelect,
  onDelete,
  onAdd,
  placeholder = "선택하세요",
}: PaymentMethodFieldProps) {
  const displayText = selectedMethod || placeholder;

  return (
    <LabeledField label="결제수단" htmlFor="payment-method" width="w-[104px]">
      <Dropdown
        trigger={(isOpen) => (
          <PaymentMethodTrigger
            displayText={displayText}
            hasValue={!!selectedMethod}
            isOpen={isOpen}
          />
        )}
        bodyClassName="mt-4.5 w-38 left-[-24px]"
      >
        {(close) => (
          <>
            <ul>
              {methods.map((method) => (
                <PaymentMethodItem
                  key={method}
                  method={method}
                  onSelect={onSelect}
                  onDelete={onDelete}
                  onClose={close}
                />
              ))}
            </ul>
            <AddPaymentMethodButton onAdd={onAdd} onClose={close} />
          </>
        )}
      </Dropdown>
    </LabeledField>
  );
}

type PaymentMethodTriggerProps = {
  displayText: string;
  hasValue: boolean;
  isOpen: boolean;
};

function PaymentMethodTrigger({
  displayText,
  hasValue,
  isOpen,
}: PaymentMethodTriggerProps) {
  return (
    <button
      className="text-semibold-12 flex w-full items-center justify-between gap-1"
      type="button"
    >
      <span className={`${!hasValue && "text-neutral-text-weak"}`}>
        {displayText}
      </span>
      <ChevronDownIcon
        className={`transition-transform ${isOpen && "rotate-180"}`}
        width={16}
        height={16}
      />
    </button>
  );
}

type PaymentMethodItemProps = {
  method: string;
  onSelect: (method: string) => void;
  onDelete: (method: string) => void;
  onClose: () => void;
};

function PaymentMethodItem({
  method,
  onSelect,
  onDelete,
  onClose,
}: PaymentMethodItemProps) {
  const handleSelect = () => {
    onSelect(method);
    onClose();
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    onDelete(method);
  };

  return (
    <li
      className="text-light-12 hover:bg-neutral-surface-point cursor-pointer px-6"
      onClick={handleSelect}
    >
      <div className="flex items-center justify-between border-b py-4">
        <span>{method}</span>
        <button className="ml-2 text-lg" onClick={handleDelete}>
          {/* TODO: 아이콘 컴포넌트화, 클래스로 색상 지정할 수 있도록 */}
          <ClosedIcon width={24} height={24} stroke="#e93b5a" />
        </button>
      </div>
    </li>
  );
}

type AddPaymentMethodButtonProps = {
  onAdd: () => void;
  onClose: () => void;
};

function AddPaymentMethodButton({
  onAdd,
  onClose,
}: AddPaymentMethodButtonProps) {
  const handleAdd = () => {
    onAdd();
    onClose();
  };

  return (
    <button
      className="text-semibold-12 hover:bg-neutral-surface-point w-full px-6 py-4"
      onClick={handleAdd}
    >
      추가하기
    </button>
  );
}
