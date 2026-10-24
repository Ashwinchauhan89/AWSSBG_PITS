"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import {
  ShieldCheck,
  Sparkles,
  Award,
  Users,
  Compass,
  Code,
  Terminal,
  Cpu,
  CheckCircle2,
  Database,
  BrainCircuit,
  Cloud,
  Rocket,
  Search,
  BookOpen,
  Layers,
  Palette,
  Megaphone,
  Lightbulb,
  Check,
  Copy,
  ChevronRight,
  GitBranch,
  GraduationCap,
} from "lucide-react";
import { Github, Linkedin } from "@/components/ui/Icons";
import { INITIAL_TEAM_MEMBERS, COMMUNITY_INFO } from "@/lib/data/initialData";
import { TeamMember } from "@/lib/types";
import { toast } from "sonner";
import { useSound } from "@/components/audio/SoundManager";
import { TeamAvatar } from "@/components/team/TeamAvatar";

type FilterCategory = "All" | "Leadership" | "Technical" | "Operations" | "Outreach" | "Creative";

const CATEGORY_TABS: { label: string; value: FilterCategory; icon: React.ElementType }[] = [
  { label: "All Board", value: "All", icon: Users },
  { label: "Leadership", value: "Leadership", icon: ShieldCheck },
  { label: "Technical & Cloud", value: "Technical", icon: Cpu },
  { label: "Operations & Innovation", value: "Operations", icon: Lightbulb },
  { label: "Marketing & Growth", value: "Outreach", icon: Megaphone },
  { label: "Creative & Design", value: "Creative", icon: Palette },
];

