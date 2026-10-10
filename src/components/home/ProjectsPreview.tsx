"use client";

import * as React from "react";
import { useRef } from "react";
import Link from "next/link";
import { ExternalLink, ArrowRight, Code } from "lucide-react";
import { Github } from "@/components/ui/Icons";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { INITIAL_PROJECTS } from "@/lib/data/initialData";
import { GsapMagnetic } from "@/components/gsap/GsapMagnetic";
import { gsap, useGSAP, ScrollTrigger } from "@/lib/gsap";

export function ProjectsPreview() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const featuredProjects = INITIAL_PROJECTS.filter((p) => p.featured).slice(0, 3);

  useGSAP(
    () => {
      const cards = gsap.utils.toArray<HTMLElement>(".gsap-project-card");

      gsap.from(cards, {
        y: 45,
        opacity: 0,
        rotationX: 10,
        transformPerspective: 900,
        duration: 0.75,
        stagger: 0.15,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });
    },
    { scope: sectionRef }
  );

  return (
    <section id="projects" ref={sectionRef} className="py-20 border-b border-slate-800/80 bg-slate-900/40 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-3 max-w-2xl">
            <Badge variant="blue" size="md">
              Student Innovations
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Built by Students, Powered by Cloud
            </h2>
            <p className="text-slate-400 text-sm leading-relaxed">
              Explore real-world applications engineered by student developers at PITS Ujjain using AWS cloud architecture and modern frameworks.
            </p>
          </div>
          <GsapMagnetic strength={0.25}>
            <Link href="/projects">
              <Button variant="secondary" size="md" className="gap-2 shrink-0">
                <span>Explore All Projects</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </GsapMagnetic>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredProjects.map((project) => (
            <div
              key={project.id}
              className="gsap-project-card flex flex-col justify-between rounded-2xl border border-slate-800 bg-slate-950/80 p-6 backdrop-blur-sm transition-all duration-300 hover:border-slate-700 hover:shadow-2xl hover:-translate-y-1 group will-change-transform"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Badge variant="slate" size="sm">
                    {project.category}
                  </Badge>
                  <span className="text-[11px] font-mono text-amber-400">
                    Featured Build
                  </span>
                </div>

                <h3 className="text-lg font-bold text-white group-hover:text-amber-400 transition-colors">
                  {project.title}
                </h3>

                <p className="text-xs text-slate-400 leading-relaxed">
                  {project.description}
                </p>

                {project.architectureNotes && (
                  <div className="rounded-xl bg-slate-900/90 border border-slate-800/80 p-3 text-[11px] text-slate-300 space-y-1">
                    <span className="font-semibold text-amber-400 flex items-center gap-1">
                      <Code className="w-3 h-3" /> Architecture:
                    </span>
                    <p className="text-slate-400 leading-normal">
                      {project.architectureNotes}
                    </p>
                  </div>
                )}

                <div className="flex flex-wrap gap-1.5 pt-1">
                  {project.techStack.map((tech, i) => (
                    <span
                      key={i}
                      className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-slate-800/80 text-slate-300 border border-slate-700/60"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-6 mt-4 border-t border-slate-800/60 flex items-center justify-between text-xs text-slate-400">
                <span className="truncate max-w-[160px]">
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
      </div>
    </section>
  );
}
