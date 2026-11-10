"use client";

import React, { useState, useRef, useEffect, useMemo, useSyncExternalStore } from "react";
import Link from "next/link";
import {
  ShieldCheck,
  Sparkles,
  Award,
  Users,
  Cpu,
  Lightbulb,
  Megaphone,
  ArrowRight,
  CheckCircle2,
  MapPin,
  X,
  Compass,
  Layers,
  GraduationCap,
} from "lucide-react";
import { Github, Linkedin } from "@/components/ui/Icons";
import { TeamMember } from "@/lib/types";
import { COMMUNITY_INFO } from "@/lib/data/initialData";
import { TeamAvatar } from "@/components/team/TeamAvatar";
import { gsap, useGSAP } from "@/lib/gsap";
import { useSound } from "@/components/audio/SoundManager";

// Reduced motion subscription via useSyncExternalStore
function subscribeReducedMotion(callback: () => void) {
  if (typeof window === "undefined") return () => {};
  const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
  mq.addEventListener("change", callback);
  return () => mq.removeEventListener("change", callback);
}

function getReducedMotionSnapshot() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function getReducedMotionServerSnapshot() {
  return false;
}

type ShowcaseCategory = "All" | "Leadership" | "Technical" | "Operations" | "Outreach";

interface FilterTab {
  id: ShowcaseCategory;
  label: string;
  icon: React.ElementType;
}

const FILTER_TABS: FilterTab[] = [
  { id: "All", label: "All Builders", icon: Users },
  { id: "Leadership", label: "Leadership", icon: ShieldCheck },
  { id: "Technical", label: "Technical & Cloud", icon: Cpu },
  { id: "Operations", label: "Operations & Logistics", icon: Lightbulb },
  { id: "Outreach", label: "Outreach & Creative", icon: Megaphone },
];

interface TeamShowcaseClientProps {
  members: TeamMember[];
}

