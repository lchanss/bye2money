import { useEffect } from "react";

type ModalFrameProps = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

export default function ModalFrame({
  isOpen,
  onClose,
  children,
}: ModalFrameProps) {
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
      {/* 모달 컨테이너 */}
      <div
        className="bg-neutral-surface-default w-96 border"
        onClick={(e) => e.stopPropagation()} // 모달 내부 클릭은 닫히지 않게
      >
        {children}
      </div>
    </div>
  );
}
