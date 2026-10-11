"use client";

import * as React from "react";
import { useState } from "react";
import {
  Hammer,
  Terminal,
  Workflow,
  Sparkles,
  Layers,
  ArrowRight,
  CheckCircle2,
  Cpu,
  Database,
  Cloud,
  Globe,
  Zap,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

interface ArchitecturePreset {
  id: string;
  name: string;
  badge: string;
  latency: string;
  costTier: string;
  summary: string;
  steps: {
    title: string;
    tech: string;
    icon: React.ElementType;
    desc: string;
  }[];
}

const PRESETS: ArchitecturePreset[] = [
  {
    id: "genai",
    name: "GenAI Bedrock RAG Pipeline",
    badge: "Advanced AI",
    latency: "~85ms",
    costTier: "AWS Free Tier + Bedrock On-Demand",
    summary: "Vector retrieval pipeline connecting campus documents to Claude 3.5 Sonnet via Amazon Bedrock.",
    steps: [
      {
        title: "Client Query",
        tech: "Next.js / HTTPS",
        icon: Globe,
        desc: "Student inputs natural language academic query with zero-trust token authentication.",
      },
      {
        title: "Vector Search",
        tech: "OpenSearch / DynamoDB",
        icon: Database,
        desc: "Cosine similarity search retrieves relevant syllabus embeddings in under 12ms.",
      },
      {
        title: "Foundation Model Inference",
        tech: "Amazon Bedrock (Claude 3.5)",
        icon: Sparkles,
        desc: "Context-augmented prompt evaluated with low-latency streaming token responses.",
      },
    ],
  },
  {
    id: "serverless",
    name: "Event-Driven Serverless Backend",
    badge: "Microservices",
    latency: "~18ms",
    costTier: "100% Always-Free Eligible",
    summary: "Zero-idle cost infrastructure provisioning Firecracker microVMs on demand.",
    steps: [
      {
        title: "API Gateway",
        tech: "Amazon API Gateway",
        icon: Globe,
        desc: "Validates incoming REST request schema, handles throttling and CORS headers.",
      },
      {
        title: "Lambda Compute",
        tech: "AWS Lambda (Node.js 22)",
        icon: Zap,
        desc: "Executes business logic in stateless container provisioned in 15ms.",
      },
      {
        title: "NoSQL Persistence",
        tech: "Amazon DynamoDB",
        icon: Database,
        desc: "Single-digit millisecond read/write latency with automatic partition scaling.",
      },
    ],
  },
  {
    id: "static",
    name: "Global Edge Content Delivery",
    badge: "Cloud Web",
    latency: "~8ms",
    costTier: "AWS Free Tier (50GB Transfer)",
    summary: "Production static assets and SSR edge caching across CloudFront points of presence.",
    steps: [
      {
        title: "Global DNS",
        tech: "Amazon Route 53",
        icon: Globe,
        desc: "Low-latency Anycast DNS routing to nearest edge location in Mumbai.",
      },
      {
        title: "Edge CDN & WAF",
        tech: "AWS CloudFront",
        icon: Cloud,
        desc: "TLS 1.3 termination, automatic gzip/brotli compression, and DDoS filtering.",
      },
      {
        title: "Origin Bucket",
        tech: "Amazon S3",
        icon: Database,
        desc: "Encrypted private bucket accessed exclusively via CloudFront Origin Access Control (OAC).",
      },
    ],
  },
];

const PILLARS = [
  {
    icon: Terminal,
    title: "1. Practical Projects",
    desc: "We prioritize actual code over passive listening. You build real web apps, cloud backends, and AI pipelines that run on live AWS infrastructure.",
  },
  {
    icon: Workflow,
    title: "2. Hands-on Workshops",
    desc: "Interactive guided sessions held at Prashanti Institute computer labs with mentors walking you through step-by-step console and CLI configurations.",
  },
  {
    icon: Layers,
    title: "3. Collaborative Development",
    desc: "Work in agile student squads. Learn Git branching, pull requests, automated CI/CD builds, and professional software engineering methodologies.",
  },
  {
    icon: Sparkles,
    title: "4. Technical Experimentation",
    desc: "Safe sandbox learning. Learn how to configure AWS Free Tier alerts, experiment with Bedrock APIs, and prototype hackathon solutions without cost risk.",
  },
];

export function LearnByBuildingSection() {
  const [activePreset, setActivePreset] = useState<ArchitecturePreset>(PRESETS[0]);

  return (
    <section
      id="learn-by-building"
      className="relative py-24 sm:py-32 border-b border-white/10 bg-[#080A0F] overflow-hidden"
    >
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] volumetric-glow pointer-events-none -z-10" />
      <div className="absolute inset-0 tech-grid opacity-15 pointer-events-none -z-10" />

      <div className="responsive-container">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-mono font-semibold tracking-wider uppercase">
            <Hammer className="w-3.5 h-3.5" />
            <span>SECTION 03 • LEARN BY BUILDING</span>
          </div>

          <h2 className="text-2xl xs:text-3xl sm:text-5xl 3xl:text-6xl font-black text-white tracking-tight uppercase">
            Engineering By Practice, <br />
            <span className="bg-gradient-to-r from-amber-400 via-orange-400 to-sky-400 bg-clip-text text-transparent">
              Not Theory Alone
            </span>
          </h2>

          <p className="text-xs sm:text-base 3xl:text-lg text-slate-300 leading-relaxed font-light">
            Our philosophy is simple: the deepest learning happens when you launch, break, debug, and ship real cloud architectures with your peers.
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-16">
          {PILLARS.map((p, i) => {
            const Icon = p.icon;
            return (
              <div
                key={i}
                className="cinematic-glass cinematic-glass-hover rounded-3xl p-6 border border-white/10 flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded-2xl bg-amber-500/15 border border-amber-500/30 text-amber-400 flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-white mb-2">{p.title}</h3>
                  <p className="text-xs text-slate-300 leading-relaxed font-light">{p.desc}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Interactive Architecture Sandbox Workbench */}
        <div className="hud-corner rounded-3xl border border-white/10 bg-[#101A2C]/70 p-6 sm:p-10 backdrop-blur-2xl shadow-2xl">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 pb-6 border-b border-white/10">
            <div>
              <span className="text-[11px] font-mono tracking-widest text-sky-400 uppercase font-bold">
                INTERACTIVE ARCHITECTURE VIEWER
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-white mt-1">
                Explore What You Will Architect
              </h3>
            </div>

            {/* Presets Switcher */}
            <div className="flex flex-wrap items-center gap-2">
              {PRESETS.map((p) => {
                const isSelected = activePreset.id === p.id;
                return (
                  <button
                    key={p.id}
                    onClick={() => setActivePreset(p)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-mono font-medium transition-all ${
                      isSelected
                        ? "bg-amber-500 text-slate-950 font-bold shadow-md shadow-orange-500/30 scale-105"
                        : "bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white border border-white/10"
                    }`}
                  >
                    {p.name.split(" ")[0]}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active Preset Telemetry & Flow */}
          <div className="pt-6 space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-md bg-amber-500/20 text-amber-400 border border-amber-500/30 font-bold">
                  {activePreset.badge}
                </span>
                <span className="text-white font-bold">{activePreset.name}</span>
              </div>
              <div className="flex items-center gap-4 text-slate-400">
                <span>Latency: <strong className="text-sky-400">{activePreset.latency}</strong></span>
                <span>Billing: <strong className="text-emerald-400">{activePreset.costTier}</strong></span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-300 font-light">
              {activePreset.summary}
            </p>

            {/* Interactive Steps Flow */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
              {activePreset.steps.map((st, idx) => {
                const StepIcon = st.icon;
                return (
                  <div
                    key={idx}
                    className="relative rounded-2xl border border-white/10 bg-[#080A0F]/90 p-5 space-y-2 group hover:border-amber-400/50 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
                        <StepIcon className="w-4 h-4" />
                      </div>
                      <span className="text-[10px] font-mono font-bold text-slate-500">
                        STAGE 0{idx + 1}
                      </span>
                    </div>
                    <div className="text-xs font-mono font-bold text-sky-400">{st.tech}</div>
                    <h4 className="text-sm font-bold text-white">{st.title}</h4>
                    <p className="text-xs text-slate-400 leading-relaxed font-light">{st.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
