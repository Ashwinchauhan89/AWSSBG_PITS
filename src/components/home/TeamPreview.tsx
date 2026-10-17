import Link from "next/link";
import { Sparkles, ArrowRight, ShieldCheck, Award, Cpu, BookOpen, Terminal } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { INITIAL_TEAM_MEMBERS, COMMUNITY_INFO } from "@/lib/data/initialData";

export function TeamPreview() {
  const leader = INITIAL_TEAM_MEMBERS.find((m) => m.isLead) || INITIAL_TEAM_MEMBERS[0];
  const directors = INITIAL_TEAM_MEMBERS.filter((m) => !m.isLead && !m.isVacant);

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <section id="team" className="py-20 border-b border-slate-800/80 bg-slate-950 relative">
      <div className="responsive-container">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-3 max-w-2xl">
            <Badge variant="orange" size="md">
              Official Chapter Leadership Board
            </Badge>
            <h2 className="text-2xl xs:text-3xl sm:text-4xl 3xl:text-5xl font-extrabold text-white tracking-tight">
              Directors &amp; Core Leadership Squad
            </h2>
            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
              Meet our appointed student leaders guiding Cloud Computing, AI/ML, Data Engineering, DevOps, Innovation, Marketing, and Design at {COMMUNITY_INFO.college}.
            </p>
          </div>
          <Link href="/team" className="w-full sm:w-auto">
            <Button variant="secondary" size="md" className="gap-2 shrink-0 w-full sm:w-auto">
              <span>View Full Directory &amp; Roadmaps</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-stretch mb-8">
          {/* Confirmed Group Leader Card */}
          {leader && (
            <div className="lg:col-span-5 rounded-3xl border border-amber-500/40 bg-gradient-to-b from-amber-500/10 via-slate-900/90 to-slate-950 p-6 sm:p-8 backdrop-blur-md shadow-2xl relative flex flex-col justify-between">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <Badge variant="orange" size="md" className="font-bold">
                    Chapter Leader &amp; Founder
                  </Badge>
                  <span className="flex items-center gap-1 text-[11px] text-amber-400 font-semibold bg-amber-500/10 px-2.5 py-1 rounded-full border border-amber-500/20">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    Appointed
                  </span>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-amber-500 to-orange-600 flex items-center justify-center text-slate-950 font-black text-2xl shadow-lg shadow-orange-500/20 shrink-0">
                    {getInitials(leader.name)}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">
                      {leader.name}
                    </h3>
                    <p className="text-xs font-semibold text-amber-400 mt-0.5 font-mono">
                      {leader.role}
                    </p>
                    <p className="text-[11px] text-slate-400 mt-1 font-mono">
                      {COMMUNITY_INFO.collegeShort} • {leader.department} ({leader.year})
                    </p>
                  </div>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed font-light">
                  {leader.bio}
                </p>

                {leader.practicalTask && (
                  <div className="p-3.5 rounded-2xl bg-black/40 border border-amber-500/20 space-y-1.5">
                    <div className="flex items-center gap-1.5 text-[11px] font-mono font-bold text-amber-400 uppercase">
                      <Terminal className="w-3 h-3" />
                      <span>Chapter Capstone Task</span>
                    </div>
                    <div className="text-xs font-bold text-white">
                      {leader.practicalTask.title}
                    </div>
                    <p className="text-[11px] text-slate-300 line-clamp-2">
                      {leader.practicalTask.objective}
                    </p>
                  </div>
                )}
              </div>

              <div className="pt-6 mt-6 border-t border-slate-800/80 flex items-center justify-between">
                <span className="text-[11px] text-slate-400 font-mono">
                  Prashanti Institute of Technology &amp; Science
                </span>
                <Link
                  href="/team"
                  className="text-xs font-bold text-amber-400 hover:text-amber-300 flex items-center gap-1 font-mono"
                >
                  View Learning Path
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          )}

          {/* Directorate Highlights Grid */}
          <div className="lg:col-span-7 rounded-3xl border border-slate-800 bg-slate-900/40 p-6 sm:p-8 backdrop-blur-md flex flex-col justify-between space-y-6">
            <div>
              <div className="flex items-center justify-between mb-3">
                <Badge variant="blue" size="md">
                  Appointed Executive Board
                </Badge>
                <span className="text-xs text-slate-400 font-mono">
                  7 Core Directorates
                </span>
              </div>

              <h3 className="text-xl font-bold text-white mb-2">
                Specialized Technical &amp; Operational Directors
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed mb-4 font-light">
                Our directors lead hands-on curriculum tracks and mentor junior builders in computer labs:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {directors.map((dir) => (
                  <div
                    key={dir.id}
                    className="p-3.5 rounded-2xl border border-slate-800/80 bg-slate-950/70 hover:border-amber-400/40 transition-colors flex items-start gap-3 group"
                  >
                    <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-slate-800 to-slate-700 border border-white/10 flex items-center justify-center text-amber-400 font-bold text-xs shrink-0 group-hover:border-amber-400/50">
                      {getInitials(dir.name)}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-1">
                        <h4 className="text-xs font-bold text-white truncate group-hover:text-amber-400 transition-colors">
                          {dir.name}
                        </h4>
                        <div className="flex items-center gap-1 shrink-0">
                          {dir.isAdditional && (
                            <span className="text-[9px] font-mono px-1 py-0.5 rounded bg-amber-500/10 text-amber-300 border border-amber-500/30" title="Additional Team Member">
                              🌟
                            </span>
                          )}
                          <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-white/5 text-slate-400 shrink-0">
                            {dir.category}
                          </span>
                        </div>
                      </div>
                      <p className="text-[11px] text-amber-400 font-mono truncate mt-0.5">
                        {dir.role}
                      </p>
                      <p className="text-[10px] text-slate-400 line-clamp-1 mt-1 font-light">
                        {dir.practicalTask?.title || dir.bio}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4">
              <span className="text-xs text-slate-400 text-center sm:text-left font-light">
                Want to work with our Directors? Join our Junior Student Builder Cohort.
              </span>
              <Link href="/join">
                <Button size="md" className="gap-2 shrink-0 w-full sm:w-auto">
                  <Sparkles className="w-4 h-4" />
                  <span>Join as Junior Associate</span>
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
