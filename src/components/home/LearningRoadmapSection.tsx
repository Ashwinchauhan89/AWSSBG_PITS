"use client";

import * as React from "react";
import { useState, useRef } from "react";
import {
  Compass,
  Terminal,
  Hammer,
  Share2,
  Sparkles,
  CheckCircle2,
  ChevronRight,
} from "lucide-react";
import Link from "next/link";
import { gsap, useGSAP } from "@/lib/gsap";
import { useSound } from "@/components/audio/SoundManager";

interface RoadmapStage {
  id: string;
  number: string;
  title: string;
  tagline: string;
  summary: string;
  details: string;
  milestones: string[];
  icon: React.ElementType;
  accentColor: string;
  badgeBg: string;
  borderColor: string;
  glowEffect: string;
  lineGradient: string;
}

const ROADMAP_STAGES: RoadmapStage[] = [
  {
    id: "stage-explore",
    number: "01",
    title: "Explore",
    tagline: "Foundations & Essential Tools",
    summary: "Learn foundational concepts and essential tools.",
    details:
      "Understand cloud architecture primitives, virtualization, Git version control, the Linux terminal, and configure an AWS Free Tier account with proactive budget alarms.",
    milestones: [
      "Cloud Fundamentals & Architecture Overview",
      "Git, GitHub & Version Control Workflows",
      "Linux Command Line Navigation",
      "AWS Free Tier & Billing Safety Alarms",
    ],
    icon: Compass,
    accentColor: "text-amber-400",
    badgeBg: "bg-amber-500/10 text-amber-300 border-amber-500/30",
    borderColor: "border-amber-500/40",
    glowEffect: "shadow-[0_0_30px_rgba(255,153,0,0.2)]",
    lineGradient: "from-amber-500 to-sky-500",
  },
  {
    id: "stage-practice",
    number: "02",
    title: "Practice",
    tagline: "Guided Exercises & Hands-on Labs",
    summary: "Complete guided exercises and hands-on labs.",
    details:
      "Launch live Amazon EC2 virtual servers, organize unstructured data in Amazon S3 buckets, execute serverless microservices with AWS Lambda, and configure VPC security.",
    milestones: [
      "Amazon EC2 Virtual Servers & S3 Buckets",
      "Serverless AWS Lambda & API Gateway",
      "Database Storage (DynamoDB & RDS)",
      "VPC Peering, Subnets & Security Groups",
    ],
    icon: Terminal,
    accentColor: "text-sky-400",
    badgeBg: "bg-sky-500/10 text-sky-300 border-sky-500/30",
    borderColor: "border-sky-500/40",
    glowEffect: "shadow-[0_0_30px_rgba(56,189,248,0.2)]",
    lineGradient: "from-sky-500 to-emerald-500",
  },
  {
    id: "stage-build",
    number: "03",
    title: "Build",
    tagline: "Collaborative Team Projects",
    summary: "Develop practical projects with a team.",
    details:
      "Form agile student squads mentored by domain Directors. Build full-stack web applications, train models in SageMaker, or develop Amazon Bedrock GenAI prototypes.",
    milestones: [
      "Multi-Disciplinary Student Squads",
      "Full-Stack Next.js & Cloud Backends",
      "Amazon Bedrock GenAI & RAG Prototypes",
      "Automated CI/CD with GitHub Actions",
    ],
    icon: Hammer,
    accentColor: "text-emerald-400",
    badgeBg: "bg-emerald-500/10 text-emerald-300 border-emerald-500/30",
    borderColor: "border-emerald-500/40",
    glowEffect: "shadow-[0_0_30px_rgba(52,211,153,0.2)]",
    lineGradient: "from-emerald-500 to-purple-500",
  },
  {
    id: "stage-share",
    number: "04",
    title: "Share",
    tagline: "Demos, Feedback & Open Source",
    summary: "Present projects, exchange feedback, and demonstrate what you learned.",
    details:
      "Showcase prototypes at campus technology events, participate in peer architecture reviews, publish open-source code on GitHub, and mentor junior student builders.",
    milestones: [
      "Campus Project Showcases & Demonstrations",
      "Peer Architecture & Code Reviews",
      "Open-Source GitHub Portfolio Curation",
      "Mentoring the Next Student Cohort",
    ],
    icon: Share2,
    accentColor: "text-purple-400",
    badgeBg: "bg-purple-500/10 text-purple-300 border-purple-500/30",
    borderColor: "border-purple-500/40",
    glowEffect: "shadow-[0_0_30px_rgba(168,85,247,0.2)]",
    lineGradient: "from-purple-500 to-amber-500",
  },
];

