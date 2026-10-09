"use client";

import * as React from "react";
import { Cloud, Cpu, Database, Server, Sparkles, Zap } from "lucide-react";

export function InteractiveCloudGraphic() {
  const [activeNode, setActiveNode] = React.useState<string | null>(null);

  const nodes = [
    {
      id: "bedrock",
      title: "Amazon Bedrock",
      desc: "Generative AI & LLM Models",
      icon: Sparkles,
      color: "text-amber-400 border-amber-500/40 bg-amber-500/10",
      x: "15%",
      y: "22%",
    },
    {
      id: "lambda",
      title: "AWS Lambda",
      desc: "Serverless Event Functions",
      icon: Zap,
      color: "text-orange-400 border-orange-500/40 bg-orange-500/10",
      x: "82%",
      y: "22%",
    },
    {
      id: "ec2",
      title: "Amazon EC2",
      desc: "Scalable Virtual Compute",
      icon: Server,
      color: "text-sky-400 border-sky-500/40 bg-sky-500/10",
      x: "12%",
      y: "74%",
    },
    {
      id: "dynamodb",
      title: "Amazon DynamoDB",
      desc: "Ultra-fast NoSQL Database",
      icon: Database,
      color: "text-blue-400 border-blue-500/40 bg-blue-500/10",
      x: "84%",
      y: "74%",
    },
    {
      id: "s3",
      title: "Amazon S3",
      desc: "Durable Object Storage",
      icon: Cpu,
      color: "text-emerald-400 border-emerald-500/40 bg-emerald-500/10",
      x: "48%",
      y: "86%",
    },
  ];

  return (
    <div className="relative w-full max-w-lg mx-auto aspect-square flex items-center justify-center p-4">
      {/* Background glow layers */}
      <div className="absolute inset-0 bg-gradient-to-tr from-amber-500/15 via-sky-500/10 to-orange-500/10 rounded-full blur-3xl -z-10" />
      <div className="absolute inset-6 border border-slate-800/80 rounded-full tech-grid opacity-60" />
      <div className="absolute inset-16 border border-dashed border-amber-500/20 rounded-full animate-spin [animation-duration:90s]" />

      {/* Center Core Node: AWS SBG Hub */}
      <div className="relative z-10 flex flex-col items-center justify-center w-36 h-36 rounded-full bg-slate-900/90 border-2 border-amber-500/60 shadow-2xl shadow-orange-500/20 backdrop-blur-xl group cursor-default transition-all duration-300 hover:scale-105">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 text-slate-950 shadow-lg shadow-orange-500/30">
          <Cloud className="w-7 h-7" strokeWidth={2.5} />
        </div>
        <span className="mt-2 text-xs font-bold text-white tracking-wide">
          AWS SBG
        </span>
        <span className="text-[10px] text-amber-400 font-medium">
          PITS Ujjain
        </span>

        {/* Orbit indicator */}
        <span className="absolute -top-1 right-2 flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-amber-400"></span>
        </span>
      </div>

      {/* Orbiting Satellite Service Nodes */}
      {nodes.map((node) => {
        const Icon = node.icon;
        const isActive = activeNode === node.id;
        return (
          <div
            key={node.id}
            onMouseEnter={() => setActiveNode(node.id)}
            onMouseLeave={() => setActiveNode(null)}
            style={{
              left: node.x,
              top: node.y,
              transform: "translate(-50%, -50%)",
            }}
            className="absolute z-20 transition-all duration-300"
          >
            <div
              className={`flex items-center gap-2 px-3 py-2 rounded-2xl border backdrop-blur-md cursor-pointer transition-all duration-200 hover:scale-110 shadow-lg ${
                node.color
              } ${isActive ? "ring-2 ring-amber-400" : ""}`}
            >
              <Icon className="w-4 h-4 shrink-0" />
              <div className="flex flex-col text-left">
                <span className="text-[11px] font-bold text-white whitespace-nowrap">
                  {node.title}
                </span>
                <span className="text-[9px] text-slate-400 whitespace-nowrap hidden sm:inline">
                  {node.desc}
                </span>
              </div>
            </div>
          </div>
        );
      })}

      {/* Interactive Status readout below graphic */}
      <div className="absolute -bottom-2 text-center text-xs text-slate-400 bg-slate-900/80 border border-slate-800 px-3.5 py-1.5 rounded-full backdrop-blur-sm">
        <span className="text-amber-400 font-semibold">Active Lab Stack:</span>{" "}
        {activeNode
          ? nodes.find((n) => n.id === activeNode)?.title
          : "Cloud • Generative AI • Serverless • Microservices"}
      </div>
    </div>
  );
}
