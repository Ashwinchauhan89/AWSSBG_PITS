"use client";

import React, { useEffect, useState } from "react";
import { Terminal, Sparkles, Activity, ShieldCheck } from "lucide-react";
import { useSound } from "@/components/audio/SoundManager";

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

      {/* Floating Interactive Terminal Trigger (Inspired by Techfest AI Drawer) */}
      {onOpenTerminal && (
        <div className="fixed bottom-6 right-6 z-40">
          <button
            onClick={() => {
              playClick();
              onOpenTerminal();
            }}
            onMouseEnter={playHover}
            aria-label="Open Builder AI Terminal"
            className="group relative flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-[#080A0F]/90 border border-[#FF9900]/40 text-[#F5F7FA] shadow-[0_0_25px_rgba(255,153,0,0.25)] hover:border-[#FF9900] hover:shadow-[0_0_35px_rgba(255,153,0,0.5)] transition-all duration-300 backdrop-blur-xl"
          >
            {/* Pulsing glow background */}
            <span className="absolute -inset-0.5 rounded-full bg-gradient-to-r from-[#FF9900] to-[#43B7FF] opacity-30 group-hover:opacity-75 blur-sm transition-opacity duration-300" />

            <div className="relative flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FF9900] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#FF9900]" />
              </span>
              <Terminal className="w-4 h-4 text-[#FF9900] group-hover:rotate-12 transition-transform duration-300" />
              <span className="font-mono text-xs font-bold tracking-wider text-white">
                ASK BUILDER AI
              </span>
              <span className="hidden sm:inline-block px-1.5 py-0.5 rounded bg-white/10 text-[9px] font-mono text-[#43B7FF] border border-white/10">
                ⌘K
              </span>
            </div>
          </button>
        </div>
      )}
    </>
  );
}
