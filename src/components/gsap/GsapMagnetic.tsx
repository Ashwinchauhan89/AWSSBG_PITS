"use client";

import * as React from "react";
import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

interface GsapMagneticProps {
  children: React.ReactNode;
  strength?: number; // magnetic strength multiplier, default 0.35
  className?: string;
}

export function GsapMagnetic({
  children,
  strength = 0.35,
  className = "",
}: GsapMagneticProps) {
  const magneticRef = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      const el = magneticRef.current;
      if (!el) return;

      const xTo = gsap.quickTo(el, "x", {
        duration: 0.8,
        ease: "elastic.out(1.1, 0.3)",
      });
      const yTo = gsap.quickTo(el, "y", {
        duration: 0.8,
        ease: "elastic.out(1.1, 0.3)",
      });

      const handleMouseMove = (e: MouseEvent) => {
        const { clientX, clientY } = e;
        const rect = el.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const distanceX = clientX - centerX;
        const distanceY = clientY - centerY;

        xTo(distanceX * strength);
        yTo(distanceY * strength);
      };

      const handleMouseLeave = () => {
        xTo(0);
        yTo(0);
      };

      el.addEventListener("mousemove", handleMouseMove);
      el.addEventListener("mouseleave", handleMouseLeave);

      return () => {
        el.removeEventListener("mousemove", handleMouseMove);
        el.removeEventListener("mouseleave", handleMouseLeave);
      };
    },
    { scope: magneticRef }
  );

  return (
    <div ref={magneticRef} className={`inline-block will-change-transform ${className}`}>
      {children}
    </div>
  );
}
