"use client";

import React, { useRef } from "react";
import Link from "next/link";
import {
  ArrowRight,
  ShieldCheck,
  Award,
  MapPin,
  CheckCircle2,
  Sparkles,
  Users,
  Compass,
  GraduationCap,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Github, Linkedin } from "@/components/ui/Icons";
import { INITIAL_TEAM_MEMBERS, COMMUNITY_INFO } from "@/lib/data/initialData";
import { TeamAvatar } from "@/components/team/TeamAvatar";
import { GsapMagnetic } from "@/components/gsap/GsapMagnetic";
import { gsap, useGSAP } from "@/lib/gsap";
import { useSound } from "@/components/audio/SoundManager";
import { TeamMember } from "@/lib/types";

export function TeamPreview() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const { playHover, playClick } = useSound();

  // 1. Group Leader (Ashwin Chauhan)
  const leader = INITIAL_TEAM_MEMBERS.find((m) => m.isLead) || INITIAL_TEAM_MEMBERS[0];

  // 2. Core Leadership Team (5 Directors)
  const coreDirectors = INITIAL_TEAM_MEMBERS.filter(
    (m) => !m.isLead && !m.isAdditional && !m.isVacant
  );

  // 3. Additional Team Members (2 Directors)
  const additionalDirectors = INITIAL_TEAM_MEMBERS.filter(
    (m) => !m.isLead && m.isAdditional && !m.isVacant
  );

  useGSAP(
    () => {
      gsap.from(".gsap-team-card", {
        y: 35,
        opacity: 0,
        stagger: 0.08,
        duration: 0.65,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
      });
    },
    { scope: sectionRef }
  );

  const getGlowColor = (category: string) => {
    switch (category) {
      case "Leadership":
        return "amber" as const;
      case "Technical":
        return "blue" as const;
      case "Operations":
        return "emerald" as const;
      case "Outreach":
        return "cyan" as const;
      case "Creative":
        return "purple" as const;
      default:
        return "slate" as const;
    }
  };

  const renderMemberCard = (director: TeamMember, badgeLabel?: string) => {
    const glow = getGlowColor(director.category);

    return (
      <div
        key={director.id}
        onMouseEnter={playHover}
        className="gsap-team-card cinematic-glass cinematic-glass-hover rounded-3xl p-6 border border-white/10 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 group relative overflow-hidden"
      >
        <div className="space-y-4">
          {/* Top category & badge */}
          <div className="flex items-center justify-between gap-2">
            <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-slate-300">
              {director.category}
            </span>
            {badgeLabel && (
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300">
                {badgeLabel}
              </span>
            )}
          </div>

          {/* Avatar & Info Row */}
          <div className="flex items-center gap-3.5">
            <TeamAvatar
              src={director.avatarUrl}
              alt={`${director.name} - ${director.role}`}
              name={director.name}
              size="md"
              variant="circular"
              glowColor={glow}
              showStatus={false}
            />

            <div className="space-y-0.5 min-w-0">
              <h4 className="text-base font-bold text-white group-hover:text-amber-400 transition-colors truncate font-sans">
                {director.name}
              </h4>
              <p className="text-[11px] font-mono text-slate-400 truncate">
                {director.department || "Computer Science & Engineering"}
              </p>
            </div>
          </div>

          {/* Exact Designation */}
          <div className="rounded-xl bg-[#080A0F]/80 border border-white/5 p-2.5">
            <span className="text-xs font-mono font-bold text-amber-400 leading-tight block">
              {director.role}
            </span>
          </div>

          {/* Bio */}
          <p className="text-xs text-slate-300 leading-relaxed font-light line-clamp-3">
            {director.bio}
          </p>

          {/* Practical Task / Focus */}
          {director.practicalTask && (
            <div className="pt-2 text-[11px] text-slate-400 font-light border-t border-white/10">
              <span className="font-semibold text-slate-300 font-mono text-[10px] uppercase block mb-0.5 text-sky-400">
                Key Deliverable:
              </span>
              <span className="line-clamp-2">{director.practicalTask.title}</span>
            </div>
          )}
        </div>

        {/* Footer: Tags & Profile Link */}
        <div className="pt-4 mt-4 border-t border-white/10 flex items-center justify-between gap-2">
          <div className="flex flex-wrap gap-1">
            {director.tags?.slice(0, 2).map((tag, i) => (
              <span
                key={i}
                className="text-[9.5px] font-mono px-2 py-0.5 rounded bg-[#080A0F] text-slate-400 border border-white/5"
              >
                {tag}
              </span>
            ))}
          </div>

          <Link
            href="/team"
            onClick={playClick}
            className="text-[11px] font-mono text-amber-400 hover:text-amber-300 transition-colors shrink-0 inline-flex items-center gap-1 group/btn"
          >
            <span>Roadmap</span>
            <ArrowRight className="w-3 h-3 group-hover/btn:translate-x-0.5 transition-transform" />
          </Link>
        </div>
      </div>
    );
  };

  return (
    <section
      id="team"
      ref={sectionRef}
      className="py-24 sm:py-32 border-b border-white/10 bg-[#080A0F] relative overflow-hidden font-sans"
    >
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] volumetric-glow pointer-events-none -z-10" />
      <div className="absolute inset-0 tech-grid opacity-15 pointer-events-none -z-10" />

      <div className="responsive-container">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="space-y-3 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-mono font-semibold tracking-wider uppercase">
              <ShieldCheck className="w-3.5 h-3.5 text-purple-400" />
              <span>LEADERSHIP DIRECTORY • CAMPUS CHAPTER</span>
            </div>
            <h2 className="text-2xl xs:text-3xl sm:text-5xl font-black text-white tracking-tight uppercase">
              Group Leadership &amp; <br />
              <span className="bg-gradient-to-r from-purple-400 via-amber-400 to-sky-400 bg-clip-text text-transparent">
                Complete Team Profiles
              </span>
            </h2>
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed font-light">
              Meet our appointed student leadership steering Cloud Computing, Data Engineering, AI &amp; MLOps, Software Engineering &amp; DevOps, Innovation &amp; Logistics, Marketing, and Creative outreach at Prashanti Institute of Technology &amp; Science, Ujjain.
            </p>
          </div>

          <GsapMagnetic strength={0.25}>
            <Link href="/team" className="w-full sm:w-auto">
              <Button variant="secondary" size="md" className="gap-2 shrink-0 w-full sm:w-auto font-mono text-xs">
                <span>View Full Directory</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </GsapMagnetic>
        </div>

        {/* 1. Overall Group Leader Profile Card (Prominent with subtle purple accent) */}
        {leader && (
          <div className="mb-16">
            <div
              onMouseEnter={playHover}
              className="hud-corner rounded-3xl border border-purple-500/30 hover:border-purple-400/50 bg-gradient-to-b from-[#131024]/95 via-[#090c14]/95 to-[#101726]/90 p-6 sm:p-10 backdrop-blur-2xl shadow-2xl relative overflow-hidden group transition-all duration-300"
            >
              {/* Subtle purple accent volumetric glow & restrained gold highlights */}
              <div className="absolute top-0 right-0 w-[500px] h-[300px] bg-gradient-to-bl from-purple-600/15 via-indigo-600/10 to-transparent blur-3xl pointer-events-none -z-10" />
              <div className="absolute bottom-0 left-0 w-[400px] h-[250px] bg-gradient-to-tr from-amber-500/10 via-orange-500/5 to-transparent blur-3xl pointer-events-none -z-10" />

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                {/* Leader Portrait & Identity */}
                <div className="lg:col-span-5 flex flex-col items-center sm:items-start text-center sm:text-left space-y-4">
                  <div className="flex flex-col sm:flex-row items-center gap-6">
                    <TeamAvatar
                      src={leader.avatarUrl}
                      alt={`${leader.name} - ${leader.role}`}
                      name={leader.name}
                      size="hero"
                      variant="circular"
                      glowColor="purple"
                      showStatus={true}
                      statusLabel="Appointed Student Builder Group Leader"
                      className="shadow-2xl shadow-purple-500/25 ring-2 ring-purple-500/30"
                    />

                    <div className="space-y-1.5">
                      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/15 border border-purple-500/40 text-purple-300 text-xs font-mono font-bold">
                        <Award className="w-3.5 h-3.5 text-amber-400" />
                        <span>Overall Group Leader</span>
                      </div>

                      <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight font-sans">
                        {leader.name}
                      </h3>

                      <p className="text-xs sm:text-sm text-amber-400 font-mono font-semibold">
                        {leader.role}
                      </p>

                      <div className="flex items-center justify-center sm:justify-start gap-1.5 text-xs text-slate-300 font-light">
                        <MapPin className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                        <span>{leader.institution || COMMUNITY_INFO.college}</span>
                      </div>

                      <p className="text-[11px] font-mono text-slate-400">
                        {leader.department} ({leader.year})
                      </p>
                    </div>
                  </div>
                </div>

                {/* Leader Bio, Responsibilities & Strategic Directives */}
                <div className="lg:col-span-7 space-y-4 pt-4 lg:pt-0 border-t lg:border-t-0 lg:border-l border-white/10 lg:pl-8">
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-light">
                    {leader.bio}
                  </p>

                  {/* Explicit Responsibilities as required */}
                  <div className="pt-2">
                    <span className="text-[10px] font-mono font-bold text-purple-300 uppercase tracking-wider flex items-center gap-1.5 mb-2.5">
                      <Compass className="w-3.5 h-3.5 text-purple-400" />
                      Key Responsibilities &amp; Leadership Directives:
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      <div className="rounded-xl bg-[#080A0F]/80 border border-purple-500/20 p-2.5 flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                        <span className="text-xs text-slate-200">Community leadership</span>
                      </div>
                      <div className="rounded-xl bg-[#080A0F]/80 border border-purple-500/20 p-2.5 flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                        <span className="text-xs text-slate-200">Technical direction</span>
                      </div>
                      <div className="rounded-xl bg-[#080A0F]/80 border border-purple-500/20 p-2.5 flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                        <span className="text-xs text-slate-200">Workshops &amp; bootcamps</span>
                      </div>
                      <div className="rounded-xl bg-[#080A0F]/80 border border-purple-500/20 p-2.5 flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                        <span className="text-xs text-slate-200">Project initiatives</span>
                      </div>
                      <div className="rounded-xl bg-[#080A0F]/80 border border-purple-500/20 p-2.5 flex items-center gap-2 sm:col-span-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                        <span className="text-xs text-slate-200">Student collaboration &amp; mentoring</span>
                      </div>
                    </div>
                  </div>

                  {/* Actions & Links */}
                  <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-white/10">
                    <div className="flex flex-wrap gap-1.5">
                      {leader.tags?.slice(0, 4).map((tag, i) => (
                        <span
                          key={i}
                          className="text-[10px] font-mono px-2.5 py-0.5 rounded-md bg-[#080A0F] text-slate-300 border border-white/10"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center gap-3">
                      <Link
                        href="/team#leader"
                        onClick={playClick}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-purple-500/15 border border-purple-500/30 text-purple-300 hover:text-white hover:bg-purple-500/25 text-xs font-mono transition-colors"
                        title="View Full Leader Roadmap & Portfolio"
                      >
                        <span>Leader Profile</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>

                      <Link
                        href="/about"
                        onClick={playClick}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-slate-300 hover:text-white hover:bg-white/10 text-xs font-mono transition-colors"
                        title="Learn About Community Mission"
                      >
                        <span>About Community</span>
                      </Link>

                      {leader.githubUrl && (
                        <a
                          href={leader.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-slate-400 hover:text-white transition-colors"
                          title="GitHub Profile"
                        >
                          <Github className="w-4 h-4" />
                        </a>
                      )}
                      {leader.linkedinUrl && (
                        <a
                          href={leader.linkedinUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-slate-400 hover:text-sky-400 transition-colors"
                          title="LinkedIn Profile"
                        >
                          <Linkedin className="w-4 h-4" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 2. Core Leadership Team (Dedicated Section with 5 Members) */}
        <div className="mb-16">
          <div className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-4">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-mono text-amber-400 font-bold mb-1">
                <Users className="w-3.5 h-3.5" />
                <span>SECTION 01 • CORE LEADERSHIP TEAM</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-white uppercase tracking-tight flex items-center gap-2 font-sans">
                Core Leadership Team
              </h3>
              <p className="text-xs text-slate-400 font-light mt-0.5">
                5 Appointed Core Directors leading foundational domains in cloud, data, artificial intelligence, DevOps, and event execution.
              </p>
            </div>
            <span className="text-xs font-mono text-amber-400 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/30 font-semibold self-start sm:self-auto">
              5 Core Directors
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {coreDirectors.map((director) => renderMemberCard(director, "Core Team"))}
          </div>
        </div>

        {/* 3. Additional Team Members (Separate Subsection with 2 Members) */}
        <div>
          <div className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-purple-500/30 pb-4">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-mono text-purple-400 font-bold mb-1">
                <Sparkles className="w-3.5 h-3.5" />
                <span>SECTION 02 • ADDITIONAL TEAM MEMBERS</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-white uppercase tracking-tight flex items-center gap-2 font-sans">
                Additional Team Members
              </h3>
              <p className="text-xs text-slate-400 font-light mt-0.5">
                Specialized directors leading Marketing &amp; Digital Development and Graphic Design, Research &amp; Creative Social Outreach.
              </p>
            </div>
            <span className="text-xs font-mono text-purple-300 bg-purple-500/10 px-3 py-1 rounded-full border border-purple-500/30 font-semibold self-start sm:self-auto">
              2 Additional Directors
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
            {additionalDirectors.map((director) => renderMemberCard(director, "Additional Team"))}
          </div>
        </div>
      </div>
    </section>
  );
}
