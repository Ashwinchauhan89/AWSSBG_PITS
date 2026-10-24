"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Sparkles, CheckCircle2 } from "lucide-react";
import { TeamMember } from "@/lib/types";
import { TeamAvatar } from "@/components/team/TeamAvatar";
import { useSound } from "@/components/audio/SoundManager";

export interface TeamProfileCardProps {
  member: TeamMember;
  badgeLabel?: string;
  showChipBadge?: boolean;
  className?: string;
}

export function TeamProfileCard({
  member,
  badgeLabel,
  showChipBadge = false,
  className = "",
}: TeamProfileCardProps) {
  const { playHover, playClick } = useSound();

  const getGlowColor = (category: string) => {
    switch (category) {
      case "Leadership":
        return "purple" as const;
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

  const glow = getGlowColor(member.category);

  return (
    <div
      onMouseEnter={playHover}
      className={`gsap-team-card cinematic-glass rounded-3xl p-6 border border-white/10 flex flex-col justify-between transition-all duration-300 hover:border-purple-500/50 hover:shadow-[0_0_35px_rgba(168,85,247,0.18)] hover:-translate-y-1.5 group relative overflow-hidden bg-gradient-to-b from-[#101726]/90 via-[#080A0F]/95 to-[#0D121F]/90 ${className}`}
    >
      {/* Subtle purple accent ambient corner light */}
      <div className="absolute top-0 right-0 w-44 h-44 bg-purple-600/10 blur-2xl pointer-events-none -z-10 group-hover:bg-purple-600/20 transition-all duration-300" />

      <div className="space-y-4">
        {/* Top category & badge row */}
        <div className="flex items-center justify-between gap-2">
          <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-slate-300">
            {member.category}
          </span>
          {badgeLabel ? (
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-purple-500/15 border border-purple-500/30 text-purple-300 flex items-center gap-1 font-semibold">
              <Sparkles className="w-2.5 h-2.5 text-purple-400" />
              <span>{badgeLabel}</span>
            </span>
          ) : member.group ? (
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 uppercase tracking-wider">
              {member.group === "core" ? "Core Directorate" : member.group === "additional" ? "Outreach" : "Leader"}
            </span>
          ) : null}
        </div>

        {/* Avatar & Info Row */}
        <div className="flex items-center gap-4">
          <TeamAvatar
            src={member.avatarUrl}
            alt={`${member.name} - ${member.role}`}
            name={member.name}
            size="lg"
            variant="circular"
            glowColor={glow}
            showChipBadge={showChipBadge}
            showStatus={false}
          />

          <div className="space-y-1 min-w-0">
            <h4 className="text-base sm:text-lg font-bold text-white group-hover:text-purple-300 transition-colors truncate font-sans">
              {member.name}
            </h4>
            <p className="text-[11px] font-mono text-slate-400 truncate">
              {member.department || "Computer Science & Engineering"}
            </p>
            {member.institution && (
              <p className="text-[10px] text-slate-500 truncate font-light">
                {member.institution}
              </p>
            )}
          </div>
        </div>

        {/* Exact Designation */}
        <div className="rounded-xl bg-[#080A0F]/85 border border-white/5 p-3 group-hover:border-purple-500/30 transition-colors">
          <span className="text-xs font-mono font-bold text-amber-400 leading-tight block">
            {member.role}
          </span>
        </div>

        {/* Bio */}
        {member.bio && (
          <p className="text-xs text-slate-300 leading-relaxed font-light line-clamp-3">
            {member.bio}
          </p>
        )}

        {/* Practical Task / Focus Deliverable */}
        {member.practicalTask && (
          <div className="pt-2 text-[11px] text-slate-400 font-light border-t border-white/10">
            <span className="font-semibold font-mono text-[10px] uppercase text-sky-400 flex items-center gap-1 mb-1">
              <CheckCircle2 className="w-3 h-3 text-sky-400" />
              <span>Key Focus &amp; Practical Lab:</span>
            </span>
            <span className="line-clamp-2 text-slate-300">{member.practicalTask.title}</span>
          </div>
        )}
      </div>

      {/* Footer: Tags & Profile Link */}
      <div className="pt-4 mt-4 border-t border-white/10 flex items-center justify-between gap-2">
        <div className="flex flex-wrap gap-1">
          {member.tags?.slice(0, 2).map((tag, i) => (
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
          className="text-[11px] font-mono text-purple-400 group-hover:text-purple-300 transition-colors shrink-0 inline-flex items-center gap-1 group/btn"
        >
          <span>Roadmap</span>
          <ArrowRight className="w-3 h-3 group-hover/btn:translate-x-0.5 transition-transform" />
        </Link>
      </div>
    </div>
  );
}
