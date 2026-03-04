"use client";

import { useEffect, useRef } from "react";

interface ToastProps {
  message: string;
  visible: boolean;
  onHide: () => void;
}

export function Toast({ message, visible, onHide }: ToastProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!visible) return;
    const el = ref.current;
    if (el) {
      // Trigger enter animation via DOM
      el.classList.remove("translate-y-2", "opacity-0");
      el.classList.add("translate-y-0", "opacity-100");
    }
    const timer = setTimeout(() => {
      if (el) {
        el.classList.remove("translate-y-0", "opacity-100");
        el.classList.add("translate-y-2", "opacity-0");
      }
      setTimeout(onHide, 200);
    }, 2000);
    return () => clearTimeout(timer);
  }, [visible, onHide]);

  if (!visible) return null;

  return (
    <div
      ref={ref}
      className="fixed bottom-6 right-6 z-50 translate-y-2 rounded-lg bg-zinc-900 px-4 py-2.5 text-sm font-medium text-white opacity-0 shadow-lg transition-all duration-200 dark:bg-zinc-100 dark:text-zinc-900"
    >
      {message}
    </div>
  );
}