export function TeamDirectoryClient() {
  const { playClick } = useSound();
  const [activeTab, setActiveTab] = useState<FilterCategory>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCardTab, setActiveCardTab] = useState<Record<string, "learning" | "task">>({});
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Appointed leader (Ashwin Chauhan)
  const leader = useMemo(
    () => INITIAL_TEAM_MEMBERS.find((m) => m.isLead) || INITIAL_TEAM_MEMBERS[0],
    []
  );

  // Directors & Core Members (excluding the leader)
  const appointedDirectors = useMemo(
    () => INITIAL_TEAM_MEMBERS.filter((m) => !m.isLead && !m.isVacant),
    []
  );

  // Filtered Directors based on tab and search query
  const filteredDirectors = useMemo(() => {
    return appointedDirectors.filter((member) => {
      const matchesCategory =
        activeTab === "All" || member.category === activeTab;

      const q = searchQuery.toLowerCase().trim();
      if (!q) return matchesCategory;

      const matchesSearch =
        member.name.toLowerCase().includes(q) ||
        member.role.toLowerCase().includes(q) ||
        (member.department && member.department.toLowerCase().includes(q)) ||
        (member.bio && member.bio.toLowerCase().includes(q)) ||
        (member.tags && member.tags.some((t) => t.toLowerCase().includes(q))) ||
        (member.learningPath &&
          member.learningPath.some(
            (lp) =>
              lp.title.toLowerCase().includes(q) ||
              lp.description.toLowerCase().includes(q)
          )) ||
        (member.practicalTask &&
          (member.practicalTask.title.toLowerCase().includes(q) ||
            member.practicalTask.objective.toLowerCase().includes(q) ||
            (member.practicalTask.awsServices &&
              member.practicalTask.awsServices.some((s) =>
                s.toLowerCase().includes(q)
              ))));

      return matchesCategory && matchesSearch;
    });
  }, [appointedDirectors, activeTab, searchQuery]);

  const copyRoadmap = (member: TeamMember) => {
    playClick();
    const syllabus = member.learningPath
      ?.map((lp, i) => `${i + 1}. ${lp.title}: ${lp.description}`)
      .join("\n") || "";
    const task = member.practicalTask
      ? `\n\nPractical Task: ${member.practicalTask.title}\nObjective: ${member.practicalTask.objective}`
      : "";
    const textToCopy = `AWS SBG PITS Leadership Portfolio\nName: ${member.name}\nRole: ${member.role}\n\nWhat to Learn:\n${syllabus}${task}`;

    navigator.clipboard.writeText(textToCopy);
    setCopiedId(member.id);
    toast.success(`Copied learning roadmap for ${member.name}!`);
    setTimeout(() => setCopiedId(null), 2500);
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const getCategoryTheme = (category: string) => {
    switch (category) {
      case "Leadership":
        return {
          badge: "bg-amber-500/10 text-amber-400 border-amber-500/30",
          gradient: "from-amber-500 via-orange-500 to-amber-600",
          border: "border-amber-500/30",
          accent: "text-amber-400",
        };
      case "Technical":
        return {
          badge: "bg-sky-500/10 text-sky-400 border-sky-500/30",
          gradient: "from-sky-500 via-blue-600 to-indigo-600",
          border: "border-sky-500/30",
          accent: "text-sky-400",
        };
      case "Operations":
        return {
          badge: "bg-purple-500/10 text-purple-400 border-purple-500/30",
          gradient: "from-purple-500 via-fuchsia-600 to-pink-600",
          border: "border-purple-500/30",
          accent: "text-purple-400",
        };
      case "Outreach":
        return {
          badge: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30",
          gradient: "from-emerald-500 via-teal-600 to-cyan-600",
          border: "border-emerald-500/30",
          accent: "text-emerald-400",
        };
      case "Creative":
        return {
          badge: "bg-pink-500/10 text-pink-400 border-pink-500/30",
          gradient: "from-pink-500 via-rose-600 to-amber-500",
          border: "border-pink-500/30",
          accent: "text-pink-400",
        };
      default:
        return {
          badge: "bg-slate-500/10 text-slate-400 border-slate-500/30",
          gradient: "from-slate-600 to-slate-800",
          border: "border-slate-500/30",
          accent: "text-slate-400",
        };
    }
  };

  const coreDirectors = useMemo(
    () => appointedDirectors.filter((m) => !m.isAdditional),
    [appointedDirectors]
  );

  const additionalDirectors = useMemo(
    () => appointedDirectors.filter((m) => m.isAdditional),
    [appointedDirectors]
  );

  const isDefaultView = activeTab === "All" && !searchQuery.trim();

  const renderDirectorCard = (director: TeamMember) => {
    const theme = getCategoryTheme(director.category);
    const cardTab = activeCardTab[director.id] || "learning";

    return (
      <div
        key={director.id}
        className={`hud-corner rounded-3xl border ${theme.border} bg-gradient-to-b from-[#101A2C]/90 via-[#080A0F]/95 to-[#101A2C]/80 p-6 sm:p-8 backdrop-blur-xl shadow-xl flex flex-col justify-between space-y-6 hover:border-amber-400/50 transition-all group`}
      >
        <div className="space-y-5">
          {/* Top Row: Category Badge, Additional Tag & Actions */}
          <div className="flex items-center justify-between">
            <div className="flex flex-wrap items-center gap-1.5">
              <span className={`text-[11px] font-mono px-3 py-1 rounded-full border font-bold ${theme.badge}`}>
                {director.category} Directorate
              </span>
              {director.isAdditional && (
                <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full border border-amber-400/40 bg-amber-400/10 text-amber-300 font-bold flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-amber-400" />
                  <span>Additional Team Member</span>
                </span>
              )}
            </div>

            <div className="flex items-center gap-2">
              {director.linkedinUrl && (
                <a
                  href={director.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white transition-colors"
                  title="LinkedIn Profile"
                >
                  <Linkedin className="w-3.5 h-3.5" />
                </a>
              )}
              {director.githubUrl && (
                <a
                  href={director.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white transition-colors"
                  title="GitHub Profile"
                >
                  <Github className="w-3.5 h-3.5" />
                </a>
              )}
              <button
                onClick={() => copyRoadmap(director)}
                className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white text-xs transition-colors flex items-center gap-1 font-mono"
                title="Copy Director Roadmap"
              >
                {copiedId === director.id ? (
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                ) : (
                  <Copy className="w-3.5 h-3.5" />
                )}
              </button>
            </div>
          </div>

          {/* Director Header: Circular Portrait Avatar + Info */}
          <div className="flex items-center gap-4">
            <TeamAvatar
              src={director.avatarUrl}
              alt={`${director.name} - ${director.role}`}
              name={director.name}
              size="lg"
              variant="circular"
              glowColor={
                director.category === "Leadership"
                  ? "amber"
                  : director.category === "Technical"
                  ? "blue"
                  : director.category === "Operations"
                  ? "emerald"
                  : director.category === "Outreach"
                  ? "cyan"
                  : director.category === "Creative"
                  ? "pink"
                  : "slate"
              }
              className="group-hover:scale-105 transition-transform"
            />

            <div className="space-y-1 min-w-0">
              <h3 className="text-xl sm:text-2xl font-black text-white group-hover:text-amber-400 transition-colors truncate">
                {director.name}
              </h3>
              <p className={`text-xs font-bold font-mono ${theme.accent} leading-tight`}>
                {director.role}
              </p>
              <p className="text-[11px] text-slate-300 font-mono flex items-center gap-1 truncate pt-0.5">
                <GraduationCap className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>{director.institution || "Prashanti Institute of Technology & Science, Ujjain"}</span>
              </p>
              <p className="text-[10px] text-slate-400 font-mono">
                {director.department} ({director.year})
              </p>
            </div>
          </div>

          {/* Special Focus Spotlight (e.g. Aayesha Malik) */}
          {director.specialFocus && (
            <div className="p-3.5 rounded-2xl bg-gradient-to-r from-amber-500/15 via-orange-500/10 to-amber-500/5 border border-amber-500/40 text-amber-300 text-xs font-medium space-y-1 shadow-lg shadow-amber-500/10">
              <div className="flex items-center gap-1.5 font-bold font-mono uppercase text-[11px] text-amber-400">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Special Strategic Focus</span>
              </div>
              <p className="text-[11px] leading-relaxed text-amber-100 font-light">
                {director.specialFocus}
              </p>
            </div>
          )}

          {/* Bio */}
          <p className="text-xs text-slate-300 leading-relaxed font-light">
            {director.bio}
          </p>

          {/* Interactive Tab Toggle: What to Learn vs Practical Task */}
          <div className="pt-2">
            <div className="flex rounded-xl bg-slate-950/80 p-1 border border-white/10">
              <button
                onClick={() => {
                  playClick();
                  setActiveCardTab((prev) => ({ ...prev, [director.id]: "learning" }));
                }}
                className={`flex-1 py-1.5 rounded-lg text-xs font-mono font-semibold transition-all flex items-center justify-center gap-1.5 ${
                  cardTab === "learning"
                    ? "bg-white/10 text-white shadow-sm"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                <BookOpen className="w-3.5 h-3.5 text-amber-400" />
                <span>What to Learn ({director.learningPath?.length || 0})</span>
              </button>

              <button
                onClick={() => {
                  playClick();
                  setActiveCardTab((prev) => ({ ...prev, [director.id]: "task" }));
                }}
                className={`flex-1 py-1.5 rounded-lg text-xs font-mono font-semibold transition-all flex items-center justify-center gap-1.5 ${
                  cardTab === "task"
                    ? "bg-white/10 text-white shadow-sm"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                <Terminal className="w-3.5 h-3.5 text-sky-400" />
                <span>Practical Task</span>
              </button>
            </div>

            {/* Tab Content 1: What to Learn */}
            {cardTab === "learning" && (
              <div className="mt-3 p-4 rounded-2xl bg-[#080A0F]/70 border border-white/10 space-y-2.5 max-h-64 overflow-y-auto no-scrollbar">
                {director.learningPath?.map((item, i) => (
                  <div key={i} className="text-xs space-y-0.5 border-b border-white/5 pb-2 last:border-0 last:pb-0">
                    <span className="font-semibold text-white block">
                      • {item.title}
                    </span>
                    <span className="text-[11px] text-slate-400 block pl-2 font-light">
                      {item.description}
                    </span>
                  </div>
                ))}
              </div>
            )}

            {/* Tab Content 2: Practical Task */}
            {cardTab === "task" && director.practicalTask && (
              <div className="mt-3 p-4 rounded-2xl bg-sky-500/5 border border-sky-500/20 space-y-3">
                <div className="text-xs font-bold text-white">
                  {director.practicalTask.title}
                </div>
                <p className="text-[11px] text-slate-300 leading-relaxed font-light">
                  {director.practicalTask.objective}
                </p>

                {director.practicalTask.deliverables && (
                  <div className="space-y-1.5 pt-1">
                    <span className="text-[10px] font-mono text-sky-400 uppercase font-semibold">
                      Target Deliverables:
                    </span>
                    <ul className="space-y-1 text-[11px] text-slate-300">
                      {director.practicalTask.deliverables.map((deliv, di) => (
                        <li key={di} className="flex items-start gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-sky-400 shrink-0 mt-0.5" />
                          <span>{deliv}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {director.practicalTask.awsServices && (
                  <div className="pt-2 flex flex-wrap gap-1">
                    {director.practicalTask.awsServices.map((svc) => (
                      <span
                        key={svc}
                        className="text-[10px] font-mono px-2 py-0.5 rounded bg-sky-500/10 text-sky-300 border border-sky-500/20"
                      >
                        {svc}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Card Bottom: Tags & Connect */}
        <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap gap-1.5">
            {director.tags?.slice(0, 4).map((tag) => (
              <span
                key={tag}
                className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-slate-400 border border-white/5"
              >
                {tag}
              </span>
            ))}
          </div>

        </div>
      </div>
    );
  };

  return (
    <div className="py-12 sm:py-20 relative overflow-hidden">
      {/* Cloud + X themed background motif overlay */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[420px] pointer-events-none -z-10 opacity-35 blur-[1px]">
        <Image
          src="/images/backgrounds/cloud-x-background.webp"
          alt="Cloud Infrastructure with Futuristic X Motif"
          fill
          className="object-cover object-top"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#080A0F]/80 to-[#080A0F]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Page Hero Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/35 text-purple-300 text-xs font-mono font-semibold tracking-wider uppercase shadow-sm shadow-purple-500/15 backdrop-blur-md">
            <Image
              src="/images/branding/purple-pixel-chip.png"
              alt="PITS Cloud Chip"
              width={16}
              height={16}
              className="w-4 h-4 object-contain rounded shrink-0 shadow-sm shadow-purple-500/40"
            />
            <span>OFFICIAL LEADERSHIP &amp; DIRECTORATE BOARD</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight uppercase">
            The Student Leaders of <br />
            <span className="bg-gradient-to-r from-amber-400 via-orange-400 to-sky-400 bg-clip-text text-transparent">
              AWS SBG PITS
            </span>
          </h1>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-light">
            Meet the officially appointed Directors and Core Leads of the AWS Student Builder Group at{" "}
            <span className="text-white font-medium">{COMMUNITY_INFO.college}</span>. Each director commands a specialized learning track, concrete capstone task, and mentors student builder cohorts.
          </p>

          {/* Key Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 max-w-2xl mx-auto">
            <div className="p-3 rounded-2xl bg-white/5 border border-white/10 text-center">
              <div className="text-xl sm:text-2xl font-black text-amber-400">8</div>
              <div className="text-[11px] font-mono text-slate-400 uppercase">Appointed Leaders</div>
            </div>
            <div className="p-3 rounded-2xl bg-white/5 border border-white/10 text-center">
              <div className="text-xl sm:text-2xl font-black text-sky-400">7</div>
              <div className="text-[11px] font-mono text-slate-400 uppercase">Directorates</div>
            </div>
            <div className="p-3 rounded-2xl bg-white/5 border border-white/10 text-center">
              <div className="text-xl sm:text-2xl font-black text-purple-400">8+</div>
              <div className="text-[11px] font-mono text-slate-400 uppercase">Practical Labs</div>
            </div>
            <div className="p-3 rounded-2xl bg-white/5 border border-white/10 text-center">
              <div className="text-xl sm:text-2xl font-black text-emerald-400">100%</div>
              <div className="text-[11px] font-mono text-slate-400 uppercase">Student Led</div>
            </div>
          </div>
        </div>

        {/* 1. Monumental Leader Showcase (Ashwin Chauhan) */}
        <div id="leader" className="space-y-6 scroll-mt-24">
          <div className="flex items-center gap-2 border-b border-purple-500/30 pb-3">
            <ShieldCheck className="w-5 h-5 text-purple-400" />
            <h2 className="text-lg font-bold text-white uppercase tracking-wider font-mono">
              Overall Student Group Leader &amp; Founder
            </h2>
          </div>

          <div className="hud-corner rounded-3xl border border-purple-500/30 hover:border-purple-400/50 bg-gradient-to-b from-[#131024]/95 via-[#080A0F]/95 to-[#101A2C]/85 p-6 sm:p-10 backdrop-blur-2xl shadow-2xl relative overflow-hidden group transition-all duration-300">
            <div className="absolute top-0 right-0 w-[550px] h-[350px] bg-gradient-to-bl from-purple-600/15 via-indigo-600/10 to-transparent blur-3xl pointer-events-none -z-10" />
            <div className="absolute bottom-0 left-0 w-[400px] h-[250px] bg-gradient-to-tr from-amber-500/10 via-orange-500/5 to-transparent blur-3xl pointer-events-none -z-10" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Leader Avatar & Bio */}
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
                  statusLabel="Appointed Student Builder Group Leader"
                  className="shadow-2xl shadow-purple-500/30 ring-2 ring-purple-500/40"
                />

                <div>
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-purple-500/15 border border-purple-500/40 text-purple-300 text-[11px] font-mono font-bold mb-1">
                    <Award className="w-3 h-3 text-amber-400" />
                    <span>OVERALL GROUP LEADER</span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                    {leader.name}
                  </h3>
                  <p className="text-sm font-bold text-amber-400 mt-0.5 font-mono">
                    {leader.role}
                  </p>
                  <p className="text-xs text-slate-300 mt-1 font-mono flex items-center justify-center sm:justify-start gap-1">
                    <GraduationCap className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span>{leader.institution || "Prashanti Institute of Technology & Science, Ujjain"}</span>
                  </p>
                  <p className="text-[11px] text-slate-400 font-mono">
                    {leader.department} ({leader.year})
                  </p>
                </div>

                <div className="flex items-center gap-2 pt-1">
                  {leader.linkedinUrl && (
                    <a
                      href={leader.linkedinUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
                      title="LinkedIn Profile"
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
                  <button
                    onClick={() => copyRoadmap(leader)}
                    className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-slate-300 hover:text-white hover:bg-white/10 text-xs font-mono transition-colors"
                    title="Copy Leader Roadmap"
                  >
                    {copiedId === leader.id ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-emerald-400">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Share Track</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="w-full pt-2">
                  <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider mb-2">Core Domains</div>
                  <div className="flex flex-wrap gap-1.5">
                    {leader.tags?.map((tag) => (
                      <span
                        key={tag}
                        className="text-[11px] font-mono px-2 py-0.5 rounded-md bg-white/5 text-slate-300 border border-white/10"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Leader Mission & Syllabus */}
              <div className="lg:col-span-8 space-y-6">
                <blockquote className="text-sm sm:text-base font-light italic text-slate-200 border-l-2 border-amber-400 pl-4 py-1 leading-relaxed">
                  &ldquo;Our vision at Prashanti Institute is to cultivate hands-on cloud and AI literacy where student developers don&apos;t just read about technologies—they launch services, architect solutions, and build resume-defining prototypes together.&rdquo;
                </blockquote>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-light">
                  {leader.bio}
                </p>

                {/* Leader Core Responsibilities */}
                <div className="p-4 rounded-2xl bg-purple-500/5 border border-purple-500/20 space-y-2.5">
                  <div className="flex items-center gap-2 text-xs font-bold font-mono text-purple-300 uppercase tracking-wider">
                    <Compass className="w-4 h-4 text-purple-400" />
                    <span>Core Leadership Responsibilities</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-300">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                      <span>Community leadership</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                      <span>Technical direction</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                      <span>Workshops &amp; bootcamps</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                      <span>Project initiatives</span>
                    </div>
                    <div className="flex items-center gap-2 sm:col-span-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                      <span>Student collaboration &amp; mentoring</span>
                    </div>
                  </div>
                </div>

                {/* Leader Learning Roadmap & Practical Task Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                  {/* What to Learn */}
                  <div className="p-4 rounded-2xl bg-[#080A0F]/80 border border-white/10 space-y-3">
                    <div className="flex items-center gap-2 text-xs font-bold font-mono text-amber-400 uppercase tracking-wider">
                      <BookOpen className="w-4 h-4" />
                      <span>Leadership Learning Curriculum</span>
                    </div>
                    <ul className="space-y-2 text-xs text-slate-300">
                      {leader.learningPath?.map((lp, idx) => (
                        <li key={idx} className="space-y-0.5">
                          <span className="font-semibold text-white block">• {lp.title}</span>
                          <span className="text-slate-400 text-[11px] block pl-2">{lp.description}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Practical Task */}
                  {leader.practicalTask && (
                    <div className="p-4 rounded-2xl bg-amber-500/5 border border-amber-500/20 space-y-3">
                      <div className="flex items-center gap-2 text-xs font-bold font-mono text-amber-400 uppercase tracking-wider">
                        <Terminal className="w-4 h-4" />
                        <span>Chapter Milestone &amp; Task</span>
                      </div>
                      <div className="text-xs font-bold text-white">
                        {leader.practicalTask.title}
                      </div>
                      <p className="text-[11px] text-slate-300 leading-relaxed">
                        {leader.practicalTask.objective}
                      </p>
                      <div className="space-y-1.5 pt-1">
                        <span className="text-[10px] font-mono text-amber-400 uppercase font-semibold">Key Deliverables:</span>
                        <ul className="space-y-1 text-[11px] text-slate-300">
                          {leader.practicalTask.deliverables?.map((d, i) => (
                            <li key={i} className="flex items-start gap-1.5">
                              <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                              <span>{d}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 2. Directorate Team Directory Section */}
        <div className="space-y-8 pt-4">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/10 pb-4">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-mono text-sky-400 font-bold mb-1">
                <Cpu className="w-3.5 h-3.5" />
                <span>DIRECTORATE LEADERSHIP SQUAD</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight uppercase">
                Appointed Domain Directors
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-1 font-light">
                Explore each Director&apos;s technical specialization, structured learning path, and practical hands-on AWS task.
              </p>
            </div>

            {/* Search Input */}
            <div className="relative w-full md:w-72">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by topic, service, role..."
                className="w-full h-10 pl-9 pr-4 rounded-xl border border-white/10 bg-slate-900/80 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-amber-400 transition-colors font-mono"
              />
            </div>
          </div>

          {/* Interactive Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-2">
            {CATEGORY_TABS.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.value;
              return (
                <button
                  key={tab.value}
                  onClick={() => {
                    playClick();
                    setActiveTab(tab.value);
                  }}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono font-semibold transition-all shrink-0 ${
                    isActive
                      ? "bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 shadow-lg shadow-amber-500/20 font-bold"
                      : "bg-white/5 border border-white/10 text-slate-300 hover:text-white hover:bg-white/10"
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Directors Listing */}
          {isDefaultView ? (
            <div className="space-y-12">
              {/* Core Directorate Board */}
              <div className="space-y-6">
                <div className="flex items-center gap-2 border-b border-white/10 pb-3">
                  <Cpu className="w-4 h-4 text-sky-400" />
                  <h3 className="text-base sm:text-lg font-bold text-white uppercase tracking-wider font-mono">
                    Core Technical &amp; Operational Directors ({coreDirectors.length})
                  </h3>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {coreDirectors.map(renderDirectorCard)}
                </div>
              </div>

              {/* 🌟 Additional Team Members Section */}
              <div className="space-y-6 pt-2">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-amber-500/30 pb-3">
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-400">
                      <Sparkles className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="text-base sm:text-lg font-black text-white uppercase tracking-wider font-mono flex items-center gap-2">
                        <span>🌟 Additional Team Members</span>
                      </h3>
                      <p className="text-xs text-slate-400 font-light mt-0.5">
                        Marketing, Digital Development, Research &amp; Creative Social Outreach
                      </p>
                    </div>
                  </div>
                  <span className="text-[11px] font-mono text-amber-300/90 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20 font-semibold self-start sm:self-auto">
                    2 Appointed Directors
                  </span>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {additionalDirectors.map(renderDirectorCard)}
                </div>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {filteredDirectors.map(renderDirectorCard)}
            </div>
          )}

          {filteredDirectors.length === 0 && (
            <div className="text-center py-16 p-8 rounded-3xl border border-white/10 bg-slate-900/40 space-y-3">
              <Search className="w-8 h-8 text-slate-500 mx-auto" />
              <h3 className="text-base font-bold text-white">No directors match your search</h3>
              <p className="text-xs text-slate-400">
                Try searching for technologies like &quot;EC2&quot;, &quot;Bedrock&quot;, &quot;S3&quot;, &quot;Glue&quot;, or clear the search filter.
              </p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setActiveTab("All");
                }}
                className="text-xs font-mono text-amber-400 underline underline-offset-4"
              >
                Reset Search Filters
              </button>
            </div>
          )}
        </div>

        {/* 3. Directorate Synergy Architecture Flow */}
        <div className="hud-corner rounded-3xl border border-white/10 bg-gradient-to-b from-[#101A2C]/80 to-[#080A0F] p-8 sm:p-10 space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <div className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-sky-400 uppercase">
              <GitBranch className="w-3.5 h-3.5" />
              <span>SYNERGY ARCHITECTURE</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight uppercase">
              How Our Directorates Build Together
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 font-light">
              Each directorate operates as an interdependent building block in the AWS Student Builder Group ecosystem.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Step 1 */}
            <div className="p-5 rounded-2xl bg-[#080A0F]/80 border border-sky-500/20 space-y-2 relative">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono font-bold text-sky-400 bg-sky-500/10 px-2 py-0.5 rounded">
                  FOUNDATION
                </span>
                <span className="text-xs font-mono text-slate-500">STAGE 01</span>
              </div>
              <h4 className="text-sm font-bold text-white">Data &amp; Cloud Infra</h4>
              <p className="text-xs text-slate-400 leading-relaxed font-light">
                <strong>Anchit</strong> &amp; <strong>Tanish</strong> establish secure VPC networks, S3 data lakes, Glue ETL, and IAM permissions.
              </p>
            </div>

            {/* Step 2 */}
            <div className="p-5 rounded-2xl bg-[#080A0F]/80 border border-purple-500/20 space-y-2 relative">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono font-bold text-purple-400 bg-purple-500/10 px-2 py-0.5 rounded">
                  INTELLIGENCE
                </span>
                <span className="text-xs font-mono text-slate-500">STAGE 02</span>
              </div>
              <h4 className="text-sm font-bold text-white">AI/ML &amp; Software DevOps</h4>
              <p className="text-xs text-slate-400 leading-relaxed font-light">
                <strong>Shafque</strong> &amp; <strong>Aakansha</strong> integrate Amazon Bedrock LLMs, containerize Docker apps, and automate GitHub CI/CD.
              </p>
            </div>

            {/* Step 3 */}
            <div className="p-5 rounded-2xl bg-[#080A0F]/80 border border-amber-500/20 space-y-2 relative">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded">
                  INNOVATION
                </span>
                <span className="text-xs font-mono text-slate-500">STAGE 03</span>
              </div>
              <h4 className="text-sm font-bold text-white">Product Design &amp; Events</h4>
              <p className="text-xs text-slate-400 leading-relaxed font-light">
                <strong>Aaysha</strong> guides students in building innovative products on AWS and manages high-impact campus workshops.
              </p>
            </div>

            {/* Step 4 */}
            <div className="p-5 rounded-2xl bg-[#080A0F]/80 border border-emerald-500/20 space-y-2 relative">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">
                  AMPLIFICATION
                </span>
                <span className="text-xs font-mono text-slate-500">STAGE 04</span>
              </div>
              <h4 className="text-sm font-bold text-white">Marketing &amp; Design</h4>
              <p className="text-xs text-slate-400 leading-relaxed font-light">
                <strong>Muskan</strong> &amp; <strong>Harshit</strong> craft visual infographics, research-backed technical graphics, LinkedIn campaigns, and share student achievements.
              </p>
            </div>
          </div>
        </div>


        {/* 5. Educational Community Disclaimer */}
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6 text-center text-xs text-slate-400 space-y-1">
          <div className="flex items-center justify-center gap-1.5 text-amber-400 font-semibold">
            <ShieldCheck className="w-4 h-4" />
            <span>Student-Led Campus Chapter Status</span>
          </div>
          <p>
            The AWS Student Builder Group at Prashanti Institute of Technology &amp; Science is an independent student educational community. Group Leader Ashwin Chauhan and the appointed Directors are student volunteers and are not employees or agents of Amazon Web Services, Inc.
          </p>
        </div>
      </div>
    </div>
  );
}
