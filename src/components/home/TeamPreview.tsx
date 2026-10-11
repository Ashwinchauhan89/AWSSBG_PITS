import Link from "next/link";
import { Sparkles, ArrowRight, ShieldCheck } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { INITIAL_TEAM_MEMBERS, COMMUNITY_INFO } from "@/lib/data/initialData";

export function TeamPreview() {
  const leader = INITIAL_TEAM_MEMBERS.find((m) => m.isLead);
  const openRoles = INITIAL_TEAM_MEMBERS.filter((m) => m.isVacant).slice(0, 4);

  return (
    <section id="team" className="py-20 border-b border-slate-800/80 bg-slate-950 relative">
      <div className="responsive-container">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-3 max-w-2xl">
            <Badge variant="orange" size="md">
              Leadership &amp; Core Team
            </Badge>
            <h2 className="text-2xl xs:text-3xl sm:text-4xl 3xl:text-5xl font-extrabold text-white tracking-tight">
              Community Leads &amp; Coordinators
            </h2>
            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
              Meet our student leadership team driving cloud literacy, technical workshops, and developer mentoring at Prashanti Institute of Technology &amp; Science.
            </p>
          </div>
          <Link href="/team" className="w-full sm:w-auto">
            <Button variant="secondary" size="md" className="gap-2 shrink-0 w-full sm:w-auto">
              <span>View Full Directory</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-stretch">
          {/* Confirmed Group Leader Card */}
          {leader && (
            <div className="lg:col-span-5 rounded-3xl border border-amber-500/40 bg-gradient-to-b from-amber-500/10 via-slate-900/90 to-slate-950 p-6 sm:p-8 backdrop-blur-md shadow-2xl relative flex flex-col justify-between">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <Badge variant="orange" size="md" className="font-bold">
                    Appointed Community Leader
                  </Badge>
                  <span className="flex items-center gap-1 text-[11px] text-amber-400 font-semibold bg-amber-500/10 px-2.5 py-1 rounded-full border border-amber-500/20">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    Official Chapter Lead
                  </span>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-amber-500 to-orange-600 flex items-center justify-center text-slate-950 font-bold text-xl shadow-lg shadow-orange-500/20 shrink-0">
                    AC
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">
                      {leader.name}
                    </h3>
                    <p className="text-xs font-semibold text-amber-400 mt-0.5">
                      {leader.role}
                    </p>
                    <p className="text-[11px] text-slate-400 mt-1">
                      {COMMUNITY_INFO.collegeShort} • {leader.department}
                    </p>
                  </div>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed">
                  {leader.bio}
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-slate-800/80 flex items-center justify-between">
                <span className="text-[11px] text-slate-400">
                  Prashanti Institute of Technology &amp; Science
                </span>
                <Link
                  href="/team"
                  className="text-xs font-bold text-amber-400 hover:text-amber-300 flex items-center gap-1"
                >
                  View Profile
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          )}

          {/* Active Recruitment Callout for Vacant Roles */}
          <div className="lg:col-span-7 rounded-3xl border border-slate-800 bg-slate-900/40 p-8 backdrop-blur-md flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <Badge variant="blue" size="md">
                  Core Team Recruitment Open
                </Badge>
                <span className="text-xs text-slate-400 font-mono">
                  Min 7.0 CGPA
                </span>
              </div>

              <h3 className="text-xl font-bold text-white mb-2">
                Join the Organizing &amp; Technical Core Team
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed mb-6">
                We are actively interviewing students with passion for Cloud Computing, AI/ML, Web Development, and Community Management for the following student leadership roles:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                {openRoles.map((role) => (
                  <div
                    key={role.id}
                    className="flex items-start gap-3 p-3 rounded-xl border border-slate-800/80 bg-slate-950/60"
                  >
                    <div className="w-2 h-2 rounded-full bg-amber-400 mt-1.5 shrink-0" />
                    <div>
                      <h4 className="text-xs font-semibold text-white">
                        {role.role}
                      </h4>
                      <p className="text-[10px] text-slate-400 mt-0.5 line-clamp-2">
                        {role.bio}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
              <span className="text-xs text-slate-400 text-center sm:text-left">
                Selection process includes review of CGPA, skills &amp; interactive interview.
              </span>
              <Link href="/join">
                <Button size="md" className="gap-2 shrink-0 w-full sm:w-auto">
                  <Sparkles className="w-4 h-4" />
                  <span>Apply for Core Team</span>
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
