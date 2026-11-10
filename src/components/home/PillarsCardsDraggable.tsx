"use client";

import * as React from "react";
import { useRef, useState, useCallback, useSyncExternalStore } from "react";
import Link from "next/link";
import {
  BookOpen,
  Hammer,
  Users,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  MoveHorizontal,
} from "lucide-react";
import { gsap, useGSAP, ScrollTrigger, Draggable } from "@/lib/gsap";
import { useSound } from "@/components/audio/SoundManager";

export interface PillarCardData {
  id: string;
  pillarNumber: string;
  pillarTag: string;
  title: string;
  subtitle: string;
  description: string;
  highlights: string[];
  icon: React.ElementType;
  href: string;
  actionText: string;
  accent: {
    name: string;
    text: string;
    border: string;
    borderHover: string;
    badgeBg: string;
    badgeText: string;
    badgeBorder: string;
    radialGradient: string;
    glowShadow: string;
    dotColor: string;
    buttonBg: string;
    buttonHover: string;
    buttonText: string;
    buttonBorder: string;
  };
}

export const PILLAR_CARDS: PillarCardData[] = [
  {
    id: "learn",
    pillarNumber: "01",
    pillarTag: "PILLAR 01",
    title: "Learn",
    subtitle: "Foundations & Applied Skills",
    description:
      "Explore cloud technologies, AI/ML, software engineering, and modern development tools through practical workshops, curriculum labs, and peer study groups.",
    highlights: [
      "AWS Cloud Primitives & Free Tier Safety",
      "Foundational AI/ML & Prompt Engineering",
      "Modern TypeScript & Web Architectures",
    ],
    icon: BookOpen,
    href: "/resources",
    actionText: "Explore Learning Labs",
    accent: {
      name: "amber",
      text: "text-amber-400",
      border: "border-purple-500/20",
      borderHover: "hover:border-amber-400/60",
      badgeBg: "bg-amber-500/10",
      badgeText: "text-amber-300",
      badgeBorder: "border-amber-500/30",
      radialGradient:
        "radial-gradient(circle at 85% 15%, rgba(255, 153, 0, 0.16), transparent 60%)",
      glowShadow: "group-hover:shadow-[0_20px_50px_-15px_rgba(255,153,0,0.25)]",
      dotColor: "bg-amber-400",
      buttonBg: "bg-amber-500/10",
      buttonHover: "hover:bg-amber-500/20 hover:border-amber-400/60",
      buttonText: "text-amber-300",
      buttonBorder: "border-amber-500/30",
    },
  },
  {
    id: "build",
    pillarNumber: "02",
    pillarTag: "PILLAR 02",
    title: "Build",
    subtitle: "Prototypes & Collaborative Code",
    description:
      "Turn ideas into real-world applications, prototypes, and collaborative projects with fellow student developers across all engineering branches.",
    highlights: [
      "Serverless APIs & Cloud Storage Systems",
      "Generative AI & Bedrock RAG Prototypes",
      "Open-Source Repositories with CI/CD",
    ],
    icon: Hammer,
    href: "/projects",
    actionText: "View Student Projects",
    accent: {
      name: "violet",
      text: "text-violet-400",
      border: "border-purple-500/20",
      borderHover: "hover:border-violet-400/60",
      badgeBg: "bg-violet-500/10",
      badgeText: "text-violet-300",
      badgeBorder: "border-violet-500/30",
      radialGradient:
        "radial-gradient(circle at 85% 15%, rgba(168, 85, 247, 0.20), transparent 60%)",
      glowShadow: "group-hover:shadow-[0_20px_50px_-15px_rgba(168,85,247,0.28)]",
      dotColor: "bg-violet-400",
      buttonBg: "bg-violet-500/10",
      buttonHover: "hover:bg-violet-500/20 hover:border-violet-400/60",
      buttonText: "text-violet-300",
      buttonBorder: "border-violet-500/30",
    },
  },
  {
    id: "connect",
    pillarNumber: "03",
    pillarTag: "PILLAR 03",
    title: "Connect",
    subtitle: "Community & Peer Mentorship",
    description:
      "Share knowledge, collaborate with peers, and participate in community activities, campus meetups, and student tech showcases at PITS Ujjain.",
    highlights: [
      "Cross-Department Peer Collaboration",
      "Technical Talks & Architecture Reviews",
      "Direct Mentorship with Appointed Leads",
    ],
    icon: Users,
    href: "/team",
    actionText: "Connect With Community",
    accent: {
      name: "sky",
      text: "text-sky-400",
      border: "border-purple-500/20",
      borderHover: "hover:border-sky-400/60",
      badgeBg: "bg-sky-500/10",
      badgeText: "text-sky-300",
      badgeBorder: "border-sky-500/30",
      radialGradient:
        "radial-gradient(circle at 85% 15%, rgba(56, 189, 248, 0.16), transparent 60%)",
      glowShadow: "group-hover:shadow-[0_20px_50px_-15px_rgba(56,189,248,0.25)]",
      dotColor: "bg-sky-400",
      buttonBg: "bg-sky-500/10",
      buttonHover: "hover:bg-sky-500/20 hover:border-sky-400/60",
      buttonText: "text-sky-300",
      buttonBorder: "border-sky-500/30",
    },
  },
];

