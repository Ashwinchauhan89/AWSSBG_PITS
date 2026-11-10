"use client";

import React from "react";
import Link from "next/link";
import { Sparkles, ArrowRight, ExternalLink } from "lucide-react";
import { COMMUNITY_INFO } from "@/lib/data/initialData";
import { GsapMagnetic } from "@/components/gsap/GsapMagnetic";
import { useSound } from "@/components/audio/SoundManager";

export function CommunityCtaSection() {
  const { playClick } = useSound();

  return (
    <section id="join" className="py-24 sm:py-32 relative overflow-hidden bg-[#080A14]">
      {/* Volumetric Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[500px] bg-gradient-to-tr from-purple-900/20 via-indigo-900/15 to-amber-900/15 blur-3xl pointer-events-none -z-10" />
      <div className="absolute inset-0 tech-grid opacity-20 pointer-events-none -z-10" />

      <div className="responsive-container text-center relative z-10">
        <div className="rounded-[32px] border border-purple-500/35 bg-gradient-to-b from-[#131026]/95 via-[#090C18]/95 to-[#101728]/90 p-8 sm:p-16 lg:p-20 backdrop-blur-2xl shadow-2xl relative overflow-hidden max-w-5xl mx-auto">
          {/* Top Subtle Rim Light */}
          <div className="absolute inset-x-0 top-0 h-[1.5px] bg-gradient-to-r from-transparent via-purple-400/50 to-transparent pointer-events-none" />

          {/* Section Indicator */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-purple-500/15 text-purple-300 text-xs font-mono font-semibold border border-purple-500/30 mb-6 shadow-lg shadow-purple-500/10">
            <Sparkles className="w-3.5 h-3.5 text-purple-400" />
            <span>JOIN THE BUILDER COMMUNITY • PITS UJJAIN</span>
          </div>

          {/* Heading */}
          <h2 className="text-3xl xs:text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight uppercase leading-[1.08] max-w-3xl mx-auto">
            Your Journey as a Builder{" "}
            <span className="bg-gradient-to-r from-purple-400 via-violet-300 to-amber-300 bg-clip-text text-transparent">
              Starts Here.
            </span>
          </h2>

          {/* Description */}
          <p className="mt-5 text-sm sm:text-base lg:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed font-light">
            Explore cloud technologies, collaborate with fellow students, and turn your ideas into meaningful projects.
          </p>

          {/* Action Buttons */}
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            {/* Primary CTA: Join Our Community (Meetup) */}
            <GsapMagnetic strength={0.25}>
              <a
                href={COMMUNITY_INFO.meetupUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={playClick}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-500 hover:to-violet-500 text-white text-xs font-mono font-bold uppercase tracking-wider shadow-xl shadow-purple-600/30 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-400"
              >
                <span>Join Our Community</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </GsapMagnetic>

            {/* Secondary CTA: Explore Learning Labs */}
            <GsapMagnetic strength={0.25}>
              <Link
                href="/resources"
                onClick={playClick}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-white/5 hover:bg-white/10 text-slate-200 hover:text-white border border-white/15 text-xs font-mono font-semibold uppercase tracking-wider transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-400"
              >
                <span>Explore Learning Labs</span>
                <ArrowRight className="w-4 h-4 text-purple-400" />
              </Link>
            </GsapMagnetic>
          </div>

          {/* Verified Badges */}
          <div className="mt-10 pt-6 border-t border-purple-500/15 flex flex-wrap items-center justify-center gap-3 text-xs font-mono text-slate-400">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Open to all engineering students
            </span>
            <span className="text-slate-600">•</span>
            <span>Zero-cost AWS Free Tier safety</span>
            <span className="text-slate-600">•</span>
            <span>PITS Campus, Ujjain</span>
          </div>
        </div>
      </div>
    </section>
  );
}
