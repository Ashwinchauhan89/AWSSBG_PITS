"use client";

import * as React from "react";
import { useRef } from "react";
import { BookOpen, Hammer, Users, Sparkles, MapPin, ShieldCheck } from "lucide-react";
import { COMMUNITY_INFO } from "@/lib/data/initialData";
import { gsap, useGSAP } from "@/lib/gsap";
import { useSound } from "@/components/audio/SoundManager";

interface FeatureCard {
  title: string;
  tagline: string;
  description: string;
  icon: React.ElementType;
  accentColor: string;
  badgeBg: string;
  borderColor: string;
  glowEffect: string;
  bulletPoints: string[];
}

const FEATURE_CARDS: FeatureCard[] = [
  {
    title: "Learn",
    tagline: "Foundations & Applied Skills",
    description:
      "Explore cloud technologies, AI/ML, software engineering, and modern development tools through practical workshops, curriculum labs, and peer study groups.",
    icon: BookOpen,
    accentColor: "text-amber-400",
    badgeBg: "bg-amber-500/10 text-amber-300 border-amber-500/30",
    borderColor: "hover:border-amber-400/50",
    glowEffect: "group-hover:shadow-[0_0_35px_rgba(255,153,0,0.22)]",
    bulletPoints: [
      "AWS Cloud Primitives & Free Tier Safety",
      "Foundational AI/ML & Prompt Engineering",
      "Modern TypeScript & Web Architectures",
    ],
  },
  {
    title: "Build",
    tagline: "Prototypes & Collaborative Code",
    description:
      "Turn ideas into real-world applications, prototypes, and collaborative projects with fellow student developers across all engineering branches.",
    icon: Hammer,
    accentColor: "text-sky-400",
    badgeBg: "bg-sky-500/10 text-sky-300 border-sky-500/30",
    borderColor: "hover:border-sky-400/50",
    glowEffect: "group-hover:shadow-[0_0_35px_rgba(56,189,248,0.22)]",
    bulletPoints: [
      "Serverless APIs & Cloud Storage Systems",
      "Generative AI & Bedrock RAG Prototypes",
      "Open-Source Repositories with CI/CD",
    ],
  },
  {
    title: "Connect",
    tagline: "Community & Peer Mentorship",
    description:
      "Share knowledge, collaborate with peers, and participate in community activities, campus meetups, and student tech showcases at PITS Ujjain.",
    icon: Users,
    accentColor: "text-emerald-400",
    badgeBg: "bg-emerald-500/10 text-emerald-300 border-emerald-500/30",
    borderColor: "hover:border-emerald-400/50",
    glowEffect: "group-hover:shadow-[0_0_35px_rgba(52,211,153,0.22)]",
    bulletPoints: [
      "Cross-Department Peer Collaboration",
      "Technical Talks & Architecture Reviews",
      "Direct Mentorship with Appointed Leads",
    ],
  },
];

export function CommunityMissionSection() {
  const containerRef = useRef<HTMLElement | null>(null);
  const { playHover } = useSound();

  useGSAP(
    () => {
      gsap.from(".gsap-mission-card", {
        y: 35,
        opacity: 0,
        stagger: 0.15,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });
    },
    { scope: containerRef }
  );

  return (
    <section
      id="community"
      ref={containerRef}
      className="relative py-24 sm:py-32 border-b border-white/10 bg-[#080A0F] overflow-hidden"
    >
      {/* Background Volumetric Lighting & Cyber Grids */}
      <div className="absolute top-0 right-1/4 w-[600px] h-[350px] volumetric-blue-glow pointer-events-none -z-10" />
      <div className="absolute inset-0 tech-grid opacity-20 pointer-events-none -z-10" />

      <div className="responsive-container">
        {/* Section Header */}
        <div className="text-center max-w-4xl mx-auto space-y-4 mb-16">
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

        {/* 3 Visual Feature Cards: Learn • Build • Connect */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-16">
          {FEATURE_CARDS.map((card, idx) => {
            const Icon = card.icon;
            return (
              <div
                key={card.title}
                onMouseEnter={playHover}
                className={`gsap-mission-card cinematic-glass rounded-3xl p-6 sm:p-8 3xl:p-10 border border-white/10 relative overflow-hidden transition-all duration-300 group hover:-translate-y-1.5 ${card.borderColor} ${card.glowEffect} hud-corner`}
              >
                {/* Top Badge & Number */}
                <div className="flex items-center justify-between mb-6">
                  <div
                    className={`w-12 h-12 rounded-2xl ${card.badgeBg} flex items-center justify-center shadow-lg transition-transform group-hover:scale-110 duration-300`}
                  >
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="font-mono text-xs font-bold text-slate-500 uppercase tracking-widest">
                    PILLAR 0{idx + 1}
                  </span>
                </div>

                {/* Card Title & Tagline */}
                <h3 className="text-xl sm:text-2xl font-black text-white mb-1 group-hover:text-amber-400 transition-colors">
                  {card.title}
                </h3>
                <p className="text-xs font-mono text-slate-400 mb-4 font-medium">
                  {card.tagline}
                </p>

                {/* Card Description */}
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-light mb-6">
                  {card.description}
                </p>

                {/* Bullet Points */}
                <div className="pt-4 border-t border-white/10 space-y-2">
                  {card.bulletPoints.map((point, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-slate-300 font-light">
                      <span className={`w-1.5 h-1.5 rounded-full ${card.accentColor} shrink-0`} />
                      <span>{point}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Community Distinction Banner */}
        <div className="text-center">
          <div className="inline-flex flex-wrap items-center justify-center gap-2 text-xs text-slate-400 bg-white/5 border border-white/10 px-4 py-2.5 rounded-full max-w-2xl mx-auto">
            <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0" />
            <span>Independent academic community at Prashanti Institute of Technology &amp; Science • Student Builder Group Program</span>
          </div>
        </div>
      </div>
    </section>
  );
}
