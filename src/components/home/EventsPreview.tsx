"use client";

import * as React from "react";
import { useState, useRef } from "react";
import Link from "next/link";
import {
  Calendar,
  Clock,
  MapPin,
  ArrowRight,
  Sparkles,
  ExternalLink,
  MessageCircle,
  Radio,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { COMMUNITY_INFO } from "@/lib/data/initialData";
import { GsapMagnetic } from "@/components/gsap/GsapMagnetic";
import { gsap, useGSAP } from "@/lib/gsap";
import { useSound } from "@/components/audio/SoundManager";

interface PlannedTrack {
  id: string;
  title: string;
  category: "Cloud Workshops" | "AI/ML Sessions" | "Project Showcases" | "Technical Talks" | "Community Meetups";
  description: string;
  isConfirmed: boolean;
  date?: string;
  time?: string;
  venue?: string;
  registrationLink?: string;
  tags: string[];
}

const PLANNED_EVENTS: PlannedTrack[] = [
  {
    id: "track-cloud-foundations",
    title: "AWS Cloud Primitives & Free Tier Lab",
    category: "Cloud Workshops",
    description:
      "Hands-on interactive lab focused on launching virtual compute on Amazon EC2, structuring media storage in Amazon S3, and setting up zero-cost billing alarms.",
    isConfirmed: false,
    tags: ["AWS Cloud", "Amazon EC2", "Amazon S3", "Free Tier"],
  },
  {
    id: "track-genai-bedrock",
    title: "Generative AI & Amazon Bedrock Exploration",
    category: "AI/ML Sessions",
    description:
      "Deep dive into foundational LLMs, prompt engineering, and Retrieval-Augmented Generation (RAG) using Claude 3.5 Sonnet on Amazon Bedrock.",
    isConfirmed: false,
    tags: ["Generative AI", "Amazon Bedrock", "RAG Pipeline", "LLMs"],
  },
  {
    id: "track-student-showcase",
    title: "Campus Builder Showcase & Architecture Review",
    category: "Project Showcases",
    description:
      "Open stage for student squads to present working prototypes, evaluate Well-Architected frameworks, and receive constructive feedback from faculty and peers.",
    isConfirmed: false,
    tags: ["Project Showcase", "Architecture Review", "Peer Feedback"],
  },
  {
    id: "track-devops-talk",
    title: "Modern DevOps, Containers & Serverless Deployments",
    category: "Technical Talks",
    description:
      "Technical talk covering automated CI/CD with GitHub Actions, containerization with Docker, and event-driven serverless backends with AWS Lambda.",
    isConfirmed: false,
    tags: ["DevOps", "Docker", "CI/CD", "AWS Lambda"],
  },
  {
    id: "track-community-circle",
    title: "Open Community Study Circle & Networking",
    category: "Community Meetups",
    description:
      "Informal peer meetup for first-time builders to ask questions, discover AWS Skill Builder certification pathways, and join project study squads.",
    isConfirmed: false,
    tags: ["Community Meetup", "Skill Builder", "Peer Learning"],
  },
];

const CATEGORIES = [
  "All",
  "Cloud Workshops",
  "AI/ML Sessions",
  "Project Showcases",
  "Technical Talks",
  "Community Meetups",
] as const;

export function EventsPreview() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const sectionRef = useRef<HTMLElement | null>(null);
  const { playHover, playClick } = useSound();

  const filteredEvents =
    selectedCategory === "All"
      ? PLANNED_EVENTS
      : PLANNED_EVENTS.filter((e) => e.category === selectedCategory);

  useGSAP(
    () => {
      gsap.from(".gsap-event-card", {
        y: 35,
        opacity: 0,
        stagger: 0.1,
        duration: 0.7,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      id="events"
      ref={sectionRef}
      className="py-24 sm:py-32 border-b border-white/10 bg-[#080A0F] relative overflow-hidden"
    >
      <div className="absolute top-1/4 right-1/4 w-[600px] h-[350px] volumetric-blue-glow pointer-events-none -z-10" />
      <div className="absolute inset-0 tech-grid opacity-15 pointer-events-none -z-10" />

      <div className="responsive-container">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-mono font-semibold tracking-wider uppercase">
              <Sparkles className="w-3.5 h-3.5" />
              <span>SECTION D • EVENTS &amp; WORKSHOPS</span>
            </div>
            <h2 className="text-2xl xs:text-3xl sm:text-5xl font-black text-white tracking-tight uppercase">
              Upcoming Events &amp; <br />
              <span className="bg-gradient-to-r from-amber-400 via-orange-400 to-sky-400 bg-clip-text text-transparent">
                Technical Workshops
              </span>
            </h2>
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed font-light">
              Explore cloud workshops, AI/ML sessions, project showcases, technical talks, and community meetups organized by student builders at Prashanti Institute of Technology &amp; Science.
            </p>
          </div>

          <GsapMagnetic strength={0.25}>
            <Link href="/events" className="w-full sm:w-auto">
              <Button variant="secondary" size="md" className="gap-2 shrink-0 w-full sm:w-auto font-mono text-xs">
                <span>View Full Calendar</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </GsapMagnetic>
        </div>

        {/* Polished Empty State / Coming Soon Announcement Card */}
        <div className="mb-12 hud-corner rounded-3xl border border-amber-500/30 bg-gradient-to-r from-[#101A2C]/90 via-[#080A0F]/95 to-[#101A2C]/90 p-6 sm:p-8 backdrop-blur-2xl shadow-xl relative overflow-hidden">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6 text-center lg:text-left">
            <div className="space-y-2 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-0.5 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-400 text-xs font-mono font-bold">
                <Radio className="w-3.5 h-3.5 animate-pulse text-amber-400" />
                <span>COMMUNITY SCHEDULE IN COORDINATION</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-white">
                New workshops and community events are coming soon.
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-light">
                Session dates, computer lab bookings, and curriculum roadmaps are currently being finalized with faculty and mentors. RSVP announcements will be published directly through our Meetup and WhatsApp channels.
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3 shrink-0">
              <GsapMagnetic strength={0.2}>
                <a
                  href={COMMUNITY_INFO.meetupUrl || COMMUNITY_INFO.officialAwsSbgUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-mono font-bold bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 hover:from-amber-400 hover:to-orange-400 transition-all shadow-lg shadow-orange-500/20"
                >
                  <span>Explore Meetup Page</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </GsapMagnetic>

              <GsapMagnetic strength={0.2}>
                <a
                  href={COMMUNITY_INFO.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-mono font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/20 transition-colors"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>Join WhatsApp Group</span>
                </a>
              </GsapMagnetic>
            </div>
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center gap-2 mb-8">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                playClick();
                setSelectedCategory(cat);
              }}
              onMouseEnter={playHover}
              className={`px-3.5 py-1.5 rounded-full text-xs font-mono transition-all cursor-pointer ${
                selectedCategory === cat
                  ? "bg-amber-500 text-slate-950 font-bold shadow-md shadow-orange-500/20"
                  : "bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white border border-white/10"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Planned Events & Workshops Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map((event) => (
            <div
              key={event.id}
              onMouseEnter={playHover}
              className="gsap-event-card cinematic-glass cinematic-glass-hover rounded-3xl p-6 border border-white/10 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 group"
            >
              <div className="space-y-4">
                {/* Category & Status Indicator */}
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[11px] font-mono font-bold px-2.5 py-0.5 rounded-md bg-white/5 border border-white/10 text-slate-300">
                    {event.category}
                  </span>

                  {event.isConfirmed ? (
                    <span className="inline-flex items-center gap-1 text-[10px] font-mono font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      Confirmed Date
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-[10px] font-mono font-medium text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-full border border-amber-500/20">
                      Schedule In Progress
                    </span>
                  )}
                </div>

                {/* Title */}
                <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-amber-400 transition-colors leading-snug">
                  {event.title}
                </h3>

                {/* Short Description */}
                <p className="text-xs text-slate-300 leading-relaxed font-light">
                  {event.description}
                </p>

                {/* Date & Time (Only shown when confirmed) */}
                {event.isConfirmed && event.date && (
                  <div className="space-y-1.5 text-xs text-slate-300 pt-2 border-t border-white/10">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                      <span>{event.date}</span>
                    </div>
                    {event.time && (
                      <div className="flex items-center gap-2">
                        <Clock className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                        <span>{event.time}</span>
                      </div>
                    )}
                    {event.venue && (
                      <div className="flex items-center gap-2">
                        <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                        <span className="truncate">{event.venue}</span>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Tags & Action Row */}
              <div className="pt-5 mt-4 border-t border-white/10 flex items-center justify-between gap-2">
                <div className="flex flex-wrap gap-1">
                  {event.tags.slice(0, 2).map((tag, i) => (
                    <span
                      key={i}
                      className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#080A0F] text-slate-400 border border-white/5"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

                {event.isConfirmed && event.registrationLink ? (
                  <a
                    href={event.registrationLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-mono font-bold text-amber-400 hover:text-amber-300"
                  >
                    <span>Register</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                ) : (
                  <span className="text-[11px] font-mono text-slate-500">
                    Curriculum Ready
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
