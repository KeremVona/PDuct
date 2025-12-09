import React from "react";
import type { ReactNode, MouseEvent } from "react";

interface ModalProps {
  children: ReactNode;
  onClose: (event: MouseEvent) => void;
}

const Modal: React.FC<ModalProps> = ({ children, onClose }) => {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-lg rounded-lg bg-white p-6 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute right-2 top-2 text-2xl font-semibold leading-none text-gray-500 hover:text-gray-900"
          onClick={onClose}
          aria-label="Close"
        >
          &times;
        </button>

        <div className="pt-2">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
