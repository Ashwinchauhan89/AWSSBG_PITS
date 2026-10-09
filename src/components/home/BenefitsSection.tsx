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
    <section className="py-20 border-b border-slate-800/80 bg-slate-900/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
          <Badge variant="orange" size="md">
            Why Join SBG PITS
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Designed for Student Builders
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            Whether you are in your 1st year taking your first programming steps or in your final year preparing for campus placements, the AWS Student Builder Group provides the community and guidance to grow.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {BENEFITS.map((b, idx) => {
            const Icon = b.icon;
            return (
              <div
                key={idx}
                className="rounded-2xl border border-slate-800/80 bg-slate-950/60 p-6 backdrop-blur-sm transition-all duration-300 hover:border-amber-500/30 hover:bg-slate-900/40"
              >
                <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-white mb-2">
                  {b.title}
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
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
