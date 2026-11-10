import * as React from "react";
import { Users, Sparkles, MapPin, ShieldCheck } from "lucide-react";
import { COMMUNITY_INFO } from "@/lib/data/initialData";
import { PillarsCardsDraggable } from "./PillarsCardsDraggable";

export function CommunityMissionSection() {
  return (
    <section
      id="community"
      className="relative py-24 sm:py-32 border-b border-white/10 bg-[#080A14] overflow-hidden"
    >
      {/* Background Volumetric Lighting & Cyber Tech Grid */}
      <div className="absolute top-0 right-1/4 w-[600px] h-[350px] volumetric-blue-glow pointer-events-none -z-10" />
      <div className="absolute top-1/2 left-1/4 w-[500px] h-[300px] bg-purple-900/10 rounded-full blur-[120px] pointer-events-none -z-10" />
      <div className="absolute inset-0 tech-grid opacity-20 pointer-events-none -z-10" />

      <div className="responsive-container">
        {/* Section Header */}
        <div className="text-center max-w-4xl mx-auto space-y-4 mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-mono font-semibold tracking-wider uppercase">
            <Sparkles className="w-3.5 h-3.5" />
            <span>SECTION A • COMMUNITY OVERVIEW</span>
          </div>

          <h2 className="text-2xl xs:text-3xl sm:text-5xl 3xl:text-6xl font-black text-white tracking-tight uppercase">
            Where Students{" "}
            <span className="bg-gradient-to-r from-amber-400 via-orange-400 to-sky-400 bg-clip-text text-transparent">
              Become Builders.
            </span>
          </h2>

          <p className="text-sm sm:text-lg 3xl:text-xl text-slate-300 leading-relaxed font-light max-w-3xl 3xl:max-w-4xl mx-auto pt-2">
            PITS Cloud Computing is a student-led technology community at Prashanti Institute of Technology &amp; Science, Ujjain, where students explore cloud computing, artificial intelligence, software development, and emerging technologies through practical learning, collaborative projects, and technical events.
          </p>

          <div className="pt-2 flex flex-wrap items-center justify-center gap-2.5 sm:gap-3 text-xs font-mono text-slate-400">
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-md bg-[#101A2C]/80 border border-white/10">
              <Users className="w-3.5 h-3.5 text-amber-400" />
              <span>Group Leader: <strong>{COMMUNITY_INFO.leaderName}</strong></span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-md bg-[#101A2C]/80 border border-white/10">
              <MapPin className="w-3.5 h-3.5 text-sky-400" />
              <span>{COMMUNITY_INFO.collegeShort}, Ujjain</span>
            </div>
          </div>
        </div>

        {/* 3 Interactive GSAP Draggable Cards: Learn • Build • Connect */}
        <div className="mb-14">
          <PillarsCardsDraggable />
        </div>

        {/* Community Distinction Banner */}
        <div className="text-center">
          <div className="inline-flex flex-wrap items-center justify-center gap-2 text-xs text-slate-400 bg-white/5 border border-white/10 px-4 py-2.5 rounded-full max-w-2xl mx-auto shadow-inner">
            <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0" />
            <span>Independent academic community at Prashanti Institute of Technology &amp; Science • Student Builder Group Program</span>
          </div>
        </div>
      </div>
    </section>
  );
}
