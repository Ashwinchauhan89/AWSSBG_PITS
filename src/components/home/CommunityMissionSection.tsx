"use client";

import * as React from "react";
import { useRef } from "react";
import { Sparkles, Users, Award, ShieldCheck, MapPin, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { COMMUNITY_INFO } from "@/lib/data/initialData";
import { gsap, useGSAP } from "@/lib/gsap";

export function CommunityMissionSection() {
  const containerRef = useRef<HTMLElement | null>(null);
  const metric1Ref = useRef<HTMLDivElement | null>(null);
  const metric2Ref = useRef<HTMLDivElement | null>(null);
  const metric3Ref = useRef<HTMLDivElement | null>(null);
  const metric4Ref = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      // Metric Counters
      const countData = { m1: 0, m2: 0, m3: 0, m4: 0 };
      gsap.to(countData, {
        m1: 100,
        m2: 6,
        m3: 15,
        m4: 24,
        duration: 2.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
        onUpdate: () => {
          if (metric1Ref.current) metric1Ref.current.textContent = `${Math.floor(countData.m1)}%`;
          if (metric2Ref.current) metric2Ref.current.textContent = `0${Math.floor(countData.m2)}`;
          if (metric3Ref.current) metric3Ref.current.textContent = `${Math.floor(countData.m3)}+`;
          if (metric4Ref.current) metric4Ref.current.textContent = `${Math.floor(countData.m4)}/7`;
        },
      });

      // Stagger entrance
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-4xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-mono font-semibold tracking-wider uppercase">
            <Sparkles className="w-3.5 h-3.5" />
            <span>SECTION 01 • THE COMMUNITY</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight uppercase">
            Build Beyond Limits. <br />
            <span className="bg-gradient-to-r from-amber-400 via-orange-400 to-sky-400 bg-clip-text text-transparent">
              Learn Without Boundaries.
            </span>
          </h2>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-light max-w-3xl mx-auto pt-2">
            Explore cloud computing, artificial intelligence, machine learning, and modern software development through hands-on learning, technical workshops, and collaborative innovation.
          </p>

          <div className="pt-2 flex flex-wrap items-center justify-center gap-3 text-xs font-mono text-slate-400">
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

        {/* Community Mission Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <div className="gsap-mission-card cinematic-glass cinematic-glass-hover rounded-3xl p-8 border border-white/10 relative overflow-hidden">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/15 border border-amber-500/30 text-amber-400 flex items-center justify-center mb-6 shadow-lg shadow-orange-500/20">
              <Sparkles className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2 tracking-tight">
              Hands-On Cloud Labs
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              We replace abstract slides with live AWS environments. Students deploy microservices on EC2, configure S3 static assets, and run serverless functions with zero friction.
            </p>
          </div>

          <div className="gsap-mission-card cinematic-glass cinematic-glass-hover rounded-3xl p-8 border border-white/10 relative overflow-hidden">
            <div className="w-12 h-12 rounded-2xl bg-sky-500/15 border border-sky-500/30 text-sky-400 flex items-center justify-center mb-6 shadow-lg shadow-sky-500/20">
              <Award className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2 tracking-tight">
              AI &amp; Generative Mastery
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              Dive deep into Amazon Bedrock, SageMaker pipelines, and Retrieval-Augmented Generation (RAG). Learn to connect enterprise-grade LLMs to real campus applications.
            </p>
          </div>

          <div className="gsap-mission-card cinematic-glass cinematic-glass-hover rounded-3xl p-8 border border-white/10 relative overflow-hidden">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mb-6 shadow-lg shadow-emerald-500/20">
              <Users className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2 tracking-tight">
              Collaborative Innovation
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              Build resume-defining portfolio projects in multi-disciplinary student teams. Participate in campus hackathons, code reviews, and peer architecture sessions.
            </p>
          </div>
        </div>

        {/* Verified Community Metrics with Counters */}
        <div className="hud-corner rounded-3xl border border-white/10 bg-[#101A2C]/60 p-8 sm:p-10 backdrop-blur-xl shadow-2xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center divide-y md:divide-y-0 md:divide-x divide-white/10">
            <div className="pt-4 md:pt-0">
              <div ref={metric1Ref} className="text-3xl sm:text-5xl font-black text-amber-400 font-mono tracking-tight">
                0%
              </div>
              <p className="text-xs sm:text-sm font-medium text-slate-300 mt-2">
                Student &amp; Peer-Led
              </p>
              <p className="text-[10px] text-slate-400 font-mono mt-0.5">Community Driven</p>
            </div>

            <div className="pt-4 md:pt-0">
              <div ref={metric2Ref} className="text-3xl sm:text-5xl font-black text-white font-mono tracking-tight">
                00
              </div>
              <p className="text-xs sm:text-sm font-medium text-slate-300 mt-2">
                Technical Tracks
              </p>
              <p className="text-[10px] text-slate-400 font-mono mt-0.5">Cloud, AI, DevOps &amp; Web</p>
            </div>

            <div className="pt-4 md:pt-0">
              <div ref={metric3Ref} className="text-3xl sm:text-5xl font-black text-sky-400 font-mono tracking-tight">
                0+
              </div>
              <p className="text-xs sm:text-sm font-medium text-slate-300 mt-2">
                Hands-on Workshops
              </p>
              <p className="text-[10px] text-slate-400 font-mono mt-0.5">Planned Curriculum</p>
            </div>

            <div className="pt-4 md:pt-0">
              <div ref={metric4Ref} className="text-3xl sm:text-5xl font-black text-emerald-400 font-mono tracking-tight">
                0/7
              </div>
              <p className="text-xs sm:text-sm font-medium text-slate-300 mt-2">
                Developer Lab Access
              </p>
              <p className="text-[10px] text-slate-400 font-mono mt-0.5">PITS Campus &amp; Discord</p>
            </div>
          </div>
        </div>

        {/* Clear Educational Community Distinction */}
        <div className="mt-8 text-center">
          <div className="inline-flex items-center gap-2 text-xs text-slate-400 bg-white/5 border border-white/10 px-4 py-2 rounded-full">
            <ShieldCheck className="w-4 h-4 text-amber-400" />
            <span>Independent academic community at Prashanti Institute of Technology &amp; Science • Not an official AWS corporate site</span>
          </div>
        </div>
      </div>
    </section>
  );
}
