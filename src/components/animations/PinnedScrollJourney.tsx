"use client";

import * as React from "react";
import { useRef } from "react";
import { Globe, ShieldCheck, Zap, Sparkles, CheckCircle2 } from "lucide-react";
import { gsap, useGSAP, ScrollTrigger } from "@/lib/gsap";
import { Badge } from "@/components/ui/Badge";

const STAGES = [
  {
    step: "01",
    time: "0ms",
    title: "Client Edge Ingress",
    subtitle: "Prashanti Institute Campus -> Anycast PoP",
    desc: "A student types a query. HTTP/3 QUIC connection initiates and reaches the nearest AWS Edge location in Mumbai with TLS 1.3 zero-RTT handshake.",
    icon: Globe,
    color: "text-amber-400 bg-amber-500/10 border-amber-500/40",
  },
  {
    step: "02",
    time: "14ms",
    title: "CloudFront & AWS WAF",
    subtitle: "DDoS Mitigation & Edge Cache",
    desc: "AWS WAF inspects request headers against managed SQLi and bot rulesets. The static asset is served from edge cache or proxied to Regional API Gateway.",
    icon: ShieldCheck,
    color: "text-sky-400 bg-sky-500/10 border-sky-500/40",
  },
  {
    step: "03",
    time: "32ms",
    title: "Serverless Execution (Lambda)",
    subtitle: "Firecracker MicroVM Ingestion",
    desc: "AWS Lambda provisions an ultra-lightweight Firecracker container in under 15ms. The microservice validates payload and queries DynamoDB for session context.",
    icon: Zap,
    color: "text-orange-400 bg-orange-500/10 border-orange-500/40",
  },
  {
    step: "04",
    time: "98ms",
    title: "Amazon Bedrock Generative AI",
    subtitle: "RAG & Foundation Model Inference",
    desc: "The request vectors are sent to Amazon Bedrock. Titan and Claude 3.5 Sonnet synthesize the answer with real-time streaming tokens delivered back to the client.",
    icon: Sparkles,
    color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/40",
  },
];

export function PinnedScrollJourney() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const progressBarRef = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      if (!containerRef.current || !progressBarRef.current) return;

      const cards = gsap.utils.toArray<HTMLElement>(".gsap-journey-card");

      // Pinned Scrubbing Timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=1800",
          pin: true,
          scrub: 0.8,
        },
      });

      // Scrub progress bar height
      tl.to(progressBarRef.current, {
        scaleY: 1,
        ease: "none",
      });

      // Stagger highlight each card
      cards.forEach((card, index) => {
        tl.to(
          card,
          {
            opacity: 1,
            y: 0,
            scale: 1,
            boxShadow: "0 0 30px rgba(255, 153, 0, 0.25)",
            duration: 0.5,
          },
          index * 0.25
        );
      });
    },
    { scope: containerRef }
  );

  return (
    <div
      ref={containerRef}
      className="relative min-h-screen flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 border-y border-slate-800 bg-slate-950"
    >
      <div className="max-w-5xl mx-auto w-full space-y-8">
        {/* Title */}
        <div className="text-center space-y-2">
          <Badge variant="orange" size="md">
            GSAP ScrollTrigger Pinned Scrub
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            The Microsecond Journey of a Cloud Packet
          </h2>
          <p className="text-sm text-slate-400 max-w-xl mx-auto">
            Scroll vertically to scrub through the end-to-end packet journey across the AWS Global Network.
          </p>
        </div>

        {/* Journey Timeline Track & Cards */}
        <div className="relative grid grid-cols-1 md:grid-cols-2 gap-6 pt-6">
          {/* Background vertical progress track */}
          <div className="hidden md:block absolute left-1/2 -translate-x-1/2 top-8 bottom-8 w-1 bg-slate-800 rounded-full">
            <div
              ref={progressBarRef}
              style={{ transformOrigin: "50% 0%", transform: "scaleY(0)" }}
              className="w-full h-full bg-gradient-to-b from-amber-400 via-orange-500 to-emerald-400 rounded-full shadow-[0_0_15px_#ff9900]"
            />
          </div>

          {STAGES.map((stage, idx) => {
            const Icon = stage.icon;
            const isEven = idx % 2 === 0;

            return (
              <div
                key={stage.step}
                className={`gsap-journey-card opacity-30 scale-95 translate-y-6 rounded-3xl border border-slate-800 bg-slate-900/90 p-6 backdrop-blur-xl transition-all duration-300 will-change-transform ${
                  isEven ? "md:mr-6" : "md:ml-6"
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className={`p-2.5 rounded-2xl border ${stage.color}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                      T + {stage.time}
                    </span>
                    <span className="text-xs font-extrabold text-slate-500">
                      STEP {stage.step}
                    </span>
                  </div>
                </div>

                <h3 className="text-lg font-bold text-white mb-1">{stage.title}</h3>
                <p className="text-xs font-semibold text-slate-400 mb-2 font-mono">
                  {stage.subtitle}
                </p>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {stage.desc}
                </p>
              </div>
            );
          })}
        </div>

        {/* Scroll helper */}
        <div className="text-center text-xs text-slate-500 flex items-center justify-center gap-2 pt-4">
          <span className="animate-bounce">↓</span>
          <span>Scroll down to continue narrative playback</span>
        </div>
      </div>
    </div>
  );
}
