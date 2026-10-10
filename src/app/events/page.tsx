"use client";

import * as React from "react";
import {
  Calendar,
  Clock,
  MapPin,
  Search,
  UserCheck,
  Sparkles,
  CheckCircle,
  X,
  ShieldCheck,
  Radio,
  Layers,
  ArrowRight,
  Zap,
} from "lucide-react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { INITIAL_EVENTS } from "@/lib/data/initialData";
import { CommunityEvent, EventCategory } from "@/lib/types";
import { formatDate } from "@/lib/utils";
import { useSound } from "@/components/audio/SoundManager";

const CATEGORIES: ("All" | EventCategory)[] = [
  "All",
  "AWS Cloud",
  "Generative AI",
  "AI & Machine Learning",
  "Web Development",
  "Hackathons",
  "Career & Community",
];

export default function EventsPage() {
  const { playHover, playClick, playWarp, playSuccess } = useSound();
  const [events] = React.useState<CommunityEvent[]>(INITIAL_EVENTS);

  const [selectedCategory, setSelectedCategory] = React.useState<string>("All");
  const [searchQuery, setSearchQuery] = React.useState<string>("");
  const [activeTab, setActiveTab] = React.useState<"upcoming" | "past">("upcoming");
  const [viewMode, setViewMode] = React.useState<"grid" | "timeline">("grid");
  const [selectedEvent, setSelectedEvent] = React.useState<CommunityEvent | null>(null);
  const [registeredEvents, setRegisteredEvents] = React.useState<string[]>([]);
  const [rsvpStudentName, setRsvpStudentName] = React.useState("");
  const [rsvpEmail, setRsvpEmail] = React.useState("");
  const [isSubmittingRsvp, setIsSubmittingRsvp] = React.useState(false);

  // Filter events
  const filteredEvents = events.filter((event) => {
    const matchesTab = activeTab === "upcoming" ? event.status === "upcoming" : event.status === "past";
    const matchesCategory =
      selectedCategory === "All" || event.category === selectedCategory;
    const matchesSearch =
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesTab && matchesCategory && matchesSearch;
  });

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!rsvpStudentName || !rsvpEmail) {
      toast.error("Please fill in your name and email to RSVP.");
      return;
    }
    if (!selectedEvent) return;

    setIsSubmittingRsvp(true);
    setTimeout(() => {
      setRegisteredEvents((prev) => [...prev, selectedEvent.id]);
      setIsSubmittingRsvp(false);
      toast.success(`RSVP confirmed for "${selectedEvent.title}"! We look forward to seeing you.`);
      setSelectedEvent(null);
      setRsvpStudentName("");
      setRsvpEmail("");
    }, 600);
  };

  return (
    <div className="py-12 sm:py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-mono font-semibold tracking-wider uppercase">
            <Calendar className="w-3.5 h-3.5" />
            <span>CAMPUS WORKSHOP &amp; LAB CALENDAR</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight uppercase">
            Events &amp; Hands-on Labs
          </h1>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-light">
            Discover peer-led technical bootcamps, AWS console workshops, hackathons, and guest industry talks designed for student builders at Prashanti Institute of Technology &amp; Science.
          </p>
        </div>

        {/* Top Control Bar: Tab Switch & View Switcher */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-white/10 pb-6">
          {/* Tab Switch: Upcoming vs Past */}
          <div className="inline-flex rounded-full bg-[#101A2C]/80 border border-white/10 p-1 backdrop-blur-md shadow-lg">
            <button
              onClick={() => setActiveTab("upcoming")}
              className={`px-5 py-2 rounded-full text-xs font-mono font-bold transition-all ${
                activeTab === "upcoming"
                  ? "bg-amber-500 text-slate-950 shadow-md shadow-orange-500/20"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              Upcoming Schedule ({events.filter((e) => e.status === "upcoming").length})
            </button>
            <button
              onClick={() => setActiveTab("past")}
              className={`px-5 py-2 rounded-full text-xs font-mono font-bold transition-all ${
                activeTab === "past"
                  ? "bg-white/10 text-white shadow-md"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              Past Archive ({events.filter((e) => e.status === "past").length})
            </button>
          </div>

          {/* View Mode Toggle: Grid vs Timeline */}
          <div className="inline-flex items-center rounded-full bg-[#101A2C]/60 border border-white/10 p-1 text-xs font-mono">
            <button
              onClick={() => setViewMode("grid")}
              className={`px-3.5 py-1.5 rounded-full transition-all ${
                viewMode === "grid"
                  ? "bg-sky-400/20 text-sky-400 border border-sky-400/40 font-bold"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              Card Grid
            </button>
            <button
              onClick={() => setViewMode("timeline")}
              className={`px-3.5 py-1.5 rounded-full transition-all ${
                viewMode === "timeline"
                  ? "bg-sky-400/20 text-sky-400 border border-sky-400/40 font-bold"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              Timeline View
            </button>
          </div>
        </div>

        {/* Filters and Search Bar */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            {/* Search Input */}
            <div className="relative w-full sm:max-w-md">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search events, keywords, tags (e.g. EC2, Bedrock)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-11 pl-10 pr-4 rounded-xl border border-white/10 bg-[#101A2C]/70 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-amber-500 transition-colors backdrop-blur-md"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Clear filters if active */}
            {(selectedCategory !== "All" || searchQuery) && (
              <button
                onClick={() => {
                  setSelectedCategory("All");
                  setSearchQuery("");
                }}
                className="text-xs text-amber-400 hover:text-amber-300 font-mono font-semibold"
              >
                Reset filters
              </button>
            )}
          </div>

          {/* Categories Buttons */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`whitespace-nowrap px-3.5 py-1.5 rounded-full text-xs font-mono transition-all ${
                  selectedCategory === cat
                    ? "bg-amber-500 text-slate-950 font-bold shadow-md shadow-orange-500/20"
                    : "bg-[#101A2C]/60 border border-white/10 text-slate-400 hover:text-white hover:border-white/20"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* View Mode 1: Cards Grid */}
        {viewMode === "grid" && (
          <div>
            {filteredEvents.length === 0 ? (
              <div className="text-center py-16 rounded-3xl border border-white/10 bg-[#101A2C]/40 p-8 space-y-3">
                <Calendar className="w-12 h-12 text-slate-600 mx-auto" />
                <h3 className="text-lg font-bold text-white">No sessions found</h3>
                <p className="text-xs text-slate-400 max-w-sm mx-auto font-light">
                  No sessions matched your filter criteria. Try choosing &quot;All&quot; or resetting your search query.
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setSelectedCategory("All");
                    setSearchQuery("");
                  }}
                  className="rounded-full"
                >
                  Reset Filters
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredEvents.map((event) => {
                  const isRegistered = registeredEvents.includes(event.id);

                  return (
                    <div
                      key={event.id}
                      className="cinematic-glass cinematic-glass-hover rounded-3xl p-7 border border-white/10 flex flex-col justify-between group transition-all duration-300 hover:-translate-y-1.5 relative overflow-hidden"
                    >
                      {/* Top Header Row */}
                      <div className="space-y-4">
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-sky-400/10 text-sky-400 border border-sky-400/20">
                            {event.category}
                          </span>

                          {event.status === "upcoming" ? (
                            isRegistered ? (
                              <span className="inline-flex items-center gap-1 text-[11px] font-mono font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/30">
                                <CheckCircle className="w-3 h-3" />
                                RSVP Confirmed
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1 text-[11px] font-mono font-semibold text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                                Registration Open
                              </span>
                            )
                          ) : (
                            <span className="text-[11px] font-mono text-slate-500 bg-white/5 px-2 py-0.5 rounded">
                              Concluded
                            </span>
                          )}
                        </div>

                        {/* Title */}
                        <h2 className="text-xl font-bold text-white group-hover:text-amber-400 transition-colors leading-snug">
                          {event.title}
                        </h2>

                        {/* Description */}
                        <p className="text-xs text-slate-300 line-clamp-3 leading-relaxed font-light">
                          {event.description}
                        </p>

                        {/* Logistics Details */}
                        <div className="space-y-2 text-xs text-slate-300 pt-3 border-t border-white/10">
                          <div className="flex items-center gap-2">
                            <Calendar className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                            <span className="font-mono">{formatDate(event.date)}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                            <span className="font-mono">{event.time}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <MapPin className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                            <span className="truncate">{event.venue}</span>
                          </div>
                          {event.speakerName && (
                            <div className="flex items-center gap-2 text-slate-400">
                              <UserCheck className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                              <span className="truncate">
                                {event.speakerName} ({event.speakerRole})
                              </span>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Card Footer */}
                      <div className="pt-6 mt-4 border-t border-white/10 flex items-center justify-between gap-2">
                        <div className="flex flex-wrap gap-1">
                          {event.tags.slice(0, 2).map((t, idx) => (
                            <span
                              key={idx}
                              className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#080A0F]/80 text-slate-400 border border-white/5"
                            >
                              #{t}
                            </span>
                          ))}
                        </div>

                        <Button
                          variant={event.status === "upcoming" ? "primary" : "outline"}
                          size="sm"
                          onClick={() => setSelectedEvent(event)}
                          className="rounded-full text-xs font-mono font-bold"
                        >
                          {event.status === "upcoming" ? "View & RSVP" : "View Archive"}
                        </Button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* View Mode 2: Responsive Event Timeline */}
        {viewMode === "timeline" && (
          <div className="relative max-w-4xl mx-auto space-y-8">
            <div className="absolute top-0 bottom-0 left-4 sm:left-1/2 w-[1px] bg-gradient-to-b from-amber-500/40 via-sky-500/30 to-transparent -translate-x-1/2 pointer-events-none" />

            {filteredEvents.map((event, idx) => {
              const isEven = idx % 2 === 0;
              const isRegistered = registeredEvents.includes(event.id);

              return (
                <div
                  key={event.id}
                  className={`relative flex flex-col sm:flex-row items-start sm:items-center gap-6 ${
                    isEven ? "sm:flex-row-reverse text-left" : "sm:flex-row text-left"
                  }`}
                >
                  {/* Timeline node */}
                  <div className="absolute left-4 sm:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-amber-400 border-4 border-[#080A0F] shadow-lg shadow-orange-500/50 z-10" />

                  {/* Card container */}
                  <div className="ml-10 sm:ml-0 sm:w-1/2 p-2">
                    <div className="cinematic-glass rounded-3xl p-6 border border-white/10 space-y-3">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-amber-400/10 text-amber-400 border border-amber-400/30">
                          {event.category}
                        </span>
                        <span className="text-xs font-mono text-slate-400">
                          {formatDate(event.date)}
                        </span>
                      </div>

                      <h3 className="text-lg font-bold text-white">
                        {event.title}
                      </h3>

                      <p className="text-xs text-slate-300 leading-relaxed font-light line-clamp-2">
                        {event.description}
                      </p>

                      <div className="pt-2 flex items-center justify-between text-xs">
                        <span className="text-slate-400 text-[11px] truncate max-w-[150px]">
                          {event.venue}
                        </span>
                        <Button
                          size="sm"
                          onClick={() => setSelectedEvent(event)}
                          className="h-8 px-3 rounded-full text-xs font-mono"
                        >
                          {event.status === "upcoming" ? "RSVP" : "Details"}
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Modal for Event Details & Registration */}
        {selectedEvent && (
          <Modal
            isOpen={Boolean(selectedEvent)}
            onClose={() => setSelectedEvent(null)}
            title={selectedEvent.title}
            description={`${selectedEvent.category} • ${formatDate(selectedEvent.date)}`}
            maxWidth="xl"
          >
            <div className="space-y-6 text-xs text-slate-300">
              <div className="space-y-3">
                <p className="text-sm text-slate-200 leading-relaxed font-light">
                  {selectedEvent.description}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <div className="p-3.5 rounded-2xl bg-[#080A0F]/80 border border-white/10 space-y-1">
                    <span className="text-[10px] text-slate-400 font-mono uppercase font-bold">
                      Date &amp; Time
                    </span>
                    <p className="text-xs font-semibold text-white font-mono">
                      {formatDate(selectedEvent.date)}
                    </p>
                    <p className="text-xs text-amber-400 font-mono">{selectedEvent.time}</p>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-[#080A0F]/80 border border-white/10 space-y-1">
                    <span className="text-[10px] text-slate-400 font-mono uppercase font-bold">
                      Format &amp; Venue
                    </span>
                    <p className="text-xs font-semibold text-white">
                      {selectedEvent.isOnline ? "Virtual Session" : "In-Person Campus Lab"}
                    </p>
                    <p className="text-xs text-slate-300 truncate">
                      {selectedEvent.venue}
                    </p>
                  </div>
                </div>

                {selectedEvent.speakerName && (
                  <div className="p-3.5 rounded-2xl bg-[#080A0F]/80 border border-white/10 flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-sky-500/10 text-sky-400 flex items-center justify-center font-bold">
                      <UserCheck className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-white">
                        {selectedEvent.speakerName}
                      </p>
                      <p className="text-[11px] text-slate-400">
                        {selectedEvent.speakerRole}
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* RSVP Form for upcoming sessions */}
              {selectedEvent.status === "upcoming" ? (
                registeredEvents.includes(selectedEvent.id) ? (
                  <div className="p-5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-center space-y-2">
                    <CheckCircle className="w-8 h-8 text-emerald-400 mx-auto" />
                    <p className="text-sm font-bold text-white">
                      You are RSVP&apos;d for this session!
                    </p>
                    <p className="text-xs text-slate-400 font-light">
                      Check your college email for calendar prerequisites and workstation setup notes.
                    </p>
                  </div>
                ) : (
                  <form
                    onSubmit={handleRegister}
                    className="p-5 rounded-2xl bg-[#080A0F]/90 border border-white/10 space-y-4"
                  >
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-amber-400" />
                      <h4 className="text-xs font-bold uppercase tracking-wider text-white font-mono">
                        Free Student RSVP Registration
                      </h4>
                    </div>

                    <div className="space-y-3">
                      <div>
                        <label className="block text-[11px] font-semibold text-slate-400 mb-1">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="Your full name"
                          value={rsvpStudentName}
                          onChange={(e) => setRsvpStudentName(e.target.value)}
                          className="w-full h-10 px-3 rounded-xl bg-[#101A2C] border border-white/10 text-xs text-white focus:outline-none focus:border-amber-500"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-semibold text-slate-400 mb-1">
                          College / Personal Email *
                        </label>
                        <input
                          type="email"
                          required
                          placeholder="your.email@pitsujjain.ac.in"
                          value={rsvpEmail}
                          onChange={(e) => setRsvpEmail(e.target.value)}
                          className="w-full h-10 px-3 rounded-xl bg-[#101A2C] border border-white/10 text-xs text-white focus:outline-none focus:border-amber-500"
                        />
                      </div>
                    </div>

                    <Button
                      type="submit"
                      className="w-full rounded-full"
                      isLoading={isSubmittingRsvp}
                    >
                      Confirm Event RSVP
                    </Button>
                  </form>
                )
              ) : (
                <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-center text-slate-400 font-light">
                  This session has concluded. Check out our Learning Resources section for related tutorials and sample code.
                </div>
              )}
            </div>
          </Modal>
        )}

        {/* Planning Disclaimer */}
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6 text-center text-xs text-slate-400 space-y-1">
          <div className="flex items-center justify-center gap-1.5 text-amber-400 font-semibold">
            <ShieldCheck className="w-4 h-4" />
            <span>Academic Planning &amp; Curriculum Disclaimer</span>
          </div>
          <p>
            The listed technical workshops and hackathons represent proposed educational curriculum tracks planned by student organizers at Prashanti Institute of Technology &amp; Science, Ujjain. Lab allocations and session dates are subject to academic schedules and computer center availability.
          </p>
        </div>
      </div>
    </div>
  );
}
