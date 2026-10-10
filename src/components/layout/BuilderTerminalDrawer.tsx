"use client";

import React, { useState, useEffect, useRef } from "react";
import { Terminal, X, Send, Sparkles, CornerDownLeft, ChevronRight, Layers, Calendar, Users, Briefcase, ExternalLink } from "lucide-react";
import { useSound } from "@/components/audio/SoundManager";
import Link from "next/link";

interface Message {
  id: string;
  sender: "user" | "system" | "ai";
  text: string;
  actionUrl?: string;
  actionText?: string;
  timestamp: string;
}

const INITIAL_MESSAGES: Message[] = [
  {
    id: "init-1",
    sender: "system",
    text: "AWS-SBG // TERMINAL PROTOCOL ONLINE [AP-SOUTH-1]. Welcome to the AWS Student Builder Group Terminal at Prashanti Institute of Technology & Science, Ujjain.",
    timestamp: "00:00",
  },
  {
    id: "init-2",
    sender: "ai",
    text: "Greetings, Builder! I am the SBG Assistant. Ask me anything about our technical workshops, core team recruitment, student projects, or group leader Ashwin Chauhan. Or type 'help' for terminal commands.",
    timestamp: "00:01",
  },
];

const SUGGESTIONS = [
  "Upcoming Workshops & Hackathons",
  "How to join Core Team (7.0 CGPA)",
  "Who is the Group Leader?",
  "Explore Student Projects",
  "WhatsApp Community Invite",
];

