"use client";

import * as React from "react";
import {
  ExternalLink,
  Search,
  Info,
} from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { INITIAL_RESOURCES } from "@/lib/data/initialData";
import { LearningResource, ResourceCategory } from "@/lib/types";

const CATEGORIES: ("All" | ResourceCategory)[] = [
  "All",
  "AWS & Cloud Fundamentals",
  "Cloud Architecture",
  "Generative AI",
  "AI and Machine Learning",
  "DevOps and Deployment",
  "Open Source and GitHub",
  "Hackathon Preparation",
];

export default function ResourcesPage() {
  const [resources] = React.useState<LearningResource[]>(INITIAL_RESOURCES);
  const [selectedCategory, setSelectedCategory] = React.useState<string>("All");
  const [searchQuery, setSearchQuery] = React.useState<string>("");

  const filteredResources = resources.filter((res) => {
    const matchesCat =
      selectedCategory === "All" || res.category === selectedCategory;
    const matchesSearch =
      res.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      res.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      res.type.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="py-12 sm:py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <Badge variant="orange" size="md">
            Verified Cloud &amp; AI Pathways
          </Badge>
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Learning Resources &amp; Documentation
          </h1>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            Curated, official learning materials, architecture whitepapers, hands-on workshops, and GitHub repositories to accelerate your cloud journey.
          </p>
        </div>

        {/* Important Certification Clarification Notice */}
        <div className="rounded-2xl border border-amber-500/30 bg-amber-500/5 p-6 space-y-2">
          <div className="flex items-center gap-2 text-amber-400 font-bold text-xs uppercase tracking-wider">
            <Info className="w-4 h-4 shrink-0" />
            <span>AWS Certification &amp; Voucher Clarification</span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            AWS offers extensive free digital learning through <strong>AWS Skill Builder</strong> (600+ self-paced modules, foundational courses, and labs). However, formal certification exams (e.g. AWS Certified Cloud Practitioner, Solutions Architect Associate) have standard commercial examination fees.
          </p>
          <p className="text-xs text-slate-400 leading-relaxed">
            Exam discounts, student challenge vouchers, or promotional credits depend strictly on official AWS student programs, promotional campaign periods, and eligibility criteria. Our campus group does not sell or guarantee free vouchers.
          </p>
        </div>

        {/* Filters and Search Bar */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            <div className="relative w-full sm:max-w-md">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search resources, topics (e.g. Bedrock, Skill Builder)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-11 pl-10 pr-4 rounded-xl border border-slate-800 bg-slate-900/80 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-amber-500 transition-colors"
              />
            </div>

            {selectedCategory !== "All" && (
              <button
                onClick={() => setSelectedCategory("All")}
                className="text-xs text-amber-400 hover:text-amber-300 font-semibold"
              >
                Show all categories
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

        {/* Resources Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredResources.map((res) => (
            <div
              key={res.id}
              className="flex flex-col justify-between rounded-2xl border border-slate-800 bg-slate-900/60 p-6 backdrop-blur-sm transition-all duration-300 hover:border-slate-700 hover:shadow-xl group"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Badge variant="orange" size="sm">
                    {res.type}
                  </Badge>
                  <span className="text-[11px] font-mono text-slate-400">
                    Level: {res.level}
                  </span>
                </div>

                <h2 className="text-base font-bold text-white group-hover:text-amber-400 transition-colors">
                  {res.title}
                </h2>

                <p className="text-xs text-slate-400 leading-relaxed">
                  {res.description}
                </p>

                <div className="pt-2">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800/80 text-amber-400 border border-slate-700/60">
                    {res.category}
                  </span>
                </div>
              </div>

              <div className="pt-6 mt-4 border-t border-slate-800/60 flex items-center justify-between">
                <span className="text-[11px] text-slate-500">
                  {res.isOfficialAws ? "Verified Official Link" : "Curated Guide"}
                </span>
                <a
                  href={res.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 border border-amber-500/20 transition-colors"
                >
                  <span>Open Resource</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Learning Pathways Guide */}
        <div className="rounded-3xl border border-slate-800 bg-slate-900/40 p-8 space-y-6">
          <h2 className="text-xl font-bold text-white">
            Recommended Starting Pathways for PITS Students
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                1st &amp; 2nd Year Students
              </span>
              <h3 className="text-sm font-semibold text-white">
                Cloud Basics &amp; Free Tier
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Start with AWS Skill Builder Cloud Essentials, launch an EC2 instance, host a portfolio in S3, and learn Git version control on GitHub.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2">
              <span className="text-xs font-bold text-sky-400 uppercase tracking-wider">
                3rd Year Students
              </span>
              <h3 className="text-sm font-semibold text-white">
                Serverless &amp; Bedrock GenAI
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Build full-stack applications with Next.js, API Gateway, and Lambda. Explore Amazon Bedrock API for Generative AI and RAG implementations.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2">
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
                Final Year Students
              </span>
              <h3 className="text-sm font-semibold text-white">
                DevOps &amp; Placement Prep
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Containerize apps with Docker, deploy on ECS/Fargate, set up CI/CD pipelines, and prepare for AWS Certified Solutions Architect Associate.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
