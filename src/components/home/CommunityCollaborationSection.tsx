import React from "react";
import { ShieldCheck, Building2, Globe, Cpu, Users } from "lucide-react";
import { COMMUNITY_INFO } from "@/lib/data/initialData";

const COLLABORATORS = [
  {
    name: "Prashanti Institute of Technology & Science",
    role: "Academic Host Institution",
    location: "Ujjain, Madhya Pradesh",
    desc: "Provides state-of-the-art campus computer centers, faculty patronage, and academic support for student builder workshops.",
    icon: Building2,
    badge: "Campus Host",
    href: "http://prashantiinstitute.edu.in/",
  },
  {
    name: "AWS Student Builder Group Program",
    role: "Global Student Community Initiative",
    location: "Global Student Network",
    desc: "Independent student-led community affiliated through the AWS Student Builder Group initiative, accessing official learning frameworks.",
    icon: Globe,
    badge: "Community Initiative",
    href: COMMUNITY_INFO.officialAwsSbgUrl,
  },
  {
    name: "PITS Engineering Departments",
    role: "Academic Alignment & Lab Facilities",
    location: "Faculty of Engineering, PITS",
    desc: "Cross-departmental collaboration across Computer Science, AI/ML, and Information Technology students and mentors.",
    icon: Cpu,
    badge: "Academic Branches",
    href: "/about",
  },
  {
    name: "Student Developer Peer Circles",
    role: "Open-Source Campus Collaboration",
    location: "Student Builder Cohort",
    desc: "Independent student working squads collaborating on cloud prototypes, hackathon teams, and peer-to-peer technical mentorship.",
    icon: Users,
    badge: "Peer Community",
    href: "/team",
  },
];

export function CommunityCollaborationSection() {
  return (
    <section
      id="collaboration"
      className="py-20 sm:py-28 relative overflow-hidden bg-[#080A14] border-b border-white/10"
    >
      <div className="absolute inset-0 tech-grid opacity-10 pointer-events-none -z-10" />

      <div className="responsive-container">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-mono font-semibold tracking-wider uppercase shadow-sm">
            <ShieldCheck className="w-3.5 h-3.5 text-purple-400" />
            <span>ACADEMIC ALIGNMENT • BUILDER NETWORKS</span>
          </div>

          <h2 className="text-3xl xs:text-4xl sm:text-5xl font-black text-white tracking-tight uppercase">
            Community{" "}
            <span className="bg-gradient-to-r from-purple-400 via-violet-300 to-amber-300 bg-clip-text text-transparent">
              Collaboration
            </span>
          </h2>

          <p className="text-sm sm:text-base text-slate-300 font-light leading-relaxed">
            Collaborating with campus academic departments and verified student developer networks to foster an authentic, student-led builder ecosystem.
          </p>
        </div>

        {/* Collaborators Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {COLLABORATORS.map((collab, idx) => {
            const Icon = collab.icon;
            return (
              <div
                key={idx}
                className="relative rounded-[28px] p-6 sm:p-7 border border-purple-500/20 bg-[#0A0D1B]/90 backdrop-blur-2xl shadow-xl flex flex-col justify-between group hover:border-purple-400/50 transition-all duration-300"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-xl bg-purple-500/15 border border-purple-500/30 flex items-center justify-center text-purple-300">
                      <Icon className="w-5 h-5 text-amber-400" />
                    </div>
                    <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10 text-slate-300 uppercase">
                      {collab.badge}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-purple-300 transition-colors">
                      {collab.name}
                    </h3>
                    <p className="text-xs font-mono text-amber-400/90 font-medium mt-0.5">
                      {collab.role}
                    </p>
                  </div>

                  <p className="text-xs text-slate-300 font-light leading-relaxed">
                    {collab.desc}
                  </p>
                </div>

                <div className="pt-4 border-t border-purple-500/15 mt-5 flex items-center justify-between text-xs font-mono text-slate-400">
                  <span>{collab.location}</span>
                  {collab.href.startsWith("http") ? (
                    <a
                      href={collab.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-purple-300 hover:text-white transition-colors"
                    >
                      Visit &rarr;
                    </a>
                  ) : (
                    <span className="text-purple-400">Active Campus Cohort</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
