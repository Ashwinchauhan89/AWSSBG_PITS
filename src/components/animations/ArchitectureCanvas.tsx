"use client";

import * as React from "react";
import { useRef, useState, useEffect } from "react";
import {
  Globe,
  Radio,
  Server,
  Zap,
  Sparkles,
  Database,
  Play,
  RotateCcw,
  CheckCircle,
  Activity,
  Layers,
} from "lucide-react";
import { gsap, useGSAP, Draggable } from "@/lib/gsap";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

interface CloudNode {
  id: string;
  name: string;
  role: string;
  icon: React.ElementType;
  color: string;
  borderColor: string;
  initialX: number;
  initialY: number;
  latency: string;
}

const DEFAULT_NODES: CloudNode[] = [
  {
    id: "route53",
    name: "Amazon Route 53",
    role: "Global DNS & Geo-Routing",
    icon: Globe,
    color: "bg-amber-500/10 text-amber-400",
    borderColor: "border-amber-500/50",
    initialX: 60,
    initialY: 60,
    latency: "12ms DNS",
  },
  {
    id: "cloudfront",
    name: "Amazon CloudFront",
    role: "Edge CDN & DDoS Shield",
    icon: Radio,
    color: "bg-sky-500/10 text-sky-400",
    borderColor: "border-sky-500/50",
    initialX: 250,
    initialY: 60,
    latency: "18ms Edge Cache",
  },
  {
    id: "apigateway",
    name: "Amazon API Gateway",
    role: "API Management & Throttling",
    icon: Server,
    color: "bg-purple-500/10 text-purple-400",
    borderColor: "border-purple-500/50",
    initialX: 440,
    initialY: 60,
    latency: "8ms Ingress",
  },
  {
    id: "lambda",
    name: "AWS Lambda",
    role: "Serverless Compute",
    icon: Zap,
    color: "bg-orange-500/10 text-orange-400",
    borderColor: "border-orange-500/50",
    initialX: 250,
    initialY: 220,
    latency: "24ms Warm Exec",
  },
  {
    id: "dynamo",
    name: "Amazon DynamoDB",
    role: "NoSQL Key-Value Store",
    icon: Database,
    color: "bg-blue-500/10 text-blue-400",
    borderColor: "border-blue-500/50",
    latency: "4ms Read/Write",
    initialX: 100,
    initialY: 370,
  },
  {
    id: "bedrock",
    name: "Amazon Bedrock",
    role: "Titan & Claude Foundation AI",
    icon: Sparkles,
    color: "bg-emerald-500/10 text-emerald-400",
    borderColor: "border-emerald-500/50",
    latency: "68ms Titan Inference",
    initialX: 400,
    initialY: 370,
  },
];

// Connections between nodes: from -> to
const CONNECTIONS = [
  { from: "route53", to: "cloudfront" },
  { from: "cloudfront", to: "apigateway" },
  { from: "apigateway", to: "lambda" },
  { from: "lambda", to: "dynamo" },
  { from: "lambda", to: "bedrock" },
];

