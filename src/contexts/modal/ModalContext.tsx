import { createContext, useContext } from "react";

type ModalContextData = {
  isOpen: boolean;
  openModal: (modal: React.ReactNode) => void;
  closeModal: () => void;
};

export const ModalContext = createContext<ModalContextData>({
  isOpen: false,
  openModal: () => {
    throw new Error("ModalContext not provided");
  },
  closeModal: () => {
    throw new Error("ModalContext not provided");
  },
});

ModalContext.displayName = "Modal";

export const useModalContext = () => useContext(ModalContext);
