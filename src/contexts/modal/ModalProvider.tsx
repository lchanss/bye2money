import { useState, type PropsWithChildren } from "react";

import { ModalContext } from "./ModalContext";

import ModalFrame from "@/components/common/modal/ModalFrame";

export default function ModalProvider({ children }: PropsWithChildren) {
  const [isOpen, setIsOpen] = useState(false);
  const [modalContent, setModalContent] = useState<React.ReactNode>(null);

  const openModal = (content: React.ReactNode) => {
    setModalContent(content);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    // 애니메이션을 위해 약간의 딜레이 후 props 초기화
    setTimeout(() => {
      setModalContent(null);
    }, 200);
  };

  return (
    <ModalContext.Provider value={{ isOpen, openModal, closeModal }}>
      {children}
      <ModalFrame isOpen={isOpen} onClose={closeModal}>
        {modalContent}
      </ModalFrame>
    </ModalContext.Provider>
  );
}
