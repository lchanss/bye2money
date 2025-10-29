import { useState, type PropsWithChildren } from "react";

import { ModalContext, type ModalProps } from "./ModalContext";

import Modal from "@/components/common/Modal";

export default function ModalProvider({ children }: PropsWithChildren) {
  const [isOpen, setIsOpen] = useState(false);
  const [modalProps, setModalProps] = useState<ModalProps | null>(null);

  const openModal = (props: ModalProps) => {
    setModalProps(props);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    // 애니메이션을 위해 약간의 딜레이 후 props 초기화
    setTimeout(() => {
      setModalProps(null);
    }, 200);
  };

  return (
    <ModalContext.Provider
      value={{ isOpen, modalProps, openModal, closeModal }}
    >
      {children}
      {modalProps && (
        <Modal isOpen={isOpen} onClose={closeModal} {...modalProps} />
      )}
    </ModalContext.Provider>
  );
}
