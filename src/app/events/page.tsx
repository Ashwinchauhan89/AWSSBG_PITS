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
} from "lucide-react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { INITIAL_EVENTS } from "@/lib/data/initialData";
import { CommunityEvent, EventCategory } from "@/lib/types";
import { formatDate } from "@/lib/utils";

const CATEGORIES: ("All" | EventCategory)[] = [
  "All",
  "AWS Cloud",
  "Generative AI",
  "AI & Machine Learning",
  "Web Development",
  "Career & Community",
];

export default function EventsPage() {
  const [events] = React.useState<CommunityEvent[]>(INITIAL_EVENTS);
  const [selectedCategory, setSelectedCategory] = React.useState<string>("All");
  const [searchQuery, setSearchQuery] = React.useState<string>("");
  const [activeTab, setActiveTab] = React.useState<"upcoming" | "past">("upcoming");
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <Badge variant="orange" size="md">
            Technical Sessions &amp; Bootcamps
          </Badge>
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Events &amp; Hands-on Workshops
          </h1>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            Discover upcoming hands-on labs, hackathons, and guest tech talks organized by student leads at Prashanti Institute of Technology &amp; Science.
          </p>
        </div>

        {/* Tab Switch: Upcoming vs Past */}
        <div className="flex items-center justify-center">
          <div className="inline-flex rounded-xl bg-slate-900 border border-slate-800 p-1.5 shadow-lg">
            <button
              onClick={() => setActiveTab("upcoming")}
              className={`px-5 py-2 rounded-lg text-xs font-bold transition-all ${
                activeTab === "upcoming"
                  ? "bg-amber-500 text-slate-950 shadow-md"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              Upcoming Sessions ({events.filter((e) => e.status === "upcoming").length})
            </button>
            <button
              onClick={() => setActiveTab("past")}
              className={`px-5 py-2 rounded-lg text-xs font-bold transition-all ${
                activeTab === "past"
                  ? "bg-slate-800 text-white shadow-md"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              Past Archive ({events.filter((e) => e.status === "past").length})
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
                className="w-full h-11 pl-10 pr-4 rounded-xl border border-slate-800 bg-slate-900/80 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-amber-500 transition-colors"
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
                className="text-xs text-amber-400 hover:text-amber-300 font-semibold"
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
                className={`whitespace-nowrap px-3.5 py-1.5 rounded-xl text-xs font-medium border transition-colors ${
                  selectedCategory === cat
                    ? "bg-amber-500/15 border-amber-500/50 text-amber-400 font-bold"
                    : "bg-slate-900/60 border-slate-800 text-slate-400 hover:text-white hover:border-slate-700"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Events Grid */}
        {filteredEvents.length === 0 ? (
          <div className="text-center py-16 rounded-3xl border border-slate-800 bg-slate-900/40 p-8 space-y-3">
            <Calendar className="w-12 h-12 text-slate-600 mx-auto" />
            <h3 className="text-lg font-bold text-white">No sessions found</h3>
            <p className="text-xs text-slate-400 max-w-sm mx-auto">
              No events matched the selected filters. Try choosing &quot;All&quot; or resetting your search query.
            </p>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setSelectedCategory("All");
                setSearchQuery("");
              }}
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
                  className="flex flex-col justify-between rounded-2xl border border-slate-800 bg-slate-900/60 p-6 backdrop-blur-sm transition-all duration-300 hover:border-amber-500/40 hover:shadow-xl group"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between gap-2">
                      <Badge variant="orange" size="sm">
                        {event.category}
                      </Badge>
                      {event.status === "upcoming" ? (
                        isRegistered ? (
                          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/30">
                            <CheckCircle className="w-3 h-3" />
                            RSVP Confirmed
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                            Registration Open
                          </span>
                        )
                      ) : (
                        <span className="text-[11px] font-mono text-slate-500 bg-slate-800/60 px-2 py-0.5 rounded">
                          Completed
                        </span>
                      )}
                    </div>

                    <h2 className="text-lg font-bold text-white group-hover:text-amber-400 transition-colors leading-snug">
                      {event.title}
                    </h2>

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
                          <span className="truncate">
                            {event.speakerName} ({event.speakerRole})
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="pt-6 mt-4 border-t border-slate-800/60 flex items-center justify-between gap-2">
                    <div className="flex flex-wrap gap-1">
                      {event.tags.slice(0, 2).map((t, idx) => (
                        <span
                          key={idx}
                          className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-400"
                        >
                          #{t}
                        </span>
                      ))}
                    </div>

                    <Button
                      variant={event.status === "upcoming" ? "primary" : "outline"}
                      size="sm"
                      onClick={() => setSelectedEvent(event)}
                    >
                      {event.status === "upcoming" ? "View & RSVP" : "View Archive"}
                    </Button>
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
                <p className="text-sm text-slate-200 leading-relaxed">
                  {selectedEvent.description}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 space-y-1">
                    <span className="text-[10px] text-slate-400 uppercase font-bold">
                      Date &amp; Time
                    </span>
                    <p className="text-xs font-semibold text-white">
                      {formatDate(selectedEvent.date)}
                    </p>
                    <p className="text-xs text-amber-400">{selectedEvent.time}</p>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 space-y-1">
                    <span className="text-[10px] text-slate-400 uppercase font-bold">
                      Format &amp; Venue
                    </span>
                    <p className="text-xs font-semibold text-white">
                      {selectedEvent.isOnline ? "Virtual Session" : "In-Person Lab"}
                    </p>
                    <p className="text-xs text-slate-300 truncate">
                      {selectedEvent.venue}
                    </p>
                  </div>
                </div>

                {selectedEvent.speakerName && (
                  <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 flex items-center gap-3">
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
                  <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-center space-y-2">
                    <CheckCircle className="w-8 h-8 text-emerald-400 mx-auto" />
                    <p className="text-sm font-bold text-white">
                      You are RSVP&apos;d for this session!
                    </p>
                    <p className="text-xs text-slate-400">
                      Check your email for calendar invite and pre-session prerequisites.
                    </p>
                  </div>
                ) : (
                  <form
                    onSubmit={handleRegister}
                    className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-4"
                  >
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-amber-400" />
                      <h4 className="text-xs font-bold uppercase tracking-wider text-white">
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
                          className="w-full h-9 px-3 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-amber-500"
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
                          className="w-full h-9 px-3 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-amber-500"
                        />
                      </div>
                    </div>

                    <Button
                      type="submit"
                      className="w-full"
                      isLoading={isSubmittingRsvp}
                    >
                      Confirm Event RSVP
                    </Button>
                  </form>
                )
              ) : (
                <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-800 text-center text-slate-400">
                  This session has concluded. Check out our Learning Resources section for related tutorials and sample code.
                </div>
              )}
            </div>
          </Modal>
        )}
      </div>
    </div>
  );
}