export function BuilderTerminalDrawer({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const { playClick, playWarp, playSuccess } = useSound();
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [inputVal, setInputVal] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      playWarp();
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [isOpen]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Handle keyboard shortcut Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  const handleQuery = (query: string) => {
    if (!query.trim()) return;

    const userMsg: Message = {
      id: `msg-${Date.now()}`,
      sender: "user",
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputVal("");
    playClick();

    // Process intelligence query
    setTimeout(() => {
      const q = query.toLowerCase().trim();
      let replyText = "";
      let actionUrl: string | undefined = undefined;
      let actionText: string | undefined = undefined;

      if (q === "help" || q === "/help") {
        replyText =
          "AVAILABLE PROTOCOLS:\n• events — View 6 proposed curriculum workshops & hackathons\n• team — View Ashwin Chauhan & 9 open domain roles\n• join — Recruitment criteria & 7.0+ CGPA requirement\n• projects — Cloud & AI student innovations\n• leader — Details about Group Leader Ashwin Chauhan\n• clear — Reset terminal memory";
      } else if (q.includes("event") || q.includes("workshop") || q.includes("hackathon") || q.includes("schedule")) {
        replyText =
          "We offer 6 proposed curriculum tracks:\n1. Introduction to AWS Cloud\n2. Cloud Fundamentals Workshop\n3. Generative AI Learning Session\n4. AI/ML Project Workshop\n5. Build and Deploy with AWS\n6. Hackathon & Project Showcase\n\nAll events feature hands-on labs and peer collaboration.";
        actionUrl = "/events";
        actionText = "Open Events Schedule";
      } else if (q.includes("join") || q.includes("apply") || q.includes("recruitment") || q.includes("cgpa") || q.includes("eligibility")) {
        replyText =
          "ELIGIBILITY CRITERIA FOR CORE TEAM:\n• Minimum 7.0 CGPA\n• Good knowledge of Cloud Computing or AI/ML\n• Basic web development or DevOps understanding\n• Active willingness to conduct workshops\n• Final selection includes a technical & leadership interview.";
        actionUrl = "/join";
        actionText = "Apply for Core Team";
      } else if (q.includes("leader") || q.includes("ashwin") || q.includes("chauhan") || q.includes("who is leading")) {
        replyText =
          "Ashwin Chauhan is the appointed AWS Student Builder Group Leader at Prashanti Institute of Technology & Science, Ujjain. He is a passionate student technologist leading campus cloud literacy (note: student leader, not an AWS corporate employee).";
        actionUrl = "/team";
        actionText = "View Leadership Profile";
      } else if (q.includes("project") || q.includes("built") || q.includes("repo") || q.includes("portfolio")) {
        replyText =
          "Our student builders create production-grade cloud architectures, including Serverless Event Processors, Multi-Agent RAG on AWS Bedrock, and Edge CDN platforms.";
        actionUrl = "/projects";
        actionText = "Explore Project Portfolio";
      } else if (q.includes("whatsapp") || q.includes("group") || q.includes("chat") || q.includes("community")) {
        replyText =
          "Join our official college developer community on WhatsApp to stay updated with announcements and peer study groups.";
        actionUrl = "https://chat.whatsapp.com/EYN9G6KJxfy66GQ3gTgR13";
        actionText = "Join WhatsApp Group";
      } else if (q === "clear") {
        setMessages(INITIAL_MESSAGES);
        return;
      } else {
        replyText =
          `Command recognized: "${query}". You can explore our community workshops, apply for domain lead roles, or inspect student cloud architectures. What would you like to explore next?`;
      }

      playSuccess();
      setMessages((prev) => [
        ...prev,
        {
          id: `ai-${Date.now()}`,
          sender: "ai",
          text: replyText,
          actionUrl,
          actionText,
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        },
      ]);
    }, 400);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-6 bg-black/70 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl h-[85vh] sm:h-[620px] flex flex-col rounded-t-2xl sm:rounded-2xl bg-[#080A0F] border border-[#FF9900]/30 shadow-[0_0_60px_rgba(255,153,0,0.2)] overflow-hidden">
        {/* Terminal Header */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-white/10 bg-[#101A2C]/80">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
            </div>
            <div className="flex items-center gap-2 pl-2 border-l border-white/10">
              <Terminal className="w-4 h-4 text-[#FF9900]" />
              <span className="font-mono text-xs font-bold text-white tracking-wider">
                BUILDER_AI_TERMINAL // v2026.4
              </span>
            </div>
          </div>

          <button
            onClick={() => {
              playClick();
              onClose();
            }}
            aria-label="Close Terminal"
            className="p-1 rounded-lg hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Suggestion Chips */}
        <div className="flex items-center gap-2 px-4 py-2 border-b border-white/5 bg-[#090D16] overflow-x-auto no-scrollbar">
          <span className="text-[10px] font-mono text-slate-400 shrink-0 uppercase tracking-wider">
            Quick Prompts:
          </span>
          {SUGGESTIONS.map((sug, i) => (
            <button
              key={i}
              onClick={() => handleQuery(sug)}
              className="shrink-0 px-2.5 py-1 rounded text-[11px] font-mono bg-white/5 hover:bg-[#FF9900]/20 text-slate-300 hover:text-[#FF9900] border border-white/10 hover:border-[#FF9900]/40 transition-colors"
            >
              {sug}
            </button>
          ))}
        </div>

        {/* Messages Log */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 font-mono text-xs">
          {messages.map((m) => (
            <div
              key={m.id}
              className={`flex flex-col ${
                m.sender === "user" ? "items-end" : "items-start"
              }`}
            >
              <div className="flex items-center gap-2 text-[10px] text-slate-400 mb-1">
                <span>
                  {m.sender === "user" ? "YOU" : m.sender === "system" ? "KERNEL" : "BUILDER_AI"}
                </span>
                <span>•</span>
                <span>{m.timestamp}</span>
              </div>

              <div
                className={`max-w-[85%] p-3.5 rounded-xl whitespace-pre-line leading-relaxed ${
                  m.sender === "user"
                    ? "bg-[#FF9900] text-black font-semibold font-sans shadow-md"
                    : m.sender === "system"
                    ? "bg-white/5 text-[#43B7FF] border border-[#43B7FF]/20"
                    : "bg-[#101A2C] text-slate-200 border border-white/10"
                }`}
              >
                {m.text}

                {m.actionUrl && (
                  <div className="mt-3 pt-2.5 border-t border-white/10">
                    <Link
                      href={m.actionUrl}
                      onClick={onClose}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#FF9900] text-black font-bold font-sans text-xs hover:bg-[#FF9900]/90 transition-colors"
                    >
                      <span>{m.actionText || "View Details"}</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                )}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Bar */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleQuery(inputVal);
          }}
          className="p-3 bg-[#101A2C]/90 border-t border-white/10 flex items-center gap-2"
        >
          <div className="flex items-center gap-2 flex-1 px-3 py-2 rounded-xl bg-[#080A0F] border border-white/10 focus-within:border-[#FF9900] transition-colors">
            <ChevronRight className="w-4 h-4 text-[#FF9900] shrink-0" />
            <input
              ref={inputRef}
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              placeholder="Ask about workshops, 7.0 CGPA criteria, Ashwin Chauhan, or type 'help'..."
              className="w-full bg-transparent text-white font-mono text-xs focus:outline-none placeholder:text-slate-500"
            />
          </div>

          <button
            type="submit"
            disabled={!inputVal.trim()}
            aria-label="Send query"
            className="p-2.5 rounded-xl bg-[#FF9900] text-black hover:bg-[#FF9900]/90 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
}
