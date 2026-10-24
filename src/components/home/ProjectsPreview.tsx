"use client";

import * as React from "react";
import { useRef } from "react";
import Link from "next/link";
import {
  ExternalLink,
  ArrowRight,
  Sparkles,
  Lightbulb,
  Rocket,
  AlertCircle,
} from "lucide-react";
import { Github } from "@/components/ui/Icons";
import { Button } from "@/components/ui/Button";
import { INITIAL_PROJECTS } from "@/lib/data/initialData";
import { GsapMagnetic } from "@/components/gsap/GsapMagnetic";
import { gsap, useGSAP } from "@/lib/gsap";
import { useSound } from "@/components/audio/SoundManager";

export function ProjectsPreview() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const { playHover } = useSound();

  useGSAP(
    () => {
      gsap.from(".gsap-project-card", {
        y: 45,
        opacity: 0,
        rotationX: 8,
        transformPerspective: 900,
        duration: 0.75,
        stagger: 0.15,
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
      id="projects"
      ref={sectionRef}
      className="py-24 sm:py-32 border-b border-white/10 bg-[#080A0F] relative overflow-hidden"
    >
      <div className="absolute top-1/3 left-1/4 w-[700px] h-[350px] volumetric-glow pointer-events-none -z-10" />
      <div className="absolute inset-0 tech-grid opacity-15 pointer-events-none -z-10" />

      <div className="responsive-container">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-sky-500/10 border border-sky-500/30 text-sky-400 text-xs font-mono font-semibold tracking-wider uppercase">
              <Sparkles className="w-3.5 h-3.5" />
              <span>SECTION E • PROJECTS &amp; INNOVATION</span>
            </div>
            <h2 className="text-2xl xs:text-3xl sm:text-5xl font-black text-white tracking-tight uppercase">
              Student Innovation &amp; <br />
              <span className="bg-gradient-to-r from-sky-400 via-amber-400 to-orange-400 bg-clip-text text-transparent">
                Cloud Prototypes
              </span>
            </h2>
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed font-light">
              Explore student-built prototypes, cloud-native applications, and clearly labelled sample concepts designed by engineering students at PITS Ujjain.
            </p>
          </div>

          <GsapMagnetic strength={0.25}>
            <Link href="/projects" className="w-full sm:w-auto">
              <Button variant="secondary" size="md" className="gap-2 shrink-0 w-full sm:w-auto font-mono text-xs">
                <span>View All Projects</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </GsapMagnetic>
        </div>

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {INITIAL_PROJECTS.slice(0, 3).map((project) => (
            <div
              key={project.id}
              onMouseEnter={playHover}
              className="gsap-project-card cinematic-glass cinematic-glass-hover rounded-3xl p-6 sm:p-7 border border-white/10 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 group hud-corner"
            >
              <div className="space-y-4">
                {/* Category & Status Badge */}
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-md bg-white/5 border border-white/10 text-slate-300">
                    {project.category}
                  </span>

                  {project.isSampleConcept ? (
                    <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-purple-500/15 border border-purple-500/30 text-purple-300 font-bold">
                      {project.status || "Sample Project Concept"}
                    </span>
                  ) : (
                    <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 font-bold">
                      {project.status || "Prototype"}
                    </span>
                  )}
                </div>

                {/* Project Title */}
                <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-amber-400 transition-colors">
                  {project.title}
                </h3>

                {/* Problem Statement */}
                {project.problemStatement && (
                  <div className="rounded-2xl bg-[#080A0F]/80 border border-white/10 p-3.5 space-y-1">
                    <span className="text-[10px] font-mono font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                      <AlertCircle className="w-3 h-3 text-amber-400 shrink-0" />
                      Problem Statement:
                    </span>
                    <p className="text-xs text-slate-300 font-light leading-relaxed">
                      {project.problemStatement}
                    </p>
                  </div>
                )}

                {/* Description */}
                <p className="text-xs text-slate-400 leading-relaxed font-light">
                  {project.description}
                </p>

                {/* Tech Stack Tags */}
                <div className="flex flex-wrap gap-1.5 pt-2">
                  {project.techStack.map((tech, i) => (
                    <span
                      key={i}
                      className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-[#080A0F] text-slate-300 border border-white/10"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Footer Row: Contributors & Links */}
              <div className="pt-6 mt-4 border-t border-white/10 flex items-center justify-between text-xs text-slate-400">
                <span className="truncate max-w-[170px] text-[11px] font-mono">
                  By: {project.contributors.join(", ")}
                </span>
                <div className="flex items-center gap-3">
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-slate-400 hover:text-white transition-colors"
                      title="GitHub Repository"
                    >
                      <Github className="w-4 h-4" />
                    </a>
                  )}
                  {project.liveDemoUrl && (
                    <a
                      href={project.liveDemoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-amber-400 hover:text-amber-300 transition-colors"
                      title="Live Demo"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Project Call to Action: Have an idea? Build it with the community. */}
        <div className="hud-corner rounded-3xl border border-amber-500/30 bg-gradient-to-r from-[#101A2C]/90 via-[#080A0F]/95 to-[#101A2C]/90 p-8 sm:p-10 backdrop-blur-2xl shadow-xl">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
            <div className="space-y-2 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-0.5 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-400 text-xs font-mono font-bold">
                <Lightbulb className="w-3.5 h-3.5 text-amber-400" />
                <span>STUDENT INNOVATION LAB</span>
              </div>
              <h3 className="text-xl sm:text-3xl font-black text-white">
                Have an idea? Build it with the community.
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-light">
                Whether you want to build an AI study assistant, an automated campus utility, or a cloud-hosted web portal, submit your idea and team up with fellow student builders.
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3 shrink-0">
              <GsapMagnetic strength={0.2}>
                <Link href="/join">
                  <Button
                    size="md"
                    className="gap-2 px-6 py-3 rounded-full font-mono text-xs font-bold uppercase tracking-wider bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 hover:from-amber-400 hover:to-orange-400 shadow-lg shadow-orange-500/20"
                  >
                    <Rocket className="w-4 h-4 text-slate-950" />
                    <span>Pitch Your Project</span>
                  </Button>
                </Link>
              </GsapMagnetic>

              <GsapMagnetic strength={0.2}>
                <Link href="/contact">
                  <Button
                    variant="outline"
                    size="md"
                    className="gap-2 px-5 py-3 rounded-full font-mono text-xs text-slate-300 hover:text-white border-white/20"
                  >
                    <span>Contact Tech Leads</span>
                  </Button>
                </Link>
              </GsapMagnetic>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
