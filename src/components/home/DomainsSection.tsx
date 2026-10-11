"use client";

import * as React from "react";
import { useRef } from "react";
import {
  Cloud,
  Cpu,
  BrainCircuit,
  Sparkles,
  Code2,
  Terminal,
  ArrowRight,
  ExternalLink,
} from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { gsap, useGSAP } from "@/lib/gsap";
import { useSound } from "@/components/audio/SoundManager";

interface TechTrack {
  id: string;
  number: string;
  icon: React.ElementType;
  title: string;
  badge: string;
  tagline: string;
  description: string;
  technologies: string[];
  gradient: string;
  borderGlow: string;
  accentColor: string;
}

const TECH_TRACKS: TechTrack[] = [
  {
    id: "cloud-computing",
    number: "01",
    icon: Cloud,
    title: "Cloud Computing",
    badge: "Infrastructure & Compute",
    tagline: "Scalable global backbones and serverless foundations",
    description:
      "Master the foundations of distributed cloud computing. Architect secure Virtual Private Clouds (VPC), configure autoscaling Amazon EC2 instances, manage resilient Amazon S3 object storage, and enforce granular least-privilege IAM policies.",
    technologies: ["Amazon EC2", "Amazon S3", "VPC Peering", "IAM", "CloudFront"],
    gradient: "from-[#FF9900]/15 via-[#101A2C]/90 to-[#080A0F]",
    borderGlow: "group-hover:border-[#FF9900]/60 group-hover:shadow-[0_0_30px_rgba(255,153,0,0.25)]",
    accentColor: "text-[#FF9900] bg-[#FF9900]/10 border-[#FF9900]/30",
  },
  {
    id: "artificial-intelligence",
    number: "02",
    icon: BrainCircuit,
    title: "Artificial Intelligence",
    badge: "Cognitive Services",
    tagline: "Deep neural networks, computer vision, and speech processing",
    description:
      "Explore computer vision, natural language understanding, and automated sensory AI. Integrate pre-trained vision models, sentiment analysis, audio transcription, and document intelligence pipelines directly into cloud backends.",
    technologies: ["Amazon Rekognition", "AWS Comprehend", "Polly & Transcribe", "Neural Networks"],
    gradient: "from-[#43B7FF]/15 via-[#101A2C]/90 to-[#080A0F]",
    borderGlow: "group-hover:border-[#43B7FF]/60 group-hover:shadow-[0_0_30px_rgba(67,183,255,0.25)]",
    accentColor: "text-[#43B7FF] bg-[#43B7FF]/10 border-[#43B7FF]/30",
  },
  {
    id: "machine-learning",
    number: "03",
    icon: Cpu,
    title: "Machine Learning",
    badge: "MLOps & SageMaker",
    tagline: "End-to-end model training, optimization, and deployment",
    description:
      "Build production-grade machine learning workflows. Utilize Amazon SageMaker Studio notebooks to preprocess dataset features, train custom PyTorch models, optimize hyperparameters, and host high-throughput real-time inference endpoints.",
    technologies: ["Amazon SageMaker", "PyTorch", "ML Pipelines", "Scikit-Learn", "Model Endpoints"],
    gradient: "from-teal-500/15 via-[#101A2C]/90 to-[#080A0F]",
    borderGlow: "group-hover:border-teal-400/60 group-hover:shadow-[0_0_30px_rgba(45,212,191,0.25)]",
    accentColor: "text-teal-400 bg-teal-500/10 border-teal-500/30",
  },
  {
    id: "generative-ai",
    number: "04",
    icon: Sparkles,
    title: "Generative AI",
    badge: "Bedrock & LLMs",
    tagline: "Foundation models, RAG pipelines, and intelligent AI agents",
    description:
      "Unlock state-of-the-art Generative AI on AWS. Experiment with Amazon Bedrock foundation models (Anthropic Claude 3.5, Amazon Titan), build Retrieval-Augmented Generation (RAG) engines with vector embeddings, and orchestrate autonomous agents.",
    technologies: ["Amazon Bedrock", "Claude 3.5 Sonnet", "Vector Embeddings", "RAG Architecture", "Prompting"],
    gradient: "from-purple-500/15 via-[#101A2C]/90 to-[#080A0F]",
    borderGlow: "group-hover:border-purple-400/60 group-hover:shadow-[0_0_30px_rgba(168,85,247,0.25)]",
    accentColor: "text-purple-400 bg-purple-500/10 border-purple-500/30",
  },
  {
    id: "web-development",
    number: "05",
    icon: Code2,
    title: "Web Development",
    badge: "Full-Stack Cloud",
    tagline: "Modern reactive frontends connected to cloud APIs",
    description:
      "Craft modern, high-performance web applications with Next.js App Router, TypeScript, and Tailwind CSS. Deploy edge-rendered frontends to AWS Amplify and CloudFront, integrated with serverless REST and GraphQL endpoints.",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "AWS Amplify", "GraphQL"],
    gradient: "from-emerald-500/15 via-[#101A2C]/90 to-[#080A0F]",
    borderGlow: "group-hover:border-emerald-400/60 group-hover:shadow-[0_0_30px_rgba(16,185,129,0.25)]",
    accentColor: "text-emerald-400 bg-emerald-500/10 border-emerald-500/30",
  },
  {
    id: "devops-infra",
    number: "06",
    icon: Terminal,
    title: "DevOps & Cloud Infrastructure",
    badge: "Automation & CI/CD",
    tagline: "Automated delivery pipelines, containers, and serverless compute",
    description:
      "Embrace modern infrastructure as code. Automate deployments using Docker containers on Amazon ECS/Fargate, manage event-driven compute with AWS Lambda and API Gateway, and script CI/CD release cycles with GitHub Actions.",
    technologies: ["AWS Lambda", "Docker / ECS", "GitHub Actions", "Terraform & CDK", "API Gateway"],
    gradient: "from-amber-600/15 via-[#101A2C]/90 to-[#080A0F]",
    borderGlow: "group-hover:border-amber-500/60 group-hover:shadow-[0_0_30px_rgba(245,158,11,0.25)]",
    accentColor: "text-amber-400 bg-amber-500/10 border-amber-500/30",
  },
];

