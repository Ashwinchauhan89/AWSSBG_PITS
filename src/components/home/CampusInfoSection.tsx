import React from "react";
import { MapPin, Mail, Building2, MessageCircle, Navigation } from "lucide-react";
import { COMMUNITY_INFO } from "@/lib/data/initialData";

export function CampusInfoSection() {
  return (
    <section
      id="campus"
      className="py-24 sm:py-32 relative overflow-hidden bg-[#080A14] border-b border-white/10"
    >
      <div className="absolute top-1/3 right-1/4 w-[600px] h-[350px] bg-purple-900/15 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute inset-0 tech-grid opacity-15 pointer-events-none -z-10" />

      <div className="responsive-container">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-mono font-semibold tracking-wider uppercase shadow-sm">
            <Building2 className="w-3.5 h-3.5 text-purple-400" />
            <span>CAMPUS LOCATION • PITS UJJAIN</span>
          </div>

          <h2 className="text-3xl xs:text-4xl sm:text-5xl font-black text-white tracking-tight uppercase">
            Campus &amp; Community{" "}
            <span className="bg-gradient-to-r from-purple-400 via-violet-300 to-amber-300 bg-clip-text text-transparent">
              Information
            </span>
          </h2>

          <p className="text-sm sm:text-base text-slate-300 font-light leading-relaxed">
            Headquartered on the engineering campus of Prashanti Institute of Technology &amp; Science in the historic city of Ujjain, Madhya Pradesh.
          </p>
        </div>

        {/* Content Box */}
        <div className="max-w-5xl mx-auto rounded-[32px] border border-purple-500/30 bg-[#0B0F1E]/95 backdrop-blur-2xl p-6 sm:p-10 lg:p-12 shadow-2xl relative overflow-hidden">
          <div className="absolute inset-x-0 top-0 h-[1.5px] bg-gradient-to-r from-transparent via-purple-400/50 to-transparent pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Campus details */}
            <div className="lg:col-span-7 space-y-6">
              <div className="space-y-2">
                <span className="text-xs font-mono font-bold uppercase tracking-widest text-amber-400">
                  Academic Institution
                </span>
                <h3 className="text-2xl sm:text-3xl font-black text-white">
                  {COMMUNITY_INFO.college}
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 font-light leading-relaxed">
                  Prashanti Institute of Technology &amp; Science (PITS) provides high-performance computing labs, academic infrastructure, and collaborative learning environments for our student builder workshops.
                </p>
              </div>

              {/* Location details */}
              <div className="space-y-3.5 pt-2 border-t border-purple-500/15">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-xl bg-purple-500/15 border border-purple-500/30 flex items-center justify-center shrink-0 mt-0.5">
                    <MapPin className="w-4 h-4 text-purple-400" />
                  </div>
                  <div>
                    <span className="text-xs font-mono text-slate-400 uppercase tracking-wider block">
                      Campus Address
                    </span>
                    <span className="text-xs sm:text-sm text-slate-200 font-light leading-snug">
                      {COMMUNITY_INFO.address}
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-xl bg-purple-500/15 border border-purple-500/30 flex items-center justify-center shrink-0 mt-0.5">
                    <Mail className="w-4 h-4 text-amber-400" />
                  </div>
                  <div>
                    <span className="text-xs font-mono text-slate-400 uppercase tracking-wider block">
                      Official Contact
                    </span>
                    <a
                      href={`mailto:${COMMUNITY_INFO.email}`}
                      className="text-xs sm:text-sm text-purple-300 hover:text-white transition-colors font-mono"
                    >
                      {COMMUNITY_INFO.email}
                    </a>
                  </div>
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex flex-wrap gap-3 pt-4">
                <a
                  href={`https://maps.google.com/?q=${encodeURIComponent(COMMUNITY_INFO.address)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-purple-600/90 hover:bg-purple-600 text-white text-xs font-mono font-semibold tracking-wider transition-colors shadow-md shadow-purple-600/25"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  <span>Open Campus in Maps</span>
                </a>
                {COMMUNITY_INFO.whatsappUrl && (
                  <a
                    href={COMMUNITY_INFO.whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600/20 hover:bg-emerald-600/30 border border-emerald-500/30 text-emerald-300 text-xs font-mono font-semibold tracking-wider transition-colors"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>WhatsApp Community Group</span>
                  </a>
                )}
              </div>
            </div>

            {/* Quick telemetry card */}
            <div className="lg:col-span-5 rounded-2xl bg-[#070912] border border-white/10 p-6 space-y-4">
              <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider block border-b border-white/10 pb-2">
                Campus Fact Sheet
              </span>
              <div className="space-y-3 text-xs font-mono">
                <div className="flex justify-between text-slate-300">
                  <span className="text-slate-500">Institution:</span>
                  <span className="text-right text-slate-200">PITS Ujjain</span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span className="text-slate-500">State / Region:</span>
                  <span className="text-right text-slate-200">Madhya Pradesh</span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span className="text-slate-500">Affiliation:</span>
                  <span className="text-right text-slate-200">RGPV Bhopal</span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span className="text-slate-500">Programs:</span>
                  <span className="text-right text-slate-200">B.Tech Engineering</span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span className="text-slate-500">Community Chapter:</span>
                  <span className="text-right text-purple-300">AWS Student Builder Group</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
