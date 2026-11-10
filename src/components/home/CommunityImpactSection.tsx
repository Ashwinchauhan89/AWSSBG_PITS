"use client";

import React, { useRef } from "react";
import { Award, Users, BookOpen, Rocket, CheckCircle2 } from "lucide-react";
import { gsap, useGSAP } from "@/lib/gsap";

const IMPACT_METRICS = [
  {
    value: "8",
    suffix: "Leaders",
    label: "Appointed Directors",
    desc: "Dedicated student leads driving cloud, AI/ML, data, DevOps, events, marketing, and design.",
    icon: Users,
    color: "text-amber-400",
  },
  {
    value: "6",
    suffix: "Tracks",
    label: "Curriculum Domains",
    desc: "Deep-dive learning syllabi covering cloud infrastructure, generative AI, MLOps, and CI/CD.",
    icon: BookOpen,
    color: "text-purple-300",
  },
  {
    value: "5",
    suffix: "Labs",
    label: "Scheduled Campus Workshops",
    desc: "Hands-on technical labs with minute-by-minute agendas and zero-cost billing safety.",
    icon: Rocket,
    color: "text-sky-400",
  },
  {
    value: "100%",
    suffix: "Student-Led",
    label: "Campus Community",
    desc: "Open to 1st through 4th-year engineering students across all academic branches.",
    icon: Award,
    color: "text-emerald-400",
  },
];

const QUALITATIVE_PILLARS = [
  {
    title: "AWS Free Tier Safety Protocol",
    desc: "Every workshop begins with CloudWatch billing alarms and cost-budget governance so students learn risk-free.",
  },
  {
    title: "Real Architecture Deployment",
    desc: "Moving beyond basic slides to real terminal deployments, serverless APIs, containerization, and S3 static sites.",
  },
  {
    title: "Cross-Department Collaboration",
    desc: "Uniting computer science, electronics, and mechanical engineering students in shared builder cohorts.",
  },
];

export function CommunityImpactSection() {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.from(".gsap-impact-card", {
        y: 35,
        opacity: 0,
        stagger: 0.1,
        duration: 0.75,
        ease: "power2.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 75%",
          once: true,
        },
      });
    },
    { scope: containerRef }
  );

  return (
    <section
      id="impact"
      ref={containerRef}
      className="py-24 sm:py-32 relative overflow-hidden bg-[#070912] border-b border-white/10"
    >
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[450px] bg-purple-900/10 blur-[150px] pointer-events-none -z-10" />
      <div className="absolute inset-0 tech-grid opacity-15 pointer-events-none -z-10" />

      <div className="responsive-container">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-mono font-semibold tracking-wider uppercase shadow-sm">
            <Award className="w-3.5 h-3.5 text-purple-400" />
            <span>CAMPUS FOOTPRINT • VERIFIED HIGHLIGHTS</span>
          </div>

          <h2 className="text-3xl xs:text-4xl sm:text-5xl font-black text-white tracking-tight uppercase">
            Community{" "}
            <span className="bg-gradient-to-r from-purple-400 via-violet-300 to-amber-300 bg-clip-text text-transparent">
              Impact &amp; Benchmarks
            </span>
          </h2>

          <p className="text-sm sm:text-base text-slate-300 font-light leading-relaxed">
            Measuring our growth through practical skills gained, architectures launched, and students empowered with authentic cloud knowledge.
          </p>
        </div>

        {/* 4 Impact Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-14">
          {IMPACT_METRICS.map((metric, i) => {
            const Icon = metric.icon;

            return (
              <div
                key={i}
                className="gsap-impact-card relative rounded-[28px] p-6 sm:p-7 border border-purple-500/20 bg-[#0A0D1B]/90 backdrop-blur-2xl shadow-xl flex flex-col justify-between group hover:border-purple-400/50 transition-all duration-300"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-3xl sm:text-4xl font-black text-white font-mono">
                      {metric.value}
                    </span>
                    <div className="w-10 h-10 rounded-xl bg-purple-500/15 border border-purple-500/30 flex items-center justify-center">
                      <Icon className={`w-5 h-5 ${metric.color}`} />
                    </div>
                  </div>

                  <div>
                    <span className={`text-xs font-mono font-bold uppercase tracking-wider ${metric.color} block`}>
                      {metric.label}
                    </span>
                    <span className="text-[11px] font-mono text-slate-400">
                      {metric.suffix}
                    </span>
                  </div>

                  <p className="text-xs text-slate-300 font-light leading-relaxed">
                    {metric.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Qualitative Highlights Trio */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {QUALITATIVE_PILLARS.map((pillar, i) => (
            <div
              key={i}
              className="p-6 rounded-2xl bg-[#090C18]/80 border border-white/5 space-y-2 hover:border-purple-500/30 transition-colors"
            >
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                <h4 className="text-sm font-bold text-white font-sans">
                  {pillar.title}
                </h4>
              </div>
              <p className="text-xs text-slate-300 font-light leading-relaxed">
                {pillar.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
