"use client";

import React, { useRef } from "react";
import Link from "next/link";
import {
  ArrowRight,
  ShieldCheck,
  Award,
  MapPin,
  CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Github, Linkedin } from "@/components/ui/Icons";
import { INITIAL_TEAM_MEMBERS, COMMUNITY_INFO } from "@/lib/data/initialData";
import { TeamAvatar } from "@/components/team/TeamAvatar";
import { GsapMagnetic } from "@/components/gsap/GsapMagnetic";
import { gsap, useGSAP } from "@/lib/gsap";
import { useSound } from "@/components/audio/SoundManager";

interface CoreDirector {
  name: string;
  role: string;
  category: "Leadership" | "Technical" | "Operations" | "Outreach" | "Creative";
  department: string;
  avatarUrl?: string;
  bio: string;
  tags: string[];
  keyFocus: string;
}

const CORE_TEAM_DIRECTORS: CoreDirector[] = [
  {
    name: "Anchit Malik",
    role: "Co-Lead & Director of Data Engineering",
    category: "Leadership",
    department: "Computer Science & Engineering",
    bio: "Co-leads community operations and directs data engineering architectures, specializing in scalable ETL pipelines, analytical data modeling, and cloud data warehouses on AWS.",
    tags: ["Data Engineering", "ETL Pipelines", "AWS Glue", "Redshift", "Python", "SQL"],
    keyFocus: "ETL pipelines, AWS Glue, and analytics data warehousing.",
  },
  {
    name: "Tanish Namdev",
    role: "Technical Lead & Director of Cloud Computing",
    category: "Technical",
    department: "Computer Science & Engineering",
    bio: "Directs foundational and advanced cloud computing tracks, architecting secure multi-tier virtual environments, networking topologies, and serverless backends.",
    tags: ["Cloud Computing", "Amazon EC2", "Amazon VPC", "IAM", "Amazon S3", "Security"],
    keyFocus: "Core compute, VPC networking, and IAM least-privilege security.",
  },
  {
    name: "Shafque Ansari",
    role: "Director of AI, Machine Learning & MLOps",
    category: "Technical",
    department: "Computer Science & Engineering (AI/ML)",
    bio: "Leads machine learning and generative AI initiatives, specializing in foundation model integration with Amazon Bedrock, SageMaker MLOps, and responsible AI practices.",
    tags: ["AI & ML", "Generative AI", "Amazon Bedrock", "SageMaker", "MLOps", "LLMs"],
    keyFocus: "Amazon Bedrock LLMs, SageMaker Studio, and MLOps deployment.",
  },
  {
    name: "Aaysha Malik",
    role: "Director of Innovation, Logistics & Event Execution",
    category: "Operations",
    department: "Computer Science & Engineering",
    bio: "Spearheads student innovation and end-to-end event execution, championing product ideation on AWS, design thinking, and world-class campus workshop logistics.",
    tags: ["Innovation", "Design Thinking", "Event Execution", "Operations", "AWS Well-Architected"],
    keyFocus: "Hands-on lab logistics, design thinking, and campus event execution.",
  },
  {
    name: "Aakansha Panchal",
    role: "Director of Software Engineering & DevOps",
    category: "Technical",
    department: "Computer Science & Engineering",
    bio: "Heads full-stack software development and automated DevOps pipelines, driving modern containerization, CI/CD with GitHub Actions, and cloud deployments.",
    tags: ["Software Engineering", "DevOps", "CI/CD", "Docker", "AWS Amplify", "GitHub Actions"],
    keyFocus: "Full-stack web applications, Docker containers, and CI/CD automation.",
  },
  {
    name: "Muskan Goyal",
    role: "Director of Marketing & Digital Development",
    category: "Outreach",
    department: "Computer Science & Engineering",
    bio: "Leads digital growth, brand outreach, and technical storytelling, expanding community reach across social platforms and amplifying student builder achievements.",
    tags: ["Marketing", "Digital Growth", "Technical Writing", "SEO", "Community Outreach"],
    keyFocus: "Community growth, technical writing, and digital campaign outreach.",
  },
  {
    name: "Krishub",
    role: "Director of Graphic Design & Creative Social Outreach",
    category: "Creative",
    department: "Computer Science & Engineering",
    bio: "Directs visual brand identity, UI/UX aesthetics, and creative social outreach, translating complex cloud architectures into high-impact graphics and social media designs.",
    tags: ["Graphic Design", "UI/UX", "Visual Identity", "Canva", "Architecture Infographics"],
    keyFocus: "Visual identity, UI/UX design, and technical cloud infographics.",
  },
];

