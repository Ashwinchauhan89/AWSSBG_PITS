import {
  Cloud,
  Cpu,
  Sparkles,
  Code2,
  Terminal,
  Shield,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/Badge";

const DOMAINS = [
  {
    icon: Cloud,
    title: "AWS Cloud Infrastructure",
    description:
      "Core cloud computing architectures: Amazon EC2 compute instances, S3 storage buckets, Virtual Private Clouds (VPC), and AWS Identity and Access Management (IAM).",
    color: "from-amber-500/20 to-orange-500/10",
    border: "border-amber-500/30",
    badge: "Cloud Foundation",
    services: ["EC2", "S3", "VPC", "IAM"],
  },
  {
    icon: Sparkles,
    title: "Generative AI & Bedrock",
    description:
      "Build intelligent solutions using Amazon Bedrock foundation models, prompt engineering patterns, embeddings, and Retrieval-Augmented Generation (RAG).",
    color: "from-purple-500/20 to-pink-500/10",
    border: "border-purple-500/30",
    badge: "Emerging AI",
    services: ["Amazon Bedrock", "Claude", "RAG", "Vector Embeddings"],
  },
  {
    icon: Cpu,
    title: "AI & Machine Learning",
    description:
      "Model training pipelines, data preprocessing in Python, and deploying machine learning endpoints with Amazon SageMaker and AWS AI services.",
    color: "from-sky-500/20 to-blue-500/10",
    border: "border-sky-500/30",
    badge: "Data & ML",
    services: ["SageMaker", "PyTorch", "Computer Vision", "NLP"],
  },
  {
    icon: Code2,
    title: "Full-Stack Web Development",
    description:
      "Building production-grade web applications with Next.js, TypeScript, Tailwind CSS, PostgreSQL, and deploying them to AWS Amplify and CloudFront.",
    color: "from-emerald-500/20 to-teal-500/10",
    border: "border-emerald-500/30",
    badge: "Web Engineering",
    services: ["Next.js", "TypeScript", "REST / GraphQL", "Amplify"],
  },
  {
    icon: Terminal,
    title: "Serverless & DevOps",
    description:
      "Pay-per-execution computing with AWS Lambda, API Gateway, Docker containerization, and automated GitHub Actions CI/CD deployment pipelines.",
    color: "from-orange-500/20 to-red-500/10",
    border: "border-orange-500/30",
    badge: "Microservices",
    services: ["AWS Lambda", "API Gateway", "Docker", "CI/CD"],
  },
  {
    icon: Shield,
    title: "Cloud Security & Governance",
    description:
      "Best practices from the AWS Well-Architected Framework: least-privilege IAM policies, data encryption at rest and in transit, and cost monitoring.",
    color: "from-indigo-500/20 to-slate-500/10",
    border: "border-indigo-500/30",
    badge: "Well-Architected",
    services: ["IAM Policies", "KMS", "CloudWatch", "AWS Budgets"],
  },
];

export function DomainsSection() {
  return (
    <section className="py-20 bg-slate-950/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
          <Badge variant="blue" size="md">
            Technical Domains
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            What We Build &amp; Learn Together
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            Our student builder group is organized into focused technical domains, enabling students to gain deep hands-on expertise from cloud basics to state-of-the-art Generative AI.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {DOMAINS.map((domain, index) => {
            const Icon = domain.icon;
            return (
              <div
                key={index}
                className={`rounded-2xl border ${domain.border} bg-gradient-to-b ${domain.color} p-6 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl`}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-amber-400">
                    <Icon className="w-6 h-6" />
                  </div>
                  <Badge variant="slate" size="sm">
                    {domain.badge}
                  </Badge>
                </div>

                <h3 className="text-lg font-bold text-white mb-2">
                  {domain.title}
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed mb-4">
                  {domain.description}
                </p>

                <div className="flex flex-wrap gap-1.5 pt-2 border-t border-slate-800/60">
                  {domain.services.map((svc, i) => (
                    <span
                      key={i}
                      className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-slate-900/80 text-slate-300 border border-slate-800"
                    >
                      {svc}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/resources"
            className="inline-flex items-center gap-2 text-xs font-semibold text-amber-400 hover:text-amber-300 transition-colors"
          >
            <span>Explore all verified AWS learning resources and pathways</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
