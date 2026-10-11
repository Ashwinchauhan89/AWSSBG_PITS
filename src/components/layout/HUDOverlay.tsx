"use client";

import React, { useEffect, useState } from "react";
import { Terminal, Sparkles, Activity, ShieldCheck } from "lucide-react";
import { useSound } from "@/components/audio/SoundManager";

import { FloatingDroneBot } from "@/components/home/FloatingDroneBot";

interface HUDOverlayProps {
  onOpenTerminal?: () => void;
}

export function HUDOverlay({ onOpenTerminal }: HUDOverlayProps) {
  const { playHover, playClick } = useSound();
  const [timeStr, setTimeStr] = useState<string>("");

  useEffect(() => {
    const update = () => {
      const now = new Date();
      setTimeStr(
        now.toLocaleTimeString("en-US", {
          hour12: false,
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        }) + " IST"
      );
    };
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* Top HUD Telemetry Bars (Desktop Only, Subtle & Non-intrusive) */}
      <div className="hidden xl:flex fixed top-[46px] left-8 z-40 items-center gap-3 text-[10px] font-mono text-slate-400/70 pointer-events-none select-none tracking-widest uppercase">
        <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
        <span className="text-[#FF9900]/90 font-semibold">PITS_UJJAIN: 23.1765° N, 75.7885° E</span>
        <span className="text-white/20">|</span>
        <span className="flex items-center gap-1 text-slate-400">
          <Activity className="w-3 h-3 text-[#43B7FF]" />
          SYS: AWS_SBG_NODE_ACTIVE
        </span>
      </div>

      <div className="hidden xl:flex fixed top-[46px] right-8 z-40 items-center gap-3 text-[10px] font-mono text-slate-400/70 pointer-events-none select-none tracking-widest uppercase">
        <span className="text-slate-400 flex items-center gap-1">
          <ShieldCheck className="w-3 h-3 text-emerald-400" />
          SEC_ENCLAVE: VERIFIED
        </span>
        <span className="text-white/20">|</span>
        <span className="text-[#43B7FF] font-semibold">{timeStr || "SYSTEM_SYNC"}</span>
      </div>

      {/* Futuristic Corner Framing Reticles */}
      <div className="hidden lg:block fixed top-3 left-3 z-30 pointer-events-none select-none text-white/20 font-mono text-[9px]">
        ┌ [AWS-SBG-2026]
      </div>
      <div className="hidden lg:block fixed top-3 right-3 z-30 pointer-events-none select-none text-white/20 font-mono text-[9px] text-right">
        [PITS-IN] ┐
      </div>
      <div className="hidden lg:block fixed bottom-3 left-3 z-30 pointer-events-none select-none text-white/20 font-mono text-[9px]">
        └ [ZONE: AP-SOUTH-1]
      </div>
      <div className="hidden lg:block fixed bottom-3 right-3 z-30 pointer-events-none select-none text-white/20 font-mono text-[9px] text-right">
        [FESTIVAL_CORE] ┘
      </div>

      {/* Floating Drone Bot Mascot (Exact mascot from Techfest reference screenshot) */}
      {onOpenTerminal && <FloatingDroneBot onClick={onOpenTerminal} />}
    </>
  );
}

