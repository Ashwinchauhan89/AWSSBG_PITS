"use client";

import React, { useRef } from "react";
import { ArrowUpRight, ShieldCheck, Radio } from "lucide-react";
import { PRIMARY_SOCIAL_SHOWCASE_CARDS } from "@/lib/config/socialLinks";
import { gsap, useGSAP, ScrollTrigger } from "@/lib/gsap";
import { useSound } from "@/components/audio/SoundManager";

export function SocialShowcaseSection() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { playClick, playHover } = useSound();

  useGSAP(
    (context, contextSafe) => {
      const container = containerRef.current;
      if (!container || typeof window === "undefined") return;

      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      if (!prefersReducedMotion) {
        gsap.registerPlugin(ScrollTrigger);

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: container,
            start: "top 80%",
            once: true,
          },
        });

        // Header entrance
        tl.from(".gsap-social-header", {
          opacity: 0,
          y: 28,
          duration: 0.75,
          ease: "power3.out",
        });

        // 3 Cards staggered pop-in
        tl.from(
          ".gsap-social-card",
          {
            opacity: 0,
            y: 35,
            scale: 0.95,
            duration: 0.8,
            stagger: 0.15,
            ease: "power3.out",
          },
          "-=0.4"
        );

        // Verification banner entrance
        tl.from(
          ".gsap-social-footer",
          {
            opacity: 0,
            y: 20,
            duration: 0.6,
            ease: "power2.out",
          },
          "-=0.3"
        );
      }

      // Event-driven hover interactions wrapped in contextSafe for performance
      if (contextSafe && !prefersReducedMotion) {
        const cards = container.querySelectorAll<HTMLElement>(".gsap-social-card");
        cards.forEach((card) => {
          const iconEl = card.querySelector<HTMLElement>(".gsap-card-icon");
          const arrowEl = card.querySelector<HTMLElement>(".gsap-btn-arrow");

          const onEnter = contextSafe(() => {
            gsap.to(card, {
              y: -6,
              duration: 0.3,
              ease: "power2.out",
              overwrite: "auto",
            });
            if (iconEl) {
              gsap.to(iconEl, {
                scale: 1.12,
                rotation: -4,
                duration: 0.3,
                ease: "back.out(1.8)",
                overwrite: "auto",
              });
            }
            if (arrowEl) {
              gsap.to(arrowEl, {
                x: 2,
                y: -2,
                duration: 0.25,
                ease: "power2.out",
                overwrite: "auto",
              });
            }
          });

          const onLeave = contextSafe(() => {
            gsap.to(card, {
              y: 0,
              duration: 0.3,
              ease: "power2.out",
              overwrite: "auto",
            });
            if (iconEl) {
              gsap.to(iconEl, {
                scale: 1,
                rotation: 0,
                duration: 0.3,
                ease: "power2.out",
                overwrite: "auto",
              });
            }
            if (arrowEl) {
              gsap.to(arrowEl, {
                x: 0,
                y: 0,
                duration: 0.25,
                ease: "power2.out",
                overwrite: "auto",
              });
            }
          });

          card.addEventListener("mouseenter", onEnter);
          card.addEventListener("mouseleave", onLeave);
        });
      }
    },
    { scope: containerRef }
  );

  return (
    <section
      id="connect"
      ref={containerRef}
      aria-label="Community Social Channels"
      className="py-24 sm:py-32 relative overflow-hidden bg-[#070913] border-b border-white/10"
    >
      {/* Background Volumetric Glow & Tech Grid */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] sm:w-[1100px] h-[500px] bg-gradient-to-r from-purple-900/15 via-violet-900/10 to-indigo-900/15 blur-3xl -z-10"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 tech-grid opacity-15 -z-10"
      />

      <div className="responsive-container relative z-10">
        {/* Section Header */}
        <div className="gsap-social-header text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-mono font-semibold tracking-wider uppercase shadow-sm">
            <Radio className="w-3.5 h-3.5 text-purple-400 animate-pulse" />
            <span>OFFICIAL CHANNELS • STAY CONNECTED</span>
          </div>

          <h2 className="text-3xl xs:text-4xl sm:text-5xl font-black text-white tracking-tight uppercase">
            Stay Connected With{" "}
            <span className="bg-gradient-to-r from-purple-400 via-violet-300 to-amber-300 bg-clip-text text-transparent">
              Our Community
            </span>
          </h2>

          <p className="text-sm sm:text-base text-slate-300 font-light leading-relaxed max-w-2xl mx-auto">
            Follow our journey, connect with fellow student builders, and stay
            updated on workshops, technical events, projects, and community
            activities.
          </p>
        </div>

        {/* 3 Responsive Interactive Social Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto mb-14">
          {PRIMARY_SOCIAL_SHOWCASE_CARDS.map((card) => {
            const IconComponent = card.icon;

            return (
              <div
                key={card.id}
                className={`gsap-social-card group relative flex flex-col justify-between rounded-[28px] sm:rounded-[32px] p-6 sm:p-8 bg-[#0B0F1D]/85 border border-white/10 hover:${card.accent.borderHover} backdrop-blur-2xl transition-all duration-300 shadow-xl hover:${card.accent.glow} overflow-hidden`}
              >
                {/* Subtle Radial Atmosphere on Hover */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -top-24 -right-24 w-48 h-48 bg-purple-500/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500"
                />

                {/* Top Card Meta: Icon & Badge */}
                <div>
                  <div className="flex items-center justify-between gap-3 mb-6">
                    <div
                      className={`gsap-card-icon relative flex h-14 w-14 items-center justify-center rounded-2xl ${card.accent.bg} border ${card.accent.border} text-white shadow-lg transition-transform duration-300`}
                    >
                      <IconComponent className={`w-7 h-7 ${card.accent.text}`} />
                    </div>

                    <span className="text-[11px] font-mono font-semibold px-3 py-1 rounded-full bg-white/5 border border-white/10 text-slate-300 tracking-wide uppercase">
                      {card.badge}
                    </span>
                  </div>

                  {/* Card Title & Platform Identity */}
                  <div className="space-y-1.5 mb-3">
                    <div className="text-[11px] font-mono font-bold tracking-wider uppercase text-amber-400">
                      {card.name}
                    </div>
                    <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight group-hover:text-purple-300 transition-colors">
                      {card.cardTitle}
                    </h3>
                  </div>

                  {/* Card Description */}
                  <p className="text-xs sm:text-sm text-slate-300 font-light leading-relaxed mb-6">
                    {card.cardDescription}
                  </p>
                </div>

                {/* Bottom Card Action: Official Button & Handle */}
                <div className="space-y-3 pt-4 border-t border-white/10">
                  <a
                    href={card.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={playClick}
                    onMouseEnter={playHover}
                    aria-label={card.accessibleLabel}
                    className={`inline-flex items-center justify-center gap-2 w-full px-5 py-3 rounded-xl text-xs font-mono font-bold uppercase tracking-wider text-white ${card.accent.buttonBg} ${card.accent.buttonHover} shadow-lg shadow-black/40 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 ${card.accent.ring}`}
                  >
                    <span>{card.buttonLabel}</span>
                    <ArrowUpRight className="gsap-btn-arrow w-4 h-4 text-white/80 transition-transform duration-200" />
                  </a>

                  {card.handle && (
                    <div className="flex items-center justify-center gap-1.5 text-[11px] font-mono text-slate-400">
                      <span className="text-purple-400 font-bold">●</span>
                      <span>{card.handle}</span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Community Trust & Anti-Phishing Verification Strip */}
        <div className="gsap-social-footer text-center">
          <div className="inline-flex flex-wrap items-center justify-center gap-2 text-xs text-slate-400 bg-[#0A0D1B]/90 border border-white/10 px-5 py-3 rounded-2xl max-w-3xl mx-auto shadow-lg shadow-black/40">
            <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0" />
            <span>
              Official verified community channels for{" "}
              <strong className="text-white">
                AWS Student Builder Group at Prashanti Institute of Technology &amp; Science
              </strong>
              . Be vigilant of unauthorized accounts.
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

