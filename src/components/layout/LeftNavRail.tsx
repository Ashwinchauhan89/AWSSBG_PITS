"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Home, Calendar, Layers, PhoneCall, Users } from "lucide-react";
import { cn } from "@/lib/utils";
import { useSound } from "@/components/audio/SoundManager";

interface RailItem {
  id: string;
  label: string;
  sectionId?: string;
  href: string;
  icon: React.ElementType;
}

const RAIL_ITEMS: RailItem[] = [
  { id: "home", label: "Home", sectionId: "hero", href: "/#hero", icon: Home },
  { id: "events", label: "Events", sectionId: "events", href: "/events", icon: Calendar },
  { id: "projects", label: "Projects", sectionId: "projects", href: "/projects", icon: Layers },
  { id: "contact", label: "Contact Us", href: "/contact", icon: PhoneCall },
  { id: "about", label: "About Us", sectionId: "community", href: "/about", icon: Users },
];

export function LeftNavRail() {
  const pathname = usePathname();
  const { playHover, playClick } = useSound();
  const [homeScrollSection, setHomeScrollSection] = React.useState<string>("home");
  const isHomePage = pathname === "/";

  const activeSection = !isHomePage
    ? pathname.startsWith("/events")
      ? "events"
      : pathname.startsWith("/projects")
      ? "projects"
      : pathname.startsWith("/contact")
      ? "contact"
      : pathname.startsWith("/about")
      ? "about"
      : ""
    : homeScrollSection;

  React.useEffect(() => {
    if (!isHomePage) return;

    const handleScroll = () => {
      const scrollPos = window.scrollY + window.innerHeight / 3;
      const sectionMappings = [
        { id: "hero", navId: "home" },
        { id: "community", navId: "about" },
        { id: "technology", navId: "about" },
        { id: "roadmap", navId: "home" },
        { id: "events", navId: "events" },
        { id: "projects", navId: "projects" },
        { id: "team", navId: "about" },
        { id: "highlights", navId: "home" },
        { id: "join", navId: "home" },
      ];

      for (const mapping of sectionMappings) {
        const el = document.getElementById(mapping.id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setHomeScrollSection(mapping.navId);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname, isHomePage]);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, item: RailItem) => {
    playClick();
    if (isHomePage && item.sectionId) {
      const el = document.getElementById(item.sectionId);
      if (el) {
        e.preventDefault();
        el.scrollIntoView({ behavior: "smooth" });
        setHomeScrollSection(item.id);
      }
    }
  };

  return (
    <aside
      aria-label="Quick Navigation Rail"
      className="fixed left-2 xl:left-3 2xl:left-5 top-1/2 -translate-y-1/2 z-40 hidden xl:flex flex-col items-center select-none"
    >
      {/* Floating Pill Container (Exact style from reference screenshot) */}
      <div className="bg-[#080A0F]/85 border border-white/10 py-2.5 px-1.5 rounded-2xl flex flex-col items-center gap-2 shadow-2xl backdrop-blur-xl">
        {/* Brand Logo Emblem Top Button */}
        <Link
          href="/"
          onClick={(e) => {
            playClick();
            if (isHomePage) {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
              setHomeScrollSection("home");
            }
          }}
          onMouseEnter={playHover}
          aria-label="AWS SBG Home"
          className="group relative flex items-center justify-center w-11 h-11 rounded-xl bg-purple-500/10 border border-purple-500/30 hover:border-purple-400 hover:bg-purple-500/20 hover:scale-105 transition-all duration-300 p-1.5 shadow-md shadow-purple-500/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF9900]"
        >
          <Image
            src="/images/branding/community-mark-transparent.png"
            alt="PITS Cloud Computing Community Emblem"
            width={32}
            height={32}
            className="w-full h-full object-contain drop-shadow transition-transform duration-300 group-hover:rotate-6"
            priority
          />
        </Link>
        <div className="w-8 h-px bg-white/10 my-0.5" />

        {RAIL_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;

          return (
            <Link
              key={item.id}
              href={item.href}
              onClick={(e) => handleClick(e, item)}
              onMouseEnter={playHover}
              aria-label={item.label}
              className={cn(
                "group relative flex flex-col items-center justify-center w-14 py-2 px-1 rounded-xl transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF9900]",
                isActive
                  ? "bg-white/10 text-white shadow-inner"
                  : "text-slate-400 hover:text-white hover:bg-white/5"
              )}
            >
              {/* Icon */}
              <Icon
                className={cn(
                  "w-5 h-5 mb-1 transition-transform group-hover:scale-110",
                  isActive ? "text-[#FF9900]" : "text-slate-300"
                )}
                strokeWidth={1.8}
              />

              {/* Label below icon (Exact layout from reference screenshot) */}
              <span className="text-[9px] font-sans font-medium tracking-tight text-center leading-tight">
                {item.label}
              </span>

              {/* Active side indicator */}
              {isActive && (
                <span className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 bg-[#FF9900] rounded-r" />
              )}
            </Link>
          );
        })}
      </div>
    </aside>
  );
}
