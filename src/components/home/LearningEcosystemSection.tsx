"use client";

import React, { useRef } from "react";
import Link from "next/link";
import {
  Cloud,
  BrainCircuit,
  Database,
  Code2,
  Terminal,
  Sparkles,
  ArrowRight,
  Cpu,
} from "lucide-react";
import { gsap, useGSAP } from "@/lib/gsap";
import { useSound } from "@/components/audio/SoundManager";

interface EcosystemDomain {
  id: string;
  number: string;
  title: string;
  badge: string;
  description: string;
  icon: React.ElementType;
  technologies: string[];
  accent: {
    text: string;
    badgeBg: string;
    border: string;
    borderHover: string;
    glow: string;
  };
}

const DOMAINS: EcosystemDomain[] = [
  {
    id: "aws-cloud",
    number: "01",
    title: "AWS Cloud Computing",
    badge: "Core Infrastructure",
    description:
      "Master scalable compute, secure Virtual Private Clouds (VPC), resilient Amazon S3 object storage, and least-privilege AWS IAM policies.",
    icon: Cloud,
    technologies: ["Amazon EC2", "Amazon S3", "Amazon VPC", "AWS IAM", "CloudFront"],
    accent: {
      text: "text-amber-400",
      badgeBg: "bg-amber-500/10 text-amber-300 border-amber-500/30",
      border: "border-purple-500/20",
      borderHover: "hover:border-amber-400/50",
      glow: "group-hover:shadow-[0_15px_35px_-10px_rgba(255,153,0,0.2)]",
    },
  },
  {
    id: "ai-ml",
    number: "02",
    title: "Artificial Intelligence & Machine Learning",
    badge: "Cognitive Systems",
    description:
      "Train, evaluate, and deploy predictive models, computer vision pipelines, and sensory intelligence using Amazon SageMaker and Python ML frameworks.",
    icon: BrainCircuit,
    technologies: ["Amazon SageMaker", "PyTorch", "Scikit-Learn", "Computer Vision", "MLOps"],
    accent: {
      text: "text-sky-400",
      badgeBg: "bg-sky-500/10 text-sky-300 border-sky-500/30",
      border: "border-purple-500/20",
      borderHover: "hover:border-sky-400/50",
      glow: "group-hover:shadow-[0_15px_35px_-10px_rgba(56,189,248,0.2)]",
    },
  },
  {
    id: "data-eng",
    number: "03",
    title: "Data Engineering",
    badge: "Analytical Pipelines",
    description:
      "Architect scalable big-data lakes, serverless ETL pipelines, Amazon Athena analytics queries, and Amazon Redshift cloud data warehouses.",
    icon: Database,
    technologies: ["AWS Glue", "Amazon Redshift", "Amazon Athena", "Amazon S3", "Python ETL"],
    accent: {
      text: "text-violet-400",
      badgeBg: "bg-violet-500/10 text-violet-300 border-violet-500/30",
      border: "border-purple-500/20",
      borderHover: "hover:border-violet-400/50",
      glow: "group-hover:shadow-[0_15px_35px_-10px_rgba(168,85,247,0.22)]",
    },
  },
  {
    id: "software-eng",
    number: "04",
    title: "Software Engineering",
    badge: "Modern Web & APIs",
    description:
      "Build production-grade full-stack web applications with Next.js, TypeScript, REST & GraphQL APIs, and modern relational database architectures.",
    icon: Code2,
    technologies: ["Next.js", "TypeScript", "Node.js", "REST APIs", "Tailwind CSS"],
    accent: {
      text: "text-emerald-400",
      badgeBg: "bg-emerald-500/10 text-emerald-300 border-emerald-500/30",
      border: "border-purple-500/20",
      borderHover: "hover:border-emerald-400/50",
      glow: "group-hover:shadow-[0_15px_35px_-10px_rgba(52,211,153,0.2)]",
    },
  },
  {
    id: "devops-infra",
    number: "05",
    title: "DevOps & Infrastructure",
    badge: "CI/CD & Automation",
    description:
      "Implement automated CI/CD deployment workflows with GitHub Actions, Docker container orchestration, and Infrastructure as Code.",
    icon: Terminal,
    technologies: ["Docker", "GitHub Actions", "AWS Amplify", "CloudFormation", "Linux"],
    accent: {
      text: "text-fuchsia-400",
      badgeBg: "bg-fuchsia-500/10 text-fuchsia-300 border-fuchsia-500/30",
      border: "border-purple-500/20",
      borderHover: "hover:border-fuchsia-400/50",
      glow: "group-hover:shadow-[0_15px_35px_-10px_rgba(217,70,239,0.2)]",
    },
  },
  {
    id: "generative-ai",
    number: "06",
    title: "Generative AI",
    badge: "Foundation Models & RAG",
    description:
      "Deploy intelligent Retrieval-Augmented Generation (RAG) agents, prompt engineering pipelines, and multi-modal assistants using Amazon Bedrock.",
    icon: Sparkles,
    technologies: ["Amazon Bedrock", "Claude 3.5 Sonnet", "Vector DBs", "RAG Agents", "LangChain"],
    accent: {
      text: "text-purple-300",
      badgeBg: "bg-purple-500/10 text-purple-300 border-purple-500/30",
      border: "border-purple-500/20",
      borderHover: "hover:border-purple-400/50",
      glow: "group-hover:shadow-[0_15px_35px_-10px_rgba(192,132,252,0.22)]",
    },
  },
];

