import { Metadata } from "next";
import Link from "next/link";
import { Sparkles, ArrowLeft, Layers, Move, RefreshCw, Zap } from "lucide-react";
import { ArchitectureCanvas } from "@/components/animations/ArchitectureCanvas";
import { FlipLayoutShowcase } from "@/components/animations/FlipLayoutShowcase";
import { PinnedScrollJourney } from "@/components/animations/PinnedScrollJourney";
import { TextScrambleBanner } from "@/components/animations/TextScrambleBanner";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";



export const metadata: Metadata = {
  title: "Interactive GSAP Animation Lab | AWS SBG PITS",
  description:
    "Explore high-performance GSAP animations including ScrollTrigger pinning, FLIP layout morphing, Draggable cloud architectures, and elastic magnetic interactions.",
};



export default function AnimationsPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Page Header */}
      <section className="relative overflow-hidden pt-12 pb-16 border-b border-slate-800/80 bg-slate-950/80">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-80 bg-gradient-to-b from-amber-500/15 via-sky-500/5 to-transparent blur-3xl pointer-events-none -z-10" />
        <div className="absolute inset-0 tech-grid opacity-30 pointer-events-none -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="flex items-center justify-between">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-amber-400 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Community Home</span>
            </Link>

            <Badge variant="orange" size="md" className="gap-1.5 shadow-md">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>GSAP 3.15 + @gsap/react</span>
            </Badge>
          </div>

          <div className="max-w-3xl space-y-3">
            <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight leading-tight">
              Interactive{" "}
              <span className="bg-gradient-to-r from-amber-400 via-orange-400 to-sky-400 bg-clip-text text-transparent">
                GSAP Animation
              </span>{" "}
              Lab
            </h1>
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
              Explore professional-grade GreenSock Animation Platform (GSAP) techniques integrated with Next.js and AWS cloud architectures. Experience Draggable topology canvases, ScrollTrigger pinned storytelling, FLIP layout morphing, and elastic physics.
            </p>
          </div>

          {/* Plugin tags */}
          <div className="flex flex-wrap items-center gap-2 pt-2">
            <span className="text-xs text-slate-400 font-semibold mr-1">Active Plugins:</span>
            <span className="text-xs font-mono px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 text-amber-400">
              ScrollTrigger
            </span>
            <span className="text-xs font-mono px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 text-sky-400">
              Draggable
            </span>
            <span className="text-xs font-mono px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 text-purple-400">
              Flip
            </span>
            <span className="text-xs font-mono px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 text-emerald-400">
              useGSAP
            </span>
            <span className="text-xs font-mono px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 text-orange-400">
              TextPlugin &amp; Ticker
            </span>
          </div>
        </div>
      </section>

      {/* Main Interactive Showcase Sections */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-20">
        {/* 1. Draggable Architecture Simulator */}
        <section className="space-y-4">
          <div className="flex items-center gap-2">
            <Badge variant="blue" size="sm">
              Simulation 01
            </Badge>
            <span className="text-xs text-slate-400">• Drag nodes &amp; trace data flows</span>
          </div>
          <ArchitectureCanvas />
        </section>

        {/* 2. Text Scramble Banner */}
        <section className="space-y-4">
          <div className="flex items-center gap-2">
            <Badge variant="orange" size="sm">
              Simulation 02
            </Badge>
            <span className="text-xs text-slate-400">• High-frequency interpolation</span>
          </div>
          <TextScrambleBanner />
        </section>

        {/* 3. Flip Plugin Showcase */}
        <section className="space-y-4">
          <div className="flex items-center gap-2">
            <Badge variant="purple" size="sm">
              Simulation 03
            </Badge>
            <span className="text-xs text-slate-400">• FLIP layout calculation &amp; invert tweening</span>
          </div>
          <FlipLayoutShowcase />
        </section>
      </div>

      {/* 4. Full-Width Pinned Scroll Journey */}
      <PinnedScrollJourney />

      {/* CTA Footer */}
      <section className="py-16 text-center border-t border-slate-800 bg-slate-950">
        <div className="max-w-3xl mx-auto px-4 space-y-4">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            Ready to Build With AWS and GSAP?
          </h2>
          <p className="text-sm text-slate-400 leading-relaxed">
            Join the AWS Student Builder Group at Prashanti Institute of Technology &amp; Science to collaborate on real-world projects, workshops, and cloud architectures.
          </p>
          <div className="pt-2 flex justify-center gap-4">
            <Link href="/join">
              <Button size="lg" className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-bold border-none shadow-xl">
                Join Community
              </Button>
            </Link>
            <Link href="/">
              <Button variant="secondary" size="lg">
                Return to Home
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}



