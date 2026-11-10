"use client";

import React, { useRef } from "react";
import { gsap, useGSAP, ScrollTrigger } from "@/lib/gsap";

interface FooterAnimationWrapperProps {
  children: React.ReactNode;
  className?: string;
}

export function FooterAnimationWrapper({
  children,
  className = "",
}: FooterAnimationWrapperProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useGSAP(
    (context, contextSafe) => {
      const container = containerRef.current;
      if (!container || typeof window === "undefined") return;

      // Respect user's motion preferences
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      if (!prefersReducedMotion) {
        // Register ScrollTrigger explicitly for this context
        gsap.registerPlugin(ScrollTrigger);

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: container,
            start: "top 88%",
            once: true, // Trigger once only as required
          },
        });

        // 1. Footer CTA Section entrance
        tl.from(".gsap-footer-cta", {
          opacity: 0,
          y: 28,
          scale: 0.98,
          duration: 0.8,
          ease: "power3.out",
        });

        // 2. Brand Logo entrance (subtle fade & scale, no endless bouncing)
        tl.from(
          ".gsap-footer-logo",
          {
            opacity: 0,
            scale: 0.88,
            duration: 0.65,
            ease: "power2.out",
          },
          "-=0.4"
        );

        // 3. Footer Headings (staggered fade and upward movement)
        tl.from(
          ".gsap-footer-heading",
          {
            opacity: 0,
            y: 14,
            duration: 0.5,
            stagger: 0.08,
            ease: "power2.out",
          },
          "-=0.4"
        );

        // 4. Staggered reveal for columns
        tl.from(
          ".gsap-footer-col",
          {
            opacity: 0,
            y: 22,
            duration: 0.7,
            stagger: 0.1,
            ease: "power3.out",
          },
          "-=0.45"
        );

        // 5. Social Icons pop-in
        tl.from(
          ".gsap-social-icon",
          {
            opacity: 0,
            scale: 0.75,
            duration: 0.35,
            stagger: 0.04,
            ease: "back.out(1.4)",
          },
          "-=0.3"
        );

        // 6. Copyright Bar & Disclaimer reveal
        tl.from(
          ".gsap-footer-bottom",
          {
            opacity: 0,
            y: 16,
            duration: 0.6,
            ease: "power2.out",
          },
          "-=0.2"
        );
      }

      // Event-driven hover interactions wrapped in contextSafe for leak-free execution
      const cleanupListeners: (() => void)[] = [];

      if (contextSafe && !prefersReducedMotion) {
        // Social icon hover: subtle scale & slight rotation
        const socialIcons =
          container.querySelectorAll<HTMLElement>(".gsap-social-icon");
        socialIcons.forEach((icon) => {
          const onEnter = contextSafe(() => {
            gsap.to(icon, {
              scale: 1.1,
              rotation: -3,
              duration: 0.25,
              ease: "power2.out",
              overwrite: "auto",
            });
          });
          const onLeave = contextSafe(() => {
            gsap.to(icon, {
              scale: 1,
              rotation: 0,
              duration: 0.25,
              ease: "power2.out",
              overwrite: "auto",
            });
          });

          icon.addEventListener("mouseenter", onEnter);
          icon.addEventListener("mouseleave", onLeave);

          cleanupListeners.push(() => {
            icon.removeEventListener("mouseenter", onEnter);
            icon.removeEventListener("mouseleave", onLeave);
          });
        });

        // CTA button hover: subtle vertical lift
        const ctaBtns =
          container.querySelectorAll<HTMLElement>(".gsap-cta-btn");
        ctaBtns.forEach((btn) => {
          const onEnter = contextSafe(() => {
            gsap.to(btn, {
              y: -2,
              duration: 0.2,
              ease: "power2.out",
              overwrite: "auto",
            });
          });
          const onLeave = contextSafe(() => {
            gsap.to(btn, {
              y: 0,
              duration: 0.2,
              ease: "power2.out",
              overwrite: "auto",
            });
          });

          btn.addEventListener("mouseenter", onEnter);
          btn.addEventListener("mouseleave", onLeave);

          cleanupListeners.push(() => {
            btn.removeEventListener("mouseenter", onEnter);
            btn.removeEventListener("mouseleave", onLeave);
          });
        });
      }

      // Clean up manually registered event listeners
      return () => {
        cleanupListeners.forEach((cleanup) => cleanup());
      };
    },
    { scope: containerRef }
  );

  return (
    <div ref={containerRef} className={`relative w-full ${className}`}>
      {children}
    </div>
  );
}

