"use client";

import * as React from "react";
import { Cloud, Cpu, Database, Server, Sparkles, Zap, ArrowUpRight, Activity } from "lucide-react";

export function InteractiveCloudGraphic() {
  const [activeNode, setActiveNode] = React.useState<string | null>(null);

  const nodes = [
    {
      id: "bedrock",
      title: "Amazon Bedrock",
      desc: "Generative AI & LLMs",
      useCase: "Claude 3.5, Llama 3 on Titan for campus chatbots & RAG",
      tier: "Pay-as-you-go + AWS Credits",
      icon: Sparkles,
      color: "text-amber-400 border-amber-500/40 bg-slate-900/90 hover:border-amber-400",
      glowColor: "rgba(255, 153, 0, 0.4)",
      x: 18,
      y: 20,
    },
    {
      id: "lambda",
      title: "AWS Lambda",
      desc: "Serverless Event Functions",
      useCase: "1M free executions/month for backend APIs & Discord bots",
      tier: "Always Free Tier",
      icon: Zap,
      color: "text-orange-400 border-orange-500/40 bg-slate-900/90 hover:border-orange-400",
      glowColor: "rgba(249, 115, 22, 0.4)",
      x: 82,
      y: 20,
    },
    {
      id: "ec2",
      title: "Amazon EC2",
      desc: "Scalable Virtual Compute",
      useCase: "750 hrs/month t2.micro / t3.micro for Linux & Docker hosting",
      tier: "12 Months Free Tier",
      icon: Server,
      color: "text-sky-400 border-sky-500/40 bg-slate-900/90 hover:border-sky-400",
      glowColor: "rgba(56, 189, 248, 0.4)",
      x: 15,
      y: 75,
    },
    {
      id: "dynamodb",
      title: "Amazon DynamoDB",
      desc: "Ultra-fast NoSQL Database",
      useCase: "25 GB storage & single-digit millisecond response for student apps",
      tier: "Always Free Tier",
      icon: Database,
      color: "text-blue-400 border-blue-500/40 bg-slate-900/90 hover:border-blue-400",
      glowColor: "rgba(96, 165, 250, 0.4)",
      x: 85,
      y: 75,
    },
    {
      id: "s3",
      title: "Amazon S3",
      desc: "Durable Object Storage",
      useCase: "5 GB static website hosting, asset storage, and backup buckets",
      tier: "12 Months Free Tier",
      icon: Cpu,
      color: "text-emerald-400 border-emerald-500/40 bg-slate-900/90 hover:border-emerald-400",
      glowColor: "rgba(16, 185, 129, 0.4)",
      x: 50,
      y: 88,
    },
  ];

  const activeNodeData = nodes.find((n) => n.id === activeNode);

  return (
    <div className="relative w-full max-w-lg mx-auto aspect-square flex items-center justify-center p-2 select-none">
      {/* Background ambient lighting */}
      <div className="absolute inset-0 bg-gradient-to-tr from-amber-500/20 via-sky-500/10 to-purple-500/15 rounded-full blur-3xl -z-10" />
      <div className="absolute inset-4 border border-slate-800/80 rounded-full tech-grid opacity-60 pointer-events-none" />
      <div className="absolute inset-16 border border-dashed border-amber-500/20 rounded-full animate-spin [animation-duration:80s] pointer-events-none" />
      <div className="absolute inset-28 border border-slate-800/60 rounded-full animate-spin [animation-duration:120s] [animation-direction:reverse] pointer-events-none" />

      {/* SVG Connecting Circuit Lines */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
        <defs>
          <linearGradient id="laserGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ff9900" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#38bdf8" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#ff9900" stopOpacity="0.8" />
          </linearGradient>
        </defs>
        {nodes.map((node) => {
          const isActive = activeNode === node.id;
          return (
            <g key={node.id}>
              {/* Static faint wire */}
              <line
                x1="50%"
                y1="50%"
                x2={`${node.x}%`}
                y2={`${node.y}%`}
                stroke={isActive ? "#ff9900" : "rgba(255, 255, 255, 0.12)"}
                strokeWidth={isActive ? 2 : 1}
                strokeDasharray={isActive ? "none" : "4 4"}
                className="transition-colors duration-300"
              />
              {/* Animated pulsating data packet */}
              <circle
                r={isActive ? 3.5 : 2}
                fill={isActive ? "#ff9900" : "#38bdf8"}
                className="transition-all duration-300"
              >
                <animateMotion
                  path={`M ${50 * 4} ${50 * 4} L ${node.x * 4} ${node.y * 4}`}
                  dur={isActive ? "1.5s" : "3s"}
                  repeatCount="indefinite"
                />
              </circle>
            </g>
          );
        })}
      </svg>

      {/* Center Core Node: AWS SBG Hub */}
      <div className="relative z-10 flex flex-col items-center justify-center w-36 h-36 rounded-full bg-slate-900/95 border-2 border-amber-500/70 shadow-2xl shadow-orange-500/25 backdrop-blur-xl group cursor-default transition-all duration-300 hover:scale-105">
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
      {nodes.map((node) => {
        const Icon = node.icon;
        const isActive = activeNode === node.id;
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
            className="absolute z-20 transition-all duration-300"
          >
            <div
              className={`flex items-center gap-2 px-3 py-2 rounded-2xl border backdrop-blur-md cursor-pointer transition-all duration-300 hover:scale-110 shadow-xl ${
                node.color
              } ${isActive ? "ring-2 ring-amber-400 scale-110 bg-slate-900 shadow-amber-500/30" : ""}`}
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

      {/* Interactive Status & Architecture Readout Below */}
      <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-full max-w-sm px-2 z-30">
        <div className="text-center text-xs text-slate-300 bg-slate-950/90 border border-slate-800/90 px-4 py-2 rounded-2xl backdrop-blur-md shadow-2xl transition-all duration-200">
          {activeNodeData ? (
            <div className="space-y-1 text-left">
              <div className="flex items-center justify-between text-[11px]">
                <span className="font-bold text-amber-400">{activeNodeData.title}</span>
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