export function TeamPreview() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const { playHover } = useSound();
  const leader = INITIAL_TEAM_MEMBERS.find((m) => m.isLead) || INITIAL_TEAM_MEMBERS[0];

  useGSAP(
    () => {
      gsap.from(".gsap-team-card", {
        y: 35,
        opacity: 0,
        stagger: 0.1,
        duration: 0.7,
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

  const getGlowColor = (category: string) => {
    switch (category) {
      case "Leadership":
        return "amber" as const;
      case "Technical":
        return "blue" as const;
      case "Operations":
        return "emerald" as const;
      case "Outreach":
        return "cyan" as const;
      case "Creative":
        return "purple" as const;
      default:
        return "slate" as const;
    }
  };

  return (
    <section
      id="team"
      ref={sectionRef}
      className="py-24 sm:py-32 border-b border-white/10 bg-[#080A0F] relative overflow-hidden"
    >
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] volumetric-glow pointer-events-none -z-10" />
      <div className="absolute inset-0 tech-grid opacity-15 pointer-events-none -z-10" />

      <div className="responsive-container">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="space-y-3 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-mono font-semibold tracking-wider uppercase">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>SECTION F • CORE TEAM &amp; LEADERSHIP</span>
            </div>
            <h2 className="text-2xl xs:text-3xl sm:text-5xl font-black text-white tracking-tight uppercase">
              Core Team &amp; <br />
              <span className="bg-gradient-to-r from-amber-400 via-orange-400 to-sky-400 bg-clip-text text-transparent">
                Chapter Leadership
              </span>
            </h2>
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed font-light">
              Meet our appointed student leadership steering Cloud Computing, Data Engineering, AI &amp; MLOps, DevOps, Innovation, Marketing, and Creative outreach at Prashanti Institute of Technology &amp; Science, Ujjain.
            </p>
          </div>

          <GsapMagnetic strength={0.25}>
            <Link href="/team" className="w-full sm:w-auto">
              <Button variant="secondary" size="md" className="gap-2 shrink-0 w-full sm:w-auto font-mono text-xs">
                <span>View Full Directory</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </GsapMagnetic>
        </div>

        {/* 1. Prominent Group Leader Profile Card */}
        {leader && (
          <div className="mb-16">
            <div
              onMouseEnter={playHover}
              className="hud-corner rounded-3xl border border-amber-500/40 bg-gradient-to-b from-[#131b2e]/95 via-[#090c14]/95 to-[#101726]/90 p-6 sm:p-10 backdrop-blur-2xl shadow-2xl relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 w-[500px] h-[300px] bg-gradient-to-bl from-amber-500/15 via-orange-500/10 to-transparent blur-3xl pointer-events-none -z-10" />

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                {/* Leader Portrait & Identity */}
                <div className="lg:col-span-5 flex flex-col items-center sm:items-start text-center sm:text-left space-y-4">
                  <div className="flex flex-col sm:flex-row items-center gap-6">
                    <TeamAvatar
                      src={leader.avatarUrl}
                      alt={leader.name}
                      name={leader.name}
                      size="hero"
                      variant="circular"
                      glowColor="amber"
                      showStatus={true}
                      statusLabel="Appointed Chapter Leader"
                      className="shadow-2xl shadow-orange-500/20"
                    />

                    <div className="space-y-1.5">
                      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs font-mono font-bold">
                        <Award className="w-3.5 h-3.5 text-amber-400" />
                        <span>Chapter Group Leader</span>
                      </div>

                      <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                        {leader.name}
                      </h3>

                      <p className="text-xs sm:text-sm text-amber-400 font-mono font-semibold">
                        Student Builder Group Leader
                      </p>

                      <div className="flex items-center justify-center sm:justify-start gap-1.5 text-xs text-slate-400 font-light">
                        <MapPin className="w-3.5 h-3.5 text-slate-500" />
                        <span>{COMMUNITY_INFO.college}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Leader Bio & Strategic Directives */}
                <div className="lg:col-span-7 space-y-4 pt-4 lg:pt-0 border-t lg:border-t-0 lg:border-l border-white/10 lg:pl-8">
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-light">
                    {leader.bio}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    <div className="rounded-2xl bg-[#080A0F]/80 border border-white/10 p-3.5 space-y-1">
                      <span className="text-[10px] font-mono font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                        <CheckCircle2 className="w-3 h-3 text-amber-400" />
                        Key Directive:
                      </span>
                      <p className="text-xs text-slate-300 font-light">
                        Coordinate cross-domain bootcamps, hands-on lab governance, and zero-cost Free Tier safety.
                      </p>
                    </div>

                    <div className="rounded-2xl bg-[#080A0F]/80 border border-white/10 p-3.5 space-y-1">
                      <span className="text-[10px] font-mono font-bold text-sky-400 uppercase tracking-wider flex items-center gap-1.5">
                        <CheckCircle2 className="w-3 h-3 text-sky-400" />
                        Builder Focus:
                      </span>
                      <p className="text-xs text-slate-300 font-light">
                        AWS Well-Architected Framework, certification pathways, and student project mentorship.
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-white/10">
                    <div className="flex flex-wrap gap-1.5">
                      {leader.tags?.slice(0, 4).map((tag, i) => (
                        <span
                          key={i}
                          className="text-[10px] font-mono px-2.5 py-0.5 rounded-md bg-[#080A0F] text-slate-300 border border-white/10"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center gap-3">
                      {leader.githubUrl && (
                        <a
                          href={leader.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-slate-400 hover:text-white transition-colors"
                          title="GitHub Profile"
                        >
                          <Github className="w-4 h-4" />
                        </a>
                      )}
                      {leader.linkedinUrl && (
                        <a
                          href={leader.linkedinUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-slate-400 hover:text-sky-400 transition-colors"
                          title="LinkedIn Profile"
                        >
                          <Linkedin className="w-4 h-4" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 2. Core Team Responsive Grid (7 Directors) */}
        <div>
          <div className="mb-8 flex items-center justify-between">
            <h3 className="text-xl sm:text-2xl font-black text-white uppercase tracking-tight flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-400" />
              Core Team Directors
            </h3>
            <span className="text-xs font-mono text-slate-400">
              7 Appointed Directorates
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {CORE_TEAM_DIRECTORS.map((director) => (
              <div
                key={director.name}
                onMouseEnter={playHover}
                className="gsap-team-card cinematic-glass cinematic-glass-hover rounded-3xl p-6 border border-white/10 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 group"
              >
                <div className="space-y-4">
                  {/* Avatar & Department Row */}
                  <div className="flex items-center gap-3.5">
                    <TeamAvatar
                      src={director.avatarUrl}
                      alt={director.name}
                      name={director.name}
                      size="md"
                      variant="circular"
                      glowColor={getGlowColor(director.category)}
                      showStatus={false}
                    />

                    <div className="space-y-0.5 min-w-0">
                      <h4 className="text-base font-bold text-white group-hover:text-amber-400 transition-colors truncate">
                        {director.name}
                      </h4>
                      <p className="text-[11px] font-mono text-slate-400 truncate">
                        {director.department}
                      </p>
                    </div>
                  </div>

                  {/* Role Title */}
                  <div className="rounded-xl bg-[#080A0F]/80 border border-white/5 p-2.5">
                    <span className="text-xs font-mono font-bold text-amber-400 leading-tight block">
                      {director.role}
                    </span>
                  </div>

                  {/* Bio */}
                  <p className="text-xs text-slate-300 leading-relaxed font-light line-clamp-3">
                    {director.bio}
                  </p>

                  {/* Key Focus Area */}
                  <div className="pt-2 text-[11px] text-slate-400 font-light border-t border-white/10">
                    <span className="font-semibold text-slate-300">Focus: </span>
                    <span>{director.keyFocus}</span>
                  </div>
                </div>

                {/* Tags */}
                <div className="pt-4 mt-4 border-t border-white/10 flex flex-wrap gap-1">
                  {director.tags.slice(0, 3).map((tag, i) => (
                    <span
                      key={i}
                      className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#080A0F] text-slate-400 border border-white/5"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
