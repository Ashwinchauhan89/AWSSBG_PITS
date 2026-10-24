"use client";

import React from "react";
import { FloatingDroneBot } from "@/components/home/FloatingDroneBot";

interface HUDOverlayProps {
  onOpenTerminal?: () => void;
}

export function HUDOverlay({ onOpenTerminal }: HUDOverlayProps) {
  return (
    <>
      {/* Floating Drone Bot Mascot for Interactive Assistant Terminal */}
      {onOpenTerminal && <FloatingDroneBot onClick={onOpenTerminal} />}
    </>
  );
}


