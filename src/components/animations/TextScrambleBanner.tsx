"use client";

import * as React from "react";
import { useRef, useState, useEffect } from "react";
import { Terminal, RefreshCw, Sparkles, Copy, Check } from "lucide-react";
import { gsap, useGSAP } from "@/lib/gsap";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

const PHRASES = [
  "ARCHITECTING NEXT-GEN CLOUD INFRASTRUCTURE",
  "ACCELERATING GENERATIVE AI WITH AMAZON BEDROCK",
  "100% STUDENT-LED AWS EXPERIENTIAL LABS",
  "PRASHANTI INSTITUTE OF TECHNOLOGY & SCIENCE",
  "DEPLOYING LOW-LATENCY SERVERLESS MICROSERVICES",
];

const GLYPHS = "!<>-_\\/[]{}—=+*^?#________101010";

export function TextScrambleBanner() {
  const [index, setIndex] = useState(0);
  const textRef = useRef<HTMLSpanElement | null>(null);
  const [copied, setCopied] = useState(false);

  // Scramble effect using GSAP ticker/timeline
  const scrambleTo = React.useCallback((targetText: string) => {
    const el = textRef.current;
    if (!el) return;

    let iteration = 0;
    const maxIterations = targetText.length * 2.5;

    const timer = setInterval(() => {
      el.textContent = targetText
        .split("")
        .map((char, i) => {
          if (char === " ") return " ";
          if (i < iteration / 2.5) {
            return targetText[i];
          }
          return GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
        })
        .join("");

      iteration++;

      if (iteration >= maxIterations) {
        clearInterval(timer);
        el.textContent = targetText;
      }
    }, 28);
  }, []);

  const handleNext = () => {
    const nextIdx = (index + 1) % PHRASES.length;
    setIndex(nextIdx);
    scrambleTo(PHRASES[nextIdx]);
  };

  useEffect(() => {
    scrambleTo(PHRASES[0]);
  }, [scrambleTo]);

  return (
    <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6 backdrop-blur-xl shadow-2xl space-y-4">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-3 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <Terminal className="w-5 h-5 text-amber-400" />
          <h3 className="text-sm font-bold text-white tracking-wide uppercase">
            Holographic Terminal &amp; Dynamic Text Decoder
          </h3>
        </div>
        <div className="flex items-center gap-2">
          <Button
            size="sm"
            variant="outline"
            onClick={handleNext}
            className="gap-1.5 text-xs border-slate-700 hover:border-amber-400"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Decode Next Phrase</span>
          </Button>
        </div>
      </div>

      <div className="p-6 rounded-2xl border border-amber-500/30 bg-slate-950 font-mono text-center flex items-center justify-center min-h-[90px] shadow-inner relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-amber-500/5 via-sky-500/5 to-transparent pointer-events-none" />
        <span
          ref={textRef}
          className="text-base sm:text-xl lg:text-2xl font-black tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-300 to-sky-400 drop-shadow-[0_0_15px_rgba(255,153,0,0.4)]"
        >
          INITIALIZING...
        </span>
      </div>

      <div className="flex items-center justify-between text-[11px] text-slate-500 font-mono">
        <span>GSAP Microsecond Character Interpolation</span>
        <span className="text-amber-400">STATUS: DECODED</span>
      </div>
    </div>
  );
}
