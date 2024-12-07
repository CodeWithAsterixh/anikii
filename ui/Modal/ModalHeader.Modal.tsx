"use client";
import React from "react";
import { useModal } from "./Modal";
import clsx from "clsx";
import { BiX } from "react-icons/bi";

type Props = {
  children?: React.ReactNode;
  className?: string;
  showClose?: boolean;
};

function ModalHeader({ children, className, showClose = true }: Props) {
  const { closeModal } = useModal();
  return (
    <header
      className={clsx(
        "w-full flex items-start justify-between text-xl",
        className
      )}
    >
      {children}

      {showClose && (
        <span className="cursor-pointer shrink-0" onClick={() => closeModal()}>
          <BiX />
        </span>
      )}
    </header>
  );
}

export default ModalHeader;
