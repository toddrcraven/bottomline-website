"use client";

import { useEffect, useId, useRef } from "react";

type ModalProps = {
  open: boolean;
  title: string;
  onClose: () => void;
  children: React.ReactNode;
  containerClassName?: string;
  bodyClassName?: string;
};

export default function Modal({
  open,
  title,
  onClose,
  children,
  containerClassName,
  bodyClassName,
}: ModalProps) {
  const titleId = useId();
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!open) {
      return;
    }

    previousFocusRef.current = document.activeElement as HTMLElement | null;
    closeButtonRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      previousFocusRef.current?.focus();
    };
  }, [open, onClose]);

  if (!open) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur"
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      onClick={onClose}
    >
      <div
        className={[
          "w-full max-w-4xl rounded-2xl bl-panel bg-surface p-6 shadow-xl",
          containerClassName ?? "",
        ].join(" ")}
        onClick={(event) => event.stopPropagation()}
      >
        <div className="mb-4 flex items-start justify-between gap-4">
          <h2 id={titleId} className="text-2xl font-semibold text-white">
            {title}
          </h2>
          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            className="rounded-full bg-brandBlue px-4 py-2 text-sm font-semibold text-[color:var(--header-banner-bg)] transition-colors hover:bg-brandBlue/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brandBlue"
            aria-label="Close dialog"
          >
            Close
          </button>
        </div>
        <div
          className={[
            "max-h-[70vh] overflow-y-auto text-sm text-brandSlate",
            bodyClassName ?? "",
          ].join(" ")}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
