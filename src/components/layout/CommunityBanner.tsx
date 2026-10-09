import Link from "next/link";
import { Sparkles, ExternalLink } from "lucide-react";
import { COMMUNITY_INFO } from "@/lib/data/initialData";

export function CommunityBanner() {
  return (
    <div className="relative z-40 bg-gradient-to-r from-slate-950 via-amber-950/40 to-slate-950 border-b border-amber-500/20 text-xs py-2 px-4 text-slate-300">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="flex h-2 w-2 rounded-full bg-amber-400 animate-pulse" />
          <span className="font-semibold text-white">Campus Community:</span>
          <span>
            {COMMUNITY_INFO.name} @ {COMMUNITY_INFO.collegeShort}
          </span>
          <span className="hidden md:inline text-slate-400">
            • Student-led educational group
          </span>
        </div>
        <div className="flex items-center gap-3 text-slate-300">
          <Link
            href="/join"
            className="hidden sm:inline-flex items-center gap-1 text-amber-400 hover:text-amber-300 font-medium transition-colors"
          >
            <Sparkles className="w-3.5 h-3.5" />
            Core Team Recruitment Open
          </Link>
          <span className="hidden sm:inline text-slate-700">|</span>
          <a
            href={COMMUNITY_INFO.officialAwsSbgUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 hover:text-white transition-colors text-[11px]"
          >
            About AWS SBG Program
            <ExternalLink className="w-3 h-3 text-slate-400" />
          </a>
        </div>
      </div>
    </div>
  );
}
