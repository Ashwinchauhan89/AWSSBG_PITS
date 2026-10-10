import Link from "next/link";
import {
  Cloud,
  Shield,
  Users,
  Sparkles,
  ArrowRight,
  BookOpen,
  Award,
  Layers,
  CheckCircle2,
} from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { COMMUNITY_INFO } from "@/lib/data/initialData";

export const metadata = {
  title: "About Our Community",
  description:
    "Learn about the mission, values, and student-led initiatives of the AWS Student Builder Group at Prashanti Institute of Technology & Science, Ujjain.",
};




const PILLARS = [
  {
    icon: BookOpen,
    title: "Hands-on Practical Learning",
    description:
      "We prioritize interactive labs, live architectural demos, and console walkthroughs over pure theoretical lectures.",
  },
  {
    icon: Layers,
    title: "Project-Centric Cohorts",
    description:
      "Students collaborate in small sprint groups to create real open-source and cloud applications that solve real campus or community challenges.",
  },
  {
    icon: Users,
    title: "Inclusive Multidisciplinary Access",
    description:
      "Technology is for every aspiring builder. We actively support students across Computer Science, Information Technology, AI, Electronics, and Mechanical Engineering.",
  },
  {
    icon: Award,
    title: "Certification & Career Readiness",
    description:
      "Demystifying cloud career pathways, resume architecture reviews, and exam preparation using verified AWS Skill Builder resources.",
  },
];

export default function AboutPage() {
  return (
    <div className="py-12 sm:py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <Badge variant="orange" size="md">
            Our Mission &amp; Identity
          </Badge>
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Empowering Campus Builders with Cloud &amp; AI
          </h1>
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
            The AWS Student Builder Group (SBG) at {COMMUNITY_INFO.college} is a peer-driven technical community helping students discover the transformative power of modern cloud computing and artificial intelligence.
          </p>
        </div>

        {/* What is SBG Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-5">
            <Badge variant="blue" size="sm">
              Community Overview
            </Badge>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              What is the AWS Student Builder Group?
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed">
              The AWS Student Builder Group at {COMMUNITY_INFO.collegeShort} is a student-led developer forum established to bridge the gap between academic classroom coursework and modern industry cloud practices.
            </p>
            <p className="text-sm text-slate-300 leading-relaxed">
              Under the leadership of Group Leader <strong className="text-amber-400">{COMMUNITY_INFO.leaderName}</strong>, our community organizes weekend bootcamps, hands-on console sessions, architecture reviews, and hackathon teams. We believe that the best way to master Amazon Web Services is by launching real services, testing architectures, and debugging live code.
            </p>

            <div className="space-y-2 pt-2">
              <div className="flex items-start gap-2.5 text-xs text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>Zero-cost participation in campus meetups and study groups.</span>
              </div>
              <div className="flex items-start gap-2.5 text-xs text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>Open to all students from 1st to 4th year regardless of department.</span>
              </div>
              <div className="flex items-start gap-2.5 text-xs text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>Focus on practical deployment: compute, storage, databases, and GenAI.</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-8 backdrop-blur-md space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
                  <Cloud className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">
                    {COMMUNITY_INFO.shortName} Chapter
                  </h3>
                  <p className="text-xs text-amber-400">
                    {COMMUNITY_INFO.city}
                  </p>
                </div>
              </div>

              <div className="space-y-3 text-xs text-slate-300 border-t border-slate-800/80 pt-4">
                <div className="flex justify-between py-1 border-b border-slate-800/40">
                  <span className="text-slate-400">College:</span>
                  <span className="font-semibold text-white">{COMMUNITY_INFO.collegeShort}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-800/40">
                  <span className="text-slate-400">Leader:</span>
                  <span className="font-semibold text-white">{COMMUNITY_INFO.leaderName}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-800/40">
                  <span className="text-slate-400">Model:</span>
                  <span className="font-semibold text-emerald-400">100% Student-Organized</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-slate-400">Focus Areas:</span>
                  <span className="font-semibold text-amber-400">Cloud, AI/ML, GenAI, Web</span>
                </div>
              </div>

              <div className="pt-2">
                <Link href="/join">
                  <Button className="w-full gap-2">
                    <Sparkles className="w-4 h-4" />
                    <span>Apply to Join Core Team</span>
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Four Community Pillars */}
        <div className="space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              The Four Pillars of Our Community
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Guiding how we design workshops, support members, and collaborate.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {PILLARS.map((pillar, idx) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={idx}
                  className="rounded-2xl border border-slate-800 bg-slate-900/40 p-6 backdrop-blur-sm space-y-3 hover:border-slate-700 transition-colors"
                >
                  <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center text-amber-400">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-sm font-bold text-white">
                    {pillar.title}
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Multidisciplinary participation note */}
        <div className="rounded-3xl border border-slate-800 bg-slate-900/30 p-8 sm:p-10 space-y-4">
          <h2 className="text-xl sm:text-2xl font-bold text-white">
            Multidisciplinary Participation &amp; Peer Learning
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Cloud computing and AI are not restricted to Computer Science alone. Civil and Mechanical students use cloud IoT for smart structures and automated sensor pipelines; Electronics students leverage edge computing and AWS IoT Greengrass; and management-focused engineers master cloud economics and FinOps.
          </p>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            At {COMMUNITY_INFO.collegeShort}, our group encourages peer learning where experienced seniors mentor juniors, and cross-departmental teams collaborate to build solutions for real-world hackathons.
          </p>
        </div>

        {/* Transparent Non-Corporate Community Notice */}
        <div className="rounded-2xl border border-amber-500/30 bg-amber-500/5 p-6 sm:p-8 space-y-3">
          <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
            <Shield className="w-5 h-5 shrink-0" />
            <span>Clear Educational Community Status</span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            The AWS Student Builder Group at Prashanti Institute of Technology &amp; Science (PITS), Ujjain is a student-led educational community designed for hands-on extracurricular learning. It is not an official corporate entity of Amazon Web Services, Inc., nor does it represent AWS corporate employment.
          </p>
          <p className="text-xs text-slate-400 leading-relaxed">
            All certifications, vouchers, or official learning benefits mentioned in our discussions depend on official AWS program eligibility requirements and are not independently guaranteed by the student club.
          </p>
          <div className="pt-2">
            <a
              href={COMMUNITY_INFO.officialAwsSbgUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-amber-400 hover:text-amber-300 font-semibold underline underline-offset-4"
            >
              Read official AWS Student Builder Groups program details &rarr;
            </a>
          </div>
        </div>

        {/* Final CTA */}
        <div className="text-center space-y-4">
          <h2 className="text-2xl font-bold text-white">
            Ready to learn with us at PITS Ujjain?
          </h2>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link href="/events">
              <Button variant="secondary" size="md">
                Browse Upcoming Workshops
              </Button>
            </Link>
            <Link href="/join">
              <Button size="md" className="gap-2">
                <span>Apply for Core Team</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
