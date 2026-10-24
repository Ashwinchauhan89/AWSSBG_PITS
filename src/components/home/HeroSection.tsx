"use client";

import * as React from "react";
import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Calendar, ChevronDown, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { GsapMagnetic } from "@/components/gsap/GsapMagnetic";
import { gsap, useGSAP } from "@/lib/gsap";
import { useSound } from "@/components/audio/SoundManager";

export function HeroSection() {
  const heroRef = useRef<HTMLElement | null>(null);
  const { playHover, playClick } = useSound();

  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.from(".gsap-hero-eyebrow", {
        y: -20,
        opacity: 0,
        duration: 0.8,
        letterSpacing: "0.25em",
      })
        .from(
          ".gsap-hero-title",
          {
            scale: 0.9,
            y: 40,
            opacity: 0,
            duration: 1.2,
            ease: "power4.out",
          },
          "-=0.4"
        )
        .from(
          ".gsap-hero-flourish",
          {
            scaleX: 0,
            opacity: 0,
            duration: 1.0,
            ease: "power2.out",
          },
          "-=0.8"
        )
        .from(
          ".gsap-hero-headline",
          {
            y: 20,
            opacity: 0,
            duration: 0.7,
          },
          "-=0.5"
        )
        .from(
          ".gsap-hero-desc",
          {
            y: 20,
            opacity: 0,
            duration: 0.8,
          },
          "-=0.5"
        )
        .from(
          ".gsap-hero-cta",
          {
            scale: 0.92,
            opacity: 0,
            duration: 0.6,
            stagger: 0.12,
            ease: "back.out(1.5)",
          },
          "-=0.4"
        )
        .from(
          ".gsap-hero-scroll",
          {
            opacity: 0,
            y: -10,
            duration: 0.8,
          },
          "-=0.2"
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
      {/* 1. Cinematic Panoramic Festival Backdrop Image (Matching reference screenshot) */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/cinematic_hero_bg.jpg"
          alt="AWS Student Builder Group Tech Festival Citadel"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center scale-105"
        />
        {/* Cinematic Atmospheric Darkening Overlays for crisp readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#080A0F] via-[#080A0F]/65 to-[#080A0F]/55" />
        <div className="absolute inset-0 bg-radial-vignette opacity-85" />
        <div className="absolute inset-0 tech-grid opacity-15" />
      </div>

      {/* Top spacing */}
      <div className="w-full h-1 sm:h-2" />

      {/* 2. Main Centered Festival Content Column (Exact layout from reference screenshot) */}
      <div className="relative z-10 max-w-4xl 2xl:max-w-5xl 3xl:max-w-6xl 4xl:max-w-7xl mx-auto flex flex-col items-center my-auto py-4 sm:py-8 space-y-4 sm:space-y-6 md:space-y-8 w-full">
        {/* Eyebrow Institutional Credit */}
        <div className="gsap-hero-eyebrow inline-flex items-center gap-2 sm:gap-2.5 px-3 sm:px-4 py-1 sm:py-1.5 rounded-full bg-[#080A0F]/85 border border-purple-500/30 text-[7.5px] xs:text-[10px] sm:text-xs font-mono font-bold tracking-[0.1em] xs:tracking-[0.18em] sm:tracking-[0.25em] text-slate-200 uppercase shadow-xl shadow-purple-500/10 backdrop-blur-md max-w-[95%]">
          <Image
            src="/images/branding/community-mark-transparent.png"
            alt="PITS Cloud Computing Community Emblem"
            width={18}
            height={18}
            className="w-4 h-4 object-contain rounded shrink-0 shadow-sm shadow-purple-500/40"
          />
          <span className="truncate">PRASHANTI INSTITUTE OF TECHNOLOGY &amp; SCIENCE • UJJAIN</span>
        </div>

        {/* Dramatic Ornate Monumental Title with Flourishing Calligraphy Swoosh */}
        <div className="relative flex flex-col items-center w-full px-2">
          <h1 className="gsap-hero-title text-[2.75rem] xs:text-5xl sm:text-7xl md:text-8xl lg:text-9xl 2xl:text-[10rem] 3xl:text-[12rem] 4xl:text-[14rem] font-sans font-black tracking-tight xs:tracking-wide sm:tracking-wider text-white uppercase drop-shadow-[0_4px_30px_rgba(0,0,0,0.9)] leading-[0.95] max-w-full">
            BUILDERS
          </h1>

          {/* Calligraphic Flourish Underline Swoosh (Responsive scaling) */}
          <div className="gsap-hero-flourish w-full max-w-[240px] xs:max-w-xs sm:max-w-xl md:max-w-2xl 2xl:max-w-3xl 3xl:max-w-4xl -mt-2 xs:-mt-4 sm:-mt-6 relative pointer-events-none">
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
          <p className="gsap-hero-headline mt-1 text-[11px] xs:text-sm sm:text-xl md:text-2xl 3xl:text-3xl font-mono font-bold tracking-[0.1em] sm:tracking-[0.2em] text-[#FF9900] uppercase">
            AWS STUDENT BUILDER GROUP
          </p>
        </div>

        {/* Supporting Editorial Description */}
        <p className="gsap-hero-desc text-xs sm:text-base md:text-lg 3xl:text-xl text-slate-200 max-w-2xl 3xl:max-w-3xl mx-auto leading-relaxed font-light drop-shadow-md px-2 sm:px-0">
          The AWS Student Builder Group at Prashanti Institute of Technology &amp; Science serves as a powerful intellectual platform where student innovators explore cloud computing, build intelligent applications, and turn visionary ideas into real-world projects.
        </p>

        {/* Dual CTAs (Responsive stacking) */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 w-full sm:w-auto pt-2">
          <GsapMagnetic className="gsap-hero-cta w-full sm:w-auto" strength={0.3}>
            <a
              href="#community"
              onClick={handleScrollToCommunity}
              onMouseEnter={playHover}
              className="block w-full sm:w-auto"
            >
              <Button
                size="lg"
                className="w-full sm:w-auto gap-2.5 px-6 sm:px-8 py-3.5 rounded-full font-mono font-bold text-xs uppercase tracking-wider bg-gradient-to-r from-amber-500 via-orange-500 to-amber-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 shadow-2xl shadow-orange-500/40 border-0 transition-transform active:scale-95"
              >
                <span>EXPLORE THE COMMUNITY</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            </a>
          </GsapMagnetic>

          <GsapMagnetic className="gsap-hero-cta w-full sm:w-auto" strength={0.25}>
            <Link
              href="/events"
              onMouseEnter={playHover}
              onClick={playClick}
              className="block w-full sm:w-auto"
            >
              <Button
                variant="outline"
                size="lg"
                className="w-full sm:w-auto gap-2.5 px-6 sm:px-8 py-3.5 rounded-full font-mono font-bold text-xs uppercase tracking-wider border-white/30 text-white hover:bg-white/10 hover:border-white transition-colors backdrop-blur-md shadow-lg"
              >
                <Calendar className="w-4 h-4 text-[#FF9900]" />
                <span>UPCOMING WORKSHOPS</span>
              </Button>
            </Link>
          </GsapMagnetic>
        </div>

        {/* Disclaimer Notice */}
        <div className="flex items-center justify-center gap-2 text-[10px] sm:text-[11px] font-mono text-slate-400 pt-1">
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
          className="group flex flex-col items-center gap-1 hover:text-[#FF9900] transition-colors"
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
