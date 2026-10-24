"use client";

import React from "react";
import Link from "next/link";
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Award,
  Cpu,
  BookOpen,
  Terminal,
  ExternalLink,
  Layers,
  GraduationCap,
} from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Github, Linkedin } from "@/components/ui/Icons";
import { INITIAL_TEAM_MEMBERS, COMMUNITY_INFO } from "@/lib/data/initialData";
import { TeamAvatar } from "@/components/team/TeamAvatar";

export function TeamPreview() {
  const leader =
    INITIAL_TEAM_MEMBERS.find((m) => m.isLead) || INITIAL_TEAM_MEMBERS[0];
  const directors = INITIAL_TEAM_MEMBERS.filter(
    (m) => !m.isLead && !m.isVacant
  );

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Leadership":
        return {
          glow: "amber" as const,
          badge: "bg-amber-500/10 text-amber-300 border-amber-500/30",
          accent: "text-amber-400",
          border: "hover:border-amber-500/40",
        };
      case "Technical":
        return {
          glow: "blue" as const,
          badge: "bg-sky-500/10 text-sky-300 border-sky-500/30",
          accent: "text-sky-400",
          border: "hover:border-sky-500/40",
        };
      case "Operations":
        return {
          glow: "emerald" as const,
          badge: "bg-emerald-500/10 text-emerald-300 border-emerald-500/30",
          accent: "text-emerald-400",
          border: "hover:border-emerald-500/40",
        };
      case "Outreach":
        return {
          glow: "cyan" as const,
          badge: "bg-teal-500/10 text-teal-300 border-teal-500/30",
          accent: "text-teal-400",
          border: "hover:border-teal-500/40",
        };
      case "Creative":
        return {
          glow: "pink" as const,
          badge: "bg-pink-500/10 text-pink-300 border-pink-500/30",
          accent: "text-pink-400",
          border: "hover:border-pink-500/40",
        };
      default:
        return {
          glow: "slate" as const,
          badge: "bg-slate-500/10 text-slate-300 border-slate-500/30",
          accent: "text-slate-400",
          border: "hover:border-slate-500/40",
        };
    }
  };

  return (
    <section
      id="team"
      className="py-24 border-b border-slate-800/80 bg-slate-950 relative overflow-hidden"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-gradient-to-r from-amber-500/10 via-orange-500/5 to-sky-500/10 blur-[130px] pointer-events-none -z-10" />

      <div className="responsive-container">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="space-y-3 max-w-3xl">
            <div className="inline-flex items-center gap-2">
              <Badge variant="orange" size="md" className="font-semibold">
                Official Chapter Leadership Board
              </Badge>
              <span className="text-xs text-amber-400 font-mono hidden sm:inline-flex items-center gap-1 bg-amber-500/10 px-2.5 py-0.5 rounded-full border border-amber-500/20">
                <ShieldCheck className="w-3.5 h-3.5" />
                AWS Student Builder Group
              </span>
            </div>
            <h2 className="text-3xl xs:text-4xl sm:text-5xl font-black text-white tracking-tight">
              Leadership &amp; Core Team
            </h2>
            <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
              Meet our appointed student leadership steering Cloud Computing, Data
              Engineering, AI &amp; MLOps, DevOps, Innovation, Marketing, and
              Creative outreach at{" "}
              <span className="text-amber-300 font-medium">
                Prashanti Institute of Technology &amp; Science, Ujjain
              </span>
              .
            </p>
          </div>
          <Link href="/team" className="w-full sm:w-auto">
            <Button
              variant="secondary"
              size="md"
              className="gap-2 shrink-0 w-full sm:w-auto font-mono text-xs shadow-lg shadow-black/40"
            >
              <span>View Full Directory &amp; Roadmaps</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>

        {/* 1. Prominent Group Leader Profile Card */}
        {leader && (
          <div className="mb-16">
            <div className="hud-corner rounded-3xl border border-amber-500/40 bg-gradient-to-b from-[#131b2e]/95 via-[#090c14]/95 to-[#101726]/90 p-6 sm:p-10 backdrop-blur-2xl shadow-2xl relative overflow-hidden group">
              {/* Leader glowing volumetric light */}
              <div className="absolute top-0 right-0 w-[500px] h-[300px] bg-gradient-to-bl from-amber-500/15 via-orange-500/10 to-transparent blur-3xl pointer-events-none -z-10" />

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                {/* Leader Portrait & Identity */}
                <div className="lg:col-span-5 flex flex-col items-center sm:items-start text-center sm:text-left space-y-5">
                  <div className="flex flex-col sm:flex-row items-center gap-6">
                    {/* Circular Portrait Frame */}
                    <TeamAvatar
                      src={leader.avatarUrl}
                      alt={leader.name}
                      name={leader.name}
                      size="hero"
                      variant="circular"
                      glowColor="amber"
                      showStatus={true}
                      statusLabel="Appointed Chapter Leader"
                      className="shadow-2xl shadow-orange-500/20"
                    />

                    <div className="space-y-1.5">
                      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs font-mono font-bold">
                        <Award className="w-3.5 h-3.5 text-amber-400" />
                        <span>Chapter Leader &amp; Founder</span>
                      </div>
                      <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                        {leader.name}
                      </h3>
                      <p className="text-sm font-bold text-amber-400 font-mono">
                        {leader.role}
                      </p>
                      <div className="flex items-center justify-center sm:justify-start gap-1.5 text-xs text-slate-300 font-mono pt-0.5">
                        <GraduationCap className="w-4 h-4 text-amber-400 shrink-0" />
                        <span>
                          {leader.institution ||
                            `${COMMUNITY_INFO.college}, Ujjain`}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-400 font-mono">
                        {leader.department} • {leader.year}
                      </p>
                    </div>
                  </div>

                  {/* Social Links & Connect */}
                  <div className="flex items-center gap-2 pt-2">
                    {leader.linkedinUrl && (
                      <a
                        href={leader.linkedinUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-slate-300 hover:text-white hover:bg-amber-500/20 hover:border-amber-500/40 transition-colors"
                        title="Connect on LinkedIn"
                      >
                        <Linkedin className="w-4 h-4" />
                      </a>
                    )}
                    {leader.githubUrl && (
                      <a
                        href={leader.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
                        title="GitHub Profile"
                      >
                        <Github className="w-4 h-4" />
                      </a>
                    )}
                    <a
                      href={`mailto:${COMMUNITY_INFO.email}`}
                      className="px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-slate-300 hover:text-white hover:bg-white/10 text-xs font-mono transition-colors flex items-center gap-1.5"
                    >
                      <span>Direct Contact</span>
                      <ExternalLink className="w-3 h-3 text-slate-400" />
                    </a>
                  </div>
                </div>

                {/* Leader Mission & Capstone Task */}
                <div className="lg:col-span-7 space-y-5 border-t lg:border-t-0 lg:border-l border-slate-800/80 pt-6 lg:pt-0 lg:pl-8">
                  <blockquote className="text-xs sm:text-sm font-light italic text-slate-200 border-l-2 border-amber-400 pl-4 py-1 leading-relaxed bg-amber-500/5 rounded-r-xl">
                    &ldquo;Our vision at Prashanti Institute is to cultivate
                    hands-on cloud and AI literacy where student developers
                    don&apos;t just read about technologies—they launch services,
                    architect solutions, and build resume-defining prototypes
                    together.&rdquo;
                  </blockquote>

                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-light">
                    {leader.bio}
                  </p>

                  {/* Capstone milestone spotlight */}
                  {leader.practicalTask && (
                    <div className="p-4 rounded-2xl bg-black/40 border border-amber-500/20 space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-xs font-mono font-bold text-amber-400 uppercase tracking-wider">
                          <Terminal className="w-3.5 h-3.5" />
                          <span>Chapter Capstone Task</span>
                        </div>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/10 text-amber-300 border border-amber-500/30">
                          Active Milestone
                        </span>
                      </div>
                      <div className="text-xs font-bold text-white">
                        {leader.practicalTask.title}
                      </div>
                      <p className="text-[11px] text-slate-300 leading-relaxed font-light">
                        {leader.practicalTask.objective}
                      </p>
                    </div>
                  )}

                  {/* Domain Tags & Roadmap Link */}
                  <div className="pt-2 flex flex-wrap items-center justify-between gap-3">
                    <div className="flex flex-wrap gap-1.5">
                      {leader.tags?.map((tag) => (
                        <span
                          key={tag}
                          className="text-[10px] font-mono px-2.5 py-1 rounded-md bg-white/5 text-slate-300 border border-white/10"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <Link
                      href="/team"
                      className="text-xs font-bold text-amber-400 hover:text-amber-300 flex items-center gap-1.5 font-mono group/link"
                    >
                      <span>Explore Chapter Roadmap</span>
                      <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 2. Core Team Members Grid (7 Directors) */}
        <div>
          <div className="flex items-center justify-between mb-8 pb-3 border-b border-slate-800">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-2 text-xs font-mono text-sky-400 font-bold">
                <Cpu className="w-3.5 h-3.5" />
                <span>EXECUTIVE BOARD • 7 CORE DIRECTORATES</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight uppercase">
                Appointed Core Team Members
              </h3>
            </div>
            <span className="text-xs text-slate-400 font-mono hidden sm:inline-block">
              {directors.length} Appointed Leaders
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {directors.map((member) => {
              const theme = getCategoryColor(member.category);
              return (
                <div
                  key={member.id}
                  className={`hud-corner rounded-3xl border border-slate-800/90 bg-gradient-to-b from-[#101726]/90 via-[#0a0d14]/95 to-[#101726]/80 p-6 backdrop-blur-xl shadow-xl flex flex-col justify-between space-y-5 ${theme.border} transition-all duration-300 hover:shadow-2xl group`}
                >
                  <div className="space-y-4">
                    {/* Top Row: Category Badge & Socials */}
                    <div className="flex items-center justify-between gap-2">
                      <span
                        className={`text-[10px] font-mono px-2.5 py-0.5 rounded-full border font-bold ${theme.badge}`}
                      >
                        {member.category}
                      </span>
                      <div className="flex items-center gap-1.5">
                        {member.linkedinUrl && (
                          <a
                            href={member.linkedinUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1.5 rounded-lg bg-white/5 border border-white/10 text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
                            title="LinkedIn Profile"
                          >
                            <Linkedin className="w-3.5 h-3.5" />
                          </a>
                        )}
                        {member.githubUrl && (
                          <a
                            href={member.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1.5 rounded-lg bg-white/5 border border-white/10 text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
                            title="GitHub Profile"
                          >
                            <Github className="w-3.5 h-3.5" />
                          </a>
                        )}
                      </div>
                    </div>

                    {/* Member Portrait & Details */}
                    <div className="flex flex-col items-center text-center space-y-3 pt-2">
                      {/* Circular Portrait Frame */}
                      <TeamAvatar
                        src={member.avatarUrl}
                        alt={member.name}
                        name={member.name}
                        size="xl"
                        variant="circular"
                        glowColor={theme.glow}
                        className="shadow-lg group-hover:scale-105 transition-transform"
                      />

                      <div className="space-y-1 w-full">
                        <h4 className="text-lg font-bold text-white group-hover:text-amber-400 transition-colors">
                          {member.name}
                        </h4>
                        <p
                          className={`text-xs font-bold font-mono ${theme.accent} leading-tight min-h-[2.25rem] flex items-center justify-center`}
                        >
                          {member.role}
                        </p>
                        <p className="text-[11px] text-slate-300 font-mono truncate">
                          {member.institution ||
                            "Prashanti Institute of Technology & Science, Ujjain"}
                        </p>
                        <p className="text-[10px] text-slate-400 font-mono">
                          {member.department} • {member.year}
                        </p>
                      </div>
                    </div>

                    {/* Special Focus Spotlight (e.g. Aaysha Malik) */}
                    {member.specialFocus && (
                      <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-200 text-[11px] font-light leading-relaxed">
                        <span className="font-bold font-mono text-amber-400 block text-[10px] uppercase mb-0.5">
                          Strategic Focus
                        </span>
                        {member.specialFocus}
                      </div>
                    )}

                    {/* Bio Snippet */}
                    <p className="text-xs text-slate-300 leading-relaxed font-light line-clamp-3">
                      {member.bio}
                    </p>

                    {/* Practical Task Preview */}
                    {member.practicalTask && (
                      <div className="p-3 rounded-xl bg-slate-950/70 border border-white/5 space-y-1">
                        <div className="flex items-center gap-1.5 text-[10px] font-mono text-slate-400 font-bold uppercase">
                          <BookOpen className="w-3 h-3 text-amber-400" />
                          <span>Key Task Objective</span>
                        </div>
                        <p className="text-[11px] text-slate-300 line-clamp-2 font-light">
                          {member.practicalTask.objective}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Card Bottom: Tags & Link to Full Roadmap */}
                  <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                    <div className="flex flex-wrap gap-1">
                      {member.tags?.slice(0, 2).map((t) => (
                        <span
                          key={t}
                          className="text-[9px] font-mono px-2 py-0.5 rounded bg-white/5 text-slate-400 border border-white/5"
                        >
                          {t}
                        </span>
                      ))}
                    </div>

                    <Link
                      href="/team"
                      className="text-xs font-mono font-bold text-amber-400 hover:text-amber-300 flex items-center gap-1 group-hover:translate-x-0.5 transition-transform"
                    >
                      <span>Roadmap</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Bottom Callout Banner */}
          <div className="mt-12 p-6 rounded-3xl border border-slate-800 bg-gradient-to-r from-slate-900/90 via-slate-950 to-slate-900/90 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="space-y-1 text-center sm:text-left">
              <h4 className="text-sm font-bold text-white">
                Aspire to lead cloud tracks with our Directors?
              </h4>
              <p className="text-xs text-slate-400 font-light">
                Join as a Junior Associate or domain builder under the mentorship
                of our core leadership board.
              </p>
            </div>
            <Link href="/join" className="w-full sm:w-auto shrink-0">
              <Button size="md" className="gap-2 w-full sm:w-auto font-mono text-xs">
                <Sparkles className="w-4 h-4" />
                <span>Apply for Junior Associate</span>
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