// Helper functions for external subscription to reduced-motion preference
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

export function PillarsCardsDraggable() {
  const containerRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const draggableInstancesRef = useRef<Draggable[] | null>(null);
  const floatingTweensRef = useRef<gsap.core.Tween[]>([]);

  const [activeIndex, setActiveIndex] = useState(0);
  const { playHover } = useSound();

  // Non-cascading reduced-motion detection using useSyncExternalStore
  const reducedMotion = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotionSnapshot,
    getReducedMotionServerSnapshot
  );

  // Programmatic scroll/slide to a specific pillar
  const scrollToPillar = useCallback((targetIndex: number) => {
    if (!trackRef.current || !viewportRef.current) return;
    const card = cardsRef.current[targetIndex];
    if (!card) return;

    const viewportWidth = viewportRef.current.offsetWidth;
    const trackWidth = trackRef.current.scrollWidth;
    const overflow = trackWidth - viewportWidth;

    if (overflow > 10) {
      const cardLeft = card.offsetLeft;
      const cardWidth = card.offsetWidth;
      // Center card in viewport or clamp to boundaries
      const idealX = -(cardLeft - (viewportWidth - cardWidth) / 2);
      const clampedX = Math.max(-overflow, Math.min(0, idealX));

      gsap.to(trackRef.current, {
        x: clampedX,
        duration: 0.6,
        ease: "power3.out",
      });
    } else {
      // Desktop fitted layout - smooth bounce back to origin
      gsap.to(trackRef.current, {
        x: 0,
        duration: 0.5,
        ease: "power3.out",
      });
    }
    setActiveIndex(targetIndex);
  }, []);

  // GSAP Animations and Draggable setup
  useGSAP(
    () => {
      if (typeof window === "undefined" || !viewportRef.current || !trackRef.current) return;

      const viewportEl = viewportRef.current;
      const trackEl = trackRef.current;
      const cardEls = cardsRef.current.filter(Boolean) as HTMLDivElement[];

      if (cardEls.length === 0) return;

      // 1. Scroll Reveal Entrance
      if (!reducedMotion) {
        gsap.from(cardEls, {
          y: 45,
          opacity: 0,
          stagger: 0.15,
          duration: 0.85,
          ease: "power3.out",
          scrollTrigger: {
            trigger: viewportEl,
            start: "top 85%",
            once: true,
          },
        });
      }

      // 2. Subtle Floating Animation (staggered rates per card)
      if (!reducedMotion) {
        const float0 = gsap.to(cardEls[0], {
          y: -7,
          duration: 3.4,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
        });

        const float1 = cardEls[1]
          ? gsap.to(cardEls[1], {
              y: -9,
              duration: 4.1,
              ease: "sine.inOut",
              yoyo: true,
              repeat: -1,
              delay: 0.35,
            })
          : null;

        const float2 = cardEls[2]
          ? gsap.to(cardEls[2], {
              y: -6.5,
              duration: 3.7,
              ease: "sine.inOut",
              yoyo: true,
              repeat: -1,
              delay: 0.7,
            })
          : null;

        const tweens = [float0, float1, float2].filter(Boolean) as gsap.core.Tween[];
        floatingTweensRef.current = tweens;

        // Save CPU/GPU: Pause floating tweens when out of viewport
        ScrollTrigger.create({
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          onLeave: () => tweens.forEach((t) => t.pause()),
          onLeaveBack: () => tweens.forEach((t) => t.pause()),
          onEnter: () => tweens.forEach((t) => t.resume()),
          onEnterBack: () => tweens.forEach((t) => t.resume()),
        });
      }

      // 3. Draggable Horizontal Track
      const updateDraggableBounds = () => {
        const viewportW = viewportEl.offsetWidth;
        const trackW = trackEl.scrollWidth;
        const overflow = trackW - viewportW;
        const overflowing = overflow > 10;

        if (draggableInstancesRef.current && draggableInstancesRef.current[0]) {
          const instance = draggableInstancesRef.current[0];
          if (overflowing) {
            instance.applyBounds({
              minX: -overflow,
              maxX: 0,
            });
          } else {
            // Screen is wide enough to show all cards: allow elastic peek drag then snap back
            instance.applyBounds({
              minX: -45,
              maxX: 45,
            });
          }
        }
      };

      const instances = Draggable.create(trackEl, {
        type: "x",
        edgeResistance: 0.75,
        cursor: "grab",
        activeCursor: "grabbing",
        dragClickables: false,
        minimumMovement: 5,
        onDrag: function () {
          // Calculate active card index based on current scroll position
          const currentX = this.x;
          let closestIdx = 0;
          let minDistance = Infinity;

          cardEls.forEach((card, idx) => {
            const cardCenter = card.offsetLeft + card.offsetWidth / 2;
            const viewportCenter = -currentX + viewportEl.offsetWidth / 2;
            const dist = Math.abs(cardCenter - viewportCenter);
            if (dist < minDistance) {
              minDistance = dist;
              closestIdx = idx;
            }
          });

          setActiveIndex(closestIdx);
        },
        onRelease: function () {
          const viewportW = viewportEl.offsetWidth;
          const trackW = trackEl.scrollWidth;
          const overflow = trackW - viewportW;

          // If content fits completely, snap back smoothly to 0
          if (overflow <= 10) {
            gsap.to(trackEl, {
              x: 0,
              duration: 0.5,
              ease: "power3.out",
            });
          }
        },
      });

      draggableInstancesRef.current = instances;
      updateDraggableBounds();

      // Recalculate on window resize
      const handleResize = () => {
        updateDraggableBounds();
      };
      window.addEventListener("resize", handleResize);

      // Clean up Draggable instances on unmount
      return () => {
        window.removeEventListener("resize", handleResize);
        if (draggableInstancesRef.current) {
          draggableInstancesRef.current.forEach((instance) => instance.kill());
          draggableInstancesRef.current = null;
        }
        floatingTweensRef.current.forEach((t) => t.kill());
      };
    },
    { scope: containerRef, dependencies: [reducedMotion] }
  );

  // 3D Perspective Hover Tilt on desktop
  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>, index: number) => {
    if (reducedMotion) return;
    const card = cardsRef.current[index];
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const relX = (e.clientX - rect.left) / rect.width - 0.5;
    const relY = (e.clientY - rect.top) / rect.height - 0.5;

    gsap.to(card, {
      rotateY: relX * 10,
      rotateX: -relY * 10,
      scale: 1.02,
      transformPerspective: 1000,
      duration: 0.25,
      ease: "power2.out",
      overwrite: "auto",
    });
  };

  const handlePointerLeave = (index: number) => {
    if (reducedMotion) return;
    const card = cardsRef.current[index];
    if (!card) return;

    gsap.to(card, {
      rotateX: 0,
      rotateY: 0,
      scale: 1,
      duration: 0.45,
      ease: "power2.out",
      overwrite: "auto",
    });
  };

  const handleCardEnter = (index: number) => {
    playHover();
    setActiveIndex(index);
  };

  return (
    <div ref={containerRef} className="relative w-full">
      {/* Navigation & Draggable Hint Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6 px-1">
        {/* Interactive Drag Hint Pill */}
        <div className="inline-flex items-center gap-2 text-xs font-mono text-purple-300/90 bg-purple-950/40 border border-purple-500/30 px-3.5 py-1.5 rounded-full backdrop-blur-md shadow-sm">
          <MoveHorizontal className="w-3.5 h-3.5 text-purple-400 animate-pulse" />
          <span className="hidden sm:inline">
            Interactive Cards: Drag horizontally or swipe to explore
          </span>
          <span className="sm:hidden">Swipe or drag cards</span>
        </div>

        {/* Controls: Pillar step dots & Next / Prev navigation */}
        <div className="flex items-center gap-2">
          {/* Pillar Selector Dots */}
          <div
            className="flex items-center gap-1.5 bg-[#0B0F1E]/80 border border-purple-500/20 px-3 py-1.5 rounded-full backdrop-blur-md"
            role="tablist"
            aria-label="Pillar card pagination"
          >
            {PILLAR_CARDS.map((card, idx) => (
              <button
                key={card.id}
                onClick={() => scrollToPillar(idx)}
                className={`h-2 rounded-full transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-400 ${
                  activeIndex === idx
                    ? "w-7 bg-gradient-to-r from-purple-400 to-violet-400 shadow-[0_0_8px_rgba(168,85,247,0.5)]"
                    : "w-2 bg-white/20 hover:bg-white/40"
                }`}
                role="tab"
                aria-selected={activeIndex === idx}
                aria-label={`View ${card.pillarTag} ${card.title}`}
              />
            ))}
          </div>

          {/* Prev / Next Buttons */}
          <div className="flex items-center gap-1">
            <button
              onClick={() => scrollToPillar(Math.max(0, activeIndex - 1))}
              disabled={activeIndex === 0}
              className="w-8 h-8 rounded-full flex items-center justify-center bg-[#0B0F1E]/80 border border-purple-500/20 text-slate-300 hover:text-white hover:bg-purple-950/50 hover:border-purple-400/40 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-400"
              aria-label="Previous card"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => scrollToPillar(Math.min(PILLAR_CARDS.length - 1, activeIndex + 1))}
              disabled={activeIndex === PILLAR_CARDS.length - 1}
              className="w-8 h-8 rounded-full flex items-center justify-center bg-[#0B0F1E]/80 border border-purple-500/20 text-slate-300 hover:text-white hover:bg-purple-950/50 hover:border-purple-400/40 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-400"
              aria-label="Next card"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Viewport Boundary Container */}
      <div
        ref={viewportRef}
        className="relative w-full overflow-hidden select-none cursor-grab active:cursor-grabbing pb-8 pt-2"
      >
        {/* Draggable Track */}
        <div
          ref={trackRef}
          className="flex gap-6 sm:gap-8 items-stretch will-change-transform"
          style={{ touchAction: "pan-y" }}
        >
          {PILLAR_CARDS.map((card, idx) => {
            const Icon = card.icon;
            const isActive = activeIndex === idx;

            return (
              <div
                key={card.id}
                ref={(el) => {
                  cardsRef.current[idx] = el;
                }}
                onPointerEnter={() => handleCardEnter(idx)}
                onPointerMove={(e) => handlePointerMove(e, idx)}
                onPointerLeave={() => handlePointerLeave(idx)}
                className={`relative group rounded-[28px] p-6 sm:p-8 3xl:p-9 border transition-all duration-300 flex flex-col justify-between overflow-hidden bg-[#0A0D1B]/90 backdrop-blur-2xl ${
                  card.accent.border
                } ${card.accent.borderHover} ${card.accent.glowShadow} ${
                  isActive
                    ? "ring-1 ring-purple-500/30"
                    : "ring-0"
                } w-[85vw] max-w-[360px] sm:w-[420px] lg:w-[calc((100%-4rem)/3)] lg:max-w-none flex-shrink-0`}
                style={{
                  transformStyle: "preserve-3d",
                }}
              >
                {/* Ambient Radial Mesh Gradient */}
                <div
                  className="absolute inset-0 pointer-events-none opacity-60 group-hover:opacity-100 transition-opacity duration-500 rounded-[28px]"
                  style={{ background: card.accent.radialGradient }}
                />

                {/* Top Subtle Rim Light Accent */}
                <div className="absolute inset-x-0 top-0 h-[1.5px] bg-gradient-to-r from-transparent via-purple-400/40 to-transparent pointer-events-none" />

                {/* Card Top Section: Icon & Pillar Badge */}
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-6">
                    <div
                      className={`w-12 h-12 rounded-2xl ${card.accent.badgeBg} ${card.accent.badgeBorder} border flex items-center justify-center shadow-lg transition-transform duration-300 group-hover:scale-110`}
                    >
                      <Icon className={`w-6 h-6 ${card.accent.text}`} />
                    </div>

                    <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-950/60 border border-purple-500/30 shadow-inner">
                      <span className="font-mono text-[11px] font-bold tracking-widest text-purple-300 uppercase">
                        {card.pillarTag}
                      </span>
                    </div>
                  </div>

                  {/* Title & Subtitle */}
                  <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight mb-1 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-slate-200 transition-all duration-300">
                    {card.title}
                  </h3>
                  <p className={`text-xs font-mono font-semibold tracking-wide mb-4 ${card.accent.text}`}>
                    {card.subtitle}
                  </p>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-light mb-6">
                    {card.description}
                  </p>
                </div>

                {/* Card Bottom Section: Highlights & Action Button */}
                <div className="relative z-10 pt-4 border-t border-purple-500/15">
                  <div className="mb-6 space-y-2.5">
                    <p className="text-[10px] font-mono uppercase tracking-widest text-slate-400 font-semibold">
                      Key Highlights
                    </p>
                    {card.highlights.map((highlight, hIdx) => (
                      <div
                        key={hIdx}
                        className="flex items-start gap-2.5 text-xs text-slate-200 font-light"
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${card.accent.dotColor} shrink-0 mt-1.5 shadow-[0_0_8px_currentColor]`}
                        />
                        <span className="leading-snug">{highlight}</span>
                      </div>
                    ))}
                  </div>

                  {/* Interactive CTA Link */}
                  <Link
                    href={card.href}
                    className={`inline-flex items-center justify-between w-full px-4 py-2.5 rounded-xl ${card.accent.buttonBg} ${card.accent.buttonBorder} border ${card.accent.buttonText} ${card.accent.buttonHover} text-xs font-mono font-semibold tracking-wider transition-all duration-300 group/btn focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-400`}
                    aria-label={`${card.actionText} for ${card.title} pillar`}
                  >
                    <span>{card.actionText}</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover/btn:translate-x-1" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
