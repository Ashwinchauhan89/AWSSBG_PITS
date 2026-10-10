"use client";

import * as React from "react";
import { useRef } from "react";
import { gsap, useGSAP, ScrollTrigger } from "@/lib/gsap";

export function GsapScrollProgress() {
  const barRef = useRef<HTMLDivElement | null>(null);

  useGSAP(() => {
    if (!barRef.current) return;

    gsap.to(barRef.current, {
      scaleX: 1,
      ease: "none",
      scrollTrigger: {
        trigger: document.documentElement,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.15,
      },
    });
  }, { scope: barRef });

  return (
    <div className="fixed top-0 left-0 right-0 h-[2.5px] z-50 pointer-events-none bg-slate-900/30">
      <div
        ref={barRef}
        style={{ transformOrigin: "0% 50%", transform: "scaleX(0)" }}
        className="w-full h-full bg-gradient-to-r from-amber-500 via-orange-500 to-sky-400 shadow-[0_0_12px_rgba(255,153,0,0.8)] will-change-transform"
      />
    </div>
  );
}
