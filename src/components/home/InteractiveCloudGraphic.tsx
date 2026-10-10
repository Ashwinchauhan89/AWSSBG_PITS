"use client";

import * as React from "react";
import { useRef, useState } from "react";
import { Cloud, Cpu, Database, Server, Sparkles, Zap, ArrowUpRight, Activity } from "lucide-react";
import { gsap, useGSAP } from "@/lib/gsap";

interface NodeData {
  id: string;
  title: string;
  desc: string;
  useCase: string;
  tier: string;
  icon: React.ElementType;
  color: string;
  glowColor: string;
  x: number;
  y: number;
}

const NODES: NodeData[] = [
  {
    id: "bedrock",
    title: "Amazon Bedrock",
    desc: "Generative AI & LLMs",
    useCase: "Claude 3.5 Sonnet, Llama 3 on Titan for campus chatbots & RAG systems",
    tier: "AWS Educate Credits",
    icon: Sparkles,
    color: "text-amber-400 border-amber-500/40 bg-slate-900/95 hover:border-amber-400",
    glowColor: "rgba(255, 153, 0, 0.5)",
    x: 18,
    y: 20,
  },
  {
    id: "lambda",
    title: "AWS Lambda",
    desc: "Serverless Event Compute",
    useCase: "1M free executions/month for event-driven backend microservices & Discord bots",
    tier: "Always Free Tier",
    icon: Zap,
    color: "text-orange-400 border-orange-500/40 bg-slate-900/95 hover:border-orange-400",
    glowColor: "rgba(249, 115, 22, 0.5)",
    x: 82,
    y: 20,
  },
  {
    id: "ec2",
    title: "Amazon EC2",
    desc: "Scalable Virtual Compute",
    useCase: "750 hrs/month t2.micro / t3.micro for Linux containers & student web hosting",
    tier: "12 Months Free Tier",
    icon: Server,
    color: "text-sky-400 border-sky-500/40 bg-slate-900/95 hover:border-sky-400",
    glowColor: "rgba(56, 189, 248, 0.5)",
    x: 15,
    y: 75,
  },
  {
    id: "dynamodb",
    title: "Amazon DynamoDB",
    desc: "Ultra-fast NoSQL Database",
    useCase: "25 GB storage & single-digit millisecond latency for modern distributed apps",
    tier: "Always Free Tier",
    icon: Database,
    color: "text-blue-400 border-blue-500/40 bg-slate-900/95 hover:border-blue-400",
    glowColor: "rgba(96, 165, 250, 0.5)",
    x: 85,
    y: 75,
  },
  {
    id: "s3",
    title: "Amazon S3",
    desc: "Durable Cloud Storage",
    useCase: "5 GB static website hosting, asset storage, and backup buckets with 99.999999999% durability",
    tier: "12 Months Free Tier",
    icon: Cpu,
    color: "text-emerald-400 border-emerald-500/40 bg-slate-900/95 hover:border-emerald-400",
    glowColor: "rgba(16, 185, 129, 0.5)",
    x: 50,
    y: 88,
  },
];

