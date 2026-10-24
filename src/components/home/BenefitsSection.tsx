"use client";

import React, { useRef } from "react";
import {
  Terminal,
  Hammer,
  BrainCircuit,
  Users,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";
import { gsap, useGSAP } from "@/lib/gsap";
import { useSound } from "@/components/audio/SoundManager";

interface CommunityHighlight {
  id: string;
  title: string;
  actionText: string;
  description: string;
  icon: React.ElementType;
  accentColor: string;
  badgeBg: string;
  borderColor: string;
  glowEffect: string;
}

const COMMUNITY_HIGHLIGHTS: CommunityHighlight[] = [
  {
    id: "highlight-workshops",
    title: "Hands-On Technical Workshops",
    actionText: "Participate in hands-on technical workshops.",
    description:
      "Launch live cloud infrastructure, execute serverless APIs, configure resilient databases, and participate in step-by-step guided campus labs.",
    icon: Terminal,
    accentColor: "text-amber-400",
    badgeBg: "bg-amber-500/10 text-amber-300 border-amber-500/30",
    borderColor: "hover:border-amber-400/50",
    glowEffect: "group-hover:shadow-[0_0_30px_rgba(255,153,0,0.22)]",
  },
  {
    id: "highlight-projects",
    title: "Collaborative Projects",
    actionText: "Collaborate on software and cloud projects.",
    description:
      "Team up in multi-disciplinary student squads. Architect full-stack applications, master Git branching, and deploy prototypes to the cloud.",
    icon: Hammer,
    accentColor: "text-sky-400",
    badgeBg: "bg-sky-500/10 text-sky-300 border-sky-500/30",
    borderColor: "hover:border-sky-400/50",
    glowEffect: "group-hover:shadow-[0_0_30px_rgba(56,189,248,0.22)]",
  },
  {
    id: "highlight-aiml",
    title: "AI/ML & Emerging Tech",
    actionText: "Explore AI/ML and emerging technologies.",
    description:
      "Experiment with Amazon Bedrock foundation models, prompt engineering, computer vision, and machine learning pipelines in a safe learning environment.",
    icon: BrainCircuit,
    accentColor: "text-purple-400",
    badgeBg: "bg-purple-500/10 text-purple-300 border-purple-500/30",
    borderColor: "hover:border-purple-400/50",
    glowEffect: "group-hover:shadow-[0_0_30px_rgba(168,85,247,0.22)]",
  },
  {
    id: "highlight-peers",
    title: "Peer Knowledge Sharing",
    actionText: "Share knowledge and learn from peers.",
    description:
      "Join inclusive study circles, review real-world architectures with peers, and learn directly from appointed senior student mentors.",
    icon: Users,
    accentColor: "text-emerald-400",
    badgeBg: "bg-emerald-500/10 text-emerald-300 border-emerald-500/30",
    borderColor: "hover:border-emerald-400/50",
    glowEffect: "group-hover:shadow-[0_0_30px_rgba(52,211,153,0.22)]",
  },
  {
    id: "highlight-leadership",
    title: "Leadership & Speaking Skills",
    actionText: "Develop presentation, teamwork, and leadership skills.",
    description:
      "Demonstrate technical prototypes, facilitate workshop tracks, conduct peer code reviews, and build career confidence through student leadership.",
    icon: Sparkles,
    accentColor: "text-teal-400",
    badgeBg: "bg-teal-500/10 text-teal-300 border-teal-500/30",
    borderColor: "hover:border-teal-400/50",
    glowEffect: "group-hover:shadow-[0_0_30px_rgba(45,212,191,0.22)]",
  },
];

export function BenefitsSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const { playHover } = useSound();

  useGSAP(
    () => {
      gsap.from(".gsap-highlight-card", {
        y: 35,
        opacity: 0,
        stagger: 0.1,
        duration: 0.75,
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

  return (
    <section
      id="highlights"
      ref={sectionRef}
      className="py-24 sm:py-32 border-b border-white/10 bg-[#080A0F] relative overflow-hidden"
    >
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] volumetric-glow pointer-events-none -z-10" />
      <div className="absolute inset-0 tech-grid opacity-15 pointer-events-none -z-10" />

      <div className="responsive-container">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-mono font-semibold tracking-wider uppercase">
            <Sparkles className="w-3.5 h-3.5" />
            <span>SECTION G • COMMUNITY HIGHLIGHTS</span>
          </div>

          <h2 className="text-2xl xs:text-3xl sm:text-5xl 3xl:text-6xl font-black text-white tracking-tight uppercase">
            What Members Can Do in <br />
            <span className="bg-gradient-to-r from-amber-400 via-orange-400 to-sky-400 bg-clip-text text-transparent">
              Our Student Community
            </span>
          </h2>

          <p className="text-slate-300 text-xs sm:text-base 3xl:text-lg leading-relaxed font-light">
            We prioritize practical student engagement, hands-on learning, and collaborative building across every engineering discipline at PITS Ujjain.
          </p>
        </div>

        {/* Balanced Grid for the 5 Community Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {COMMUNITY_HIGHLIGHTS.slice(0, 3).map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.id}
                onMouseEnter={playHover}
                className={`gsap-highlight-card cinematic-glass rounded-3xl p-6 sm:p-8 border border-white/10 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 group ${item.borderColor} ${item.glowEffect}`}
              >
                <div>
                  <div
                    className={`w-12 h-12 rounded-2xl ${item.badgeBg} flex items-center justify-center mb-5 shadow-lg group-hover:scale-110 transition-transform duration-300`}
                  >
                    <Icon className="w-6 h-6" />
                  </div>

                  <h3 className="text-lg sm:text-xl font-bold text-white mb-2 group-hover:text-amber-400 transition-colors">
                    {item.title}
                  </h3>

                  <div className="mb-3">
                    <span className="text-xs font-mono font-semibold text-slate-300 block">
                      {item.actionText}
                    </span>
                  </div>

                  <p className="text-xs text-slate-400 leading-relaxed font-light">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom 2 Cards (Centered Balanced Layout) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 max-w-4xl mx-auto">
          {COMMUNITY_HIGHLIGHTS.slice(3, 5).map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.id}
                onMouseEnter={playHover}
                className={`gsap-highlight-card cinematic-glass rounded-3xl p-6 sm:p-8 border border-white/10 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 group ${item.borderColor} ${item.glowEffect}`}
              >
                <div>
                  <div
                    className={`w-12 h-12 rounded-2xl ${item.badgeBg} flex items-center justify-center mb-5 shadow-lg group-hover:scale-110 transition-transform duration-300`}
                  >
                    <Icon className="w-6 h-6" />
                  </div>

                  <h3 className="text-lg sm:text-xl font-bold text-white mb-2 group-hover:text-amber-400 transition-colors">
                    {item.title}
                  </h3>

                  <div className="mb-3">
                    <span className="text-xs font-mono font-semibold text-slate-300 block">
                      {item.actionText}
                    </span>
                  </div>

                  <p className="text-xs text-slate-400 leading-relaxed font-light">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Community culture link */}
        <div className="mt-14 text-center">
          <Link
            href="/about"
            className="inline-flex items-center gap-2 text-xs font-mono font-semibold text-amber-400 hover:text-amber-300 transition-colors px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/30 hover:bg-amber-500/20"
          >
            <span>Read more about our community culture &amp; academic mission</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
