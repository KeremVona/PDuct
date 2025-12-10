import React from "react";
import type { ReactNode } from "react";

interface ModalProps {
  children: ReactNode;
}

const Modal: React.FC<ModalProps> = ({ children }) => {
  return <>{children}</>;
};

export default Modal;
