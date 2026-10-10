"use client";

import React, { useState, useEffect } from "react";
import { SoundProvider } from "@/components/audio/SoundManager";
import { HUDOverlay } from "./HUDOverlay";
import { BuilderTerminalDrawer } from "./BuilderTerminalDrawer";

export function ClientLayoutShell({ children }: { children: React.ReactNode }) {
  const [terminalOpen, setTerminalOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setTerminalOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <SoundProvider>
      <HUDOverlay onOpenTerminal={() => setTerminalOpen(true)} />
      {children}
      <BuilderTerminalDrawer
        isOpen={terminalOpen}
        onClose={() => setTerminalOpen(false)}
      />
    </SoundProvider>
  );
}
