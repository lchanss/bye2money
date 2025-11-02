type ModalProps = {
  onConfirm?: () => void;
  onCancel?: () => void;
  confirmText?: string;
  cancelText?: string;
  children: React.ReactNode;
};

export default function Modal({
  onConfirm,
  onCancel,
  confirmText = "확인",
  cancelText = "취소",
  children,
}: ModalProps) {
  return (
    <>
      <section className="p-8">{children}</section>

      {/* 버튼 영역 */}
      <section className="flex divide-x border-t">
        {onCancel && (
          <ModalActionButton
            text={cancelText}
            onClick={onCancel}
            textColor="text-neutral-text-weak"
          />
        )}
        {onConfirm && (
          <ModalActionButton text={confirmText} onClick={onConfirm} />
        )}
      </section>
    </>
  );
}

type ModalActionButtonProps = {
  text: string;
  textColor?: string;
  onClick: () => void;
};

function ModalActionButton({
  text,
  textColor = "text-neutral-text-default",
  onClick,
}: ModalActionButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`text-semibold-16 flex flex-1 items-center justify-center py-4 ${textColor}`}
    >
      {text}
    </button>
  );
}
