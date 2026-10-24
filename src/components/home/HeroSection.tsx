"use client";

import * as React from "react";
import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Calendar, ChevronDown, ShieldCheck } from "lucide-react";
import { GsapMagnetic } from "@/components/gsap/GsapMagnetic";
import { gsap, useGSAP } from "@/lib/gsap";
import { useSound } from "@/components/audio/SoundManager";

export function HeroSection() {
  const heroRef = useRef<HTMLElement | null>(null);
  const { playHover, playClick } = useSound();

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(
        {
          reduceMotion: "(prefers-reduced-motion: reduce)",
          normalMotion: "(prefers-reduced-motion: no-preference)",
        },
        (context) => {
          const { reduceMotion } = context.conditions as { reduceMotion: boolean };

          if (reduceMotion) {
            // Instant visibility with zero delay for reduced motion preference
            gsap.set(
              [
                ".gsap-hero-eyebrow",
                ".gsap-hero-title",
                ".gsap-hero-flourish",
                ".gsap-hero-headline",
                ".gsap-hero-desc",
                ".gsap-hero-cta",
                ".gsap-hero-scroll",
              ],
              { opacity: 1, y: 0, scale: 1, scaleX: 1, clearProps: "all" }
            );
            return;
          }

          // Snappy entrance animation (total sequence under 0.75s, no sluggish delays)
          const tl = gsap.timeline({
            defaults: { ease: "power2.out" },
            onComplete: () => {
              gsap.set(
                [
                  ".gsap-hero-eyebrow",
                  ".gsap-hero-title",
                  ".gsap-hero-flourish",
                  ".gsap-hero-headline",
                  ".gsap-hero-desc",
                  ".gsap-hero-cta",
                  ".gsap-hero-scroll",
                ],
                { clearProps: "opacity,transform" }
              );
            },
          });

          tl.from(".gsap-hero-eyebrow", {
            y: -12,
            opacity: 0,
            duration: 0.35,
          })
            .from(
              ".gsap-hero-title",
              {
                scale: 0.96,
                y: 16,
                opacity: 0,
                duration: 0.45,
                ease: "power3.out",
              },
              "-=0.2"
            )
            .from(
              ".gsap-hero-flourish",
              {
                scaleX: 0,
                opacity: 0,
                duration: 0.4,
                transformOrigin: "center center",
              },
              "-=0.25"
            )
            .from(
              ".gsap-hero-headline",
              {
                y: 10,
                opacity: 0,
                duration: 0.3,
              },
              "-=0.2"
            )
            .from(
              ".gsap-hero-desc",
              {
                y: 10,
                opacity: 0,
                duration: 0.35,
              },
              "-=0.2"
            )
            .from(
              ".gsap-hero-cta",
              {
                y: 10,
                opacity: 0,
                duration: 0.3,
                stagger: 0.08,
              },
              "-=0.15"
            )
            .from(
              ".gsap-hero-scroll",
              {
                opacity: 0,
                y: -6,
                duration: 0.3,
              },
              "-=0.1"
            );
        }
      );
    },
    { scope: heroRef }
  );

  const handleScrollToCommunity = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    playClick();
    const el = document.getElementById("community");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative min-h-[90vh] sm:min-h-screen flex flex-col justify-between items-center text-center px-3 sm:px-6 lg:px-8 xl:px-24 2xl:px-32 pt-6 sm:pt-10 pb-6 sm:pb-8 overflow-hidden select-none"
    >
      {/* 1. Futuristic Cloud + X Themed Infrastructure Backdrop */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Image
          src="/images/backgrounds/cloud-x-background.webp"
          alt="AWS Student Builder Group Cloud Infrastructure with Futuristic X Motif"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center scale-100"
        />
        {/* Atmospheric Darkening & Vignette Overlays for pristine readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#080A0F] via-[#080A0F]/60 to-[#080A0F]/45" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(8,10,15,0.75)_0%,rgba(8,10,15,0.45)_55%,transparent_85%)]" />
        <div className="absolute inset-0 bg-radial-vignette opacity-80" />
        <div className="absolute inset-0 tech-grid opacity-15" />
      </div>

      {/* Top spacing */}
      <div className="w-full h-1 sm:h-2" />

      {/* 2. Main Centered Festival Content Column (Exact layout from reference screenshot) */}
      <div className="relative z-10 max-w-4xl 2xl:max-w-5xl 3xl:max-w-6xl 4xl:max-w-7xl mx-auto flex flex-col items-center my-auto py-4 sm:py-8 space-y-4 sm:space-y-6 md:space-y-7 w-full">
        {/* Eyebrow Institutional Credit with Purple Pixel Chip Brand Logo - Single line responsive */}
        <div className="gsap-hero-eyebrow inline-flex items-center gap-1.5 xs:gap-2 sm:gap-2.5 px-2.5 xs:px-3 sm:px-4 py-1 sm:py-1.5 rounded-full bg-[#080A0F]/90 border border-purple-500/40 text-[6.5px] xs:text-[8px] sm:text-[10.5px] md:text-xs font-mono font-bold tracking-[0.04em] xs:tracking-[0.08em] sm:tracking-[0.18em] text-slate-200 uppercase shadow-xl shadow-purple-500/20 backdrop-blur-md max-w-full">
          <Image
            src="/images/branding/purple-pixel-chip.png"
            alt="PITS Cloud Computing Purple Pixel Chip"
            width={18}
            height={18}
            className="w-3.5 h-3.5 sm:w-4 sm:h-4 object-contain rounded shrink-0 shadow-sm shadow-purple-500/40"
          />
          <span className="whitespace-nowrap">PRASHANTI INSTITUTE OF TECHNOLOGY &amp; SCIENCE • UJJAIN</span>
        </div>

        {/* Dramatic Ornate Monumental Title with Flourishing Calligraphy Swoosh */}
        <div className="relative flex flex-col items-center w-full px-2">
          <h1 className="gsap-hero-title text-4xl xs:text-5xl sm:text-7xl md:text-8xl lg:text-9xl 2xl:text-[10rem] 3xl:text-[12rem] 4xl:text-[14rem] font-sans font-black tracking-tight sm:tracking-wider text-white uppercase drop-shadow-[0_4px_30px_rgba(0,0,0,0.9)] leading-[0.95] max-w-full">
            BUILDERS
          </h1>

          {/* Calligraphic Flourish Underline Swoosh (Properly positioned beneath letters without obscuring text) */}
          <div className="gsap-hero-flourish w-full max-w-[240px] xs:max-w-xs sm:max-w-xl md:max-w-2xl 2xl:max-w-3xl 3xl:max-w-4xl mt-1 sm:mt-2 relative pointer-events-none">
            <svg
              viewBox="0 0 600 80"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full h-auto drop-shadow-[0_2px_12px_rgba(255,153,0,0.6)]"
            >
              {/* Ornate Calligraphy Swoosh Path */}
              <path
                d="M 60 15 C 140 -5, 220 5, 300 25 C 380 45, 480 50, 540 35 C 570 25, 530 45, 440 55 C 320 68, 160 62, 50 48 C 20 44, 40 30, 90 28 C 170 25, 350 42, 520 38"
                stroke="url(#flourishGrad)"
                strokeWidth="3.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="opacity-95"
              />
              <circle cx="520" cy="38" r="3.5" fill="#FF9900" />
              <defs>
                <linearGradient id="flourishGrad" x1="0" y1="0" x2="600" y2="80" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#F5F7FA" />
                  <stop offset="0.5" stopColor="#FF9900" />
                  <stop offset="1" stopColor="#43B7FF" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          {/* Sub-headline: AWS Student Builder Group */}
          <p className="gsap-hero-headline mt-2 sm:mt-3 mb-1 text-[11px] xs:text-sm sm:text-lg md:text-xl 3xl:text-2xl font-sans font-extrabold tracking-[0.14em] sm:tracking-[0.22em] text-[#FF9900] uppercase">
            AWS STUDENT BUILDER GROUP
          </p>
        </div>

        {/* Supporting Editorial Description */}
        <p className="gsap-hero-desc text-xs sm:text-base md:text-lg 3xl:text-xl text-slate-200 max-w-2xl 3xl:max-w-3xl mx-auto leading-relaxed font-light drop-shadow-md px-2 sm:px-0">
          The AWS Student Builder Group at Prashanti Institute of Technology &amp; Science serves as a powerful intellectual platform where student innovators explore cloud computing, build intelligent applications, and turn visionary ideas into real-world projects.
        </p>

        {/* Dual CTAs (Responsive stacking with pixel-accurate matching heights, focus rings, semantic HTML) */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 w-full sm:w-auto pt-2">
          <GsapMagnetic className="gsap-hero-cta w-full sm:w-auto" strength={0.3}>
            <a
              href="#community"
              onClick={handleScrollToCommunity}
              onMouseEnter={playHover}
              className="inline-flex items-center justify-center w-full sm:w-auto h-12 min-h-[48px] gap-2.5 px-6 sm:px-8 py-3 rounded-full font-sans font-bold text-xs sm:text-sm uppercase tracking-wider bg-gradient-to-r from-amber-500 via-orange-500 to-amber-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 shadow-2xl shadow-orange-500/40 border border-transparent transition-all active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF9900] focus-visible:ring-offset-2 focus-visible:ring-offset-[#080A0F]"
            >
              <span>EXPLORE THE COMMUNITY</span>
              <ArrowRight className="w-4 h-4 shrink-0" />
            </a>
          </GsapMagnetic>

          <GsapMagnetic className="gsap-hero-cta w-full sm:w-auto" strength={0.25}>
            <Link
              href="/events"
              onMouseEnter={playHover}
              onClick={playClick}
              className="inline-flex items-center justify-center w-full sm:w-auto h-12 min-h-[48px] gap-2.5 px-6 sm:px-8 py-3 rounded-full font-sans font-bold text-xs sm:text-sm uppercase tracking-wider border border-white/30 text-white hover:bg-white/10 hover:border-white transition-all backdrop-blur-md shadow-lg active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF9900] focus-visible:ring-offset-2 focus-visible:ring-offset-[#080A0F]"
            >
              <Calendar className="w-4 h-4 text-[#FF9900] shrink-0" />
              <span>UPCOMING WORKSHOPS</span>
            </Link>
          </GsapMagnetic>
        </div>

        {/* Disclaimer Notice */}
        <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 text-[9.5px] sm:text-[11px] font-mono text-slate-400 pt-1 text-center max-w-xl mx-auto px-2">
          <ShieldCheck className="w-3.5 h-3.5 text-[#FF9900] shrink-0" />
          <span>Independent student-led campus community • Not official AWS corporate site</span>
        </div>
      </div>

      {/* 3. Subtle Animated Scroll Indicator */}
      <div className="gsap-hero-scroll relative z-10 flex flex-col items-center gap-1.5 pt-4 text-[10px] font-mono tracking-[0.25em] text-slate-400 uppercase">
        <a
          href="#community"
          onClick={handleScrollToCommunity}
          onMouseEnter={playHover}
          className="group flex flex-col items-center gap-1 hover:text-[#FF9900] transition-colors focus-visible:outline-none focus-visible:text-[#FF9900]"
          aria-label="Scroll to explore"
        >
          <span>SCROLL TO EXPLORE</span>
          <div className="w-5 h-8 rounded-full border border-white/20 group-hover:border-[#FF9900]/60 flex items-start justify-center p-1 transition-colors">
            <span className="w-1 h-2 rounded-full bg-[#FF9900] animate-bounce" />
          </div>
          <ChevronDown className="w-3.5 h-3.5 text-[#FF9900] animate-pulse -mt-0.5" />
        </a>
      </div>
    </section>
  );
}
