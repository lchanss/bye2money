import { useState } from "react";

import Modal from "@/components/common/Modal";
import TextInput from "@/components/common/TextInput";

type AddPaymentMethodModalProps = {
  onConfirm: (method: string) => void;
  onCancel: () => void;
};

export default function AddPaymentMethodModal({
  onConfirm,
  onCancel,
}: AddPaymentMethodModalProps) {
  const [method, setMethod] = useState("");

  const handleConfirm = () => {
    if (method.trim()) {
      onConfirm(method.trim());
    }
  };

  return (
    <Modal
      onConfirm={handleConfirm}
      onCancel={onCancel}
      confirmText="추가"
      cancelText="취소"
    >
      <form>
        <h3 className="text-light-16 mb-4">
          추가하실 결제 수단을 입력해주세요.
        </h3>
        <TextInput
          type="text"
          id="payment-method"
          className="text-semibold-12 w-full"
          value={method}
          onChange={(e) => {
            e.preventDefault();
            setMethod(e.target.value);
          }}
          placeholder="결제수단 입력"
          autoFocus
        />
      </form>
    </Modal>
  );
}
