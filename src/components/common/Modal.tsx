import { useEffect } from "react";

import type { ModalProps } from "@/contexts/modal/ModalContext";

type Props = ModalProps & {
  isOpen: boolean;
  onClose: () => void;
};

export default function Modal({
  isOpen,
  onConfirm,
  onCancel,
  onClose,
  confirmText = "확인",
  cancelText = "취소",
  content,
}: Props) {
  // ESC키 눌러서 모달 닫기
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    document.addEventListener("keydown", handleEscape);

    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  // 모달 열려있을 때 배경 스크롤 방지
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    // backdrop
    <div
      className="bg-grayscale-400/40 fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      {/* 모달 내용 */}
      <div
        className="bg-neutral-surface-default w-96 border"
        onClick={(e) => e.stopPropagation()} // 모달 내부 클릭은 닫히지 않게
      >
        <section className="p-8">{content}</section>

        {/* 버튼 영역 */}
        <section className="flex border-t">
          {onCancel && (
            <ModalActionButton
              text={cancelText}
              onClick={onCancel}
              borderRight
            />
          )}
          {onConfirm && (
            <ModalActionButton text={confirmText} onClick={onConfirm} />
          )}
        </section>
      </div>
    </div>
  );
}

type ModalActionButtonProps = {
  text: string;
  onClick: () => void;
  borderRight?: boolean;
};

function ModalActionButton({
  text,
  onClick,
  borderRight,
}: ModalActionButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`text-semibold-16 flex flex-1 items-center justify-center py-4 ${
        borderRight && "border-r"
      }`}
    >
      {text}
    </button>
  );
}
