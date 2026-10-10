"use client";

import * as React from "react";
import { useState, useRef } from "react";
import { LayoutGrid, Columns3, ListFilter, Sparkles, Server, Zap, Database, Cpu, Globe } from "lucide-react";
import { gsap, useGSAP, Flip } from "@/lib/gsap";
import { Badge } from "@/components/ui/Badge";

interface ServiceCard {
  id: string;
  name: string;
  category: string;
  desc: string;
  stats: string;
  icon: React.ElementType;
  gradient: string;
}

const SERVICES: ServiceCard[] = [
  {
    id: "card-bedrock",
    name: "Amazon Bedrock",
    category: "Generative AI",
    desc: "Titan, Claude 3.5 Sonnet foundation model orchestration & vector embeddings.",
    stats: "100k Token Context",
    icon: Sparkles,
    gradient: "from-purple-500/20 to-pink-500/10 border-purple-500/30",
  },
  {
    id: "card-lambda",
    name: "AWS Lambda",
    category: "Compute",
    desc: "Serverless code execution without provisioning servers or managing clusters.",
    stats: "1M Free Req/Mo",
    icon: Zap,
    gradient: "from-orange-500/20 to-amber-500/10 border-orange-500/30",
  },
  {
    id: "card-dynamo",
    name: "Amazon DynamoDB",
    category: "Database",
    desc: "Single-digit millisecond response NoSQL key-value database built for planetary scale.",
    stats: "10M+ IOPS Peak",
    icon: Database,
    gradient: "from-blue-500/20 to-sky-500/10 border-blue-500/30",
  },
  {
    id: "card-s3",
    name: "Amazon S3",
    category: "Storage",
    desc: "Object storage with industry-leading 99.999999999% data durability.",
    stats: "11 9's Durability",
    icon: Server,
    gradient: "from-emerald-500/20 to-teal-500/10 border-emerald-500/30",
  },
  {
    id: "card-ec2",
    name: "Amazon EC2",
    category: "Compute",
    desc: "Elastic compute capacity in the cloud with deep GPU & Arm Graviton instances.",
    stats: "750 Free Hrs/Mo",
    icon: Cpu,
    gradient: "from-amber-500/20 to-orange-500/10 border-amber-500/30",
  },
  {
    id: "card-cloudfront",
    name: "CloudFront",
    category: "Edge & CDN",
    desc: "Secure, ultra-low latency content delivery network with 600+ Points of Presence.",
    stats: "600+ Edge PoPs",
    icon: Globe,
    gradient: "from-sky-500/20 to-indigo-500/10 border-sky-500/30",
  },
];

type LayoutMode = "grid" | "list" | "featured";

export function FlipLayoutShowcase() {
  const [layout, setLayout] = useState<LayoutMode>("grid");
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Switch layout using GSAP FLIP plugin
  const switchLayout = (newLayout: LayoutMode) => {
    if (newLayout === layout || !containerRef.current) return;

    // 1. First: Record pre-state
    const state = Flip.getState(".gsap-flip-card");

    // 2. Modify layout state in React
    setLayout(newLayout);

    // 3. Play FLIP animation after React DOM update
    requestAnimationFrame(() => {
      Flip.from(state, {
        duration: 0.65,
        ease: "power2.inOut",
        stagger: 0.04,
        scale: true,
      });
    });
  };

  return (
    <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6 backdrop-blur-xl shadow-2xl space-y-6">
      {/* Header & Mode Toggles */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex h-2 w-2 rounded-full bg-sky-400" />
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-sky-400" />
              GSAP Flip Plugin Seamless Layout Morphing
            </h3>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Toggle views to witness FLIP (First, Last, Invert, Play) coordinate smooth layout transitions.
          </p>
        </div>

        {/* View Buttons */}
        <div className="flex items-center p-1 rounded-xl bg-slate-950 border border-slate-800">
          <button
            onClick={() => switchLayout("grid")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              layout === "grid"
                ? "bg-amber-500/20 text-amber-400 border border-amber-500/40 shadow-md"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <LayoutGrid className="w-3.5 h-3.5" />
            <span>Grid</span>
          </button>
          <button
            onClick={() => switchLayout("list")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              layout === "list"
                ? "bg-amber-500/20 text-amber-400 border border-amber-500/40 shadow-md"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <Columns3 className="w-3.5 h-3.5" />
            <span>Horizontal Flow</span>
          </button>
          <button
            onClick={() => switchLayout("featured")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              layout === "featured"
                ? "bg-amber-500/20 text-amber-400 border border-amber-500/40 shadow-md"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <ListFilter className="w-3.5 h-3.5" />
            <span>Spec List</span>
          </button>
        </div>
      </div>

      {/* Dynamic Cards Container */}
      <div
        ref={containerRef}
        className={`transition-all ${
          layout === "grid"
            ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
            : layout === "list"
            ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3"
            : "flex flex-col gap-3"
        }`}
      >
        {SERVICES.map((service, index) => {
          const Icon = service.icon;

          return (
            <div
              key={service.id}
              data-flip-id={service.id}
              className={`gsap-flip-card rounded-2xl border bg-gradient-to-b ${
                service.gradient
              } p-4 backdrop-blur-md transition-shadow hover:shadow-xl hover:border-amber-400/50 will-change-transform ${
                layout === "featured" ? "flex items-center justify-between gap-4" : ""
              }`}
            >
              <div className={`flex items-start gap-3 ${layout === "featured" ? "flex-1" : ""}`}>
                <div className="p-2.5 rounded-xl bg-slate-900/90 border border-slate-800 text-amber-400 shrink-0 shadow-md">
                  <Icon className="w-5 h-5" />
                </div>
                <div className="overflow-hidden">
                  <div className="flex items-center gap-2">
                    <h4 className="text-sm font-bold text-white truncate">{service.name}</h4>
                    <span className="text-[10px] font-mono text-slate-400 bg-slate-900/80 px-1.5 py-0.5 rounded border border-slate-800">
                      {service.category}
                    </span>
                  </div>
                  {layout !== "list" && (
                    <p className="text-xs text-slate-300 mt-1 leading-snug line-clamp-2">
                      {service.desc}
                    </p>
                  )}
                </div>
              </div>

              <div
                className={`pt-2 mt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-mono ${
                  layout === "featured" ? "border-t-0 mt-0 pt-0 shrink-0" : ""
                }`}
              >
                <span className="text-slate-500">Benchmark</span>
                <span className="text-emerald-400 font-semibold">{service.stats}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
