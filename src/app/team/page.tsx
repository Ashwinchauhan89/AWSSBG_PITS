import Link from "next/link";
import {
  ShieldCheck,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import { Github, Linkedin } from "@/components/ui/Icons";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { INITIAL_TEAM_MEMBERS, COMMUNITY_INFO } from "@/lib/data/initialData";

export const metadata = {
  title: "Core Team & Leadership",
  description:
    "Meet the student leaders and domain coordinators of the AWS Student Builder Group at Prashanti Institute of Technology & Science, Ujjain.",
};

export default function TeamPage() {
  const appointedMembers = INITIAL_TEAM_MEMBERS.filter((m) => !m.isVacant);
  const vacantRoles = INITIAL_TEAM_MEMBERS.filter((m) => m.isVacant);

  return (
    <div className="py-12 sm:py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <Badge variant="orange" size="md">
            Student Leadership Directory
          </Badge>
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Meet the SBG Core Team
          </h1>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            The AWS Student Builder Group at {COMMUNITY_INFO.college} is led by dedicated student volunteers committed to advancing cloud knowledge and mentoring developer peers.
          </p>
        </div>

        {/* Leadership Section */}
        <div className="space-y-6">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-amber-400" />
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              Appointed Leadership
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {appointedMembers.map((member) => (
              <div
                key={member.id}
                className="rounded-3xl border border-amber-500/40 bg-gradient-to-b from-amber-500/10 via-slate-900/90 to-slate-950 p-7 backdrop-blur-md shadow-xl flex flex-col justify-between space-y-6"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Badge variant="orange" size="sm" className="font-bold">
                      {member.isLead ? "Group Leader" : "Appointed Lead"}
                    </Badge>
                    <span className="text-[11px] text-amber-400 font-mono">
                      Active
                    </span>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-amber-500 to-orange-600 flex items-center justify-center text-slate-950 font-bold text-xl shadow-lg shadow-orange-500/20 shrink-0">
                      AC
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white">
                        {member.name}
                      </h3>
                      <p className="text-xs font-semibold text-amber-400">
                        {member.role}
                      </p>
                      <p className="text-[11px] text-slate-400 mt-0.5">
                        {member.department} • {member.year}
                      </p>
                    </div>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed">
                    {member.bio}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between">
                  <span className="text-[11px] text-slate-400">
                    {COMMUNITY_INFO.collegeShort}
                  </span>
                  <div className="flex items-center gap-2">
                    {member.linkedinUrl && (
                      <a
                        href={member.linkedinUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 rounded-lg bg-slate-800/60 text-slate-400 hover:text-white transition-colors"
                        title="LinkedIn Profile"
                      >
                        <Linkedin className="w-4 h-4" />
                      </a>
                    )}
                    {member.githubUrl && (
                      <a
                        href={member.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 rounded-lg bg-slate-800/60 text-slate-400 hover:text-white transition-colors"
                        title="GitHub Profile"
                      >
                        <Github className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Clearly Labeled Open Recruitment Positions */}
        <div className="space-y-6 pt-6 border-t border-slate-800">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-amber-400" />
                <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                  Open Core Team Positions (Under Recruitment)
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                The positions below have not yet been permanently appointed and are open for student applications.
              </p>
            </div>
            <Link href="/join">
              <Button size="md" className="gap-2 shrink-0">
                <Sparkles className="w-4 h-4" />
                <span>Apply for a Role</span>
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {vacantRoles.map((role) => (
              <div
                key={role.id}
                className="rounded-2xl border border-dashed border-slate-800 bg-slate-900/40 p-6 backdrop-blur-sm flex flex-col justify-between space-y-4 hover:border-amber-500/40 transition-colors"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Badge variant="blue" size="sm">
                      {role.category}
                    </Badge>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20">
                      Open for Application
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-white">
                    {role.role}
                  </h3>

                  <p className="text-xs text-slate-400 leading-relaxed">
                    {role.bio}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-800/60 flex items-center justify-between">
                  <span className="text-[11px] text-slate-500 font-mono">
                    Criteria: 7.0+ CGPA
                  </span>
                  <Link
                    href={`/join?role=${encodeURIComponent(role.role)}`}
                    className="text-xs font-bold text-amber-400 hover:text-amber-300 flex items-center gap-1"
                  >
                    Apply Now
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Criteria & Interview Process */}
        <div className="rounded-3xl border border-slate-800 bg-slate-900/40 p-8 space-y-4">
          <h2 className="text-lg font-bold text-white">
            How Are Core Team Members Selected?
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            All positions require an initial application review followed by an interactive technical and organizational discussion. We value enthusiasm to teach and learn just as much as technical prowess.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-1">
              <span className="text-xs font-bold text-amber-400">Step 1: Application</span>
              <p className="text-xs text-slate-400">Submit your CGPA, academic details, and technical interests.</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-1">
              <span className="text-xs font-bold text-amber-400">Step 2: Review</span>
              <p className="text-xs text-slate-400">Core leadership reviews project portfolios and motivation statements.</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-1">
              <span className="text-xs font-bold text-amber-400">Step 3: Interview</span>
              <p className="text-xs text-slate-400">Interactive peer interview with Leader Ashwin Chauhan and mentors.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
