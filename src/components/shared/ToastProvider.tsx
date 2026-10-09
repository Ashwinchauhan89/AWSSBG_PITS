"use client";

import { Toaster } from "sonner";

export function ToastProvider() {
  return (
    <Toaster
      position="top-right"
      theme="dark"
      toastOptions={{
        style: {
          background: "#0f172a",
          border: "1px solid #1e293b",
          color: "#f8fafc",
          borderRadius: "1rem",
          boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.5)",
        },
        className: "font-sans",
      }}
    />
  );
}
