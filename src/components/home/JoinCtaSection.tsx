"use client";

import React from "react";
import { Sparkles, Calendar, ShieldCheck, Zap, ExternalLink, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { COMMUNITY_INFO } from "@/lib/data/initialData";
import { GsapMagnetic } from "@/components/gsap/GsapMagnetic";
import { useSound } from "@/components/audio/SoundManager";

export function JoinCtaSection() {
  const { playHover, playClick } = useSound();

  const handleScrollToEvents = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    playClick();
    const el = document.getElementById("events");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="join" className="py-24 sm:py-32 relative overflow-hidden bg-[#080A0F]">
      {/* Cinematic Volumetric Glows & Background Mesh */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[550px] bg-gradient-to-tr from-amber-500/15 via-orange-500/10 to-sky-500/15 blur-3xl pointer-events-none -z-10" />
      <div className="absolute inset-0 tech-grid opacity-25 pointer-events-none -z-10" />

      <div className="responsive-container text-center relative z-10">
        <div className="hud-corner rounded-3xl border border-amber-500/40 bg-gradient-to-b from-[#101A2C]/90 via-[#080A0F]/95 to-[#101A2C]/90 p-6 sm:p-16 3xl:p-20 backdrop-blur-2xl shadow-2xl relative overflow-hidden">
          {/* Subtle Ambient Scanline Effect */}
          <div className="absolute inset-0 bg-radial-vignette opacity-40 pointer-events-none" />

          {/* Section Indicator */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/10 text-amber-400 text-xs font-mono font-semibold border border-amber-500/30 mb-6 shadow-lg shadow-orange-500/10">
            <Sparkles className="w-3.5 h-3.5" />
            <span>SECTION H • JOIN THE COMMUNITY</span>
          </div>

          {/* Headline: Your Next Big Idea Starts Here. */}
          <h2 className="text-2xl xs:text-3xl sm:text-5xl md:text-6xl 3xl:text-7xl font-black text-white tracking-tight uppercase leading-[1.08] max-w-3xl 3xl:max-w-4xl mx-auto drop-shadow-[0_0_35px_rgba(255,153,0,0.3)]">
            Your Next Big Idea <br />
            <span className="bg-gradient-to-r from-amber-400 via-orange-400 to-sky-400 bg-clip-text text-transparent">
              Starts Here.
            </span>
          </h2>

          {/* Description */}
          <p className="mt-4 sm:mt-5 text-xs sm:text-base md:text-lg 3xl:text-xl text-slate-300 max-w-2xl 3xl:max-w-3xl mx-auto leading-relaxed font-light">
            Connect with fellow students, explore emerging technologies, and turn your curiosity into practical skills and projects.
          </p>

          {/* Requested Buttons */}
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            {/* 1. Join Our Community (Official Community / Meetup URL) */}
            <GsapMagnetic strength={0.25}>
              <a
                href={COMMUNITY_INFO.meetupUrl || COMMUNITY_INFO.officialAwsSbgUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={playClick}
                onMouseEnter={playHover}
                className="w-full sm:w-auto"
              >
                <Button
                  size="lg"
                  className="w-full sm:w-auto px-8 py-4 rounded-full font-bold text-xs sm:text-sm uppercase tracking-wider bg-gradient-to-r from-amber-500 via-orange-500 to-amber-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 shadow-2xl shadow-orange-500/40 border-0 transition-transform active:scale-95 gap-2.5"
                >
                  <Sparkles className="w-4 h-4 text-slate-950" />
                  <span>Join Our Community</span>
                  <ExternalLink className="w-4 h-4 text-slate-950" />
                </Button>
              </a>
            </GsapMagnetic>

            {/* 2. Explore Events (Links to #events) */}
            <GsapMagnetic strength={0.2}>
              <a
                href="#events"
                onClick={handleScrollToEvents}
                onMouseEnter={playHover}
                className="w-full sm:w-auto"
              >
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto px-7 py-4 rounded-full font-bold text-xs sm:text-sm uppercase tracking-wider border-sky-500/40 text-sky-400 hover:bg-sky-500/10 hover:border-sky-400 transition-colors backdrop-blur-md gap-2"
                >
                  <Calendar className="w-4 h-4 text-sky-400" />
                  <span>Explore Events</span>
                </Button>
              </a>
            </GsapMagnetic>

            {/* 3. WhatsApp Group */}
            <GsapMagnetic strength={0.15}>
              <a
                href={COMMUNITY_INFO.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={playClick}
                onMouseEnter={playHover}
                className="w-full sm:w-auto"
              >
                <Button
                  variant="ghost"
                  size="lg"
                  className="w-full sm:w-auto px-6 py-4 rounded-full font-medium text-xs sm:text-sm tracking-wider text-emerald-400 hover:bg-emerald-500/10 border border-emerald-500/20 transition-colors gap-2"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-400" />
                  <span>WhatsApp Chat</span>
                </Button>
              </a>
            </GsapMagnetic>
          </div>

          {/* Campus Chapter Badge & Disclaimer */}
          <div className="mt-8 pt-6 border-t border-white/10 flex flex-wrap items-center justify-center gap-4 text-xs font-mono text-slate-400">
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span>Independent Student Community @ {COMMUNITY_INFO.collegeShort}, Ujjain</span>
            </div>
            <span className="hidden sm:inline text-slate-600">•</span>
            <div className="flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-sky-400 shrink-0" />
              <span>Free &amp; Open to All Engineering Students</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
