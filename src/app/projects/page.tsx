"use client";

import * as React from "react";
import {
  Layers,
  Search,
  ExternalLink,
  Code,
  PlusCircle,
  X,
} from "lucide-react";
import { Github } from "@/components/ui/Icons";
import { toast } from "sonner";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { INITIAL_PROJECTS } from "@/lib/data/initialData";
import { StudentProject, ProjectCategory } from "@/lib/types";

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
  const [projects, setProjects] = React.useState<StudentProject[]>(INITIAL_PROJECTS);
  const [selectedCategory, setSelectedCategory] = React.useState<string>("All");
  const [searchQuery, setSearchQuery] = React.useState<string>("");
  const [isSubmitModalOpen, setIsSubmitModalOpen] = React.useState(false);

  // New project submission form states
  const [newTitle, setNewTitle] = React.useState("");
  const [newDescription, setNewDescription] = React.useState("");
  const [newCategory, setNewCategory] = React.useState<ProjectCategory>("Cloud Computing");
  const [newTechStack, setNewTechStack] = React.useState("");
  const [newContributors, setNewContributors] = React.useState("");
  const [newGithub, setNewGithub] = React.useState("");
  const [newLiveDemo, setNewLiveDemo] = React.useState("");

  const filteredProjects = projects.filter((proj) => {
    const matchesCategory =
      selectedCategory === "All" || proj.category === selectedCategory;
    const matchesSearch =
      proj.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      proj.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      proj.techStack.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesCategory && matchesSearch;
  });

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
      featured: false,
    };

    setProjects([createdProject, ...projects]);
    setIsSubmitModalOpen(false);
    toast.success("Project submitted successfully to the campus showcase!");

    // Reset
    setNewTitle("");
    setNewDescription("");
    setNewTechStack("");
    setNewContributors("");
    setNewGithub("");
    setNewLiveDemo("");
  };

  return (
    <div className="py-12 sm:py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-4 max-w-2xl">
            <Badge variant="blue" size="md">
              Student Innovation Showcase
            </Badge>
            <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
              Cloud &amp; AI Projects
            </h1>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              Explore real-world applications, serverless architectures, and AI experiments crafted by student builders at Prashanti Institute of Technology &amp; Science.
            </p>
          </div>

          <Button
            size="md"
            onClick={() => setIsSubmitModalOpen(true)}
            className="gap-2 shrink-0 self-start md:self-end"
          >
            <PlusCircle className="w-4 h-4 text-slate-950" />
            <span>Submit Your Project</span>
          </Button>
        </div>

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
                className="w-full h-11 pl-10 pr-4 rounded-xl border border-slate-800 bg-slate-900/80 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-amber-500 transition-colors"
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
                className="text-xs text-amber-400 hover:text-amber-300 font-semibold"
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
                className={`whitespace-nowrap px-3.5 py-1.5 rounded-xl text-xs font-medium border transition-colors ${
                  selectedCategory === cat
                    ? "bg-amber-500/15 border-amber-500/50 text-amber-400 font-bold"
                    : "bg-slate-900/60 border-slate-800 text-slate-400 hover:text-white hover:border-slate-700"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        {filteredProjects.length === 0 ? (
          <div className="text-center py-16 rounded-3xl border border-slate-800 bg-slate-900/40 p-8 space-y-3">
            <Layers className="w-12 h-12 text-slate-600 mx-auto" />
            <h3 className="text-lg font-bold text-white">No projects found</h3>
            <p className="text-xs text-slate-400 max-w-sm mx-auto">
              No projects matched your criteria. Would you like to be the first to submit a project in this category?
            </p>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsSubmitModalOpen(true)}
            >
              Submit a Project
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                className="flex flex-col justify-between rounded-2xl border border-slate-800 bg-slate-900/60 p-6 backdrop-blur-sm transition-all duration-300 hover:border-slate-700 hover:shadow-2xl group"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Badge variant="blue" size="sm">
                      {project.category}
                    </Badge>
                    {project.featured && (
                      <span className="text-[10px] font-mono font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                        Featured
                      </span>
                    )}
                  </div>

                  <h3 className="text-lg font-bold text-white group-hover:text-amber-400 transition-colors">
                    {project.title}
                  </h3>

                  <p className="text-xs text-slate-400 leading-relaxed">
                    {project.description}
                  </p>

                  {project.architectureNotes && (
                    <div className="rounded-xl bg-slate-950/80 border border-slate-800 p-3 text-[11px] text-slate-300 space-y-1">
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
                  <span className="truncate max-w-[160px] text-[11px]">
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
                        title="Live Deployment"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
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
              <Button type="submit" className="w-full">
                Publish Project to Showcase
              </Button>
            </div>
          </form>
        </Modal>
      </div>
    </div>
  );
}
