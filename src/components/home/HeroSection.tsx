import Link from "next/link";
import { Sparkles, Calendar, ArrowRight, CheckCircle2, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { InteractiveCloudGraphic } from "./InteractiveCloudGraphic";
import { COMMUNITY_INFO } from "@/lib/data/initialData";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden pt-8 pb-16 md:pt-16 md:pb-24 border-b border-slate-800/80">
      {/* Background accents */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-b from-amber-500/10 via-sky-500/5 to-transparent blur-3xl pointer-events-none -z-10" />
      <div className="absolute inset-0 tech-grid opacity-30 pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Headlines & CTA */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2">
              <Badge variant="orange" size="md" className="gap-1.5 py-1 px-3">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>AWS Student Builder Group</span>
                <span className="text-slate-500">•</span>
                <span className="text-slate-300 font-semibold">{COMMUNITY_INFO.collegeShort}</span>
              </Badge>
            </div>

            <div className="space-y-3">
              <h1 className="text-4xl sm:text-5xl xl:text-6xl font-black tracking-tight text-white leading-[1.1]">
                Build. Learn.{" "}
                <span className="bg-gradient-to-r from-amber-400 via-orange-400 to-amber-500 bg-clip-text text-transparent">
                  Innovate.
                </span>{" "}
                With AWS.
              </h1>
              <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                Empowering students at Prashanti Institute of Technology &amp; Science to explore cloud computing, AI, machine learning, and modern software development through hands-on learning and community collaboration.
              </p>
            </div>

            {/* Quick feature checklist */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 text-xs text-slate-300 pt-1">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-amber-400" />
                <span>Hands-on AWS Labs</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-amber-400" />
                <span>Generative AI &amp; Bedrock</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-amber-400" />
                <span>Peer Mentorship &amp; Hackathons</span>
              </div>
            </div>

            {/* Calls to Action */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-2">
              <Link href="/join" className="w-full sm:w-auto">
                <Button size="lg" className="w-full sm:w-auto gap-2 group shadow-xl">
                  <span>Join Our Community</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link href="/events" className="w-full sm:w-auto">
                <Button variant="secondary" size="lg" className="w-full sm:w-auto gap-2">
                  <Calendar className="w-4 h-4 text-amber-400" />
                  <span>Explore Events</span>
                </Button>
              </Link>
            </div>

            {/* Clear Student Community Disclaimer */}
            <div className="pt-2 flex items-center justify-center lg:justify-start gap-2 text-[11px] text-slate-400">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span>Student-led educational community at Prashanti Institute of Technology &amp; Science, Ujjain</span>
            </div>
          </div>

          {/* Right Column: Animated Interactive Cloud Graphic */}
          <div className="lg:col-span-5 flex justify-center">
            <InteractiveCloudGraphic />
          </div>
        </div>

        {/* Community Indicators & Transparent Metrics */}
        <div className="mt-16 pt-8 border-t border-slate-800/80">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 md:gap-6 text-center">
            <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-4 backdrop-blur-sm">
              <div className="text-2xl sm:text-3xl font-extrabold text-amber-400">PITS</div>
              <p className="text-xs text-slate-400 mt-1">Ujjain Campus Chapter</p>
            </div>
            <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-4 backdrop-blur-sm">
              <div className="text-2xl sm:text-3xl font-extrabold text-white">100%</div>
              <p className="text-xs text-slate-400 mt-1">Student &amp; Peer Led</p>
            </div>
            <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-4 backdrop-blur-sm">
              <div className="text-2xl sm:text-3xl font-extrabold text-sky-400">Hands-on</div>
              <p className="text-xs text-slate-400 mt-1">Practical Lab Sessions</p>
            </div>
            <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-4 backdrop-blur-sm">
              <div className="text-2xl sm:text-3xl font-extrabold text-emerald-400">Open</div>
              <p className="text-xs text-slate-400 mt-1">All Engineering Branches</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