export function LearningEcosystemSection() {
  const containerRef = useRef<HTMLElement>(null);
  const { playHover } = useSound();

  useGSAP(
    () => {
      gsap.from(".gsap-ecosystem-card", {
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
    { scope: containerRef }
  );

  return (
    <section
      id="ecosystem"
      ref={containerRef}
      className="py-24 sm:py-32 relative overflow-hidden bg-[#070912] border-b border-white/10"
    >
      {/* Background Volumetric Glows */}
      <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-[800px] h-[450px] bg-purple-900/10 blur-[140px] pointer-events-none -z-10" />
      <div className="absolute inset-0 tech-grid opacity-15 pointer-events-none -z-10" />

      <div className="responsive-container">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-mono font-semibold tracking-wider uppercase shadow-sm">
            <Cpu className="w-3.5 h-3.5 text-purple-400" />
            <span>6 TECHNICAL DOMAINS • DEEP-DIVE CURRICULUM</span>
          </div>

          <h2 className="text-3xl xs:text-4xl sm:text-5xl font-black text-white tracking-tight uppercase">
            Our Learning{" "}
            <span className="bg-gradient-to-r from-purple-400 via-violet-300 to-amber-300 bg-clip-text text-transparent">
              Ecosystem
            </span>
          </h2>

          <p className="text-sm sm:text-base text-slate-300 font-light leading-relaxed">
            A comprehensive, semester-aligned roadmap of specialized technical tracks empowering students with real-world skills from foundational infrastructure to frontier AI.
          </p>
        </div>

        {/* 6 Visual Learning Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-12">
          {DOMAINS.map((domain) => {
            const Icon = domain.icon;

            return (
              <div
                key={domain.id}
                onMouseEnter={playHover}
                className={`gsap-ecosystem-card relative rounded-[28px] p-6 sm:p-8 border bg-[#0A0D1B]/90 backdrop-blur-2xl transition-all duration-300 flex flex-col justify-between group overflow-hidden ${domain.accent.border} ${domain.accent.borderHover} ${domain.accent.glow} hover:-translate-y-1`}
              >
                {/* Top Subtle Rim Light */}
                <div className="absolute inset-x-0 top-0 h-[1.5px] bg-gradient-to-r from-transparent via-purple-400/30 to-transparent pointer-events-none" />

                <div className="space-y-4">
                  {/* Top Bar: Icon & Domain Badge */}
                  <div className="flex items-center justify-between">
                    <div
                      className={`w-12 h-12 rounded-2xl ${domain.accent.badgeBg} border flex items-center justify-center shadow-lg transition-transform duration-300 group-hover:scale-110`}
                    >
                      <Icon className={`w-6 h-6 ${domain.accent.text}`} />
                    </div>
                    <span className="font-mono text-xs font-bold text-slate-400 uppercase tracking-widest">
                      TRACK {domain.number}
                    </span>
                  </div>

                  {/* Title & Badge */}
                  <div>
                    <span className={`text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-full ${domain.accent.badgeBg} border font-bold inline-block mb-1.5`}>
                      {domain.badge}
                    </span>
                    <h3 className="text-xl sm:text-2xl font-black text-white group-hover:text-purple-300 transition-colors">
                      {domain.title}
                    </h3>
                  </div>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-slate-300 font-light leading-relaxed">
                    {domain.description}
                  </p>
                </div>

                {/* Tech Chips */}
                <div className="pt-5 border-t border-purple-500/15 mt-6 space-y-3">
                  <div className="flex flex-wrap gap-1.5">
                    {domain.technologies.map((tech, i) => (
                      <span
                        key={i}
                        className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-[#080A0F] text-slate-300 border border-white/5"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="pt-2">
                    <Link
                      href="/resources"
                      className="inline-flex items-center justify-between w-full px-4 py-2 rounded-xl bg-white/5 hover:bg-purple-950/40 text-slate-300 hover:text-white border border-white/10 hover:border-purple-400/40 text-xs font-mono transition-all group/btn"
                    >
                      <span>Explore Learning Labs</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform text-purple-400" />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