export function DomainsSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const { playHover, playClick } = useSound();

  useGSAP(
    () => {
      const cards = gsap.utils.toArray<HTMLElement>(".gsap-domain-card");

      gsap.from(cards, {
        y: 45,
        opacity: 0,
        stagger: 0.1,
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
      id="technology"
      ref={sectionRef}
      className="relative py-24 sm:py-32 border-b border-white/10 bg-[#080A0F] overflow-hidden"
    >
      {/* Background Ambience */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[900px] h-[400px] volumetric-glow pointer-events-none -z-10" />
      <div className="absolute inset-0 tech-grid opacity-15 pointer-events-none -z-10" />

      <div className="responsive-container">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-sky-500/10 border border-sky-500/30 text-sky-400 text-xs font-mono font-semibold tracking-wider uppercase">
            <span>SECTION 02 • EXPLORE TECHNOLOGY</span>
          </div>

          <h2 className="text-2xl xs:text-3xl sm:text-5xl 3xl:text-6xl font-black text-white tracking-tight uppercase">
            Six Pillars of <br />
            <span className="bg-gradient-to-r from-sky-400 via-amber-400 to-orange-400 bg-clip-text text-transparent">
              Futuristic Engineering
            </span>
          </h2>

          <p className="text-xs sm:text-base 3xl:text-lg text-slate-300 leading-relaxed max-w-2xl mx-auto font-light">
            Each track provides structured hands-on milestones, from fundamental concepts to production-grade deployments on the AWS Cloud.
          </p>
        </div>

        {/* Large Immersive Panels Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 3xl:gap-8">
          {TECH_TRACKS.map((track) => {
            const Icon = track.icon;

            return (
              <div
                key={track.id}
                onMouseEnter={playHover}
                className={`group gsap-domain-card relative rounded-3xl border border-white/10 bg-gradient-to-b ${track.gradient} p-5 sm:p-7 3xl:p-8 backdrop-blur-xl transition-all duration-300 ${track.borderGlow} hover:-translate-y-1 hud-corner`}
              >
                {/* Header row: Icon, Number, Badge */}
                <div className="flex items-center justify-between mb-5">
                  <div className={`p-3 rounded-2xl border ${track.accentColor} shadow-md`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className="flex items-center gap-2 font-mono">
                    <span className="text-xs px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10 text-slate-300">
                      {track.badge}
                    </span>
                    <span className="text-sm font-bold text-slate-500">
                      {track.number}
                    </span>
                  </div>
                </div>

                {/* Title & Tagline */}
                <h3 className="text-xl font-bold text-white mb-1.5 group-hover:text-amber-400 transition-colors">
                  {track.title}
                </h3>
                <p className="text-xs font-mono text-slate-400 mb-3">
                  {track.tagline}
                </p>

                {/* Description */}
                <p className="text-xs text-slate-300 leading-relaxed mb-6 font-light">
                  {track.description}
                </p>

                {/* Tech Badges */}
                <div className="flex flex-wrap gap-1.5 pt-4 border-t border-white/10">
                  {track.technologies.map((tech, i) => (
                    <span
                      key={i}
                      className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-[#080A0F]/80 text-slate-300 border border-white/10 group-hover:border-white/20 transition-colors"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Learning Pathway Link */}
        <div className="mt-14 text-center">
          <Link
            href="/resources"
            className="inline-flex items-center gap-2 text-xs font-mono font-semibold text-amber-400 hover:text-amber-300 transition-colors px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/30 hover:bg-amber-500/20"
          >
            <span>Explore all verified AWS Skill Builder paths &amp; whitepapers</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
