"use client";

import React, { useRef, useSyncExternalStore } from "react";
import { Sparkles } from "lucide-react";
import { gsap, useGSAP } from "@/lib/gsap";

function subscribeReducedMotion(callback: () => void) {
  if (typeof window === "undefined") return () => {};
  const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
  mq.addEventListener("change", callback);
  return () => mq.removeEventListener("change", callback);
}

function getReducedMotionSnapshot() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function getReducedMotionServerSnapshot() {
  return false;
}

const TECH_ITEMS = [
  { label: "AWS Cloud", color: "text-amber-400" },
  { label: "Cloud Computing", color: "text-sky-400" },
  { label: "Artificial Intelligence", color: "text-violet-400" },
  { label: "Machine Learning", color: "text-purple-300" },
  { label: "Generative AI", color: "text-amber-300" },
  { label: "DevOps", color: "text-emerald-400" },
  { label: "Data Engineering", color: "text-sky-300" },
  { label: "Serverless", color: "text-fuchsia-400" },
  { label: "Open Source", color: "text-indigo-400" },
  { label: "Software Engineering", color: "text-cyan-300" },
];

export function TechnologyMarquee() {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const tweenRef = useRef<gsap.core.Tween | null>(null);

  const reducedMotion = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotionSnapshot,
    getReducedMotionServerSnapshot
  );

  useGSAP(
    () => {
      if (reducedMotion || !trackRef.current) return;

      const track = trackRef.current;
      const totalWidth = track.scrollWidth / 2;

      tweenRef.current = gsap.to(track, {
        x: -totalWidth,
        duration: 32,
        ease: "none",
        repeat: -1,
      });

      return () => {
        tweenRef.current?.kill();
      };
    },
    { scope: containerRef, dependencies: [reducedMotion] }
  );

  const handleMouseEnter = () => {
    if (tweenRef.current && !reducedMotion) {
      gsap.to(tweenRef.current, { timeScale: 0.35, duration: 0.5 });
    }
  };

  const handleMouseLeave = () => {
    if (tweenRef.current && !reducedMotion) {
      gsap.to(tweenRef.current, { timeScale: 1, duration: 0.5 });
    }
  };

  return (
    <div
      ref={containerRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative w-full py-4 sm:py-5 border-y border-purple-500/20 bg-[#070913] overflow-hidden select-none"
      aria-label="Technology focus areas marquee"
    >
      {/* Ambient gradient edge fades for high-end conference look */}
      <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-r from-[#070913] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-l from-[#070913] to-transparent z-10 pointer-events-none" />

      {/* Infinite scrolling dual-track */}
      <div
        ref={trackRef}
        className="flex items-center gap-8 sm:gap-12 whitespace-nowrap will-change-transform"
      >
        {/* Track 1 */}
        {TECH_ITEMS.map((item, idx) => (
          <div key={`m1-${idx}`} className="inline-flex items-center gap-3 sm:gap-4 shrink-0">
            <span className="font-mono text-xs sm:text-sm font-bold uppercase tracking-wider text-white hover:text-purple-300 transition-colors">
              {item.label}
            </span>
            <Sparkles className="w-3 h-3 text-purple-400/70" />
          </div>
        ))}

        {/* Duplicate Track 2 for seamless loop */}
        {TECH_ITEMS.map((item, idx) => (
          <div key={`m2-${idx}`} className="inline-flex items-center gap-3 sm:gap-4 shrink-0">
            <span className="font-mono text-xs sm:text-sm font-bold uppercase tracking-wider text-white hover:text-purple-300 transition-colors">
              {item.label}
            </span>
            <Sparkles className="w-3 h-3 text-purple-400/70" />
          </div>
        ))}
      </div>
    </div>
  );
}

