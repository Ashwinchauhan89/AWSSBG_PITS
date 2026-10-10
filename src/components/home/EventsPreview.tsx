"use client";

import * as React from "react";
import { useRef } from "react";
import Link from "next/link";
import { Calendar, MapPin, Clock, ArrowRight, UserCheck } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { INITIAL_EVENTS } from "@/lib/data/initialData";
import { formatDate } from "@/lib/utils";
import { GsapMagnetic } from "@/components/gsap/GsapMagnetic";
import { gsap, useGSAP, ScrollTrigger } from "@/lib/gsap";

export function EventsPreview() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const upcomingEvents = INITIAL_EVENTS.filter((e) => e.status === "upcoming").slice(0, 3);

  useGSAP(
    () => {
      const cards = gsap.utils.toArray<HTMLElement>(".gsap-event-card");

      gsap.from(cards, {
        y: 40,
        opacity: 0,
        rotationX: 10,
        transformPerspective: 800,
        duration: 0.7,
        stagger: 0.15,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });
    },
    { scope: sectionRef }
  );

  return (
    <section id="events" ref={sectionRef} className="py-20 border-b border-slate-800/80 bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-3 max-w-2xl">
            <Badge variant="orange" size="md">
              Upcoming Activities
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Workshops, Hackathons &amp; Labs
            </h2>
            <p className="text-slate-400 text-sm leading-relaxed">
              Join peer-led technical bootcamps, hands-on cloud labs, and architecture reviews at Prashanti Institute of Technology &amp; Science.
            </p>
          </div>
          <GsapMagnetic strength={0.25}>
            <Link href="/events">
              <Button variant="secondary" size="md" className="gap-2 shrink-0">
                <span>View All Events</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </GsapMagnetic>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {upcomingEvents.map((event) => (
            <div
              key={event.id}
              className="gsap-event-card flex flex-col justify-between rounded-2xl border border-slate-800 bg-slate-900/60 p-6 backdrop-blur-sm transition-all duration-300 hover:border-amber-500/40 hover:shadow-2xl hover:-translate-y-1 group will-change-transform"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between gap-2">
                  <Badge variant="orange" size="sm">
                    {event.category}
                  </Badge>
                  <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    RSVP Open
                  </span>
                </div>

                <h3 className="text-base font-bold text-white group-hover:text-amber-400 transition-colors leading-snug">
                  {event.title}
                </h3>

                <p className="text-xs text-slate-400 line-clamp-3 leading-relaxed">
                  {event.description}
                </p>

                <div className="space-y-2 text-xs text-slate-300 pt-2 border-t border-slate-800/60">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span>{formatDate(event.date)}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span>{event.time}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span className="truncate">{event.venue}</span>
                  </div>
                  {event.speakerName && (
                    <div className="flex items-center gap-2 text-slate-400">
                      <UserCheck className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                      <span className="truncate">{event.speakerName}</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="pt-6 mt-4 border-t border-slate-800/60 flex items-center justify-between gap-3">
                <div className="flex flex-wrap gap-1">
                  {event.tags.slice(0, 2).map((tag, i) => (
                    <span
                      key={i}
                      className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-400"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
                <Link href={`/events?id=${event.id}`}>
                  <span className="text-xs font-bold text-amber-400 hover:text-amber-300 flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                    Details
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
