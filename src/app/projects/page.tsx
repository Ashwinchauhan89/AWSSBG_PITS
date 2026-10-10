"use client";

import * as React from "react";
import {
  Layers,
  Search,
  ExternalLink,
  Code,
  PlusCircle,
  X,
  Sparkles,
  ShieldCheck,
  Eye,
  Terminal,
  Cpu,
  Database,
  Cloud,
} from "lucide-react";
import { Github } from "@/components/ui/Icons";
import { toast } from "sonner";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { INITIAL_PROJECTS } from "@/lib/data/initialData";
import { StudentProject, ProjectCategory } from "@/lib/types";
import { useSound } from "@/components/audio/SoundManager";

const CATEGORIES: ("All" | ProjectCategory)[] = [
  "All",
  "Cloud Computing",
  "Generative AI",
  "AI & Machine Learning",
  "Web Development",
  "Open Source",
  "Cybersecurity",
];

export default function ProjectsPage() {
  const { playHover, playClick, playWarp, playSuccess } = useSound();
  const [projects, setProjects] = React.useState<StudentProject[]>(INITIAL_PROJECTS);

  const [selectedCategory, setSelectedCategory] = React.useState<string>("All");
  const [searchQuery, setSearchQuery] = React.useState<string>("");
  const [isSubmitModalOpen, setIsSubmitModalOpen] = React.useState(false);
  const [inspectedProject, setInspectedProject] = React.useState<StudentProject | null>(null);

  // New project submission form states
  const [newTitle, setNewTitle] = React.useState("");
  const [newDescription, setNewDescription] = React.useState("");
  const [newCategory, setNewCategory] = React.useState<ProjectCategory>("Cloud Computing");
  const [newTechStack, setNewTechStack] = React.useState("");
  const [newContributors, setNewContributors] = React.useState("");
  const [newGithub, setNewGithub] = React.useState("");
  const [newLiveDemo, setNewLiveDemo] = React.useState("");
  const [newArchNotes, setNewArchNotes] = React.useState("");

  const filteredProjects = projects.filter((proj) => {
    const matchesCategory =
      selectedCategory === "All" || proj.category === selectedCategory;
    const matchesSearch =
      proj.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      proj.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      proj.techStack.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesCategory && matchesSearch;
  });

  const featuredProject = projects.find((p) => p.featured) || projects[0];

  const handleSuggestProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle || !newDescription) {
      toast.error("Please enter a title and description.");
      return;
    }

    const techArray = newTechStack
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);
    const contribArray = newContributors
      .split(",")
      .map((c) => c.trim())
      .filter(Boolean);

    const createdProject: StudentProject = {
      id: `proj-${Date.now()}`,
      title: newTitle,
      description: newDescription,
      category: newCategory,
      techStack: techArray.length > 0 ? techArray : ["AWS", "Cloud"],
      contributors: contribArray.length > 0 ? contribArray : ["Student Builder"],
      githubUrl: newGithub || undefined,
      liveDemoUrl: newLiveDemo || undefined,
      architectureNotes: newArchNotes || undefined,
      featured: false,
    };

    setProjects([createdProject, ...projects]);
    setIsSubmitModalOpen(false);
    toast.success("Project submitted successfully to the campus showcase!");

    // Reset form
    setNewTitle("");
    setNewDescription("");
    setNewTechStack("");
    setNewContributors("");
    setNewGithub("");
    setNewLiveDemo("");
    setNewArchNotes("");
  };

  return (
    <div className="py-12 sm:py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/10 pb-8">
          <div className="space-y-4 max-w-2xl">
            <Badge variant="blue" size="md">
              Student Innovation Portfolio
            </Badge>
            <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight uppercase">
              Cloud &amp; AI Builds
            </h1>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-light">
              Explore real-world applications, serverless backends, RAG pipelines, and full-stack software built by student builders at Prashanti Institute of Technology &amp; Science.
            </p>
          </div>

          <Button
            size="md"
            onClick={() => setIsSubmitModalOpen(true)}
            className="gap-2 shrink-0 self-start md:self-end px-5 py-2.5 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-bold text-xs uppercase tracking-wider shadow-lg shadow-orange-500/20"
          >
            <PlusCircle className="w-4 h-4 text-slate-950" />
            <span>Submit Your Project</span>
          </Button>
        </div>

        {/* Featured Project Editorial Banner (when no search active) */}
        {selectedCategory === "All" && !searchQuery && featuredProject && (
          <div className="hud-corner rounded-3xl border border-amber-500/40 bg-gradient-to-b from-[#101A2C]/90 via-[#080A0F]/95 to-[#101A2C]/80 p-8 sm:p-10 backdrop-blur-2xl shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-[450px] h-[300px] volumetric-glow pointer-events-none -z-10" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7 space-y-4">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono font-bold text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded-full border border-amber-500/30 flex items-center gap-1.5 uppercase">
                    <Sparkles className="w-3 h-3" />
                    Spotlight Build
                  </span>
                  <Badge variant="blue" size="sm">
                    {featuredProject.category}
                  </Badge>
                </div>

                <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight leading-tight group-hover:text-amber-400 transition-colors">
                  {featuredProject.title}
                </h2>

                <p className="text-sm text-slate-300 leading-relaxed font-light">
                  {featuredProject.description}
                </p>

                {featuredProject.architectureNotes && (
                  <div className="rounded-2xl bg-black/60 border border-white/10 p-4 text-xs font-mono text-slate-300 space-y-1.5">
                    <div className="text-[11px] text-amber-400 font-bold flex items-center gap-1.5">
                      <Terminal className="w-3.5 h-3.5" />
                      <span>Cloud Architecture Design:</span>
                    </div>
                    <p className="text-slate-400 leading-relaxed font-sans text-xs">
                      {featuredProject.architectureNotes}
                    </p>
                  </div>
                )}

                <div className="flex flex-wrap gap-2 pt-2">
                  {featuredProject.techStack.map((tech, i) => (
                    <span
                      key={i}
                      className="text-xs font-mono px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-slate-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="pt-4 flex flex-wrap items-center gap-4">
                  <Button
                    size="sm"
                    onClick={() => setInspectedProject(featuredProject)}
                    className="gap-2 px-5 rounded-full font-bold text-xs bg-amber-500 hover:bg-amber-400 text-slate-950"
                  >
                    <Eye className="w-4 h-4 text-slate-950" />
                    <span>Inspect Details</span>
                  </Button>

                  {featuredProject.liveDemoUrl && (
                    <a
                      href={featuredProject.liveDemoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-sky-400 hover:text-sky-300 px-4 py-2 rounded-full bg-sky-400/10 border border-sky-400/30"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>Live Deployment</span>
                    </a>
                  )}

                  {featuredProject.githubUrl && (
                    <a
                      href={featuredProject.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-mono text-slate-400 hover:text-white px-3 py-2"
                    >
                      <Github className="w-4 h-4" />
                      <span>Repository</span>
                    </a>
                  )}
                </div>
              </div>

              {/* Graphic Editorial Architecture Block */}
              <div className="lg:col-span-5">
                <div className="rounded-2xl border border-white/10 bg-[#080A0F]/90 p-6 space-y-4 shadow-xl">
                  <div className="flex items-center justify-between text-xs font-mono text-slate-400 pb-2 border-b border-white/10">
                    <span className="flex items-center gap-1 text-emerald-400">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      AWS Cloud Pipeline
                    </span>
                    <span>PITS Cohort</span>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-center">
                    <div className="p-3 rounded-xl bg-white/5 border border-white/5 space-y-1">
                      <Cloud className="w-5 h-5 text-amber-400 mx-auto" />
                      <div className="text-[11px] font-bold text-white">S3 + CloudFront</div>
                      <div className="text-[9px] text-slate-400 font-mono">Edge Cached</div>
                    </div>
                    <div className="p-3 rounded-xl bg-white/5 border border-white/5 space-y-1">
                      <Database className="w-5 h-5 text-sky-400 mx-auto" />
                      <div className="text-[11px] font-bold text-white">DynamoDB</div>
                      <div className="text-[9px] text-slate-400 font-mono">Single-digit ms</div>
                    </div>
                  </div>

                  <div className="text-[11px] text-slate-400 text-center font-mono">
                    Contributors: <strong className="text-white">{featuredProject.contributors.join(", ")}</strong>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Filter and Search Bar */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            <div className="relative w-full sm:max-w-md">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search projects, stack (e.g. Bedrock, S3, Next.js)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-11 pl-10 pr-4 rounded-xl border border-white/10 bg-[#101A2C]/70 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-amber-500 transition-colors backdrop-blur-md"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {(selectedCategory !== "All" || searchQuery) && (
              <button
                onClick={() => {
                  setSelectedCategory("All");
                  setSearchQuery("");
                }}
                className="text-xs text-amber-400 hover:text-amber-300 font-mono font-semibold"
              >
                Reset filters
              </button>
            )}
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`whitespace-nowrap px-3.5 py-1.5 rounded-full text-xs font-mono transition-all ${
                  selectedCategory === cat
                    ? "bg-amber-500 text-slate-950 font-bold shadow-md shadow-orange-500/20"
                    : "bg-[#101A2C]/60 border border-white/10 text-slate-400 hover:text-white hover:border-white/20"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        {filteredProjects.length === 0 ? (
          <div className="text-center py-16 rounded-3xl border border-white/10 bg-[#101A2C]/40 p-8 space-y-3">
            <Layers className="w-12 h-12 text-slate-600 mx-auto" />
            <h3 className="text-lg font-bold text-white">No projects found</h3>
            <p className="text-xs text-slate-400 max-w-sm mx-auto">
              No student builds matched your filter. Submit your project to be featured in this category!
            </p>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsSubmitModalOpen(true)}
              className="rounded-full"
            >
              Submit a Project
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                className="cinematic-glass cinematic-glass-hover rounded-3xl p-7 border border-white/10 flex flex-col justify-between group relative overflow-hidden transition-all duration-300 hover:-translate-y-1.5"
              >
                <div className="space-y-4">
                  {/* Category Header */}
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10 text-sky-300">
                      {project.category}
                    </span>
                    {project.featured && (
                      <span className="text-[10px] font-mono font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                        Featured
                      </span>
                    )}
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-white group-hover:text-amber-400 transition-colors leading-snug">
                    {project.title}
                  </h3>

                  {/* Description */}
                  <p className="text-xs text-slate-300 leading-relaxed font-light line-clamp-3">
                    {project.description}
                  </p>

                  {/* Architecture notes preview */}
                  {project.architectureNotes && (
                    <div className="rounded-xl bg-[#080A0F]/90 border border-white/10 p-3 text-[11px] text-slate-300 space-y-1">
                      <span className="font-semibold text-amber-400 flex items-center gap-1">
                        <Code className="w-3 h-3" /> Architecture:
                      </span>
                      <p className="text-slate-400 leading-normal line-clamp-2">
                        {project.architectureNotes}
                      </p>
                    </div>
                  )}

                  {/* Tech stack badges */}
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {project.techStack.map((tech, i) => (
                      <span
                        key={i}
                        className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-[#080A0F]/80 text-slate-300 border border-white/10"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Footer row with Action Buttons */}
                <div className="pt-6 mt-4 border-t border-white/10 space-y-3">
                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <span className="truncate max-w-[170px] text-[11px]">
                      By: {project.contributors.join(", ")}
                    </span>
                    <button
                      onClick={() => setInspectedProject(project)}
                      className="text-xs font-mono font-bold text-amber-400 hover:text-amber-300 flex items-center gap-1"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Details</span>
                    </button>
                  </div>

                  <div className="flex items-center justify-between pt-1 text-xs">
                    <span className="text-[10px] font-mono text-slate-500">PITS Campus Build</span>
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
                          className="text-amber-400 hover:text-amber-300 transition-colors flex items-center gap-1"
                          title="Live Deployment"
                        >
                          <span className="text-[11px] font-mono font-bold">Demo</span>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Project Inspection Details Modal */}
        {inspectedProject && (
          <Modal
            isOpen={Boolean(inspectedProject)}
            onClose={() => setInspectedProject(null)}
            title={inspectedProject.title}
            description={`${inspectedProject.category} • Student Architecture`}
            maxWidth="xl"
          >
            <div className="space-y-6 text-xs text-slate-300">
              <div className="space-y-3">
                <p className="text-sm text-slate-200 leading-relaxed font-light">
                  {inspectedProject.description}
                </p>

                {inspectedProject.architectureNotes && (
                  <div className="rounded-2xl bg-black/60 border border-white/10 p-4 space-y-2">
                    <div className="text-xs font-bold text-amber-400 flex items-center gap-1.5 uppercase font-mono">
                      <Terminal className="w-4 h-4" />
                      <span>Cloud Architecture Specification</span>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed font-mono">
                      {inspectedProject.architectureNotes}
                    </p>
                  </div>
                )}

                <div className="space-y-2">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 font-bold">
                    Technologies &amp; AWS Services
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {inspectedProject.techStack.map((tech, i) => (
                      <span
                        key={i}
                        className="text-xs font-mono px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-slate-200"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 text-slate-300">
                  <span className="text-slate-400 font-mono text-[10px] uppercase block">
                    Student Developers:
                  </span>
                  <span className="font-semibold text-white">
                    {inspectedProject.contributors.join(", ")}
                  </span>
                </div>
              </div>

              <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  {inspectedProject.githubUrl && (
                    <a
                      href={inspectedProject.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-white hover:bg-white/10 text-xs font-mono"
                    >
                      <Github className="w-4 h-4" />
                      <span>View Code</span>
                    </a>
                  )}

                  {inspectedProject.liveDemoUrl && (
                    <a
                      href={inspectedProject.liveDemoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-400 hover:bg-amber-500/20 text-xs font-mono font-bold"
                    >
                      <ExternalLink className="w-4 h-4" />
                      <span>Open Live Application</span>
                    </a>
                  )}
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setInspectedProject(null)}
                >
                  Close Inspection
                </Button>
              </div>
            </div>
          </Modal>
        )}

        {/* Submit Project Modal */}
        <Modal
          isOpen={isSubmitModalOpen}
          onClose={() => setIsSubmitModalOpen(false)}
          title="Submit a Student Project"
          description="Feature your cloud, AI, or web project in the PITS developer showcase."
          maxWidth="xl"
        >
          <form onSubmit={handleSuggestProject} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Project Title *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Serverless Notes API on AWS Lambda"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                className="w-full h-10 px-3 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white focus:outline-none focus:border-amber-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Category *
              </label>
              <select
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value as ProjectCategory)}
                className="w-full h-10 px-3 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white focus:outline-none focus:border-amber-500"
              >
                {CATEGORIES.filter((c) => c !== "All").map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Description *
              </label>
              <textarea
                required
                rows={3}
                placeholder="Brief summary of what the project does and how AWS or open source tech is used..."
                value={newDescription}
                onChange={(e) => setNewDescription(e.target.value)}
                className="w-full p-3 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white focus:outline-none focus:border-amber-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Architecture Notes (Optional)
              </label>
              <textarea
                rows={2}
                placeholder="Key AWS primitives used (e.g. Lambda, S3, Bedrock, DynamoDB, VPC)..."
                value={newArchNotes}
                onChange={(e) => setNewArchNotes(e.target.value)}
                className="w-full p-3 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white focus:outline-none focus:border-amber-500"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Tech Stack (Comma-separated)
                </label>
                <input
                  type="text"
                  placeholder="AWS Lambda, Node.js, DynamoDB"
                  value={newTechStack}
                  onChange={(e) => setNewTechStack(e.target.value)}
                  className="w-full h-10 px-3 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Contributors (Names)
                </label>
                <input
                  type="text"
                  placeholder="Your Name, Teammate"
                  value={newContributors}
                  onChange={(e) => setNewContributors(e.target.value)}
                  className="w-full h-10 px-3 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  GitHub Repository URL (Optional)
                </label>
                <input
                  type="url"
                  placeholder="https://github.com/username/project"
                  value={newGithub}
                  onChange={(e) => setNewGithub(e.target.value)}
                  className="w-full h-10 px-3 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Live Demo URL (Optional)
                </label>
                <input
                  type="url"
                  placeholder="https://your-demo.vercel.app"
                  value={newLiveDemo}
                  onChange={(e) => setNewLiveDemo(e.target.value)}
                  className="w-full h-10 px-3 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>

            <div className="pt-2">
              <Button type="submit" className="w-full rounded-full">
                Publish Project to Showcase
              </Button>
            </div>
          </form>
        </Modal>

        {/* Educational Community Notice */}
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6 text-center text-xs text-slate-400 space-y-1">
          <div className="flex items-center justify-center gap-1.5 text-amber-400 font-semibold">
            <ShieldCheck className="w-4 h-4" />
            <span>Academic &amp; Student-Led Project Portfolio</span>
          </div>
          <p>
            All projects featured are student-engineered academic and extracurricular prototypes developed at Prashanti Institute of Technology &amp; Science, Ujjain. They do not constitute official AWS products or endorsements.
          </p>
        </div>
      </div>
    </div>
  );
}
