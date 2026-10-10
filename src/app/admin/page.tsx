"use client";

import * as React from "react";
import {
  ShieldCheck,
  Users,
  Calendar,
  Mail,
  Search,
  Trash2,
  RefreshCw,
  Plus,
  ExternalLink,
  Palette,
  Sparkles,
  Layers,
  Eye,
  Key,
} from "lucide-react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import {
  CoreTeamApplication,
  CommunityEvent,
  ContactSubmission,
  ApplicationStatus,
} from "@/lib/types";
import { formatDate } from "@/lib/utils";

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);
  const [passkey, setPasskey] = React.useState("");
  const [isVerifying, setIsVerifying] = React.useState(false);

  // Active admin tab
  const [activeTab, setActiveTab] = React.useState<
    "applications" | "events" | "contacts" | "system"
  >("applications");

  // Data states
  const [applications, setApplications] = React.useState<CoreTeamApplication[]>([]);
  const [contacts, setContacts] = React.useState<ContactSubmission[]>([]);
  const [events, setEvents] = React.useState<CommunityEvent[]>([]);
  const [systemInfo, setSystemInfo] = React.useState<{
    storageMode: string;
    databaseConfigured: boolean;
    serverTimestamp: string;
  } | null>(null);

  // Filters & Search
  const [appSearch, setAppSearch] = React.useState("");
  const [appStatusFilter, setAppStatusFilter] = React.useState<string>("All");
  const [selectedApp, setSelectedApp] = React.useState<CoreTeamApplication | null>(null);

  // Event creation form modal
  const [isNewEventModalOpen, setIsNewEventModalOpen] = React.useState(false);
  const [newEventTitle, setNewEventTitle] = React.useState("");
  const [newEventDate, setNewEventDate] = React.useState("");
  const [newEventVenue, setNewEventVenue] = React.useState("");
  const [newEventCategory, setNewEventCategory] = React.useState("AWS Cloud");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsVerifying(true);
    try {
      const res = await fetch("/api/admin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ passkey }),
      });

      const data = await res.json();
      if (!res.ok || !data.authenticated) {
        toast.error(data.error || "Invalid administrator security key");
        setIsVerifying(false);
        return;
      }

      setIsAuthenticated(true);
      setSystemInfo(data.system);
      toast.success("Administrator session authorized.");
      fetchData();
    } catch {
      toast.error("Error communicating with administration backend");
    } finally {
      setIsVerifying(false);
    }
  };

  const fetchData = async () => {
    try {
      const [appRes, cntRes, evtRes] = await Promise.all([
        fetch("/api/applications"),
        fetch("/api/contact"),
        fetch("/api/events"),
      ]);

      const [appData, cntData, evtData] = await Promise.all([
        appRes.json(),
        cntRes.json(),
        evtRes.json(),
      ]);

      if (appData.success) setApplications(appData.data);
      if (cntData.success) setContacts(cntData.data);
      if (evtData.success) setEvents(evtData.data);
    } catch {
      toast.error("Failed to load dashboard records");
    }
  };

  const handleStatusChange = async (id: string, newStatus: ApplicationStatus) => {
    try {
      const res = await fetch("/api/applications", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status: newStatus }),
      });
      if (res.ok) {
        setApplications((prev) =>
          prev.map((a) => (a.id === id ? { ...a, status: newStatus } : a))
        );
        if (selectedApp && selectedApp.id === id) {
          setSelectedApp({ ...selectedApp, status: newStatus });
        }
        toast.success(`Application updated to ${newStatus}`);
      } else {
        toast.error("Failed to update status");
      }
    } catch {
      toast.error("Network error while updating application");
    }
  };

  const handleDeleteApp = async (id: string) => {
    if (!confirm("Are you sure you want to delete this application?")) return;
    try {
      const res = await fetch(`/api/applications?id=${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setApplications((prev) => prev.filter((a) => a.id !== id));
        if (selectedApp?.id === id) setSelectedApp(null);
        toast.success("Application deleted");
      }
    } catch {
      toast.error("Failed to delete application");
    }
  };

  const handleToggleContactResolved = async (id: string) => {
    try {
      const res = await fetch("/api/contact", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      if (res.ok) {
        setContacts((prev) =>
          prev.map((c) =>
            c.id === id ? { ...c, isResolved: !c.isResolved } : c
          )
        );
        toast.success("Inquiry status toggled");
      }
    } catch {
      toast.error("Failed to update inquiry");
    }
  };

  const handleCreateEvent = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEventTitle || !newEventDate || !newEventVenue) {
      toast.error("Please fill in title, date, and venue.");
      return;
    }

    try {
      const res = await fetch("/api/events", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: newEventTitle,
          date: newEventDate,
          venue: newEventVenue,
          category: newEventCategory,
        }),
      });

      const result = await res.json();
      if (res.ok) {
        setEvents([result.data, ...events]);
        setIsNewEventModalOpen(false);
        setNewEventTitle("");
        setNewEventDate("");
        setNewEventVenue("");
        toast.success("New event published successfully!");
      }
    } catch {
      toast.error("Failed to create event");
    }
  };

  const handleDeleteEvent = async (id: string) => {
    if (!confirm("Remove this event?")) return;
    try {
      const res = await fetch(`/api/events?id=${id}`, { method: "DELETE" });
      if (res.ok) {
        setEvents((prev) => prev.filter((e) => e.id !== id));
        toast.success("Event removed");
      }
    } catch {
      toast.error("Failed to delete event");
    }
  };

  // Filtered applications
  const filteredApps = applications.filter((app) => {
    const matchesStatus =
      appStatusFilter === "All" || app.status === appStatusFilter;
    const matchesSearch =
      app.fullName.toLowerCase().includes(appSearch.toLowerCase()) ||
      app.collegeEmail.toLowerCase().includes(appSearch.toLowerCase()) ||
      app.preferredPosition.toLowerCase().includes(appSearch.toLowerCase()) ||
      app.technicalSkills.toLowerCase().includes(appSearch.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  if (!isAuthenticated) {
    return (
      <div className="py-20 flex items-center justify-center min-h-[60vh] px-4">
        <div className="w-full max-w-md rounded-3xl border border-slate-800 bg-slate-900/80 p-8 backdrop-blur-xl shadow-2xl space-y-6">
          <div className="text-center space-y-2">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center mx-auto">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h1 className="text-xl font-bold text-white">
              Administrator Portal
            </h1>
            <p className="text-xs text-slate-400">
              AWS Student Builder Group • PITS Ujjain
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-slate-300">
                Security Passkey
              </label>
              <div className="relative">
                <Key className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input
                  type="password"
                  placeholder="Enter administrator passkey..."
                  value={passkey}
                  onChange={(e) => setPasskey(e.target.value)}
                  className="w-full h-11 pl-10 pr-4 rounded-xl border border-slate-700 bg-slate-950 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-amber-500"
                />
              </div>
              <p className="text-[11px] text-slate-400">
                Default local passkey: <code className="text-amber-400">pits-sbg-admin2026</code>
              </p>
            </div>

            <Button
              type="submit"
              className="w-full"
              isLoading={isVerifying}
            >
              Verify &amp; Enter Dashboard
            </Button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      {/* Top Header & Navigation */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-6 h-6 text-amber-400" />
            <h1 className="text-2xl font-black text-white">
              SBG Administration Console
            </h1>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Prashanti Institute of Technology &amp; Science • Lead: Ashwin Chauhan
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="sm"
            onClick={fetchData}
            className="gap-1.5"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Refresh</span>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsAuthenticated(false)}
            className="text-red-400 hover:text-red-300"
          >
            Lock Session
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-2 overflow-x-auto">
        <button
          onClick={() => setActiveTab("applications")}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
            activeTab === "applications"
              ? "bg-amber-500/15 text-amber-400 border border-amber-500/40"
              : "text-slate-400 hover:text-white"
          }`}
        >
          <Users className="w-4 h-4" />
          <span>Core Team Applications ({applications.length})</span>
        </button>

        <button
          onClick={() => setActiveTab("events")}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
            activeTab === "events"
              ? "bg-amber-500/15 text-amber-400 border border-amber-500/40"
              : "text-slate-400 hover:text-white"
          }`}
        >
          <Calendar className="w-4 h-4" />
          <span>Events Manager ({events.length})</span>
        </button>

        <button
          onClick={() => setActiveTab("contacts")}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
            activeTab === "contacts"
              ? "bg-amber-500/15 text-amber-400 border border-amber-500/40"
              : "text-slate-400 hover:text-white"
          }`}
        >
          <Mail className="w-4 h-4" />
          <span>Contact Inquiries ({contacts.length})</span>
        </button>

        <button
          onClick={() => setActiveTab("system")}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
            activeTab === "system"
              ? "bg-amber-500/15 text-amber-400 border border-amber-500/40"
              : "text-slate-400 hover:text-white"
          }`}
        >
          <Palette className="w-4 h-4" />
          <span>Design System &amp; UI Showcase</span>
        </button>
      </div>

      {/* TAB 1: APPLICATIONS MANAGER */}
      {activeTab === "applications" && (
        <div className="space-y-6">
          {/* Search & Filter Toolbar */}
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            <div className="relative w-full sm:max-w-xs">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input
                type="text"
                placeholder="Search candidates, skills, role..."
                value={appSearch}
                onChange={(e) => setAppSearch(e.target.value)}
                className="w-full h-10 pl-10 pr-3 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white focus:outline-none focus:border-amber-500"
              />
            </div>

            <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto">
              {[
                "All",
                "Pending",
                "In Review",
                "Shortlisted",
                "Interview Scheduled",
                "Accepted",
                "Rejected",
              ].map((st) => (
                <button
                  key={st}
                  onClick={() => setAppStatusFilter(st)}
                  className={`text-xs px-3 py-1.5 rounded-lg border whitespace-nowrap transition-colors ${
                    appStatusFilter === st
                      ? "bg-amber-500/20 border-amber-500/50 text-amber-400 font-bold"
                      : "bg-slate-900 border-slate-800 text-slate-400 hover:text-white"
                  }`}
                >
                  {st}
                </button>
              ))}
            </div>
          </div>

          {/* Table / List */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 overflow-hidden shadow-xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-300">
                <thead className="bg-slate-950/80 text-slate-400 uppercase text-[10px] tracking-wider border-b border-slate-800">
                  <tr>
                    <th className="p-4">Candidate</th>
                    <th className="p-4">Department &amp; Year</th>
                    <th className="p-4">CGPA</th>
                    <th className="p-4">Preferred Role</th>
                    <th className="p-4">Status</th>
                    <th className="p-4">Applied</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {filteredApps.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="p-8 text-center text-slate-500">
                        No applications matched your filter.
                      </td>
                    </tr>
                  ) : (
                    filteredApps.map((app) => (
                      <tr
                        key={app.id}
                        className="hover:bg-slate-800/40 transition-colors"
                      >
                        <td className="p-4 font-semibold text-white">
                          <div>{app.fullName}</div>
                          <div className="text-[11px] text-slate-400 font-normal">
                            {app.collegeEmail}
                          </div>
                        </td>
                        <td className="p-4 text-slate-300">
                          <div>{app.department}</div>
                          <div className="text-slate-400">{app.currentYear}</div>
                        </td>
                        <td className="p-4">
                          <span
                            className={`font-mono font-bold ${
                              app.cgpa >= 8.5
                                ? "text-emerald-400"
                                : "text-amber-400"
                            }`}
                          >
                            {app.cgpa}
                          </span>
                        </td>
                        <td className="p-4 text-amber-300 font-medium">
                          {app.preferredPosition}
                        </td>
                        <td className="p-4">
                          <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-slate-800 border border-slate-700 text-slate-300">
                            {app.status}
                          </span>
                        </td>
                        <td className="p-4 text-slate-400">
                          {formatDate(app.createdAt)}
                        </td>
                        <td className="p-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <Button
                              variant="secondary"
                              size="sm"
                              onClick={() => setSelectedApp(app)}
                              className="h-8 px-2.5 text-xs"
                            >
                              <Eye className="w-3.5 h-3.5" />
                              <span>View</span>
                            </Button>
                            <button
                              onClick={() => handleDeleteApp(app.id)}
                              className="p-1.5 rounded-lg text-slate-500 hover:text-red-400 hover:bg-slate-800 transition-colors"
                              title="Delete application"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Modal for viewing complete application & changing status */}
          {selectedApp && (
            <Modal
              isOpen={Boolean(selectedApp)}
              onClose={() => setSelectedApp(null)}
              title={selectedApp.fullName}
              description={`Application for ${selectedApp.preferredPosition}`}
              maxWidth="xl"
            >
              <div className="space-y-6 text-xs text-slate-300">
                <div className="grid grid-cols-2 gap-3 p-4 rounded-xl bg-slate-950/80 border border-slate-800">
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase">
                      Email
                    </span>
                    <span className="text-white font-medium">
                      {selectedApp.collegeEmail}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase">
                      CGPA
                    </span>
                    <span className="text-amber-400 font-bold font-mono">
                      {selectedApp.cgpa} / 10.0
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase">
                      Department
                    </span>
                    <span className="text-white">{selectedApp.department}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase">
                      Year
                    </span>
                    <span className="text-white">{selectedApp.currentYear}</span>
                  </div>
                </div>

                <div className="space-y-1">
                  <h4 className="font-bold text-white uppercase text-[11px] tracking-wider">
                    Technical Skills
                  </h4>
                  <p className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 text-slate-300 leading-relaxed">
                    {selectedApp.technicalSkills}
                  </p>
                </div>

                <div className="space-y-1">
                  <h4 className="font-bold text-white uppercase text-[11px] tracking-wider">
                    Motivation Statement
                  </h4>
                  <p className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 text-slate-300 leading-relaxed">
                    {selectedApp.whyJoin}
                  </p>
                </div>

                {(selectedApp.projectLinks || selectedApp.linkedinUrl) && (
                  <div className="flex flex-wrap gap-3 pt-1">
                    {selectedApp.projectLinks && (
                      <a
                        href={selectedApp.projectLinks}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs text-sky-400 hover:underline"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        Project / GitHub Portfolio
                      </a>
                    )}
                    {selectedApp.linkedinUrl && (
                      <a
                        href={selectedApp.linkedinUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs text-sky-400 hover:underline"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        LinkedIn Profile
                      </a>
                    )}
                  </div>
                )}

                {/* Change Status Action */}
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
                  <span className="text-xs font-bold text-white block">
                    Change Recruitment Status
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {(
                      [
                        "Pending",
                        "In Review",
                        "Shortlisted",
                        "Interview Scheduled",
                        "Accepted",
                        "Rejected",
                      ] as ApplicationStatus[]
                    ).map((status) => (
                      <button
                        key={status}
                        onClick={() => handleStatusChange(selectedApp.id, status)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                          selectedApp.status === status
                            ? "bg-amber-500 text-slate-950 border-amber-500 font-bold"
                            : "bg-slate-900 border-slate-700 text-slate-300 hover:bg-slate-800"
                        }`}
                      >
                        {status}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </Modal>
          )}
        </div>
      )}

      {/* TAB 2: EVENTS MANAGER */}
      {activeTab === "events" && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-bold text-white">Campus Events</h2>
            <Button
              size="sm"
              onClick={() => setIsNewEventModalOpen(true)}
              className="gap-1.5"
            >
              <Plus className="w-4 h-4" />
              <span>Publish New Event</span>
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {events.map((evt) => (
              <div
                key={evt.id}
                className="p-5 rounded-2xl border border-slate-800 bg-slate-900/60 flex flex-col justify-between space-y-4"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Badge variant="orange" size="sm">
                      {evt.category}
                    </Badge>
                    <span className="text-xs font-mono text-slate-400">
                      {formatDate(evt.date)}
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-white">
                    {evt.title}
                  </h3>
                  <p className="text-xs text-slate-400 line-clamp-2">
                    {evt.description}
                  </p>
                  <div className="text-xs text-slate-400 pt-1">
                    Venue: <strong className="text-slate-300">{evt.venue}</strong>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-slate-800">
                  <span className="text-[11px] text-emerald-400 font-semibold">
                    Status: {evt.status}
                  </span>
                  <button
                    onClick={() => handleDeleteEvent(evt.id)}
                    className="p-1.5 rounded-lg text-slate-500 hover:text-red-400 hover:bg-slate-800"
                    title="Delete event"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* New Event Modal */}
          <Modal
            isOpen={isNewEventModalOpen}
            onClose={() => setIsNewEventModalOpen(false)}
            title="Publish New Event"
            description="Add an upcoming workshop or hackathon to the public schedule."
          >
            <form onSubmit={handleCreateEvent} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Event Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. AWS Bedrock Generative AI Bootcamp"
                  value={newEventTitle}
                  onChange={(e) => setNewEventTitle(e.target.value)}
                  className="w-full h-10 px-3 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Category
                </label>
                <select
                  value={newEventCategory}
                  onChange={(e) => setNewEventCategory(e.target.value)}
                  className="w-full h-10 px-3 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white focus:outline-none focus:border-amber-500"
                >
                  <option value="AWS Cloud">AWS Cloud</option>
                  <option value="Generative AI">Generative AI</option>
                  <option value="AI & Machine Learning">AI & Machine Learning</option>
                  <option value="Web Development">Web Development</option>
                  <option value="Career & Community">Career & Community</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Date *
                  </label>
                  <input
                    type="date"
                    required
                    value={newEventDate}
                    onChange={(e) => setNewEventDate(e.target.value)}
                    className="w-full h-10 px-3 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white focus:outline-none focus:border-amber-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Venue *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Computer Center Lab 2, PITS"
                    value={newEventVenue}
                    onChange={(e) => setNewEventVenue(e.target.value)}
                    className="w-full h-10 px-3 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <Button type="submit" className="w-full">
                Publish Event
              </Button>
            </form>
          </Modal>
        </div>
      )}

      {/* TAB 3: CONTACT INQUIRIES */}
      {activeTab === "contacts" && (
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-white">
            Student &amp; Faculty Inquiries
          </h2>

          <div className="space-y-3">
            {contacts.length === 0 ? (
              <div className="p-8 text-center text-slate-500 bg-slate-900/40 rounded-2xl border border-slate-800">
                No inquiries received yet.
              </div>
            ) : (
              contacts.map((cnt) => (
                <div
                  key={cnt.id}
                  className="p-5 rounded-2xl border border-slate-800 bg-slate-900/60 flex flex-col md:flex-row md:items-center justify-between gap-4"
                >
                  <div className="space-y-1.5 max-w-2xl">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-white text-sm">
                        {cnt.name}
                      </span>
                      <span className="text-xs text-slate-400">
                        &lt;{cnt.email}&gt;
                      </span>
                      <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-amber-400">
                        {cnt.category || "Inquiry"}
                      </span>
                    </div>
                    <div className="text-xs font-semibold text-amber-300">
                      {cnt.subject}
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      {cnt.message}
                    </p>
                    <span className="text-[10px] text-slate-500 block pt-1">
                      Received: {formatDate(cnt.createdAt)}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <Button
                      variant={cnt.isResolved ? "secondary" : "outline"}
                      size="sm"
                      onClick={() => handleToggleContactResolved(cnt.id)}
                    >
                      {cnt.isResolved ? "Mark Unresolved" : "Mark Resolved"}
                    </Button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* TAB 4: FRONTEND DESIGN SYSTEM & UI SHOWCASE */}
      {activeTab === "system" && (
        <div className="space-y-8">
          {/* Header Banner */}
          <div className="rounded-3xl border border-amber-500/30 bg-gradient-to-r from-amber-500/10 via-slate-900/90 to-slate-950 p-6 sm:p-8 backdrop-blur-md shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <Palette className="w-5 h-5 text-amber-400" />
                <h3 className="text-xl font-bold text-white">
                  Frontend Design System &amp; Component Kit
                </h3>
              </div>
              <p className="text-xs text-slate-300">
                AWS Student Builder Group • Prashanti Institute of Technology &amp; Science design tokens, UI typography, and component specifications.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="orange" size="md">
                100% Frontend Architecture
              </Badge>
            </div>
          </div>

          {/* Color Tokens Matrix */}
          <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6 sm:p-8 space-y-4">
            <div className="flex items-center gap-2 text-white font-bold text-sm">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Tailored Color Palette (AWS Builder Modern Theme)</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
              <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                <div className="h-10 rounded-xl bg-[#ff9900] shadow-md shadow-amber-500/30 flex items-center justify-center text-slate-950 font-black text-xs">
                  #FF9900
                </div>
                <div>
                  <p className="text-xs font-bold text-white">AWS Orange</p>
                  <p className="text-[10px] text-slate-400">Primary Brand</p>
                </div>
              </div>

              <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                <div className="h-10 rounded-xl bg-[#090d16] border border-slate-700 flex items-center justify-center text-slate-400 font-mono text-[10px]">
                  #090D16
                </div>
                <div>
                  <p className="text-xs font-bold text-white">Deep Navy</p>
                  <p className="text-[10px] text-slate-400">Main Canvas</p>
                </div>
              </div>

              <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                <div className="h-10 rounded-xl bg-[#0f172a] border border-slate-700 flex items-center justify-center text-slate-400 font-mono text-[10px]">
                  #0F172A
                </div>
                <div>
                  <p className="text-xs font-bold text-white">Navy Surface</p>
                  <p className="text-[10px] text-slate-400">Card Base</p>
                </div>
              </div>

              <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                <div className="h-10 rounded-xl bg-[#38bdf8] shadow-md shadow-sky-500/20 flex items-center justify-center text-slate-950 font-black text-xs">
                  #38BDF8
                </div>
                <div>
                  <p className="text-xs font-bold text-white">Cyber Sky</p>
                  <p className="text-[10px] text-slate-400">Tech &amp; Cloud</p>
                </div>
              </div>

              <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                <div className="h-10 rounded-xl bg-[#10b981] shadow-md shadow-emerald-500/20 flex items-center justify-center text-slate-950 font-black text-xs">
                  #10B981
                </div>
                <div>
                  <p className="text-xs font-bold text-white">Emerald Glow</p>
                  <p className="text-[10px] text-slate-400">Status &amp; WhatsApp</p>
                </div>
              </div>

              <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                <div className="h-10 rounded-xl bg-[#a855f7] shadow-md shadow-purple-500/20 flex items-center justify-center text-white font-black text-xs">
                  #A855F7
                </div>
                <div>
                  <p className="text-xs font-bold text-white">Bedrock Violet</p>
                  <p className="text-[10px] text-slate-400">Generative AI</p>
                </div>
              </div>
            </div>
          </div>

          {/* Component Showcase Gallery */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Buttons & Actions */}
            <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6 space-y-4">
              <div className="flex items-center gap-2 text-white font-bold text-sm">
                <Layers className="w-4 h-4 text-amber-400" />
                <span>Interactive Buttons</span>
              </div>
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <Button size="sm" variant="primary">Primary AWS</Button>
                <Button size="sm" variant="secondary">Secondary</Button>
                <Button size="sm" variant="outline">Outline</Button>
                <Button size="sm" variant="ghost">Ghost</Button>
              </div>
              <p className="text-[11px] text-slate-400 leading-normal">
                Features micro-interaction hover transforms, active click scaling, and glowing shadow accents.
              </p>
            </div>

            {/* Badges & Tags */}
            <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6 space-y-4">
              <div className="flex items-center gap-2 text-white font-bold text-sm">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>Badge Hierarchy</span>
              </div>
              <div className="flex flex-wrap items-center gap-2.5 pt-2">
                <Badge variant="orange" size="md">AWS Cloud</Badge>
                <Badge variant="blue" size="md">Innovation</Badge>
                <Badge variant="slate" size="md">Community</Badge>
                <Badge variant="outline" size="md">PITS 2026</Badge>
              </div>
              <p className="text-[11px] text-slate-400 leading-normal">
                Engineered for quick categorical identification, accessibility, and high visual contrast.
              </p>
            </div>
          </div>

          {/* Architecture & Rendering Specifications */}
          <div className="rounded-3xl border border-slate-800 bg-slate-950/80 p-6 sm:p-8 space-y-4">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">
              Application Frontend Technology Stack
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
                <span className="text-amber-400 font-bold block">Next.js 16 + React 19</span>
                <p className="text-slate-400 text-[11px]">Server and Client Components with modern metadata API and fluid routing.</p>
              </div>
              <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
                <span className="text-sky-400 font-bold block">Tailwind CSS v4</span>
                <p className="text-slate-400 text-[11px]">Dynamic token theme engine, glassmorphism filters, and smooth CSS transitions.</p>
              </div>
              <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
                <span className="text-emerald-400 font-bold block">Fast Zero-DB Store</span>
                <p className="text-slate-400 text-[11px]">Instant, zero-friction client &amp; server store with full mock responsiveness.</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
