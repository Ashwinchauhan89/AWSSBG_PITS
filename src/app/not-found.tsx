import Link from "next/link";
import { ArrowLeft, Compass } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4 py-20 relative overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-gradient-to-tr from-amber-500/10 via-purple-500/10 to-transparent blur-3xl pointer-events-none -z-10" />

      <div className="max-w-md mx-auto space-y-6 relative z-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-amber-400 text-xs font-mono">
          <Compass className="w-3.5 h-3.5" />
          <span>404 // RESOURCE NOT FOUND</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight uppercase">
          PAGE NOT FOUND
        </h1>

        <p className="text-sm text-slate-300 leading-relaxed font-light">
          The requested page or route does not exist or has concluded. Explore our active workshops, projects, and community activities from the homepage.
        </p>

        <div className="pt-2 flex justify-center">
          <Link href="/">
            <Button
              size="md"
              className="gap-2 px-6 py-3 rounded-full font-mono text-xs font-bold uppercase tracking-wider bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 hover:from-amber-400 hover:to-orange-400 shadow-xl shadow-orange-500/20"
            >
              <ArrowLeft className="w-4 h-4 text-slate-950" />
              <span>RETURN TO HOME</span>
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
