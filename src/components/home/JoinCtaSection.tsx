import Link from "next/link";
import { MessageCircle, Sparkles, ArrowRight, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { COMMUNITY_INFO } from "@/lib/data/initialData";

export function JoinCtaSection() {
  return (
    <section className="py-20 relative overflow-hidden bg-slate-950">
      {/* Background accents */}
      <div className="absolute inset-0 bg-gradient-to-r from-amber-500/10 via-orange-500/10 to-sky-500/10 blur-3xl -z-10" />
      <div className="absolute inset-0 tech-grid opacity-20 -z-10" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="rounded-3xl border border-amber-500/30 bg-gradient-to-b from-slate-900/90 via-slate-900/95 to-slate-950 p-8 sm:p-14 backdrop-blur-xl shadow-2xl relative">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 text-xs font-semibold border border-amber-500/30 mb-6">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Join 2026 Campus Community Cohort</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight max-w-2xl mx-auto">
            Take Your First Step in Cloud &amp; AI Engineering
          </h2>

          <p className="mt-4 text-sm sm:text-base text-slate-300 max-w-xl mx-auto leading-relaxed">
            Connect directly with fellow students, access workshop announcements, receive project mentoring, and participate in campus hackathons.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={COMMUNITY_INFO.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto"
            >
              <Button
                size="lg"
                className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-500 text-white border-0 shadow-lg shadow-emerald-600/30 gap-2"
              >
                <MessageCircle className="w-5 h-5" />
                <span>Join WhatsApp Community</span>
              </Button>
            </a>

            <Link href="/join" className="w-full sm:w-auto">
              <Button
                variant="primary"
                size="lg"
                className="w-full sm:w-auto gap-2"
              >
                <Sparkles className="w-4 h-4 text-slate-950" />
                <span>Apply for Core Team</span>
                <ArrowRight className="w-4 h-4 text-slate-950" />
              </Button>
            </Link>
          </div>

          <div className="mt-6 flex items-center justify-center gap-2 text-xs text-slate-400">
            <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
            <span>Free and open to all students at Prashanti Institute of Technology &amp; Science, Ujjain</span>
          </div>
        </div>
      </div>
    </section>
  );
}