export function TeamShowcaseClient({ members }: TeamShowcaseClientProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const { playHover, playClick } = useSound();

  const [activeCategory, setActiveCategory] = useState<ShowcaseCategory>("All");
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);

  const reducedMotion = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotionSnapshot,
    getReducedMotionServerSnapshot
  );

  // Separate Overall Leader (Ashwin Chauhan) from other Directors
  const leader = useMemo(() => members.find((m) => m.isLead) || members[0], [members]);

  const activeMembers = useMemo(
    () => members.filter((m) => !m.isVacant),
    [members]
  );

  // Filter members based on active tab
  const displayedDirectors = useMemo(() => {
    const directors = activeMembers.filter((m) => !m.isLead);
    if (activeCategory === "All") return directors;
    if (activeCategory === "Leadership") {
      return directors.filter((m) => m.category === "Leadership");
    }
    if (activeCategory === "Technical") {
      return directors.filter((m) => m.category === "Technical");
    }
    if (activeCategory === "Operations") {
      return directors.filter((m) => m.category === "Operations");
    }
    if (activeCategory === "Outreach") {
      return directors.filter(
        (m) => m.category === "Outreach" || m.category === "Creative"
      );
    }
    return directors;
  }, [activeMembers, activeCategory]);

  const shouldShowLeader =
    activeCategory === "All" || activeCategory === "Leadership";

  // Prevent background scroll when modal is open
  useEffect(() => {
    if (selectedMember) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedMember]);

  // Close modal on Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedMember(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // GSAP Viewport Scroll Entrance
  useGSAP(
    () => {
      if (reducedMotion || !containerRef.current) return;

      // Header entrance
      gsap.from(".gsap-showcase-header", {
        y: 35,
        opacity: 0,
        stagger: 0.12,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          once: true,
        },
      });

      // Cards entrance
      gsap.from(".gsap-showcase-card", {
        y: 40,
        opacity: 0,
        stagger: 0.08,
        duration: 0.75,
        ease: "power2.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 75%",
          once: true,
        },
      });
    },
    { scope: containerRef, dependencies: [reducedMotion] }
  );

  // Tab change animation
  const handleTabChange = (category: ShowcaseCategory) => {
    playClick();
    setActiveCategory(category);

    if (!reducedMotion && containerRef.current) {
      gsap.fromTo(
        ".gsap-showcase-card",
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.4, stagger: 0.04, ease: "power2.out" }
      );
    }
  };

  // 3D Pointer Perspective Tilt
  const handlePointerMove = (
    e: React.PointerEvent<HTMLDivElement>,
    memberId: string
  ) => {
    if (reducedMotion) return;
    const el = cardRefs.current[memberId];
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const relX = (e.clientX - rect.left) / rect.width - 0.5;
    const relY = (e.clientY - rect.top) / rect.height - 0.5;

    gsap.to(el, {
      rotateY: relX * 8,
      rotateX: -relY * 8,
      scale: 1.015,
      transformPerspective: 1000,
      duration: 0.25,
      ease: "power2.out",
      overwrite: "auto",
    });
  };

  const handlePointerLeave = (memberId: string) => {
    if (reducedMotion) return;
    const el = cardRefs.current[memberId];
    if (!el) return;

    gsap.to(el, {
      rotateX: 0,
      rotateY: 0,
      scale: 1,
      duration: 0.45,
      ease: "power2.out",
      overwrite: "auto",
    });
  };

  // Domain badge styling helper
  const getDomainColor = (category: string) => {
    switch (category) {
      case "Leadership":
        return {
          text: "text-amber-400",
          border: "border-amber-500/30",
          bg: "bg-amber-500/10",
          glow: "from-amber-500/20 to-purple-500/10",
        };
      case "Technical":
        return {
          text: "text-violet-400",
          border: "border-purple-500/30",
          bg: "bg-purple-500/10",
          glow: "from-purple-500/20 to-sky-500/10",
        };
      case "Operations":
        return {
          text: "text-emerald-400",
          border: "border-emerald-500/30",
          bg: "bg-emerald-500/10",
          glow: "from-emerald-500/20 to-purple-500/10",
        };
      case "Outreach":
      case "Creative":
        return {
          text: "text-sky-400",
          border: "border-sky-500/30",
          bg: "bg-sky-500/10",
          glow: "from-sky-500/20 to-fuchsia-500/10",
        };
      default:
        return {
          text: "text-purple-300",
          border: "border-purple-500/30",
          bg: "bg-purple-500/10",
          glow: "from-purple-500/20 to-transparent",
        };
    }
  };

  return (
    <div ref={containerRef} className="relative w-full">
      {/* SECTION HEADER: Eyebrow, Heading, Subtitle & Filter Tabs */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-14">
        <div className="space-y-4 max-w-3xl">
          {/* Eyebrow Badge */}
          <div className="gsap-showcase-header inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-mono font-semibold tracking-wider uppercase shadow-sm shadow-purple-500/10">
            <Sparkles className="w-3.5 h-3.5 text-purple-400" />
            <span>OUR COMMUNITY • OUR PEOPLE • OUR BUILDERS</span>
          </div>

          {/* Section Heading & Main Title */}
          <div className="gsap-showcase-header space-y-1">
            <span className="block text-xs font-mono font-bold tracking-widest text-amber-400 uppercase">
              MEET OUR BUILDERS
            </span>
            <h2 className="text-3xl xs:text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight uppercase">
              The People Behind{" "}
              <span className="bg-gradient-to-r from-purple-400 via-violet-300 to-amber-300 bg-clip-text text-transparent">
                the Community.
              </span>
            </h2>
          </div>

          {/* Description */}
          <p className="gsap-showcase-header text-slate-300 text-sm sm:text-base leading-relaxed font-light max-w-2xl">
            Meet the passionate student builders, technical leaders, and innovators driving our campus technology community forward.
          </p>
        </div>

        {/* Directory Link */}
        <div className="gsap-showcase-header shrink-0">
          <Link
            href="/team"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/5 hover:bg-purple-950/50 border border-white/10 hover:border-purple-400/40 text-slate-200 hover:text-white text-xs font-mono font-semibold tracking-wider transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-400"
          >
            <span>View Full Directory</span>
            <ArrowRight className="w-4 h-4 text-purple-400" />
          </Link>
        </div>
      </div>

      {/* GSAP SHOWCASE-STYLE FILTER TABS */}
      <div className="gsap-showcase-header mb-12 flex flex-wrap items-center gap-2 border-b border-white/10 pb-4">
        {FILTER_TABS.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeCategory === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => handleTabChange(tab.id)}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-mono font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-400 ${
                isActive
                  ? "bg-gradient-to-r from-purple-600/90 to-violet-600/90 text-white shadow-lg shadow-purple-500/25 border border-purple-400/50"
                  : "bg-[#0B0F1E]/80 hover:bg-white/10 text-slate-400 hover:text-slate-200 border border-white/10"
              }`}
              aria-pressed={isActive}
            >
              <Icon className={`w-3.5 h-3.5 ${isActive ? "text-amber-300" : "text-slate-400"}`} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* FEATURED TEAM LEADER SPOTLIGHT CARD */}
      {leader && shouldShowLeader && (
        <div className="gsap-showcase-card mb-12">
          <div
            ref={(el) => {
              cardRefs.current[leader.id] = el;
            }}
            onPointerMove={(e) => handlePointerMove(e, leader.id)}
            onPointerLeave={() => handlePointerLeave(leader.id)}
            onMouseEnter={playHover}
            className="relative rounded-[32px] border border-purple-500/30 hover:border-purple-400/60 bg-gradient-to-b from-[#110D24]/95 via-[#080B17]/95 to-[#0E1424]/90 p-6 sm:p-10 lg:p-12 backdrop-blur-2xl shadow-2xl overflow-hidden group transition-all duration-300"
            style={{ transformStyle: "preserve-3d" }}
          >
            {/* Ambient Volumetric Lighting */}
            <div className="absolute top-0 right-0 w-[550px] h-[350px] bg-gradient-to-bl from-purple-600/20 via-indigo-600/10 to-transparent blur-3xl pointer-events-none -z-10" />
            <div className="absolute bottom-0 left-0 w-[450px] h-[250px] bg-gradient-to-tr from-amber-500/10 via-purple-500/5 to-transparent blur-3xl pointer-events-none -z-10" />
            <div className="absolute inset-x-0 top-0 h-[1.5px] bg-gradient-to-r from-transparent via-purple-400/50 to-transparent pointer-events-none" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              {/* Leader Portrait & Header Badge */}
              <div className="lg:col-span-5 flex flex-col items-center sm:items-start text-center sm:text-left space-y-4">
                <TeamAvatar
                  src={leader.avatarUrl}
                  alt={`${leader.name} - ${leader.role}`}
                  name={leader.name}
                  size="leader"
                  variant="rounded"
                  glowColor="purple"
                  showChipBadge={true}
                  showStatus={true}
                  statusLabel="Appointed Group Leader"
                  className="shadow-2xl shadow-purple-500/30 ring-2 ring-purple-500/40"
                />

                <div className="space-y-1.5 w-full">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/15 border border-purple-500/40 text-purple-300 text-xs font-mono font-bold">
                    <Award className="w-3.5 h-3.5 text-amber-400" />
                    <span>Student Builder Group Leader</span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight font-sans">
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

              {/* Leader Bio, Responsibilities & Actions */}
              <div className="lg:col-span-7 space-y-5 pt-4 lg:pt-0 border-t lg:border-t-0 lg:border-l border-white/10 lg:pl-10">
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-light">
                  {leader.bio}
                </p>

                {/* Directives & Responsibilities */}
                <div className="pt-1">
                  <span className="text-[11px] font-mono font-bold text-purple-300 uppercase tracking-wider flex items-center gap-1.5 mb-2.5">
                    <Compass className="w-3.5 h-3.5 text-purple-400" />
                    Key Responsibilities &amp; Leadership Directives:
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    <div className="rounded-xl bg-[#080A0F]/85 border border-purple-500/25 p-2.5 flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                      <span className="text-xs text-slate-200">Community leadership</span>
                    </div>
                    <div className="rounded-xl bg-[#080A0F]/85 border border-purple-500/25 p-2.5 flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                      <span className="text-xs text-slate-200">Technical direction</span>
                    </div>
                    <div className="rounded-xl bg-[#080A0F]/85 border border-purple-500/25 p-2.5 flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                      <span className="text-xs text-slate-200">Workshops &amp; bootcamps</span>
                    </div>
                    <div className="rounded-xl bg-[#080A0F]/85 border border-purple-500/25 p-2.5 flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                      <span className="text-xs text-slate-200">Project initiatives</span>
                    </div>
                    <div className="rounded-xl bg-[#080A0F]/85 border border-purple-500/25 p-2.5 flex items-center gap-2 sm:col-span-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                      <span className="text-xs text-slate-200">Student collaboration &amp; mentoring</span>
                    </div>
                  </div>
                </div>

                {/* Tags & Action Buttons */}
                <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-white/10">
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
                    <button
                      onClick={() => {
                        playClick();
                        setSelectedMember(leader);
                      }}
                      className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-purple-500/20 hover:bg-purple-500/30 border border-purple-400/40 text-purple-200 hover:text-white text-xs font-mono font-semibold transition-all shadow-sm shadow-purple-500/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-400"
                    >
                      <span>View Blueprint</span>
                      <ArrowRight className="w-3.5 h-3.5 text-purple-300" />
                    </button>

                    {leader.githubUrl && (
                      <a
                        href={leader.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-slate-400 hover:text-white transition-colors"
                        title="GitHub Profile"
                        aria-label={`${leader.name} GitHub`}
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
                        aria-label={`${leader.name} LinkedIn`}
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

      {/* EDITORIAL CORE TEAM CARDS GRID */}
      <div>
        <div className="mb-6 flex items-center justify-between">
          <span className="text-xs font-mono text-purple-300 font-bold uppercase tracking-wider">
            Active Directorate Profiles ({displayedDirectors.length})
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
          {displayedDirectors.map((director) => {
            const domain = getDomainColor(director.category);

            return (
              <div
                key={director.id}
                ref={(el) => {
                  cardRefs.current[director.id] = el;
                }}
                onPointerMove={(e) => handlePointerMove(e, director.id)}
                onPointerLeave={() => handlePointerLeave(director.id)}
                onMouseEnter={playHover}
                className="gsap-showcase-card relative rounded-[28px] p-6 sm:p-7 border border-purple-500/20 hover:border-purple-400/50 bg-[#0A0D1B]/90 backdrop-blur-2xl flex flex-col justify-between overflow-hidden shadow-xl transition-all duration-300 group hover:shadow-[0_20px_45px_-15px_rgba(168,85,247,0.22)]"
                style={{ transformStyle: "preserve-3d" }}
              >
                {/* Radial ambient lighting */}
                <div
                  className={`absolute top-0 right-0 w-44 h-44 bg-gradient-to-bl ${domain.glow} blur-2xl pointer-events-none -z-10 group-hover:opacity-100 opacity-50 transition-opacity duration-300`}
                />
                <div className="absolute inset-x-0 top-0 h-[1.5px] bg-gradient-to-r from-transparent via-purple-400/30 to-transparent pointer-events-none" />

                <div className="space-y-4">
                  {/* Category Chip & Group Badge */}
                  <div className="flex items-center justify-between gap-2">
                    <span className={`text-[10px] font-mono uppercase tracking-wider px-2.5 py-0.5 rounded-full ${domain.bg} ${domain.border} ${domain.text} border font-bold`}>
                      {director.category}
                    </span>
                    <span className="text-[10px] font-mono text-slate-400 flex items-center gap-1">
                      <GraduationCap className="w-3 h-3 text-purple-400" />
                      <span>{director.year || "3rd Year"}</span>
                    </span>
                  </div>

                  {/* Avatar & Identification */}
                  <div className="flex items-center gap-4">
                    <div className="shrink-0 transition-transform duration-300 group-hover:scale-105">
                      <TeamAvatar
                        src={director.avatarUrl}
                        alt={`${director.name} - ${director.role}`}
                        name={director.name}
                        size="lg"
                        variant="rounded"
                        glowColor={director.category === "Leadership" ? "purple" : director.category === "Technical" ? "blue" : "emerald"}
                        showChipBadge={false}
                        showStatus={false}
                      />
                    </div>

                    <div className="space-y-1 min-w-0">
                      <h4 className="text-base sm:text-lg font-black text-white group-hover:text-purple-300 transition-colors truncate font-sans">
                        {director.name}
                      </h4>
                      <p className="text-[11px] font-mono text-slate-400 truncate">
                        {director.department}
                      </p>
                      <p className="text-[10px] text-slate-500 truncate font-light">
                        {director.institution || COMMUNITY_INFO.collegeShort}
                      </p>
                    </div>
                  </div>

                  {/* Exact Designation Box */}
                  <div className="rounded-xl bg-[#080A0F]/85 border border-white/5 p-3 group-hover:border-purple-500/30 transition-colors">
                    <span className="text-xs font-mono font-bold text-amber-400 leading-tight block">
                      {director.role}
                    </span>
                  </div>

                  {/* Short Bio */}
                  <p className="text-xs text-slate-300 font-light leading-relaxed line-clamp-3">
                    {director.bio}
                  </p>
                </div>

                {/* Bottom Skill Tags & Interaction Action */}
                <div className="pt-4 border-t border-purple-500/15 mt-5 space-y-3">
                  <div className="flex flex-wrap gap-1.5">
                    {director.tags?.slice(0, 3).map((tag, i) => (
                      <span
                        key={i}
                        className="text-[9px] font-mono px-2 py-0.5 rounded-md bg-[#080A0F] text-slate-300 border border-white/5"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between pt-1">
                    <button
                      onClick={() => {
                        playClick();
                        setSelectedMember(director);
                      }}
                      className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold text-purple-300 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-400 rounded-md px-1 py-0.5"
                    >
                      <span>View Blueprint</span>
                      <ArrowRight className="w-3.5 h-3.5 text-purple-400 group-hover:translate-x-1 transition-transform" />
                    </button>

                    <div className="flex items-center gap-2.5">
                      {director.githubUrl && (
                        <a
                          href={director.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-slate-400 hover:text-white transition-colors"
                          title={`${director.name} GitHub`}
                          aria-label={`${director.name} GitHub`}
                        >
                          <Github className="w-3.5 h-3.5" />
                        </a>
                      )}
                      {director.linkedinUrl && (
                        <a
                          href={director.linkedinUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-slate-400 hover:text-sky-400 transition-colors"
                          title={`${director.name} LinkedIn`}
                          aria-label={`${director.name} LinkedIn`}
                        >
                          <Linkedin className="w-3.5 h-3.5" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* INTERACTIVE EXPANDED PROFILE MODAL */}
      {selectedMember && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
          role="dialog"
          aria-modal="true"
          aria-labelledby="member-modal-title"
          onClick={() => setSelectedMember(null)}
        >
          <div
            className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-[32px] border border-purple-500/30 bg-[#0B0F1E] p-6 sm:p-8 shadow-2xl text-left"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Ambient Modal Highlight */}
            <div className="absolute top-0 right-0 w-72 h-72 bg-purple-600/15 blur-3xl pointer-events-none -z-10" />
            <div className="absolute inset-x-0 top-0 h-[1.5px] bg-gradient-to-r from-transparent via-purple-400/50 to-transparent pointer-events-none" />

            {/* Close Button */}
            <button
              onClick={() => setSelectedMember(null)}
              className="absolute top-6 right-6 w-9 h-9 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-slate-400 hover:text-white flex items-center justify-center transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-400"
              aria-label="Close profile modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Header: Avatar & Names */}
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 mb-6 text-center sm:text-left">
              <TeamAvatar
                src={selectedMember.avatarUrl}
                alt={`${selectedMember.name} portrait`}
                name={selectedMember.name}
                size="xl"
                variant="rounded"
                glowColor="purple"
                showChipBadge={true}
                showStatus={true}
                statusLabel="Active Builder"
              />

              <div className="space-y-1.5">
                <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-purple-500/15 border border-purple-500/30 text-purple-300 text-xs font-mono font-bold">
                  <Sparkles className="w-3 h-3 text-amber-400" />
                  <span>{selectedMember.category} Directorate</span>
                </div>

                <h3
                  id="member-modal-title"
                  className="text-2xl sm:text-3xl font-black text-white tracking-tight"
                >
                  {selectedMember.name}
                </h3>

                <p className="text-xs sm:text-sm font-mono font-semibold text-amber-400">
                  {selectedMember.role}
                </p>

                <p className="text-xs text-slate-400 font-mono">
                  {selectedMember.department} • {selectedMember.year}
                </p>
                <p className="text-xs text-slate-500 font-light">
                  {selectedMember.institution || COMMUNITY_INFO.college}
                </p>
              </div>
            </div>

            {/* Modal Body: Complete Bio */}
            <div className="space-y-6 pt-4 border-t border-purple-500/15">
              <div>
                <h4 className="text-xs font-mono font-bold text-purple-300 uppercase tracking-wider mb-2">
                  Biography &amp; Leadership Mandate
                </h4>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-light">
                  {selectedMember.bio}
                </p>
              </div>

              {/* Practical Task & Deliverables */}
              {selectedMember.practicalTask && (
                <div className="rounded-2xl bg-[#080A0F]/90 border border-purple-500/25 p-4 sm:p-5 space-y-3">
                  <div className="flex items-center gap-2 text-amber-400 text-xs font-mono font-bold">
                    <Layers className="w-4 h-4" />
                    <span>Directive: {selectedMember.practicalTask.title}</span>
                  </div>
                  <p className="text-xs text-slate-300 font-light leading-relaxed">
                    {selectedMember.practicalTask.objective}
                  </p>

                  {selectedMember.practicalTask.deliverables && (
                    <div className="space-y-1.5 pt-2">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-semibold block">
                        Key Deliverables:
                      </span>
                      {selectedMember.practicalTask.deliverables.map((del, dIdx) => (
                        <div key={dIdx} className="flex items-start gap-2 text-xs text-slate-200 font-light">
                          <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                          <span>{del}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {selectedMember.practicalTask.awsServices && (
                    <div className="pt-2 flex flex-wrap gap-1.5 items-center">
                      <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider mr-1">
                        AWS Stack:
                      </span>
                      {selectedMember.practicalTask.awsServices.map((srv, sIdx) => (
                        <span
                          key={sIdx}
                          className="text-[10px] font-mono px-2.5 py-0.5 rounded-md bg-purple-950/60 text-purple-300 border border-purple-500/30 font-semibold"
                        >
                          {srv}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Learning Path Milestones */}
              {selectedMember.learningPath && selectedMember.learningPath.length > 0 && (
                <div>
                  <h4 className="text-xs font-mono font-bold text-purple-300 uppercase tracking-wider mb-2.5">
                    Curriculum &amp; Technical Competencies
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {selectedMember.learningPath.slice(0, 4).map((lp, idx) => (
                      <div
                        key={idx}
                        className="rounded-xl bg-[#080A0F]/70 border border-white/5 p-3"
                      >
                        <span className="text-xs font-mono font-bold text-slate-200 block mb-1">
                          {lp.title}
                        </span>
                        <span className="text-[11px] text-slate-400 font-light leading-snug block">
                          {lp.description}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Skills Tags & Modal Footer */}
              <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-white/10">
                <div className="flex flex-wrap gap-1.5">
                  {selectedMember.tags?.map((t, idx) => (
                    <span
                      key={idx}
                      className="text-[10px] font-mono px-2.5 py-1 rounded-md bg-[#080A0F] text-slate-300 border border-white/10"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-3">
                  {selectedMember.githubUrl && (
                    <a
                      href={selectedMember.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10 text-xs font-mono transition-colors"
                      aria-label={`${selectedMember.name} GitHub`}
                    >
                      <Github className="w-3.5 h-3.5" />
                      <span>GitHub</span>
                    </a>
                  )}
                  {selectedMember.linkedinUrl && (
                    <a
                      href={selectedMember.linkedinUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-purple-500/20 hover:bg-purple-500/30 text-purple-200 hover:text-white border border-purple-400/40 text-xs font-mono transition-colors"
                      aria-label={`${selectedMember.name} LinkedIn`}
                    >
                      <Linkedin className="w-3.5 h-3.5 text-sky-400" />
                      <span>LinkedIn</span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