export function InteractiveCloudGraphic() {
  const [activeNode, setActiveNode] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const orbitInnerRef = useRef<HTMLDivElement | null>(null);
  const orbitOuterRef = useRef<HTMLDivElement | null>(null);
  const coreRef = useRef<HTMLDivElement | null>(null);
  const telemetryRef = useRef<HTMLDivElement | null>(null);

  const activeNodeData = NODES.find((n) => n.id === activeNode);

  useGSAP(
    () => {
      // 1. Continuous smooth orbital ring rotations
      if (orbitInnerRef.current) {
        gsap.to(orbitInnerRef.current, {
          rotation: 360,
          duration: 40,
          repeat: -1,
          ease: "none",
        });
      }

      if (orbitOuterRef.current) {
        gsap.to(orbitOuterRef.current, {
          rotation: -360,
          duration: 65,
          repeat: -1,
          ease: "none",
        });
      }

      // 2. Central Core Heartbeat Breathing Pulse
      if (coreRef.current) {
        gsap.to(coreRef.current, {
          scale: 1.05,
          boxShadow: "0 0 35px rgba(255, 153, 0, 0.45)",
          duration: 2.2,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      }

      // 3. Staggered Levitation for Satellite Nodes
      gsap.utils.toArray<HTMLElement>(".gsap-satellite-node").forEach((node, index) => {
        gsap.to(node, {
          y: "+=7",
          duration: 2.4 + index * 0.35,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: index * 0.25,
        });
      });

      // 4. Interactive 3D Perspective Tilt with gsap.quickTo
      const container = containerRef.current;
      if (!container) return;

      const rotXTo = gsap.quickTo(container, "rotationX", {
        duration: 0.6,
        ease: "power2.out",
      });
      const rotYTo = gsap.quickTo(container, "rotationY", {
        duration: 0.6,
        ease: "power2.out",
      });

      const handleMouseMove = (e: MouseEvent) => {
        const rect = container.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        const maxTilt = 10;
        rotYTo((x / (rect.width / 2)) * maxTilt);
        rotXTo(-(y / (rect.height / 2)) * maxTilt);
      };

      const handleMouseLeave = () => {
        rotXTo(0);
        rotYTo(0);
      };

      container.addEventListener("mousemove", handleMouseMove);
      container.addEventListener("mouseleave", handleMouseLeave);

      return () => {
        container.removeEventListener("mousemove", handleMouseMove);
        container.removeEventListener("mouseleave", handleMouseLeave);
      };
    },
    { scope: containerRef }
  );

  // Animate telemetry box reveal when activeNode changes
  useGSAP(
    () => {
      if (telemetryRef.current) {
        gsap.fromTo(
          telemetryRef.current,
          { opacity: 0, y: 10, scale: 0.98 },
          { opacity: 1, y: 0, scale: 1, duration: 0.3, ease: "power2.out" }
        );
      }
    },
    { dependencies: [activeNode], scope: containerRef }
  );

  return (
    <div
      ref={containerRef}
      style={{ perspective: 1000, transformStyle: "preserve-3d" }}
      className="relative w-full max-w-lg mx-auto aspect-square flex items-center justify-center p-2 select-none will-change-transform"
    >
      {/* Background ambient lighting */}
      <div className="absolute inset-0 bg-gradient-to-tr from-amber-500/20 via-sky-500/10 to-purple-500/15 rounded-full blur-3xl -z-10 pointer-events-none" />
      <div className="absolute inset-4 border border-slate-800/80 rounded-full tech-grid opacity-50 pointer-events-none" />

      {/* GSAP Managed Orbit Rings */}
      <div
        ref={orbitInnerRef}
        className="absolute inset-16 border border-dashed border-amber-500/30 rounded-full pointer-events-none"
      />
      <div
        ref={orbitOuterRef}
        className="absolute inset-28 border border-slate-700/60 rounded-full pointer-events-none"
      />

      {/* SVG Connecting Circuit Lines */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
        <defs>
          <linearGradient id="laserGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ff9900" stopOpacity="0.9" />
            <stop offset="50%" stopColor="#38bdf8" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#ff9900" stopOpacity="0.9" />
          </linearGradient>
        </defs>
        {NODES.map((node) => {
          const isActive = activeNode === node.id;
          return (
            <g key={node.id}>
              {/* Circuit wire */}
              <line
                x1="50%"
                y1="50%"
                x2={`${node.x}%`}
                y2={`${node.y}%`}
                stroke={isActive ? "#ff9900" : "rgba(255, 255, 255, 0.15)"}
                strokeWidth={isActive ? 2.5 : 1}
                strokeDasharray={isActive ? "none" : "4 4"}
                className="transition-colors duration-300"
              />
              {/* Glowing animated data packet traveling between center and node */}
              <circle
                r={isActive ? 4 : 2.5}
                fill={isActive ? "#ff9900" : "#38bdf8"}
                className="transition-all duration-300 shadow-[0_0_8px_#ff9900]"
              >
                <animateMotion
                  path={`M ${50 * 4} ${50 * 4} L ${node.x * 4} ${node.y * 4}`}
                  dur={isActive ? "1.2s" : "2.8s"}
                  repeatCount="indefinite"
                />
              </circle>
            </g>
          );
        })}
      </svg>

      {/* Center Core Node: AWS SBG Hub with GSAP Heartbeat */}
      <div
        ref={coreRef}
        className="relative z-10 flex flex-col items-center justify-center w-36 h-36 rounded-full bg-slate-900/95 border-2 border-amber-500/70 shadow-2xl backdrop-blur-xl group cursor-pointer will-change-transform transition-all"
        onClick={() => setActiveNode(null)}
      >
        <div className="relative flex h-13 w-13 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-500 via-orange-500 to-amber-600 text-slate-950 shadow-lg shadow-orange-500/40">
          <Cloud className="w-7 h-7" strokeWidth={2.5} />
          <span className="absolute -top-1 -right-1 flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-amber-400"></span>
          </span>
        </div>
        <span className="mt-2 text-xs font-black text-white tracking-wide">
          AWS SBG
        </span>
        <span className="text-[10px] text-amber-400 font-bold tracking-wider uppercase">
          PITS Ujjain
        </span>
      </div>

      {/* Satellite Service Nodes */}
      {NODES.map((node) => {
        const Icon = node.icon;
        const isActive = activeNode === node.id;
        const isDimmed = activeNode !== null && !isActive;

        return (
          <div
            key={node.id}
            onMouseEnter={() => setActiveNode(node.id)}
            onMouseLeave={() => setActiveNode(null)}
            onClick={() => setActiveNode(isActive ? null : node.id)}
            style={{
              left: `${node.x}%`,
              top: `${node.y}%`,
              transform: "translate(-50%, -50%)",
            }}
            className={`gsap-satellite-node absolute z-20 transition-opacity duration-300 will-change-transform ${
              isDimmed ? "opacity-35" : "opacity-100"
            }`}
          >
            <div
              className={`flex items-center gap-2 px-3 py-2 rounded-2xl border backdrop-blur-md cursor-pointer transition-all duration-300 hover:scale-110 shadow-xl ${
                node.color
              } ${
                isActive
                  ? "ring-2 ring-amber-400 scale-110 bg-slate-900 shadow-2xl shadow-amber-500/40"
                  : ""
              }`}
            >
              <div className="p-1 rounded-lg bg-slate-800/80">
                <Icon className="w-3.5 h-3.5 shrink-0" />
              </div>
              <div className="flex flex-col text-left">
                <span className="text-[11px] font-bold text-white whitespace-nowrap">
                  {node.title}
                </span>
                <span className="text-[9px] text-slate-400 whitespace-nowrap hidden sm:inline">
                  {node.desc}
                </span>
              </div>
              <ArrowUpRight className="w-3 h-3 text-slate-500 ml-0.5 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          </div>
        );
      })}

      {/* Interactive Status & Architecture Telemetry Readout */}
      <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-full max-w-sm px-2 z-30">
        <div
          ref={telemetryRef}
          className="text-center text-xs text-slate-300 bg-slate-950/95 border border-slate-800/90 px-4 py-2.5 rounded-2xl backdrop-blur-md shadow-2xl"
        >
          {activeNodeData ? (
            <div className="space-y-1 text-left">
              <div className="flex items-center justify-between text-[11px]">
                <span className="font-bold text-amber-400 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping inline-block" />
                  {activeNodeData.title}
                </span>
                <span className="text-[10px] text-emerald-400 font-mono font-semibold bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/20">
                  {activeNodeData.tier}
                </span>
              </div>
              <p className="text-[10px] text-slate-300 leading-tight">
                {activeNodeData.useCase}
              </p>
            </div>
          ) : (
            <div className="flex items-center justify-center gap-2 text-[11px] text-slate-400">
              <Activity className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
              <span className="text-amber-400 font-semibold">Active Lab Grid:</span>
              <span className="hidden sm:inline">ap-south-1 (Mumbai) Region</span>
              <span className="text-slate-500">• Hover service to inspect</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
