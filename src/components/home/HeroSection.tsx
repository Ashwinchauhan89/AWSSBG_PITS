"use client";

import * as React from "react";
import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { Sparkles, Calendar, ArrowRight, ChevronDown, ShieldCheck, Clock, Zap, Radio } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { CinematicHeroCanvas } from "./CinematicHeroCanvas";
import { CentralCloudFocalPoint } from "./CentralCloudFocalPoint";
import { GsapMagnetic } from "@/components/gsap/GsapMagnetic";
import { gsap, useGSAP } from "@/lib/gsap";
import { useSound } from "@/components/audio/SoundManager";

export function HeroSection() {
  const heroRef = useRef<HTMLElement | null>(null);
  const { playHover, playClick } = useSound();

  // Festival Countdown to Summit
  const [timeLeft, setTimeLeft] = useState({
    days: 48,
    hours: 14,
    minutes: 32,
    seconds: 15,
  });

  useEffect(() => {
    // Target date: Dec 16, 2026 (matching tech festival season)
    const target = new Date("2026-12-16T09:00:00+05:30").getTime();
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const diff = Math.max(0, target - now);

      const d = Math.floor(diff / (1000 * 60 * 60 * 24));
      const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const s = Math.floor((diff % (1000 * 60)) / 1000);

      setTimeLeft({ days: d, hours: h, minutes: m, seconds: s });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.from(".gsap-hero-eyebrow", {
        y: -25,
        opacity: 0,
        duration: 0.8,
        letterSpacing: "0.3em",
      })
        .from(
          ".gsap-hero-title",
          {
            scale: 0.94,
            y: 40,
            opacity: 0,
            duration: 1.1,
            ease: "power4.out",
          },
          "-=0.5"
        )
        .from(
          ".gsap-hero-focal",
          {
            scale: 0.8,
            opacity: 0,
            duration: 1.0,
            ease: "back.out(1.4)",
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
          "-=0.6"
        )
        .from(
          ".gsap-hero-desc",
          {
            y: 20,
            opacity: 0,
            duration: 0.7,
          },
          "-=0.5"
        )
        .from(
          ".gsap-hero-ticker",
          {
            y: 15,
            opacity: 0,
            duration: 0.6,
          },
          "-=0.4"
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
          "-=0.3"
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
      className="relative min-h-screen flex flex-col justify-between items-center text-center px-4 sm:px-6 lg:px-8 pt-16 pb-8 overflow-hidden select-none"
    >
      {/* 1. Cinematic 3D Celestial Vortex Canvas Background */}
      <CinematicHeroCanvas />

      {/* 2. Atmospheric Ambient Light Cones & Technical Grid */}
      <div className="absolute inset-0 bg-radial-vignette pointer-events-none -z-10" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[850px] h-[500px] volumetric-glow pointer-events-none -z-10" />
      <div className="absolute inset-0 tech-grid opacity-25 pointer-events-none -z-10" />

      {/* Top spacing */}
      <div className="w-full h-2" />

      {/* Central Content Column */}
      <div className="relative z-10 max-w-5xl mx-auto flex flex-col items-center my-auto py-6 space-y-6 sm:space-y-8">
        {/* Eyebrow Label & Festival Edition Badge */}
        <div className="gsap-hero-eyebrow flex flex-wrap items-center justify-center gap-2">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#101A2C]/90 border border-sky-400/40 text-[10px] sm:text-xs font-mono font-semibold tracking-[0.2em] text-sky-400 uppercase shadow-lg shadow-sky-500/10 backdrop-blur-md">
            <Radio className="w-3 h-3 text-sky-400 animate-pulse" />
            <span>PRASHANTI INSTITUTE OF TECHNOLOGY &amp; SCIENCE</span>
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FF9900]/15 border border-[#FF9900]/40 text-[10px] font-mono font-bold tracking-wider text-[#FF9900] uppercase shadow-lg shadow-[#FF9900]/15 backdrop-blur-md">
            <Zap className="w-3 h-3 text-[#FF9900]" />
            <span>2026 EDITION // UJJAIN</span>
          </div>
        </div>

        {/* Central Cloud / Technological Focal Point */}
        <div className="gsap-hero-focal -my-4 sm:-my-2">
          <CentralCloudFocalPoint />
        </div>

        {/* Main Title (Monumental Cinematic Typography) */}
        <div className="space-y-3">
          <h1 className="gsap-hero-title text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight text-white uppercase text-glow drop-shadow-[0_0_50px_rgba(255,153,0,0.4)] leading-[1.04]">
            AWS STUDENT <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-amber-400 via-orange-400 to-amber-500 bg-clip-text text-transparent">
              BUILDER GROUP
            </span>
          </h1>

          {/* Hero Headline */}
          <p className="gsap-hero-headline text-xl sm:text-2xl md:text-3xl font-extrabold tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-amber-300 to-orange-400">
            Build. Learn. Innovate.
          </p>

          {/* Supporting Description */}
          <p className="gsap-hero-desc text-sm sm:text-base md:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed font-normal">
            Where student developers explore cloud technology, build intelligent applications, and turn ideas into real-world projects.
          </p>
        </div>

        {/* Festival Summit Countdown Live Ticker */}
        <div className="gsap-hero-ticker inline-flex items-center gap-3 px-4 py-2 rounded-2xl bg-[#101A2C]/80 border border-white/10 backdrop-blur-md shadow-lg">
          <div className="flex items-center gap-1.5 text-xs font-mono text-[#FF9900] font-bold">
            <Clock className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: "12s" }} />
            <span className="uppercase tracking-wider text-[11px]">FLAGSHIP SUMMIT:</span>
          </div>
          <div className="flex items-center gap-2 font-mono text-xs sm:text-sm font-black text-white">
            <span className="bg-[#080A0F] px-2 py-0.5 rounded border border-white/10 text-amber-400">
              {String(timeLeft.days).padStart(2, "0")}d
            </span>
            <span className="text-white/30">:</span>
            <span className="bg-[#080A0F] px-2 py-0.5 rounded border border-white/10 text-sky-400">
              {String(timeLeft.hours).padStart(2, "0")}h
            </span>
            <span className="text-white/30">:</span>
            <span className="bg-[#080A0F] px-2 py-0.5 rounded border border-white/10 text-slate-200">
              {String(timeLeft.minutes).padStart(2, "0")}m
            </span>
            <span className="text-white/30">:</span>
            <span className="bg-[#080A0F] px-2 py-0.5 rounded border border-white/10 text-[#FF9900]">
              {String(timeLeft.seconds).padStart(2, "0")}s
            </span>
          </div>
        </div>

        {/* Primary and Secondary Calls to Action */}
        <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
          <GsapMagnetic className="gsap-hero-cta w-full sm:w-auto" strength={0.3}>
            <a
              href="#community"
              onClick={handleScrollToCommunity}
              onMouseEnter={playHover}
              className="block w-full sm:w-auto"
            >
              <Button
                size="lg"
                className="w-full sm:w-auto gap-2.5 px-8 py-4 rounded-full font-bold text-xs sm:text-sm uppercase tracking-wider bg-gradient-to-r from-amber-500 via-orange-500 to-amber-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 shadow-2xl shadow-orange-500/35 border-0 transition-transform active:scale-95"
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
                className="w-full sm:w-auto gap-2.5 px-8 py-4 rounded-full font-bold text-xs sm:text-sm uppercase tracking-wider border-sky-400/50 text-sky-300 hover:bg-sky-400/10 hover:border-sky-400 transition-colors backdrop-blur-md shadow-lg shadow-sky-500/10"
              >
                <Calendar className="w-4 h-4 text-sky-400" />
                <span>UPCOMING EVENTS</span>
              </Button>
            </Link>
          </GsapMagnetic>
        </div>

        {/* Clear Educational Disclaimer */}
        <div className="flex items-center justify-center gap-2 text-[11px] font-mono text-slate-400 pt-1">
          <ShieldCheck className="w-3.5 h-3.5 text-amber-400 shrink-0" />
          <span>Student-led educational community • Independent campus chapter</span>
        </div>
      </div>

      {/* Subtle Animated Scroll Indicator */}
      <div className="gsap-hero-scroll relative z-10 flex flex-col items-center gap-1.5 pt-4 text-[10px] font-mono tracking-[0.25em] text-slate-400 uppercase">
        <a
          href="#community"
          onClick={handleScrollToCommunity}
          onMouseEnter={playHover}
          className="group flex flex-col items-center gap-1 hover:text-amber-400 transition-colors"
          aria-label="Scroll to explore"
        >
          <span>SCROLL TO EXPLORE</span>
          <div className="w-5 h-8 rounded-full border border-white/20 group-hover:border-amber-400/60 flex items-start justify-center p-1 transition-colors">
            <span className="w-1 h-2 rounded-full bg-amber-400 animate-bounce" />
          </div>
          <ChevronDown className="w-3.5 h-3.5 text-amber-400 animate-pulse -mt-0.5" />
        </a>
      </div>
    </section>
  );
}