export function LearningRoadmapSection() {
  const [activeStageIndex, setActiveStageIndex] = useState<number>(0);
  const sectionRef = useRef<HTMLElement | null>(null);
  const { playHover, playClick } = useSound();

  const activeStage = ROADMAP_STAGES[activeStageIndex];

  useGSAP(
    () => {
      gsap.from(".gsap-roadmap-card", {
        y: 35,
        opacity: 0,
        stagger: 0.12,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      id="roadmap"
      ref={sectionRef}
      className="relative py-24 sm:py-32 border-b border-white/10 bg-[#080A0F] overflow-hidden"
    >
      {/* Ambient background volumetric lighting */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[800px] h-[400px] volumetric-glow pointer-events-none -z-10" />
      <div className="absolute inset-0 tech-grid opacity-15 pointer-events-none -z-10" />

      <div className="responsive-container">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-mono font-semibold tracking-wider uppercase">
            <Sparkles className="w-3.5 h-3.5" />
            <span>SECTION C • LEARNING ROADMAP</span>
          </div>

          <h2 className="text-2xl xs:text-3xl sm:text-5xl 3xl:text-6xl font-black text-white tracking-tight uppercase">
            Your Journey from <br />
            <span className="bg-gradient-to-r from-amber-400 via-orange-400 to-sky-400 bg-clip-text text-transparent">
              Learner to Builder.
            </span>
          </h2>

          <p className="text-xs sm:text-base 3xl:text-lg text-slate-300 leading-relaxed font-light">
            A progressive four-stage path designed to take engineering students from curious beginners to confident cloud architects and prototype builders.
          </p>
        </div>

        {/* ============================================================== */}
        {/* DESKTOP TIMELINE (Horizontal Timeline on lg+ screens) */}
        {/* ============================================================== */}
        <div className="hidden lg:block mb-12">
          {/* Connecting Track Line */}
          <div className="relative mb-12 px-6">
            <div className="absolute top-1/2 left-10 right-10 -translate-y-1/2 h-1 bg-white/10 rounded-full" />
            <div
              className="absolute top-1/2 left-10 -translate-y-1/2 h-1 bg-gradient-to-r from-amber-500 via-sky-500 via-emerald-500 to-purple-500 rounded-full transition-all duration-500"
              style={{
                width: `${(activeStageIndex / (ROADMAP_STAGES.length - 1)) * 82 + 10}%`,
              }}
            />

            {/* Stage Progress Nodes */}
            <div className="relative flex items-center justify-between z-10">
              {ROADMAP_STAGES.map((stage, idx) => {
                const Icon = stage.icon;
                const isActive = activeStageIndex === idx;

                return (
                  <button
                    key={stage.id}
                    onClick={() => {
                      playClick();
                      setActiveStageIndex(idx);
                    }}
                    onMouseEnter={playHover}
                    className="flex flex-col items-center group focus:outline-none cursor-pointer"
                  >
                    <div
                      className={`w-14 h-14 rounded-2xl flex items-center justify-center font-mono font-bold transition-all duration-300 border-2 ${
                        isActive
                          ? `${stage.borderColor} bg-[#101A2C] ${stage.accentColor} ${stage.glowEffect} scale-110`
                          : "border-white/10 bg-[#080A0F] text-slate-400 group-hover:border-white/30 group-hover:text-white"
                      }`}
                    >
                      <Icon className="w-6 h-6" />
                    </div>
                    <span
                      className={`text-xs font-mono font-bold tracking-wider uppercase mt-3 transition-colors ${
                        isActive ? stage.accentColor : "text-slate-400 group-hover:text-slate-200"
                      }`}
                    >
                      {stage.number}. {stage.title}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active Stage Detailed Showcase Card */}
          <div className="hud-corner rounded-3xl border border-white/10 bg-[#101A2C]/80 p-8 sm:p-10 backdrop-blur-2xl shadow-2xl relative overflow-hidden transition-all duration-300">
            <div className="grid grid-cols-12 gap-8 items-center">
              <div className="col-span-6 space-y-4">
                <div className="flex items-center gap-2">
                  <span
                    className={`text-xs font-mono font-bold px-3 py-1 rounded-full border ${activeStage.badgeBg}`}
                  >
                    STAGE {activeStage.number} • {activeStage.title.toUpperCase()}
                  </span>
                  <span className="text-xs font-mono text-slate-400">
                    {activeStage.tagline}
                  </span>
                </div>

                <h3 className="text-2xl font-black text-white">
                  {activeStage.summary}
                </h3>

                <p className="text-sm text-slate-300 leading-relaxed font-light">
                  {activeStage.details}
                </p>

                <div className="pt-2 flex items-center gap-3 text-xs font-mono text-slate-400">
                  <span>Step {activeStageIndex + 1} of 4</span>
                  <span>•</span>
                  <span>Sequential Learning Milestone</span>
                </div>
              </div>

              {/* Milestones Checklist */}
              <div className="col-span-6 rounded-2xl border border-white/10 bg-[#080A0F]/80 p-6 space-y-3">
                <h4 className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider mb-2">
                  Key Stage Deliverables &amp; Competencies:
                </h4>
                {activeStage.milestones.map((m, i) => (
                  <div key={i} className="flex items-start gap-2.5 text-xs text-slate-200">
                    <CheckCircle2
                      className={`w-4 h-4 shrink-0 mt-0.5 ${activeStage.accentColor}`}
                    />
                    <span>{m}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ============================================================== */}
        {/* RESPONSIVE TIMELINE CARDS GRID (Horizontal on desktop, Vertical on mobile) */}
        {/* ============================================================== */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {ROADMAP_STAGES.map((stage, idx) => {
            const Icon = stage.icon;
            const isSelected = activeStageIndex === idx;

            return (
              <div
                key={stage.id}
                onClick={() => {
                  playClick();
                  setActiveStageIndex(idx);
                }}
                onMouseEnter={playHover}
                className={`gsap-roadmap-card cursor-pointer cinematic-glass rounded-3xl p-6 border transition-all duration-300 relative overflow-hidden flex flex-col justify-between group hover:-translate-y-1.5 ${
                  isSelected ? `${stage.borderColor} ${stage.glowEffect}` : "border-white/10 hover:border-white/30"
                }`}
              >
                <div>
                  {/* Top Row: Icon & Step Number */}
                  <div className="flex items-center justify-between mb-4">
                    <div
                      className={`w-11 h-11 rounded-xl flex items-center justify-center border ${stage.badgeBg}`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="font-mono text-xs font-black text-slate-500 tracking-widest">
                      STAGE {stage.number}
                    </span>
                  </div>

                  {/* Stage Title & Tagline */}
                  <h3 className="text-xl font-black text-white mb-1 group-hover:text-amber-400 transition-colors">
                    {stage.title}
                  </h3>
                  <p className="text-[11px] font-mono text-slate-400 mb-3 font-medium">
                    {stage.tagline}
                  </p>

                  {/* Summary */}
                  <p className="text-xs text-slate-300 leading-relaxed font-light mb-5">
                    {stage.summary}
                  </p>
                </div>

                {/* Key Milestones in Card */}
                <div className="pt-3 border-t border-white/10 space-y-2">
                  {stage.milestones.slice(0, 2).map((m, i) => (
                    <div key={i} className="flex items-center gap-1.5 text-[11px] text-slate-300 font-light truncate">
                      <span className={`w-1 h-1 rounded-full ${stage.accentColor} shrink-0`} />
                      <span className="truncate">{m}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 text-center">
          <Link
            href="/resources"
            className="inline-flex items-center gap-2 text-xs font-mono font-semibold text-sky-400 hover:text-sky-300 transition-colors px-4 py-2 rounded-full bg-sky-500/10 border border-sky-500/30 hover:bg-sky-500/20"
          >
            <span>View curriculum whitepapers, lab checklists &amp; certification guides</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
