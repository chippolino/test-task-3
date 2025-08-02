import { type ReactNode, useEffect, useState } from "react";
import { Portal } from "../portal/portal.tsx";
import s from "./modal.module.scss";
import cn from "classnames";
import closeIcon from "../../assets/icons/close-icon.svg";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  className?: string;
  classNameOverlay?: string;
};

export const Modal = ({
  isOpen,
  onClose,
  children,
  className = "",
  classNameOverlay,
}: ModalProps) => {
  const [isVisible, setIsVisible] = useState(isOpen);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen) setIsVisible(true);
  }, [isOpen]);

  const handleAnimationEnd = () => {
    if (!isOpen) setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <Portal>
      <div
        className={cn(s.overlay, classNameOverlay)}
        onClick={onClose}
        onAnimationEnd={handleAnimationEnd}
      >
        <div
          className={cn(s.modal, className, isOpen ? s.entering : s.exiting)}
          onClick={(e) => e.stopPropagation()}
        >
          <button className={s.closeButton} onClick={onClose}>
            <img src={closeIcon} alt="close icon" />
          </button>
          {children}
        </div>
      </div>
    </Portal>
  );
};
