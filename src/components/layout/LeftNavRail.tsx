"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Calendar, Layers, Users, Mail } from "lucide-react";
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
  { id: "hero", label: "Home", sectionId: "hero", href: "/#hero", icon: Home },
  { id: "events", label: "Events", sectionId: "events", href: "/events", icon: Calendar },
  { id: "projects", label: "Projects", sectionId: "projects", href: "/projects", icon: Layers },
  { id: "team", label: "Team", sectionId: "team", href: "/team", icon: Users },
  { id: "contact", label: "Contact", sectionId: "contact", href: "/contact", icon: Mail },
];

export function LeftNavRail() {
  const pathname = usePathname();
  const { playHover, playClick } = useSound();
  const [activeSection, setActiveSection] = React.useState<string>("hero");
  const isHomePage = pathname === "/";

  React.useEffect(() => {
    if (!isHomePage) {
      if (pathname.startsWith("/events")) setActiveSection("events");
      else if (pathname.startsWith("/projects")) setActiveSection("projects");
      else if (pathname.startsWith("/team")) setActiveSection("team");
      else if (pathname.startsWith("/contact")) setActiveSection("contact");
      else setActiveSection("");
      return;
    }

    const handleScroll = () => {
      const sections = ["hero", "community", "technology", "learn-by-building", "events", "projects", "team", "join"];
      const scrollPos = window.scrollY + window.innerHeight / 3;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            if (section === "hero" || section === "community") setActiveSection("hero");
            else if (section === "events") setActiveSection("events");
            else if (section === "projects") setActiveSection("projects");
            else if (section === "team") setActiveSection("team");
            else if (section === "join") setActiveSection("contact");
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
        setActiveSection(item.id);
      }
    }
  };

  return (
    <aside
      aria-label="Quick Navigation"
      className="fixed left-4 lg:left-6 top-1/2 -translate-y-1/2 z-40 hidden xl:flex flex-col items-center select-none"
    >
      {/* Decorative vertical top connector */}
      <div className="w-[1px] h-10 bg-gradient-to-b from-transparent via-amber-500/30 to-amber-500/60 mb-2" />

      {/* Rail Container */}
      <div className="nav-rail-glass py-3 px-1.5 rounded-full flex flex-col items-center gap-3 relative shadow-2xl backdrop-blur-2xl">
        {RAIL_ITEMS.map((item, index) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;

          return (
            <div key={item.id} className="relative group flex items-center">
              <Link
                href={item.href}
                onClick={(e) => handleClick(e, item)}
                onMouseEnter={playHover}
                aria-label={`Navigate to ${item.label}`}
                className={cn(
                  "relative flex items-center justify-center w-9 h-9 rounded-full transition-all duration-300",
                  isActive
                    ? "bg-amber-500 text-slate-950 shadow-lg shadow-orange-500/30 scale-105"
                    : "text-slate-400 hover:text-white hover:bg-white/10"
                )}
              >
                <Icon className="w-4 h-4" />
                {isActive && (
                  <span className="absolute -inset-1 rounded-full border border-amber-400/40 animate-ping opacity-30 pointer-events-none" />
                )}
              </Link>

              {/* Tooltip on hover */}
              <div className="pointer-events-none absolute left-12 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 z-50">
                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#080A0F]/95 border border-amber-500/30 text-[11px] font-mono tracking-wider font-semibold text-white shadow-xl whitespace-nowrap backdrop-blur-md">
                  <span className="text-amber-400">0{index + 1}</span>
                  <span className="text-slate-500">/</span>
                  <span>{item.label}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Decorative vertical bottom connector */}
      <div className="w-[1px] h-10 bg-gradient-to-t from-transparent via-amber-500/30 to-amber-500/60 mt-2" />
    </aside>
  );
}
