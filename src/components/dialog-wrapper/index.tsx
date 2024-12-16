"use client";
import React from "react";
import * as Dialog from "@radix-ui/react-dialog";

interface DialogWrapperProps {
  trigger: React.ReactNode;
  title?: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
  maxWidth?: string;
  open?: boolean;
  onOpenChange?: (isOpen: boolean) => void;
}

export const DialogWrapper: React.FC<DialogWrapperProps> = ({
  trigger,
  title,
  description,
  children,
  className = "",
  maxWidth,
  open,
  onOpenChange,
}) => {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Trigger asChild>{trigger}</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-50" />
        <Dialog.Content
          className={`fixed bg-white p-6 rounded-lg shadow-lg ${className}`}
          style={{
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            maxWidth: maxWidth,
            maxHeight: "80vh",
          }}
        >
          <Dialog.Title className="text-xl font-bold mb-2">
            {title}
          </Dialog.Title>
          {description && (
            <Dialog.Description className="text-sm text-gray-600 mb-4">
              {description}
            </Dialog.Description>
          )}
          <div className="overflow-y-auto max-h-[60vh] px-4">{children}</div>{" "}
          <Dialog.Close asChild>
            <button className="absolute top-2 right-2 text-gray-500 hover:text-black">
              ✕
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
