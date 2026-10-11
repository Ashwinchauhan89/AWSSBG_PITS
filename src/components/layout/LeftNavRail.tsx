"use client";

import * as React from "react";
import Link from "next/link";
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
  { id: "contact", label: "Contact Us", sectionId: "contact", href: "/contact", icon: PhoneCall },
  { id: "about", label: "About Us", sectionId: "community", href: "/about", icon: Users },
];

export function LeftNavRail() {
  const pathname = usePathname();
  const { playHover, playClick } = useSound();
  const [activeSection, setActiveSection] = React.useState<string>("home");
  const isHomePage = pathname === "/";

  React.useEffect(() => {
    if (!isHomePage) {
      if (pathname.startsWith("/events")) setActiveSection("events");
      else if (pathname.startsWith("/projects")) setActiveSection("projects");
      else if (pathname.startsWith("/contact")) setActiveSection("contact");
      else if (pathname.startsWith("/about")) setActiveSection("about");
      else setActiveSection("");
      return;
    }

    const handleScroll = () => {
      const sections = ["hero", "community", "technology", "events", "projects", "team", "join"];
      const scrollPos = window.scrollY + window.innerHeight / 3;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            if (section === "hero") setActiveSection("home");
            else if (section === "events") setActiveSection("events");
            else if (section === "projects") setActiveSection("projects");
            else if (section === "community") setActiveSection("about");
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
      aria-label="Quick Navigation Rail"
      className="fixed left-2 xl:left-3 2xl:left-5 top-1/2 -translate-y-1/2 z-40 hidden xl:flex flex-col items-center select-none"
    >
      {/* Floating Pill Container (Exact style from reference screenshot) */}
      <div className="bg-[#080A0F]/85 border border-white/10 py-3 px-1.5 rounded-2xl flex flex-col items-center gap-3 shadow-2xl backdrop-blur-xl">
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
                "group relative flex flex-col items-center justify-center w-14 py-2 px-1 rounded-xl transition-all duration-200",
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
