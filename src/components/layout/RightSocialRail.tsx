"use client";

import * as React from "react";
import {
  Instagram,
  TwitterX,
  Linkedin,
  Facebook,
  YouTube,
  WhatsApp,
  Discord,
} from "@/components/ui/Icons";
import { COMMUNITY_INFO } from "@/lib/data/initialData";
import { useSound } from "@/components/audio/SoundManager";

interface SocialItem {
  id: string;
  label: string;
  href: string;
  icon: React.ElementType;
  hoverClass: string;
}

const SOCIAL_ITEMS: SocialItem[] = [
  {
    id: "instagram",
    label: "Instagram",
    href: "https://instagram.com",
    icon: Instagram,
    hoverClass: "hover:text-pink-400 hover:scale-110",
  },
  {
    id: "x",
    label: "X (Twitter)",
    href: "https://x.com",
    icon: TwitterX,
    hoverClass: "hover:text-white hover:scale-110",
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    href: "https://linkedin.com",
    icon: Linkedin,
    hoverClass: "hover:text-sky-400 hover:scale-110",
  },
  {
    id: "facebook",
    label: "Facebook",
    href: "https://facebook.com",
    icon: Facebook,
    hoverClass: "hover:text-blue-500 hover:scale-110",
  },
  {
    id: "youtube",
    label: "YouTube",
    href: "https://youtube.com",
    icon: YouTube,
    hoverClass: "hover:text-red-500 hover:scale-110",
  },
  {
    id: "whatsapp",
    label: "WhatsApp Community",
    href: COMMUNITY_INFO.whatsappUrl,
    icon: WhatsApp,
    hoverClass: "hover:text-emerald-400 hover:scale-110",
  },
  {
    id: "discord",
    label: "Discord Community",
    href: "https://discord.com",
    icon: Discord,
    hoverClass: "hover:text-indigo-400 hover:scale-110",
  },
];

export function RightSocialRail() {
  const { playHover, playClick } = useSound();

  return (
    <aside
      aria-label="Social Media Rail"
      className="fixed right-2 xl:right-3 2xl:right-5 top-1/2 -translate-y-1/2 z-40 hidden xl:flex flex-col items-center select-none"
    >
      {/* Floating Pill Container (Exact style from reference screenshot) */}
      <div className="bg-[#080A0F]/85 border border-white/10 py-4 px-2 rounded-2xl flex flex-col items-center gap-4 shadow-2xl backdrop-blur-xl">
        {SOCIAL_ITEMS.map((item) => {
          const Icon = item.icon;

          return (
            <div key={item.id} className="relative group flex items-center">
              {/* Tooltip on hover */}
              <div className="pointer-events-none absolute right-12 opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 z-50">
                <div className="px-2.5 py-1 rounded bg-[#080A0F]/95 border border-white/15 text-[10px] font-mono tracking-wider font-semibold text-white shadow-xl whitespace-nowrap backdrop-blur-md">
                  <span>{item.label}</span>
                </div>
              </div>

              <a
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                onClick={playClick}
                onMouseEnter={playHover}
                aria-label={item.label}
                className={`relative flex items-center justify-center w-8 h-8 rounded-lg text-slate-300 hover:bg-white/5 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF9900] ${item.hoverClass}`}
              >
                <Icon className="w-4 h-4" />
              </a>
            </div>
          );
        })}
      </div>
    </aside>
  );
}
