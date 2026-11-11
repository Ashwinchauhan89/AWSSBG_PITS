"use client";

import React, { useRef } from "react";
import Link from "next/link";
import {
  Cloud,
  BrainCircuit,
  Code2,
  Users,
  Presentation,
  GraduationCap,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import { gsap, useGSAP } from "@/lib/gsap";
import { useSound } from "@/components/audio/SoundManager";

interface WhyJoinCard {
  number: string;
  title: string;
  description: string;
  icon: React.ElementType;
  badge: string;
}

const CARDS: WhyJoinCard[] = [
  {
    number: "01",
    title: "AWS Cloud Learning",
    description:
      "Explore AWS fundamentals, cloud infrastructure, and essential services.",
    icon: Cloud,
    badge: "Cloud Foundations",
  },
  {
    number: "02",
    title: "AI & Machine Learning",
    description:
      "Discover Artificial Intelligence, Machine Learning, Generative AI, and practical applications.",
    icon: BrainCircuit,
    badge: "AI & Modern MLOps",
  },
  {
    number: "03",
    title: "Hands-on Projects",
    description:
      "Turn technical concepts into real-world projects, applications, and prototypes.",
    icon: Code2,
    badge: "Prototypes & Code",
  },
  {
    number: "04",
    title: "Peer Collaboration",
    description:
      "Connect and collaborate with students across different engineering branches.",
    icon: Users,
    badge: "Cross-Branch Network",
  },
  {
    number: "05",
    title: "Workshops & Events",
    description:
      "Participate in technical sessions, community meetups, and hands-on demonstrations.",
    icon: Presentation,
    badge: "Live Demonstrations",
  },
  {
    number: "06",
    title: "Mentorship & Growth",
    description:
      "Learn from peers and appointed community leads while developing technical skills.",
    icon: GraduationCap,
    badge: "Direct Guidance",
  },
];

export function WhyJoinSection() {
  const containerRef = useRef<HTMLElement>(null);
  const { playHover, playClick } = useSound();

  useGSAP(
    () => {
      if (typeof window === "undefined") return;

      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      if (prefersReducedMotion) return;

      gsap.from(".gsap-why-card", {
        y: 28,
        opacity: 0,
        stagger: 0.08,
        duration: 0.65,
        ease: "power2.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 82%",
          once: true,
        },
      });
    },
    { scope: containerRef }
  );

  return (
    <section
      id="why-join"
      ref={containerRef}
      aria-label="Why Join Our Community"
      className="py-20 sm:py-28 relative overflow-hidden bg-[#070912] border-b border-white/10"
    >
      {/* 100% CSS-Based Ambient Lighting & Tech Grid (Zero external image dependencies) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] sm:w-[950px] h-[450px] bg-gradient-to-r from-purple-900/15 via-violet-900/10 to-indigo-900/15 blur-3xl -z-10"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 tech-grid opacity-15 -z-10"
      />

      <div className="responsive-container relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-14 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-mono font-semibold tracking-wider uppercase shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-purple-400" />
            <span>COMMUNITY VALUE • EMPOWERING BUILDERS</span>
          </div>

          <h2 className="text-3xl xs:text-4xl sm:text-5xl font-black text-white tracking-tight uppercase">
            Why Join Our{" "}
            <span className="bg-gradient-to-r from-purple-400 via-violet-300 to-amber-300 bg-clip-text text-transparent">
              Community?
            </span>
          </h2>

          <p className="text-sm sm:text-base text-slate-300 font-light leading-relaxed max-w-2xl mx-auto">
            Whether you&apos;re starting your cloud journey or building AI-powered
            applications, PITS Cloud Community helps you learn, build, and grow
            together.
          </p>
        </div>

        {/* 6 Responsive Feature Cards: Desktop 3 cols, Tablet 2 cols, Mobile 1 col */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-7">
          {CARDS.map((card) => {
            const IconComponent = card.icon;

            return (
              <div
                key={card.number}
                onMouseEnter={playHover}
                className="gsap-why-card group relative flex flex-col justify-between rounded-2xl sm:rounded-3xl p-6 sm:p-7 bg-gradient-to-b from-[#0D1222]/90 via-[#0A0E1A]/95 to-[#070A14]/98 border border-white/10 hover:border-purple-500/40 backdrop-blur-xl shadow-lg shadow-black/40 hover:shadow-[0_16px_36px_-10px_rgba(168,85,247,0.18)] hover:-translate-y-1.5 transition-all duration-300 ease-out overflow-hidden"
              >
                {/* Subtle Top Rim Highlight */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-purple-400/35 to-transparent"
                />

                {/* Card Top: Local Vector Icon & Numerical Index */}
                <div>
                  <div className="flex items-center justify-between gap-3 mb-5">
                    <div className="relative flex h-12 w-12 items-center justify-center rounded-xl bg-purple-500/10 border border-purple-500/25 text-purple-300 shadow-md group-hover:scale-105 group-hover:bg-purple-500/20 group-hover:text-purple-200 group-hover:border-purple-400/50 transition-all duration-300">
                      <IconComponent className="w-6 h-6 transition-transform duration-300 group-hover:scale-105" />
                    </div>

                    <span className="font-mono text-xs font-bold text-slate-500 group-hover:text-amber-400 transition-colors uppercase tracking-widest">
                      #{card.number}
                    </span>
                  </div>

                  {/* Card Title & Content */}
                  <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-purple-300 transition-colors tracking-tight mb-2.5">
                    {card.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-300 font-light leading-relaxed">
                    {card.description}
                  </p>
                </div>

                {/* Card Footer: Local Badge Tag */}
                <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-xs font-mono text-slate-400">
                  <span className="inline-flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-purple-400/80 group-hover:bg-amber-400 transition-colors" />
                    <span className="text-[11px] text-slate-400 group-hover:text-slate-300 transition-colors">
                      {card.badge}
                    </span>
                  </span>
                  <span className="text-[11px] text-purple-400/70 group-hover:text-amber-400 group-hover:translate-x-0.5 transition-all">
                    ●
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Section Action CTA Button */}
        <div className="mt-12 sm:mt-14 text-center">
          <Link
            href="/#join"
            onClick={playClick}
            className="inline-flex items-center gap-2 px-6 sm:px-7 py-3 rounded-full bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-500 hover:to-violet-500 text-white text-xs font-mono font-bold uppercase tracking-wider shadow-lg shadow-purple-600/30 hover:shadow-purple-600/50 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-400"
          >
            <span>Become an Active Builder</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
