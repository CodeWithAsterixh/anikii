"use client";

import clsx from "clsx";
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useCallback,
  useEffect,
} from "react";
import { createPortal } from "react-dom";

interface ModalOptions {
  defaultClose?: boolean; // Allow customization like showing/hiding the close button
  boxStyles?: string;
  closeOutClick?: boolean;
  onClose?: () => void;
  containerStyles?: string;
}

interface ModalContextType {
  openModal: (
    modalContent: ReactNode,
    modalOptions?: ModalOptions,
    name?: string
  ) => void; // openModal accepts content and optional options
  closeModal: (name?: string) => void;
}

// Create context with proper types
const ModalContext = createContext<ModalContextType | null>(null);

// Custom hook for accessing modal
export const useModal = (): ModalContextType => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModal must be used within a ModalProvider");
  }
  return context;
};

interface openedModal {
  modalContent: ReactNode;
  modalOptions: ModalOptions;
  name?: string;
}

export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [isExiting, setIsExiting] = useState(false); // Track exiting animation
  const [openedModals, setOpenedModals] = useState<openedModal[]>([]);

  // Method to open the modal with optional settings
  const openModal = useCallback(
    (
      modalContent: ReactNode,
      modalOptions: ModalOptions = {},
      name?: string
    ) => {
      const newModal: openedModal = {
        modalContent,
        modalOptions: {
          defaultClose: modalOptions.defaultClose ? true : false,
          onClose: () => {
            return;
          },
          ...modalOptions,
        },
        name,
      };

      setOpenedModals((prev) => [...prev, newModal]);
      setIsExiting(false); // Reset exiting state
    },
    [openedModals]
  );

  // Close modal with animation
  const closeModal = useCallback(
    (name?: string) => {
      setIsExiting(true); // Trigger exit animation

      const to = setTimeout(() => {
        setIsExiting(false); // Reset exiting state
        const modal = name
          ? openedModals.filter((openedModal) => openedModal.name === name)[0]
          : openedModals.at(-1);
        modal
          ? modal.modalOptions.onClose
            ? modal.modalOptions.onClose()
            : null
          : null;
        const filteredModal = name
          ? openedModals.filter((openedModal) => openedModal.name !== name)
          : openedModals.slice(0, -1);
        setOpenedModals(filteredModal);
      }, 300); // Match the duration of your CSS animation (e.g., 300ms)

      return () => clearTimeout(to);
    },
    [openedModals, isExiting]
  );

  // Determine animation class based on screen size and exiting state
  const getAnimationClass = (_static: boolean | null = null) => {
    if (typeof window === "undefined") return ""; // Avoid SSR issues

    const isMobile = window.innerWidth < 498;
    if (_static !== null) {
      if (isMobile) {
        return _static ? "!animate-slide-down" : "animate-slide-up";
      } else {
        return _static ? "!animate-fade-out" : "animate-fade-in";
      }
    }
    if (isMobile) {
      return isExiting ? "!animate-slide-down" : "animate-slide-up";
    } else {
      return isExiting ? "!animate-fade-out" : "animate-fade-in";
    }
  };

  return (
    <ModalContext.Provider value={{ openModal, closeModal }}>
      {children}
      {openedModals.length > 0 &&
        createPortal(
          <>
            {openedModals.map((openedModal, index) => (
              <div
                key={index}
                className={clsx(
                  `fixed inset-0 z-[10] bg-black bg-opacity-50 flex items-end justify-center min-[498px]:items-center`,
                  openedModal.modalOptions.containerStyles
                )}
              >
                {/* Overlay */}

                {openedModal.modalOptions.closeOutClick && (
                  <div
                    className="absolute inset-0 z-[-1]"
                    onClick={() => closeModal()}
                  />
                )}

                {/* Modal Content */}
                <div
                  className={clsx(
                    `relative w-full h-fit max-h-[90vh]  overflow-auto min-[498px]:w-fit px-4 py-2 min-[498px]:py-4 flex flex-col items-start justify-center  gap-2 bg-white dark:bg-gray-800 rounded-t-2xl min-[498px]:rounded-md transition-all duration-300`,
                    openedModal.modalOptions.boxStyles,
                    index == openedModals.length - 1
                      ? isExiting
                        ? getAnimationClass()
                        : getAnimationClass(false)
                      : getAnimationClass(false) // Apply the animation class based on screen size and exit state
                  )}
                >
                  <div className="w-full h-fit relative flex items-center justify-center min-[498px]:hidden before:content-[''] before:w-16 before:h-1 before:rounded-full before:bg-gray-400"></div>
                  {openedModal.modalContent}

                  {/* Conditionally render the close button if defaultClose is true */}
                  {openedModal.modalOptions?.defaultClose && (
                    <button
                      onClick={() => closeModal()}
                      className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded"
                    >
                      Close
                    </button>
                  )}
                </div>
              </div>
            ))}
          </>,
          document.body
        )}
    </ModalContext.Provider>
  );
};
