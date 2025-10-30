import { createContext, useContext } from "react";

export type ModalProps = {
  onConfirm?: () => void | Promise<void>;
  onCancel?: () => void;
  confirmText?: string;
  cancelText?: string;
  showCancel?: boolean;
  content: React.ReactNode;
};

type ModalContextData = {
  isOpen: boolean;
  modalProps: ModalProps | null;
  openModal: (props: ModalProps) => void;
  closeModal: () => void;
};

export const ModalContext = createContext<ModalContextData>({
  isOpen: false,
  modalProps: null,
  openModal: () => {
    throw new Error("ModalContext not provided");
  },
  closeModal: () => {
    throw new Error("ModalContext not provided");
  },
});

ModalContext.displayName = "Modal";

export const useModalContext = () => useContext(ModalContext);
