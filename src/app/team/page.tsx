import Link from "next/link";
import {
  ShieldCheck,
  Sparkles,
  ArrowRight,
  Award,
  Users,
  Compass,
  Code,
  Terminal,
  Cpu,
  CheckCircle2,
} from "lucide-react";
import { Github, Linkedin } from "@/components/ui/Icons";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { INITIAL_TEAM_MEMBERS, COMMUNITY_INFO } from "@/lib/data/initialData";

export const metadata = {
  title: "Core Team & Leadership | AWS Student Builder Group",
  description:
    "Meet the student leaders and domain coordinators of the AWS Student Builder Group at Prashanti Institute of Technology & Science, Ujjain.",
};

export default function TeamPage() {
  const appointedLeader = INITIAL_TEAM_MEMBERS.find((m) => m.isLead) || INITIAL_TEAM_MEMBERS[0];
  const vacantRoles = INITIAL_TEAM_MEMBERS.filter((m) => m.isVacant);

  // Group vacant roles into editorial domains
  const execRoles = vacantRoles.filter((r) => r.category === "Leadership");
  const techRoles = vacantRoles.filter((r) => r.category === "Technical");
  const opsRoles = vacantRoles.filter((r) => r.category === "Operations" || r.category === "Outreach");
  const creativeRoles = vacantRoles.filter((r) => r.category === "Creative");

  return (
    <div className="py-12 sm:py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-mono font-semibold tracking-wider uppercase">
            <Users className="w-3.5 h-3.5" />
            <span>CAMPUS LEADERSHIP DIRECTORY</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight uppercase">
            The Builders Behind <br />
            <span className="bg-gradient-to-r from-amber-400 via-orange-400 to-sky-400 bg-clip-text text-transparent">
              AWS SBG PITS
            </span>
          </h1>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-light">
            The AWS Student Builder Group at {COMMUNITY_INFO.college} is led by dedicated student volunteers committed to advancing cloud knowledge and mentoring developer peers.
          </p>
        </div>

        {/* 1. Monumental Editorial Leader Showcase */}
        <div className="space-y-6">
          <div className="flex items-center gap-2 border-b border-white/10 pb-3">
            <ShieldCheck className="w-5 h-5 text-amber-400" />
            <h2 className="text-lg font-bold text-white uppercase tracking-wider font-mono">
              Appointed Student Chapter Leader
            </h2>
          </div>

          <div className="hud-corner rounded-3xl border border-amber-500/40 bg-gradient-to-b from-[#101A2C]/90 via-[#080A0F]/95 to-[#101A2C]/80 p-8 sm:p-12 backdrop-blur-2xl shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-[550px] h-[350px] volumetric-glow pointer-events-none -z-10" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Leader Avatar & Badges */}
              <div className="lg:col-span-4 flex flex-col items-center sm:items-start text-center sm:text-left space-y-4">
                <div className="relative">
                  <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-3xl bg-gradient-to-tr from-amber-500 via-orange-500 to-amber-600 flex items-center justify-center text-slate-950 font-black text-4xl shadow-2xl shadow-orange-500/30 border-2 border-white/20">
                    AC
                  </div>
                  <span className="absolute -bottom-2 -right-2 flex h-6 w-6">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-6 w-6 bg-emerald-500 border-2 border-[#080A0F] text-[10px] items-center justify-center font-bold text-slate-950">
                      ✓
                    </span>
                  </span>
                </div>

                <div>
                  <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                    {appointedLeader.name}
                  </h3>
                  <p className="text-sm font-bold text-amber-400 mt-1 font-mono">
                    {appointedLeader.role}
                  </p>
                  <p className="text-xs text-slate-400 mt-1 font-mono">
                    {COMMUNITY_INFO.collegeShort} • {appointedLeader.department} ({appointedLeader.year})
                  </p>
                </div>

                <div className="flex items-center gap-2 pt-1">
                  {appointedLeader.linkedinUrl && (
                    <a
                      href={appointedLeader.linkedinUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
                      title="LinkedIn Profile"
                    >
                      <Linkedin className="w-4 h-4" />
                    </a>
                  )}
                  {appointedLeader.githubUrl && (
                    <a
                      href={appointedLeader.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
                      title="GitHub Profile"
                    >
                      <Github className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>

              {/* Leader Mission, Quote & Core Responsibilities */}
              <div className="lg:col-span-8 space-y-6">
                <blockquote className="text-base sm:text-xl font-light italic text-slate-200 border-l-2 border-amber-400 pl-4 py-1 leading-relaxed">
                  &ldquo;Our vision at Prashanti Institute is to cultivate hands-on cloud and AI literacy where student developers don&apos;t just read about technologies—they launch services, architect solutions, and build resume-defining prototypes together.&rdquo;
                </blockquote>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-light">
                  {appointedLeader.bio}
                </p>

                {/* Leader Key Responsibilities Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                  <div className="p-4 rounded-2xl bg-[#080A0F]/80 border border-white/10 space-y-1">
                    <Compass className="w-4 h-4 text-amber-400" />
                    <div className="text-xs font-bold text-white">Community Vision</div>
                    <p className="text-[11px] text-slate-400 leading-normal">
                      Aligning semester technical roadmaps with AWS Skill Builder learning paths.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-[#080A0F]/80 border border-white/10 space-y-1">
                    <Terminal className="w-4 h-4 text-sky-400" />
                    <div className="text-xs font-bold text-white">Workshop Curation</div>
                    <p className="text-[11px] text-slate-400 leading-normal">
                      Structuring zero-cost hands-on labs in PITS computer labs.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-[#080A0F]/80 border border-white/10 space-y-1">
                    <Users className="w-4 h-4 text-emerald-400" />
                    <div className="text-xs font-bold text-white">Core Team Mentorship</div>
                    <p className="text-[11px] text-slate-400 leading-normal">
                      Conducting student interviews, technical screening, and sprint coordination.
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-xs font-mono text-slate-400 pt-2">
                  <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>Only confirmed appointed member. All other positions below are open for recruitment.</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 2. Categorized Open Core Team Positions (Editorial Layout) */}
        <div className="space-y-10 pt-4">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-white/10 pb-4">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-mono text-amber-400 font-bold mb-1">
                <Sparkles className="w-3.5 h-3.5" />
                <span>ACTIVE CAMPUS RECRUITMENT</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight uppercase">
                Open Core Team Positions
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-1 font-light">
                The positions below have not yet been permanently appointed. Students from all branches with min 7.0 CGPA are invited to apply.
              </p>
            </div>

            <Link href="/join">
              <Button size="md" className="gap-2 shrink-0 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-bold text-xs uppercase">
                <Sparkles className="w-4 h-4" />
                <span>Apply for Core Team</span>
              </Button>
            </Link>
          </div>

          {/* Group 1: Technical Architecture Leads */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-widest text-sky-400 font-mono flex items-center gap-2">
              <Cpu className="w-4 h-4" />
              <span>Technical &amp; Architecture Domains</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {techRoles.map((role) => (
                <div
                  key={role.id}
                  className="cinematic-glass rounded-3xl p-6 border border-dashed border-white/15 flex flex-col justify-between space-y-4 group hover:border-amber-400/50 transition-all hover:-translate-y-1"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-sky-400/10 text-sky-400 border border-sky-400/20">
                        Technical
                      </span>
                      <span className="text-[10px] font-mono font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                        Open for Application
                      </span>
                    </div>

                    <h4 className="text-lg font-bold text-white group-hover:text-amber-400 transition-colors">
                      {role.role}
                    </h4>

                    <p className="text-xs text-slate-300 leading-relaxed font-light">
                      {role.bio}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                    <span className="text-[10px] font-mono text-slate-400">
                      Criteria: 7.0+ CGPA
                    </span>
                    <Link
                      href={`/join?role=${encodeURIComponent(role.role)}`}
                      className="text-xs font-mono font-bold text-amber-400 hover:text-amber-300 flex items-center gap-1"
                    >
                      Apply Now
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Group 2: Executive & Operations Leads */}
          <div className="space-y-4 pt-4">
            <h3 className="text-sm font-bold uppercase tracking-widest text-amber-400 font-mono flex items-center gap-2">
              <Compass className="w-4 h-4" />
              <span>Executive, Operations &amp; Outreach Domains</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[...execRoles, ...opsRoles].map((role) => (
                <div
                  key={role.id}
                  className="cinematic-glass rounded-3xl p-6 border border-dashed border-white/15 flex flex-col justify-between space-y-4 group hover:border-amber-400/50 transition-all hover:-translate-y-1"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-amber-400/10 text-amber-400 border border-amber-400/20">
                        {role.category}
                      </span>
                      <span className="text-[10px] font-mono font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                        Open for Application
                      </span>
                    </div>

                    <h4 className="text-lg font-bold text-white group-hover:text-amber-400 transition-colors">
                      {role.role}
                    </h4>

                    <p className="text-xs text-slate-300 leading-relaxed font-light">
                      {role.bio}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                    <span className="text-[10px] font-mono text-slate-400">
                      Criteria: 7.0+ CGPA
                    </span>
                    <Link
                      href={`/join?role=${encodeURIComponent(role.role)}`}
                      className="text-xs font-mono font-bold text-amber-400 hover:text-amber-300 flex items-center gap-1"
                    >
                      Apply Now
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Group 3: Creative & Design Leads */}
          <div className="space-y-4 pt-4">
            <h3 className="text-sm font-bold uppercase tracking-widest text-purple-400 font-mono flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              <span>Creative &amp; Design Domains</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {creativeRoles.map((role) => (
                <div
                  key={role.id}
                  className="cinematic-glass rounded-3xl p-6 border border-dashed border-white/15 flex flex-col justify-between space-y-4 group hover:border-amber-400/50 transition-all hover:-translate-y-1"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-purple-400/10 text-purple-400 border border-purple-400/20">
                        Creative
                      </span>
                      <span className="text-[10px] font-mono font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                        Open for Application
                      </span>
                    </div>

                    <h4 className="text-lg font-bold text-white group-hover:text-amber-400 transition-colors">
                      {role.role}
                    </h4>

                    <p className="text-xs text-slate-300 leading-relaxed font-light">
                      {role.bio}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                    <span className="text-[10px] font-mono text-slate-400">
                      Criteria: 7.0+ CGPA
                    </span>
                    <Link
                      href={`/join?role=${encodeURIComponent(role.role)}`}
                      className="text-xs font-mono font-bold text-amber-400 hover:text-amber-300 flex items-center gap-1"
                    >
                      Apply Now
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 3. 4-Stage Selection & Interview Roadmap */}
        <div className="hud-corner rounded-3xl border border-white/10 bg-[#101A2C]/60 p-8 sm:p-10 space-y-6">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-amber-400" />
            <h2 className="text-xl font-bold text-white tracking-tight uppercase">
              How Core Team Selection Works
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-light max-w-3xl">
            All positions require an initial application review followed by an interactive technical and organizational discussion. We value enthusiasm to teach, organize, and learn just as much as coding expertise.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 pt-2">
            <div className="p-5 rounded-2xl bg-[#080A0F]/80 border border-white/10 space-y-2">
              <span className="text-[10px] font-mono font-bold text-amber-400 uppercase">Stage 01</span>
              <h4 className="text-sm font-bold text-white">Application Review</h4>
              <p className="text-xs text-slate-400 font-light">
                Submit CGPA (&ge; 7.0), department info, technical skills, and reason for applying.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[#080A0F]/80 border border-white/10 space-y-2">
              <span className="text-[10px] font-mono font-bold text-sky-400 uppercase">Stage 02</span>
              <h4 className="text-sm font-bold text-white">Portfolio Screening</h4>
              <p className="text-xs text-slate-400 font-light">
                Leadership evaluates GitHub projects, workshop ideas, and past extracurricular efforts.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[#080A0F]/80 border border-white/10 space-y-2">
              <span className="text-[10px] font-mono font-bold text-purple-400 uppercase">Stage 03</span>
              <h4 className="text-sm font-bold text-white">Peer Interview</h4>
              <p className="text-xs text-slate-400 font-light">
                Interactive conversation with Group Leader Ashwin Chauhan and faculty advisors.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[#080A0F]/80 border border-white/10 space-y-2">
              <span className="text-[10px] font-mono font-bold text-emerald-400 uppercase">Stage 04</span>
              <h4 className="text-sm font-bold text-white">Campus Onboarding</h4>
              <p className="text-xs text-slate-400 font-light">
                Appointed coordinators receive onboarding kits, chapter credentials, and event lead roles.
              </p>
            </div>
          </div>
        </div>

        {/* 4. Educational Disclaimer */}
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6 text-center text-xs text-slate-400 space-y-1">
          <div className="flex items-center justify-center gap-1.5 text-amber-400 font-semibold">
            <ShieldCheck className="w-4 h-4" />
            <span>Student-Led Campus Chapter Status</span>
          </div>
          <p>
            The AWS Student Builder Group at Prashanti Institute of Technology &amp; Science is an independent student educational community. Group Leader Ashwin Chauhan and appointed coordinators are student volunteers and are not employees or agents of Amazon Web Services, Inc.
          </p>
        </div>
      </div>
    </div>
  );
}