export function ArchitectureCanvas() {
  const canvasRef = useRef<HTMLDivElement | null>(null);
  const svgRef = useRef<SVGSVGElement | null>(null);
  const packetRef = useRef<SVGCircleElement | null>(null);
  const [activeStep, setActiveStep] = useState<string | null>(null);
  const [isSimulating, setIsSimulating] = useState(false);
  const [logs, setLogs] = useState<string[]>([
    "Ready: Drag any node across the canvas to test GSAP Draggable + dynamic ticker wires.",
  ]);

  const draggablesRef = useRef<Draggable[]>([]);

  // Function to calculate center position of a node element relative to canvas
  const getNodeCenter = (nodeId: string) => {
    const el = document.getElementById(`node-${nodeId}`);
    const canvas = canvasRef.current;
    if (!el || !canvas) return { x: 0, y: 0 };
    const elRect = el.getBoundingClientRect();
    const canvasRect = canvas.getBoundingClientRect();
    return {
      x: elRect.left - canvasRect.left + elRect.width / 2,
      y: elRect.top - canvasRect.top + elRect.height / 2,
    };
  };

  // Update SVG connection lines
  const updateWires = React.useCallback(() => {
    CONNECTIONS.forEach((conn, idx) => {
      const p1 = getNodeCenter(conn.from);
      const p2 = getNodeCenter(conn.to);
      const line = document.getElementById(`wire-${idx}`);
      if (line) {
        // Draw curved bezier line
        const midY = (p1.y + p2.y) / 2;
        const d = `M ${p1.x} ${p1.y} C ${p1.x} ${midY}, ${p2.x} ${midY}, ${p2.x} ${p2.y}`;
        line.setAttribute("d", d);
      }
    });
  }, []);

  useGSAP(
    () => {
      if (!canvasRef.current) return;

      // Initialize Draggable for each node with bounds constrained to canvas
      draggablesRef.current = Draggable.create(".gsap-draggable-node", {
        bounds: canvasRef.current,
        edgeResistance: 0.75,
        type: "x,y",
        onDrag: updateWires,
        onThrowUpdate: updateWires,
      });

      // Update wires immediately after layout render
      updateWires();
      window.addEventListener("resize", updateWires);

      return () => {
        window.removeEventListener("resize", updateWires);
        draggablesRef.current.forEach((d) => d.kill());
      };
    },
    { scope: canvasRef }
  );

  // Auto-align all nodes back to their default coordinates
  const handleAutoAlign = () => {
    draggablesRef.current.forEach((d) => {
      gsap.to(d.target, {
        x: 0,
        y: 0,
        duration: 0.7,
        ease: "back.out(1.5)",
        onUpdate: updateWires,
      });
    });
    setLogs((prev) => ["Auto-aligned architecture to reference blueprint.", ...prev.slice(0, 4)]);
  };

  // Run live packet simulation through the cloud topology
  const handleSimulatePacket = () => {
    if (isSimulating || !packetRef.current) return;
    setIsSimulating(true);

    const steps = [
      { id: "route53", log: "12ms: DNS Query resolved by Route 53 with latency-based routing." },
      { id: "cloudfront", log: "18ms: CloudFront Edge cache verified; TLS 1.3 negotiated." },
      { id: "apigateway", log: "8ms: API Gateway validated JWT token & throttled request." },
      { id: "lambda", log: "24ms: Lambda executed Python microservice runtime handler." },
      { id: "dynamo", log: "4ms: DynamoDB retrieved user profile session document." },
      { id: "bedrock", log: "68ms: Amazon Bedrock Titan completed vector inference!" },
    ];

    const tl = gsap.timeline({
      onComplete: () => {
        setIsSimulating(false);
        setActiveStep(null);
        gsap.to(packetRef.current, { opacity: 0, duration: 0.3 });
        setLogs((prev) => [
          "✔ Request successfully completed in 134ms total latency!",
          ...prev.slice(0, 4),
        ]);
      },
    });

    // Make packet visible at Route 53
    const startPos = getNodeCenter("route53");
    gsap.set(packetRef.current, { cx: startPos.x, cy: startPos.y, opacity: 1, scale: 1 });

    steps.forEach((step, index) => {
      tl.call(() => {
        setActiveStep(step.id);
        setLogs((prev) => [step.log, ...prev.slice(0, 4)]);

        // Pulse the active node
        const el = document.getElementById(`node-${step.id}`);
        if (el) {
          gsap.fromTo(
            el,
            { scale: 1.08, boxShadow: "0 0 25px rgba(255, 153, 0, 0.8)" },
            { scale: 1, boxShadow: "none", duration: 0.5 }
          );
        }
      });

      if (index < steps.length - 1) {
        const nextNode = steps[index + 1].id;
        tl.to(packetRef.current, {
          duration: 0.65,
          ease: "power2.inOut",
          onUpdate: () => {
            const currentCenter = getNodeCenter(nextNode);
            if (packetRef.current) {
              packetRef.current.setAttribute("cx", String(currentCenter.x));
              packetRef.current.setAttribute("cy", String(currentCenter.y));
            }
          },
        });
      }
    });
  };

  return (
    <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6 backdrop-blur-xl shadow-2xl space-y-6">
      {/* Control Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex h-2.5 w-2.5 rounded-full bg-amber-400 animate-ping" />
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Layers className="w-5 h-5 text-amber-400" />
              GSAP Draggable Interactive Architecture Canvas
            </h3>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Drag any service node. GSAP Ticker recalculates live bezier vectors in real time.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            size="sm"
            variant="outline"
            onClick={handleAutoAlign}
            disabled={isSimulating}
            className="gap-1.5 border-slate-700 text-xs hover:border-amber-400"
          >
            <RotateCcw className="w-3.5 h-3.5 text-slate-400" />
            <span>Auto-Align</span>
          </Button>
          <Button
            size="sm"
            onClick={handleSimulatePacket}
            disabled={isSimulating}
            className="gap-1.5 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-bold text-xs"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>{isSimulating ? "Simulating..." : "Simulate Packet Flow"}</span>
          </Button>
        </div>
      </div>

      {/* Interactive Draggable Canvas Field */}
      <div
        ref={canvasRef}
        className="relative w-full h-[520px] rounded-2xl border border-slate-800/80 bg-slate-950/80 overflow-hidden tech-grid select-none"
      >
        {/* Dynamic SVG Connecting Lines */}
        <svg
          ref={svgRef}
          className="absolute inset-0 w-full h-full pointer-events-none z-0"
        >
          <defs>
            <linearGradient id="wireGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ff9900" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.8" />
            </linearGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="3" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {CONNECTIONS.map((_, idx) => (
            <path
              key={idx}
              id={`wire-${idx}`}
              stroke="url(#wireGrad)"
              strokeWidth="2.5"
              fill="none"
              strokeDasharray="6 4"
              className="opacity-70 transition-opacity"
            />
          ))}

          {/* Glowing Travelling Data Packet */}
          <circle
            ref={packetRef}
            r="7"
            fill="#ff9900"
            filter="url(#glow)"
            className="opacity-0 transition-opacity"
          />
        </svg>

        {/* Cloud Architecture Nodes */}
        {DEFAULT_NODES.map((node) => {
          const Icon = node.icon;
          const isActive = activeStep === node.id;

          return (
            <div
              key={node.id}
              id={`node-${node.id}`}
              style={{
                left: `${node.initialX}px`,
                top: `${node.initialY}px`,
              }}
              className={`gsap-draggable-node absolute z-10 w-44 rounded-2xl border ${
                node.borderColor
              } bg-slate-900/90 p-3.5 backdrop-blur-md cursor-grab active:cursor-grabbing transition-shadow ${
                isActive
                  ? "ring-2 ring-amber-400 bg-slate-850 shadow-2xl shadow-amber-500/50"
                  : "shadow-xl hover:shadow-amber-500/20"
              }`}
            >
              <div className="flex items-center gap-2 mb-2">
                <div className={`p-2 rounded-xl ${node.color} shrink-0`}>
                  <Icon className="w-4 h-4" />
                </div>
                <div className="overflow-hidden">
                  <h4 className="text-xs font-bold text-white truncate">{node.name}</h4>
                  <p className="text-[10px] text-slate-400 truncate">{node.role}</p>
                </div>
              </div>

              <div className="flex items-center justify-between text-[10px] pt-1.5 border-t border-slate-800/80 font-mono text-slate-400">
                <span>Latency</span>
                <span className="text-emerald-400 font-semibold">{node.latency}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Live Packet Telemetry Log Stream */}
      <div className="rounded-2xl border border-slate-800 bg-slate-950 p-4 font-mono text-xs">
        <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-800/80 text-[11px] text-slate-400">
          <div className="flex items-center gap-2">
            <Activity className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
            <span className="text-white font-semibold">GSAP Telemetry Stream</span>
          </div>
          <span className="text-slate-500">60 FPS Hardware-Accelerated</span>
        </div>
        <div className="space-y-1">
          {logs.map((log, i) => (
            <div
              key={i}
              className={`flex items-start gap-2 ${
                i === 0 ? "text-amber-300 font-semibold" : "text-slate-500"
              }`}
            >
              <span className="text-slate-600">&gt;</span>
              <span>{log}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
