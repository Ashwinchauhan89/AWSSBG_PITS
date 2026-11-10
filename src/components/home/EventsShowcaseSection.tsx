"use client";

import React, { useRef } from "react";
import Link from "next/link";
import {
  Calendar,
  Clock,
  MapPin,
  ArrowRight,
  ExternalLink,
  Users,
} from "lucide-react";
import { INITIAL_EVENTS, COMMUNITY_INFO } from "@/lib/data/initialData";
import { gsap, useGSAP } from "@/lib/gsap";
import { useSound } from "@/components/audio/SoundManager";

export function EventsShowcaseSection() {
  const containerRef = useRef<HTMLElement>(null);
  const { playHover, playClick } = useSound();

  useGSAP(
    () => {
      gsap.from(".gsap-event-card", {
        y: 40,
        opacity: 0,
        stagger: 0.1,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 75%",
          once: true,
        },
      });
    },
    { scope: containerRef }
  );

  return (
    <section
      id="events"
      ref={containerRef}
      className="py-24 sm:py-32 relative overflow-hidden bg-[#080A14] border-b border-white/10"
    >
      {/* Background Volumetric Glows */}
      <div className="absolute top-1/4 right-1/4 w-[650px] h-[350px] bg-purple-900/15 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute bottom-1/3 left-1/4 w-[500px] h-[300px] bg-amber-900/10 rounded-full blur-[130px] pointer-events-none -z-10" />
      <div className="absolute inset-0 tech-grid opacity-15 pointer-events-none -z-10" />

      <div className="responsive-container">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="space-y-4 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-mono font-semibold tracking-wider uppercase shadow-sm">
              <Calendar className="w-3.5 h-3.5 text-purple-400" />
              <span>CAMPUS MEETUPS • WORKSHOPS • TECHNICAL LABS</span>
            </div>

            <h2 className="text-3xl xs:text-4xl sm:text-5xl font-black text-white tracking-tight uppercase">
              Events &amp; Community{" "}
              <span className="bg-gradient-to-r from-purple-400 via-violet-300 to-amber-300 bg-clip-text text-transparent">
                Activities
              </span>
            </h2>

            <p className="text-sm sm:text-base text-slate-300 font-light leading-relaxed">
              Join hands-on technical workshops, cloud architectural walkthroughs, and peer-led sessions organized by the AWS Student Builder Group at PITS Ujjain.
            </p>
          </div>

          {/* Official Meetup Community Button */}
          <div className="shrink-0 flex items-center gap-3">
            <a
              href={COMMUNITY_INFO.meetupUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={playClick}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-500 hover:to-violet-500 text-white text-xs font-mono font-semibold tracking-wider shadow-lg shadow-purple-600/25 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-400"
            >
              <span>Join on Meetup</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Event Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-14">
          {INITIAL_EVENTS.slice(0, 6).map((event) => (
            <div
              key={event.id}
              onMouseEnter={playHover}
              className="gsap-event-card relative rounded-[28px] p-6 sm:p-7 border border-purple-500/20 hover:border-purple-400/50 bg-[#0A0D1B]/90 backdrop-blur-2xl flex flex-col justify-between overflow-hidden shadow-xl transition-all duration-300 group hover:-translate-y-1 hover:shadow-[0_20px_45px_-15px_rgba(168,85,247,0.22)]"
            >
              {/* Top ambient highlight */}
              <div className="absolute inset-x-0 top-0 h-[1.5px] bg-gradient-to-r from-transparent via-purple-400/30 to-transparent pointer-events-none" />

              <div className="space-y-4">
                {/* Category & Status */}
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[10px] font-mono uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 font-bold">
                    {event.category}
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 flex items-center gap-1 font-semibold">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span>{event.status === "upcoming" ? "Upcoming" : "Completed"}</span>
                  </span>
                </div>

                {/* Event Title */}
                <h3 className="text-xl sm:text-2xl font-black text-white group-hover:text-purple-300 transition-colors">
                  {event.title}
                </h3>

                {/* Description */}
                <p className="text-xs sm:text-sm text-slate-300 font-light leading-relaxed line-clamp-3">
                  {event.description}
                </p>

                {/* Metadata details */}
                <div className="space-y-2 pt-2 border-t border-purple-500/15">
                  <div className="flex items-center gap-2 text-xs text-slate-300">
                    <Calendar className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span className="font-mono">{event.date}</span>
                    {event.time && (
                      <>
                        <span className="text-slate-500">•</span>
                        <Clock className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                        <span className="font-mono text-[11px]">{event.time}</span>
                      </>
                    )}
                  </div>

                  <div className="flex items-start gap-2 text-xs text-slate-300">
                    <MapPin className="w-3.5 h-3.5 text-sky-400 shrink-0 mt-0.5" />
                    <span className="leading-snug">{event.venue}</span>
                  </div>

                  {event.speakerName && (
                    <div className="flex items-center gap-2 text-xs text-slate-400 font-mono pt-1">
                      <Users className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                      <span>Mentor: <strong className="text-slate-200">{event.speakerName}</strong></span>
                    </div>
                  )}
                </div>
              </div>

              {/* Tags & Action Button */}
              <div className="pt-5 border-t border-purple-500/15 mt-6 space-y-3">
                <div className="flex flex-wrap gap-1.5">
                  {event.tags.slice(0, 3).map((tag, i) => (
                    <span
                      key={i}
                      className="text-[9px] font-mono px-2 py-0.5 rounded-md bg-[#080A0F] text-slate-300 border border-white/5"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="pt-1">
                  <a
                    href={COMMUNITY_INFO.meetupUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={playClick}
                    className="inline-flex items-center justify-between w-full px-4 py-2.5 rounded-xl bg-purple-500/10 hover:bg-purple-500/20 text-purple-300 hover:text-white border border-purple-500/25 hover:border-purple-400/50 text-xs font-mono font-semibold tracking-wider transition-all duration-200 group/btn"
                  >
                    <span>RSVP via Meetup</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View all events directory banner */}
        <div className="p-6 rounded-2xl bg-gradient-to-r from-purple-950/40 via-[#0B0F1E] to-purple-950/40 border border-purple-500/25 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="space-y-1">
            <span className="font-mono text-xs font-bold text-amber-300 uppercase tracking-wider block">
              Want to see our full semester workshop calendar?
            </span>
            <p className="text-xs text-slate-300 font-light">
              Explore hands-on labs, lab dates, speaker briefs, and RSVP checkpoints on our dedicated events page.
            </p>
          </div>
          <Link
            href="/events"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 border border-white/15 text-white text-xs font-mono font-semibold tracking-wider transition-colors shrink-0"
          >
            <span>View All Events</span>
            <ArrowRight className="w-3.5 h-3.5 text-purple-400" />
          </Link>
        </div>
      </div>
    </section>
  );
}
