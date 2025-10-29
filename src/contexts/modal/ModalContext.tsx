import { createContext, useContext, type PropsWithChildren } from "react";

export type ModalProps = PropsWithChildren<{
  onConfirm?: () => void | Promise<void>;
  onCancel?: () => void;
  confirmText?: string;
  cancelText?: string;
  showCancel?: boolean;
}>;

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
