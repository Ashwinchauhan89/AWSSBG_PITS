"use client";

import * as React from "react";
import { useRef } from "react";
import {
  Cloud,
  BrainCircuit,
  Code2,
  Database,
  Terminal,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";
import { gsap, useGSAP } from "@/lib/gsap";
import { useSound } from "@/components/audio/SoundManager";

interface TechDomain {
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

const TECH_DOMAINS: TechDomain[] = [
  {
    id: "aws-cloud-computing",
    number: "01",
    icon: Cloud,
    title: "AWS Cloud Computing",
    badge: "Infrastructure & Compute",
    tagline: "Scalable global backbones and resilient foundations",
    description:
      "Master scalable compute, secure virtual private clouds (VPC), resilient S3 object storage, and least-privilege IAM access policies on AWS.",
    technologies: ["Amazon EC2", "Amazon S3", "Amazon VPC", "AWS IAM", "CloudFront"],
    gradient: "from-[#FF9900]/15 via-[#101A2C]/90 to-[#080A0F]",
    borderGlow: "group-hover:border-[#FF9900]/60 group-hover:shadow-[0_0_30px_rgba(255,153,0,0.25)]",
    accentColor: "text-[#FF9900] bg-[#FF9900]/10 border-[#FF9900]/30",
  },
  {
    id: "ai-machine-learning",
    number: "02",
    icon: BrainCircuit,
    title: "Artificial Intelligence & Machine Learning",
    badge: "Cognitive Intelligence",
    tagline: "Predictive modeling, computer vision, and MLOps",
    description:
      "Train, evaluate, and deploy predictive models, computer vision pipelines, and sensory intelligence using Amazon SageMaker and Python ML frameworks.",
    technologies: ["Amazon SageMaker", "PyTorch", "Scikit-Learn", "Computer Vision", "MLOps Pipelines"],
    gradient: "from-[#43B7FF]/15 via-[#101A2C]/90 to-[#080A0F]",
    borderGlow: "group-hover:border-[#43B7FF]/60 group-hover:shadow-[0_0_30px_rgba(67,183,255,0.25)]",
    accentColor: "text-[#43B7FF] bg-[#43B7FF]/10 border-[#43B7FF]/30",
  },
  {
    id: "web-development",
    number: "03",
    icon: Code2,
    title: "Web Development",
    badge: "Full-Stack Cloud",
    tagline: "Modern responsive frontends connected to cloud APIs",
    description:
      "Craft high-performance, responsive full-stack applications with Next.js, TypeScript, and modern CSS deployed on edge-accelerated cloud infrastructure.",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "AWS Amplify", "GraphQL & REST"],
    gradient: "from-emerald-500/15 via-[#101A2C]/90 to-[#080A0F]",
    borderGlow: "group-hover:border-emerald-400/60 group-hover:shadow-[0_0_30px_rgba(16,185,129,0.25)]",
    accentColor: "text-emerald-400 bg-emerald-500/10 border-emerald-500/30",
  },
  {
    id: "data-engineering-analytics",
    number: "04",
    icon: Database,
    title: "Data Engineering & Analytics",
    badge: "Data Pipelines & ETL",
    tagline: "Data lakes, analytical warehouses, and big data queries",
    description:
      "Architect resilient ETL pipelines, cloud data warehouses, and automated analytical querying using AWS Glue, Amazon Athena, and Amazon Redshift.",
    technologies: ["AWS Glue", "Amazon Redshift", "Amazon Athena", "Amazon S3 Data Lakes", "SQL & Python"],
    gradient: "from-amber-600/15 via-[#101A2C]/90 to-[#080A0F]",
    borderGlow: "group-hover:border-amber-500/60 group-hover:shadow-[0_0_30px_rgba(245,158,11,0.25)]",
    accentColor: "text-amber-400 bg-amber-500/10 border-amber-500/30",
  },
  {
    id: "devops-cloud-infrastructure",
    number: "05",
    icon: Terminal,
    title: "DevOps & Cloud Infrastructure",
    badge: "Automation & CI/CD",
    tagline: "Automated delivery pipelines, containers, and serverless compute",
    description:
      "Automate containerized applications with Docker and ECS, script continuous deployment with GitHub Actions, and build serverless event-driven microservices.",
    technologies: ["AWS Lambda", "Docker / ECS", "GitHub Actions", "Terraform & CDK", "API Gateway"],
    gradient: "from-teal-500/15 via-[#101A2C]/90 to-[#080A0F]",
    borderGlow: "group-hover:border-teal-400/60 group-hover:shadow-[0_0_30px_rgba(45,212,191,0.25)]",
    accentColor: "text-teal-400 bg-teal-500/10 border-teal-500/30",
  },
  {
    id: "generative-ai-intelligent-applications",
    number: "06",
    icon: Sparkles,
    title: "Generative AI & Intelligent Applications",
    badge: "Foundation Models & LLMs",
    tagline: "RAG architectures, vector embeddings, and autonomous AI agents",
    description:
      "Harness Amazon Bedrock foundation models like Claude 3.5 Sonnet, construct Retrieval-Augmented Generation (RAG) vector pipelines, and deploy autonomous AI agents.",
    technologies: ["Amazon Bedrock", "Claude 3.5", "Vector Embeddings", "RAG Architecture", "Autonomous Agents"],
    gradient: "from-purple-500/15 via-[#101A2C]/90 to-[#080A0F]",
    borderGlow: "group-hover:border-purple-400/60 group-hover:shadow-[0_0_30px_rgba(168,85,247,0.25)]",
    accentColor: "text-purple-400 bg-purple-500/10 border-purple-500/30",
  },
];

export function DomainsSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const { playHover } = useSound();

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
            <span>SECTION B • TECHNOLOGY DOMAINS</span>
          </div>

          <h2 className="text-2xl xs:text-3xl sm:text-5xl 3xl:text-6xl font-black text-white tracking-tight uppercase">
            Six Technology Pillars <br />
            <span className="bg-gradient-to-r from-sky-400 via-amber-400 to-orange-400 bg-clip-text text-transparent">
              For Tomorrow&apos;s Builders
            </span>
          </h2>

          <p className="text-xs sm:text-base 3xl:text-lg text-slate-300 leading-relaxed max-w-2xl mx-auto font-light">
            Each track provides structured learning milestones and hands-on laboratory exercises, taking students from core principles to production deployments.
          </p>
        </div>

        {/* 6 Technology Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 3xl:gap-8">
          {TECH_DOMAINS.map((domain) => {
            const Icon = domain.icon;

            return (
              <div
                key={domain.id}
                onMouseEnter={playHover}
                className={`group gsap-domain-card relative rounded-3xl border border-white/10 bg-gradient-to-b ${domain.gradient} p-5 sm:p-7 3xl:p-8 backdrop-blur-xl transition-all duration-300 ${domain.borderGlow} hover:-translate-y-1 hud-corner flex flex-col justify-between`}
              >
                <div>
                  {/* Header row: Icon, Number, Badge */}
                  <div className="flex items-center justify-between mb-5">
                    <div className={`p-3 rounded-2xl border ${domain.accentColor} shadow-md`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <div className="flex items-center gap-2 font-mono">
                      <span className="text-xs px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10 text-slate-300">
                        {domain.badge}
                      </span>
                      <span className="text-sm font-bold text-slate-500">
                        {domain.number}
                      </span>
                    </div>
                  </div>

                  {/* Title & Tagline */}
                  <h3 className="text-xl font-bold text-white mb-1.5 group-hover:text-amber-400 transition-colors">
                    {domain.title}
                  </h3>
                  <p className="text-xs font-mono text-slate-400 mb-3">
                    {domain.tagline}
                  </p>

                  {/* Short Description */}
                  <p className="text-xs text-slate-300 leading-relaxed mb-6 font-light">
                    {domain.description}
                  </p>
                </div>

                {/* Tech Badges */}
                <div className="flex flex-wrap gap-1.5 pt-4 border-t border-white/10">
                  {domain.technologies.map((tech, i) => (
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

        {/* Resources Link */}
        <div className="mt-14 text-center">
          <Link
            href="/resources"
            className="inline-flex items-center gap-2 text-xs font-mono font-semibold text-amber-400 hover:text-amber-300 transition-colors px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/30 hover:bg-amber-500/20"
          >
            <span>Explore all verified AWS Skill Builder paths &amp; free learning guides</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
