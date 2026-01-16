"use client";

import { useEffect, useRef } from "react";

const MODAL_SRC =
  "https://www.youtube.com/embed/zoOP5s9ONjg?rel=0&modestbranding=1&playsinline=1&enablejsapi=1&autoplay=1&origin=http://localhost:3000";

type VideoModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export function VideoModal({ isOpen, onClose }: VideoModalProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    previousFocusRef.current = document.activeElement as HTMLElement | null;
    closeButtonRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }

      if (event.key === "Tab") {
        event.preventDefault();
        closeButtonRef.current?.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      previousFocusRef.current?.focus();
    };
  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur"
      role="dialog"
      aria-modal="true"
    >
      <div className="w-full max-w-7xl">
        <div className="flex justify-end">
          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            className="mb-2 rounded bg-black/70 px-3 py-1 text-xs font-semibold text-white"
            aria-label="Close video"
          >
            Close
          </button>
        </div>
        <div className="aspect-video w-full overflow-hidden rounded">
          <iframe
            title="BottomLine ERP Overview"
            src={MODAL_SRC}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            referrerPolicy="origin-when-cross-origin"
            className="h-full w-full"
          />
        </div>
      </div>
    </div>
  );
}
