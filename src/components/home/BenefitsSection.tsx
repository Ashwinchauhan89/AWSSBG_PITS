import {
  Award,
  Users2,
  Terminal,
  Sparkles,
  Briefcase,
  Compass,
} from "lucide-react";
import { Badge } from "@/components/ui/Badge";

const BENEFITS = [
  {
    icon: Terminal,
    title: "Practical Hands-on Cloud Labs",
    description:
      "Go beyond theory. Launch real EC2 instances, configure S3 buckets, deploy Lambda serverless functions, and experiment with AWS Free Tier.",
  },
  {
    icon: Sparkles,
    title: "Cutting-Edge Generative AI",
    description:
      "Build real GenAI prototypes using Amazon Bedrock foundation models, learn prompt engineering, and connect vector databases.",
  },
  {
    icon: Briefcase,
    title: "Portfolio-Grade Projects",
    description:
      "Collaborate on production-style software projects you can proudly showcase on your GitHub and resume for placements and internships.",
  },
  {
    icon: Award,
    title: "AWS Certification Guidance",
    description:
      "Structured learning paths for AWS Certified Cloud Practitioner and Solutions Architect Associate using free AWS Skill Builder resources.",
  },
  {
    icon: Users2,
    title: "Supportive Peer Mentorship",
    description:
      "Learn alongside fellow students at Prashanti Institute of Technology & Science in a friendly, no-judgment environment.",
  },
  {
    icon: Compass,
    title: "Leadership & Speaking Skills",
    description:
      "Gain community leadership, workshop hosting, and event management experience as a Core Team volunteer.",
  },
];

export function BenefitsSection() {
  return (
    <section className="py-24 sm:py-32 border-b border-white/10 bg-[#080A0F] relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] volumetric-glow pointer-events-none -z-10" />
      <div className="absolute inset-0 tech-grid opacity-15 pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-mono font-semibold tracking-wider uppercase">
            <span>CAMPUS ADVANTAGES</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight uppercase">
            Engineered For <br />
            <span className="bg-gradient-to-r from-amber-400 via-orange-400 to-sky-400 bg-clip-text text-transparent">
              Student Builders
            </span>
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-light">
            Whether you are in your 1st year taking your first programming steps or in your final year preparing for campus placements, the AWS Student Builder Group provides the community, sandboxes, and guidance to grow.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {BENEFITS.map((b, idx) => {
            const Icon = b.icon;
            return (
              <div
                key={idx}
                className="cinematic-glass cinematic-glass-hover rounded-3xl p-7 border border-white/10 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 group"
              >
                <div className="w-12 h-12 rounded-2xl bg-amber-500/15 border border-amber-500/30 text-amber-400 flex items-center justify-center mb-5 shadow-lg shadow-orange-500/20">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-amber-400 transition-colors">
                  {b.title}
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed font-light">
                  {b.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
