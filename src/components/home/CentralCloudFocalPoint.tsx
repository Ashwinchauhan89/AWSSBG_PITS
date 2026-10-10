"use client";

import * as React from "react";
import { Cloud, Cpu, Sparkles, Shield, Zap } from "lucide-react";

export function CentralCloudFocalPoint() {
  return (
    <div
      className="relative flex items-center justify-center w-64 h-64 sm:w-80 sm:h-80 mx-auto select-none pointer-events-none"
      aria-hidden="true"
    >
      {/* Outer Atmospheric Volumetric Glow */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-amber-500/20 via-sky-400/15 to-transparent blur-3xl animate-pulse-subtle" />

      {/* Outer Rotating Cyber Tech Ring */}
      <div className="absolute inset-2 rounded-full border border-sky-400/20 border-dashed animate-[spin_60s_linear_infinite]" />

      {/* Middle Counter-Rotating Segmented Ring with Ticks */}
      <div className="absolute inset-8 rounded-full border-2 border-amber-500/30 border-t-amber-400 border-b-sky-400 border-r-transparent border-l-transparent animate-[spin_40s_linear_infinite_reverse]" />

      {/* Inner Precision Grid Ring */}
      <div className="absolute inset-14 rounded-full border border-white/10 bg-gradient-to-br from-[#101A2C]/90 via-[#080A0F]/95 to-[#101A2C]/80 backdrop-blur-xl shadow-2xl flex items-center justify-center">
        {/* Core Radar Sweep Line */}
        <div className="absolute inset-0 rounded-full overflow-hidden opacity-30">
          <div className="w-full h-full bg-gradient-to-b from-transparent via-amber-400/30 to-transparent animate-scanline" />
        </div>

        {/* Central Cloud Monogram Icon with Pulse Glow */}
        <div className="relative z-10 flex flex-col items-center justify-center">
          <div className="relative p-4 rounded-2xl bg-gradient-to-br from-amber-500 via-orange-500 to-amber-600 text-slate-950 shadow-xl shadow-orange-500/40">
            <Cloud className="w-10 h-10 text-slate-950 fill-slate-950/20" strokeWidth={2.2} />
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-3 w-3 bg-sky-400" />
            </span>
          </div>

          <div className="mt-2 text-[9px] font-mono tracking-widest uppercase font-bold text-amber-400/90 flex items-center gap-1">
            <Zap className="w-2.5 h-2.5 text-amber-400" />
            <span>CLOUD CORE</span>
          </div>
        </div>
      </div>

      {/* Orbiting Satellite Data Nodes */}
      <div className="absolute top-2 left-1/4 -translate-x-1/2 flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-[#080A0F]/80 border border-sky-400/40 text-[9px] font-mono text-sky-300 shadow-lg backdrop-blur-sm animate-float">
        <Cpu className="w-2.5 h-2.5 text-sky-400" />
        <span>EC2 // ap-south-1</span>
      </div>

      <div className="absolute bottom-4 right-4 flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-[#080A0F]/80 border border-amber-500/40 text-[9px] font-mono text-amber-300 shadow-lg backdrop-blur-sm animate-float-delayed">
        <Sparkles className="w-2.5 h-2.5 text-amber-400" />
        <span>BEDROCK // GENAI</span>
      </div>

      <div className="absolute top-1/2 -left-4 -translate-y-1/2 hidden sm:flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#080A0F]/80 border border-white/10 text-[9px] font-mono text-slate-400 shadow-lg backdrop-blur-sm">
        <Shield className="w-2.5 h-2.5 text-emerald-400" />
        <span>IAM VERIFIED</span>
      </div>
    </div>
  );
}
