"use client";

import React, { useRef } from "react";
import {
  Terminal,
  Cloud,
  Hammer,
  Users,
  Code2,
  Compass,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";
import { gsap, useGSAP } from "@/lib/gsap";
import { useSound } from "@/components/audio/SoundManager";

interface WhyJoinCard {
  number: string;
  title: string;
  subtitle: string;
  description: string;
  icon: React.ElementType;
  accent: {
    text: string;
    badgeBg: string;
    border: string;
    borderHover: string;
    glow: string;
  };
  highlights: string[];
}

const CARDS: WhyJoinCard[] = [
  {
    number: "01",
    title: "Hands-on Learning",
    subtitle: "Real Console & Code Experience",
    description:
      "Go beyond theoretical lectures with step-by-step guided cloud labs, CLI experiments, and zero-cost Free Tier exercises.",
    icon: Terminal,
    accent: {
      text: "text-amber-400",
      badgeBg: "bg-amber-500/10 text-amber-300 border-amber-500/30",
      border: "border-purple-500/20",
      borderHover: "hover:border-amber-400/50",
      glow: "group-hover:shadow-[0_15px_35px_-10px_rgba(255,153,0,0.2)]",
    },
    highlights: ["AWS Management Console", "CLI Automations", "Free Tier Safety Guidelines"],
  },
  {
    number: "02",
    title: "Cloud & AI Exploration",
    subtitle: "Cutting-Edge Tooling",
    description:
      "Experiment with Amazon Bedrock foundation models, SageMaker ML pipelines, computer vision models, and serverless architectures.",
    icon: Cloud,
    accent: {
      text: "text-violet-400",
      badgeBg: "bg-violet-500/10 text-violet-300 border-violet-500/30",
      border: "border-purple-500/20",
      borderHover: "hover:border-violet-400/50",
      glow: "group-hover:shadow-[0_15px_35px_-10px_rgba(168,85,247,0.22)]",
    },
    highlights: ["Amazon Bedrock & SageMaker", "Prompt Engineering", "Serverless APIs"],
  },
  {
    number: "03",
    title: "Technical Workshops",
    subtitle: "Guided Practical Bootcamps",
    description:
      "Attend regular campus bootcamps, architecture deep-dives, live coding sessions, and certification study sprints.",
    icon: Hammer,
    accent: {
      text: "text-sky-400",
      badgeBg: "bg-sky-500/10 text-sky-300 border-sky-500/30",
      border: "border-purple-500/20",
      borderHover: "hover:border-sky-400/50",
      glow: "group-hover:shadow-[0_15px_35px_-10px_rgba(56,189,248,0.2)]",
    },
    highlights: ["Interactive Lab Sessions", "Well-Architected Reviews", "Industry Guest Talks"],
  },
  {
    number: "04",
    title: "Student Collaboration",
    subtitle: "Cross-Disciplinary Teams",
    description:
      "Work alongside ambitious student developers from all engineering departments, sharing knowledge and building together.",
    icon: Users,
    accent: {
      text: "text-emerald-400",
      badgeBg: "bg-emerald-500/10 text-emerald-300 border-emerald-500/30",
      border: "border-purple-500/20",
      borderHover: "hover:border-emerald-400/50",
      glow: "group-hover:shadow-[0_15px_35px_-10px_rgba(52,211,153,0.2)]",
    },
    highlights: ["Multi-Branch Squads", "Hackathon Prep", "Peer Code Reviews"],
  },
  {
    number: "05",
    title: "Project Development",
    subtitle: "From Idea to Cloud Deployment",
    description:
      "Turn classroom concepts into production-ready software prototypes with modern CI/CD, Git workflows, and live hosting.",
    icon: Code2,
    accent: {
      text: "text-fuchsia-400",
      badgeBg: "bg-fuchsia-500/10 text-fuchsia-300 border-fuchsia-500/30",
      border: "border-purple-500/20",
      borderHover: "hover:border-fuchsia-400/50",
      glow: "group-hover:shadow-[0_15px_35px_-10px_rgba(217,70,239,0.2)]",
    },
    highlights: ["GitHub Actions CI/CD", "Docker Containerization", "Portfolio Projects"],
  },
  {
    number: "06",
    title: "Peer Mentorship",
    subtitle: "Direct Support & Guidance",
    description:
      "Receive 1-on-1 mentorship from appointed student leads and directors across cloud computing, AI/ML, DevOps, and data.",
    icon: Compass,
    accent: {
      text: "text-indigo-400",
      badgeBg: "bg-indigo-500/10 text-indigo-300 border-indigo-500/30",
      border: "border-purple-500/20",
      borderHover: "hover:border-indigo-400/50",
      glow: "group-hover:shadow-[0_15px_35px_-10px_rgba(99,102,241,0.2)]",
    },
    highlights: ["Domain Director Guidance", "AWS Certification Roadmap", "Resume & Project Reviews"],
  },
];

export function WhyJoinSection() {
  const containerRef = useRef<HTMLElement>(null);
  const { playHover } = useSound();

  useGSAP(
    () => {
      gsap.from(".gsap-why-card", {
        y: 40,
        opacity: 0,
        stagger: 0.1,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          once: true,
        },
      });
    },
    { scope: containerRef }
  );

  return (
    <section
      id="why-join"
      ref={containerRef}
      className="py-24 sm:py-32 relative overflow-hidden bg-[#070912] border-b border-white/10"
    >
      {/* Background Volumetric Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[450px] bg-purple-900/10 blur-[140px] pointer-events-none -z-10" />
      <div className="absolute inset-0 tech-grid opacity-15 pointer-events-none -z-10" />

      <div className="responsive-container">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-mono font-semibold tracking-wider uppercase shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-purple-400" />
            <span>MEMBERSHIP &amp; GROWTH • ELEVATE YOUR TECH SKILLS</span>
          </div>

          <h2 className="text-3xl xs:text-4xl sm:text-5xl font-black text-white tracking-tight uppercase">
            Why Join Our{" "}
            <span className="bg-gradient-to-r from-purple-400 via-violet-300 to-amber-300 bg-clip-text text-transparent">
              Community?
            </span>
          </h2>

          <p className="text-sm sm:text-base text-slate-300 font-light leading-relaxed">
            Whether you are taking your first steps in cloud computing or building full-scale AI prototypes, here is why students at PITS choose to build together.
          </p>
        </div>

        {/* 6 Premium Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {CARDS.map((card) => {
            const Icon = card.icon;

            return (
              <div
                key={card.number}
                onMouseEnter={playHover}
                className={`gsap-why-card relative rounded-[28px] p-6 sm:p-8 border bg-[#0A0D1B]/90 backdrop-blur-2xl transition-all duration-300 flex flex-col justify-between group overflow-hidden ${card.accent.border} ${card.accent.borderHover} ${card.accent.glow} hover:-translate-y-1`}
              >
                {/* Top Subtle Rim Light */}
                <div className="absolute inset-x-0 top-0 h-[1.5px] bg-gradient-to-r from-transparent via-purple-400/30 to-transparent pointer-events-none" />

                <div className="space-y-4">
                  {/* Top Bar: Icon & Pillar Number */}
                  <div className="flex items-center justify-between">
                    <div
                      className={`w-12 h-12 rounded-2xl ${card.accent.badgeBg} border flex items-center justify-center shadow-lg transition-transform duration-300 group-hover:scale-110`}
                    >
                      <Icon className={`w-6 h-6 ${card.accent.text}`} />
                    </div>
                    <span className="font-mono text-xs font-bold text-slate-400 uppercase tracking-widest">
                      #{card.number}
                    </span>
                  </div>

                  {/* Title & Subtitle */}
                  <div>
                    <h3 className="text-xl sm:text-2xl font-black text-white group-hover:text-purple-300 transition-colors">
                      {card.title}
                    </h3>
                    <p className={`text-xs font-mono font-medium mt-1 ${card.accent.text}`}>
                      {card.subtitle}
                    </p>
                  </div>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-slate-300 font-light leading-relaxed">
                    {card.description}
                  </p>
                </div>

                {/* Highlights List */}
                <div className="pt-5 border-t border-purple-500/15 mt-6 space-y-2">
                  {card.highlights.map((h, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-slate-300 font-light">
                      <span className="w-1.5 h-1.5 rounded-full bg-purple-400 shrink-0" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA bar */}
        <div className="mt-14 text-center">
          <Link
            href="/join"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-500 hover:to-violet-500 text-white text-xs font-mono font-bold uppercase tracking-wider shadow-lg shadow-purple-600/30 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-400"
          >
            <span>Become an Active Builder</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

