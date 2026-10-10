"use client";

import * as React from "react";
import { MessageCircle } from "lucide-react";
import { Github, Linkedin, Instagram, WhatsApp } from "@/components/ui/Icons";
import { COMMUNITY_INFO } from "@/lib/data/initialData";
import { useSound } from "@/components/audio/SoundManager";

interface SocialItem {
  id: string;
  label: string;
  href: string;
  icon: React.ElementType;
  colorHover: string;
}

const SOCIAL_ITEMS: SocialItem[] = [
  {
    id: "whatsapp",
    label: "WhatsApp Community",
    href: COMMUNITY_INFO.whatsappUrl,
    icon: MessageCircle,
    colorHover: "hover:text-emerald-400 hover:border-emerald-500/40",
  },
  {
    id: "github",
    label: "GitHub Organization",
    href: "https://github.com",
    icon: Github,
    colorHover: "hover:text-white hover:border-white/40",
  },
  {
    id: "linkedin",
    label: "LinkedIn Page",
    href: "https://linkedin.com",
    icon: Linkedin,
    colorHover: "hover:text-sky-400 hover:border-sky-500/40",
  },
  {
    id: "instagram",
    label: "Instagram",
    href: "https://instagram.com",
    icon: Instagram,
    colorHover: "hover:text-pink-400 hover:border-pink-500/40",
  },
];

export function RightSocialRail() {
  const { playHover, playClick } = useSound();

  return (
    <aside
      aria-label="Social Media Connections"
      className="fixed right-4 lg:right-6 top-1/2 -translate-y-1/2 z-40 hidden xl:flex flex-col items-center select-none"
    >
      {/* Decorative vertical top connector */}
      <div className="w-[1px] h-10 bg-gradient-to-b from-transparent via-sky-500/30 to-sky-500/60 mb-2" />

      {/* Rail Container */}
      <div className="nav-rail-glass py-3 px-1.5 rounded-full flex flex-col items-center gap-3 relative shadow-2xl backdrop-blur-2xl">
        {SOCIAL_ITEMS.map((item) => {
          const Icon = item.icon;

          return (
            <div key={item.id} className="relative group flex items-center">
              {/* Tooltip on hover (points to the left) */}
              <div className="pointer-events-none absolute right-12 opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 z-50">
                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#080A0F]/95 border border-sky-500/30 text-[11px] font-mono tracking-wider font-semibold text-white shadow-xl whitespace-nowrap backdrop-blur-md">
                  <span>{item.label}</span>
                </div>
              </div>

              <a
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                onClick={playClick}
                onMouseEnter={playHover}
                aria-label={`Open ${item.label}`}
                className={`relative flex items-center justify-center w-9 h-9 rounded-full text-slate-400 hover:bg-white/10 transition-all duration-300 ${item.colorHover}`}
              >
                <Icon className="w-4 h-4" />
              </a>
            </div>
          );
        })}
      </div>


      {/* Decorative vertical bottom connector */}
      <div className="w-[1px] h-10 bg-gradient-to-t from-transparent via-sky-500/30 to-sky-500/60 mt-2" />
    </aside>
  );
}
