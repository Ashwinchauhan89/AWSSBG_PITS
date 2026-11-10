import React from "react";
import {
  Sparkles,
  Users,
  Terminal,
  ShieldCheck,
  Compass,
  ArrowRight,
  MapPin,
  CheckCircle2,
  Code2,
} from "lucide-react";
import Link from "next/link";
import { COMMUNITY_INFO } from "@/lib/data/initialData";

const HIGHLIGHTS = [
  {
    title: "Student-Led Learning",
    desc: "Curriculum designed and delivered by students for students, breaking down advanced cloud primitives into practical labs.",
  },
  {
    title: "Technical Knowledge Sharing",
    desc: "Open architecture walkthroughs, peer code reviews, and community-driven technical talks covering real AWS deployments.",
  },
  {
    title: "Community Collaboration",
    desc: "Cross-department student cohorts collaborating on innovative projects, hackathons, and open-source campus tools.",
  },
  {
    title: "Practical Development",
    desc: "Hands-on console experience building full-stack applications with serverless architectures, CI/CD, and databases.",
  },
  {
    title: "Technology Exploration",
    desc: "Safe exploration of emerging tech including Amazon Bedrock Generative AI, PyTorch on SageMaker, and CloudFormation.",
  },
];

export function AboutCommunitySection() {
  return (
    <section
      id="about"
      className="py-24 sm:py-32 relative overflow-hidden bg-[#080A14] border-b border-white/10"
    >
      {/* Background Volumetric Lighting & Cyber Grids */}
      <div className="absolute top-1/3 left-1/4 w-[600px] h-[350px] bg-purple-900/15 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[300px] bg-sky-900/15 rounded-full blur-[130px] pointer-events-none -z-10" />
      <div className="absolute inset-0 tech-grid opacity-15 pointer-events-none -z-10" />

      <div className="responsive-container">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Editorial Content */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-mono font-semibold tracking-wider uppercase shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-purple-400" />
              <span>ABOUT OUR COMMUNITY • PITS UJJAIN</span>
            </div>

            <h2 className="text-3xl xs:text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight uppercase leading-[1.08]">
              Built by Students. <br />
              <span className="bg-gradient-to-r from-purple-400 via-violet-300 to-amber-300 bg-clip-text text-transparent">
                Driven by Innovation.
              </span>
            </h2>

            <p className="text-sm sm:text-base lg:text-lg text-slate-300 font-light leading-relaxed">
              The <strong>AWS Student Builder Group at Prashanti Institute of Technology &amp; Science (PITS), Ujjain</strong> is an independent, student-led academic community. We bring together developers, cloud enthusiasts, and engineering students across all branches to explore cloud computing, artificial intelligence, software engineering, and modern DevOps through hands-on learning, collaborative projects, and peer mentorship.
            </p>

            {/* 5 Highlights Grid */}
            <div className="space-y-3.5 pt-2">
              {HIGHLIGHTS.map((h, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 p-3.5 rounded-2xl bg-[#0B0F1E]/60 border border-purple-500/15 hover:border-purple-400/30 transition-all duration-200"
                >
                  <div className="w-6 h-6 rounded-lg bg-purple-500/15 border border-purple-500/30 flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" />
                  </div>
                  <div className="space-y-0.5">
                    <span className="text-xs font-mono font-bold text-white block">
                      {h.title}
                    </span>
                    <span className="text-xs text-slate-300 font-light leading-relaxed block">
                      {h.desc}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Action buttons */}
            <div className="pt-4 flex flex-wrap items-center gap-4">
              <Link
                href="/about"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-purple-600/90 hover:bg-purple-600 text-white text-xs font-mono font-semibold tracking-wider transition-all duration-200 shadow-lg shadow-purple-600/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-400"
              >
                <span>Read Full Story</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/team"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white text-xs font-mono font-semibold tracking-wider transition-all duration-200"
              >
                <Users className="w-4 h-4 text-amber-400" />
                <span>Meet the Team</span>
              </Link>
            </div>
          </div>

          {/* Right Column: Conference-Grade Editorial Graphic Panel */}
          <div className="lg:col-span-5">
            <div className="relative rounded-[32px] border border-purple-500/30 bg-gradient-to-b from-[#110E26]/95 via-[#090C18]/95 to-[#0E1324]/90 p-6 sm:p-8 backdrop-blur-2xl shadow-2xl overflow-hidden group">
              <div className="absolute top-0 right-0 w-52 h-52 bg-purple-500/15 blur-3xl pointer-events-none -z-10" />
              <div className="absolute inset-x-0 top-0 h-[1.5px] bg-gradient-to-r from-transparent via-purple-400/50 to-transparent pointer-events-none" />

              {/* Campus telemetry top card */}
              <div className="space-y-6">
                <div className="flex items-center justify-between border-b border-purple-500/20 pb-4">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5 text-amber-400" />
                    <span className="font-mono text-xs font-bold text-white uppercase tracking-wider">
                      Campus Chapter Blueprint
                    </span>
                  </div>
                  <span className="font-mono text-[10px] text-purple-300 bg-purple-500/20 border border-purple-500/30 px-2.5 py-0.5 rounded-full uppercase">
                    PITS Ujjain
                  </span>
                </div>

                {/* Chapter Identity Card */}
                <div className="rounded-2xl bg-[#070912]/90 border border-white/10 p-5 space-y-3">
                  <div className="flex items-center gap-2 text-xs font-mono text-amber-400 font-semibold">
                    <Compass className="w-4 h-4" />
                    <span>Academic Alignment</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed font-light">
                    Affiliated through the AWS Student Builder Group program, empowering students with verified AWS Skill Builder resources, hands-on console governance, and industry-standard architecture blueprints.
                  </p>
                  <div className="pt-2 flex items-center gap-2 text-[11px] font-mono text-slate-400">
                    <MapPin className="w-3.5 h-3.5 text-purple-400" />
                    <span>{COMMUNITY_INFO.college}, Ujjain</span>
                  </div>
                </div>

                {/* Architecture stack chips */}
                <div className="space-y-2">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400 font-bold block">
                    Campus Builder Focus:
                  </span>
                  <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                    <div className="p-2.5 rounded-xl bg-white/5 border border-white/5 text-slate-200 flex items-center gap-2">
                      <Code2 className="w-3.5 h-3.5 text-sky-400" />
                      <span>Full-Stack Cloud</span>
                    </div>
                    <div className="p-2.5 rounded-xl bg-white/5 border border-white/5 text-slate-200 flex items-center gap-2">
                      <Terminal className="w-3.5 h-3.5 text-amber-400" />
                      <span>Free Tier Safety</span>
                    </div>
                    <div className="p-2.5 rounded-xl bg-white/5 border border-white/5 text-slate-200 flex items-center gap-2">
                      <Users className="w-3.5 h-3.5 text-purple-400" />
                      <span>Peer Mentoring</span>
                    </div>
                    <div className="p-2.5 rounded-xl bg-white/5 border border-white/5 text-slate-200 flex items-center gap-2">
                      <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Generative AI</span>
                    </div>
                  </div>
                </div>

                {/* Leadership citation */}
                <div className="pt-3 border-t border-purple-500/15 flex items-center justify-between text-xs font-mono text-slate-400">
                  <span>Student Group Leader:</span>
                  <span className="font-bold text-amber-300">{COMMUNITY_INFO.leaderName}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

