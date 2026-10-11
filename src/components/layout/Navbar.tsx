"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Menu,
  X,
  Sparkles,
  Users,
  Calendar,
  Layers,
  BookOpen,
  PhoneCall,
  MessageCircle,
} from "lucide-react";
import {
  Instagram,
  TwitterX,
  Linkedin,
  Facebook,
  YouTube,
  WhatsApp,
  Discord,
} from "@/components/ui/Icons";
import { cn } from "@/lib/utils";
import { COMMUNITY_INFO } from "@/lib/data/initialData";
import { SoundToggle } from "@/components/audio/SoundToggle";
import { useSound } from "@/components/audio/SoundManager";

export function Navbar() {
  const pathname = usePathname();
  const { playHover, playClick } = useSound();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [prevPathname, setPrevPathname] = React.useState(pathname);
  const [isScrolled, setIsScrolled] = React.useState(false);

  // Close mobile drawer on route change
  if (prevPathname !== pathname) {
    setPrevPathname(pathname);
    setMobileMenuOpen(false);
  }

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [mobileMenuOpen]);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300 select-none",
        isScrolled
          ? "bg-[#080A0F]/90 backdrop-blur-xl border-b border-white/10 shadow-2xl shadow-black/80 py-2 sm:py-2.5"
          : "bg-transparent py-3 sm:py-4"
      )}
    >
      <div className="max-w-7xl 2xl:max-w-[1500px] 3xl:max-w-[1800px] 4xl:max-w-[2100px] mx-auto px-3 sm:px-6 lg:px-8 xl:px-12 2xl:px-16">
        <div className="flex h-12 items-center justify-between gap-2 sm:gap-4">
          {/* 1. Left Brand Mark (Matching TF™ aesthetic from Techfest reference) */}
          <Link
            href="/"
            onClick={playClick}
            onMouseEnter={playHover}
            className="flex items-center gap-1 sm:gap-1.5 group focus:outline-none shrink-0"
          >
            <div className="flex items-baseline">
              <span className="text-xl sm:text-2xl lg:text-3xl font-black italic tracking-tighter text-white group-hover:text-[#FF9900] transition-colors font-mono">
                SBG
              </span>
              <span className="text-[9px] sm:text-[10px] font-bold text-[#FF9900] ml-0.5 align-super">
                ™
              </span>
            </div>
            <span className="hidden md:inline-block text-[8px] sm:text-[9px] font-mono text-slate-400 pl-2 border-l border-white/15 uppercase tracking-widest">
              PITS UJJAIN
            </span>
          </Link>

          {/* 2. Center Futuristic Beveled HUD Frame (Responsive across tablets and screens) */}
          <nav className="hidden lg:flex items-center relative shrink-0">
            {/* SVG Beveled Polygon Bracket Border */}
            <div className="relative flex items-center px-4 xl:px-8 py-1.5 xl:py-2 bg-[#080A0F]/90 backdrop-blur-xl border border-white/20 shadow-[0_4px_25px_rgba(0,0,0,0.6)] [clip-path:polygon(12px_0%,calc(100%-12px)_0%,100%_12px,100%_calc(100%-12px),calc(100%-12px)_100%,12px_100%,0%_calc(100%-12px),0%_12px)]">
              {/* Corner tech accents */}
              <div className="absolute top-0 left-0 w-2.5 h-2.5 border-t-2 border-l-2 border-[#FF9900]/70" />
              <div className="absolute top-0 right-0 w-2.5 h-2.5 border-t-2 border-r-2 border-[#FF9900]/70" />
              <div className="absolute bottom-0 left-0 w-2.5 h-2.5 border-b-2 border-l-2 border-[#FF9900]/70" />
              <div className="absolute bottom-0 right-0 w-2.5 h-2.5 border-b-2 border-r-2 border-[#FF9900]/70" />

              <div className="flex items-center gap-4 xl:gap-8 text-[10px] xl:text-[11px] font-mono font-bold tracking-[0.14em] uppercase">
                {/* Learning / Resources */}
                <Link
                  href="/resources"
                  onClick={playClick}
                  onMouseEnter={playHover}
                  className={cn(
                    "transition-colors hover:text-[#FF9900]",
                    pathname === "/resources" ? "text-[#FF9900]" : "text-slate-300"
                  )}
                >
                  LEARNING
                </Link>

                {/* Workshops with EARLY BIRD badge */}
                <div className="relative flex flex-col items-center">
                  <span className="absolute -top-3.5 text-[7px] xl:text-[8px] font-mono font-black tracking-wider text-[#FF9900] bg-[#FF9900]/15 px-1.5 py-0.2 rounded border border-[#FF9900]/30 animate-pulse">
                    EARLY BIRD
                  </span>
                  <Link
                    href="/events"
                    onClick={playClick}
                    onMouseEnter={playHover}
                    className={cn(
                      "transition-colors hover:text-[#FF9900] pt-1",
                      pathname === "/events" ? "text-[#FF9900]" : "text-slate-300"
                    )}
                  >
                    WORKSHOPS
                  </Link>
                </div>

                {/* Competitions / Projects */}
                <Link
                  href="/projects"
                  onClick={playClick}
                  onMouseEnter={playHover}
                  className={cn(
                    "transition-colors hover:text-[#FF9900]",
                    pathname === "/projects" ? "text-[#FF9900]" : "text-slate-300"
                  )}
                >
                  COMPETITIONS
                </Link>

                {/* Ignite / Summit / Community */}
                <Link
                  href="/about"
                  onClick={playClick}
                  onMouseEnter={playHover}
                  className={cn(
                    "transition-colors hover:text-[#FF9900]",
                    pathname === "/about" ? "text-[#FF9900]" : "text-slate-300"
                  )}
                >
                  IGNITE
                </Link>
              </div>
            </div>
          </nav>

          {/* 3. Right Profile Button & Sound Toggle (Responsive) */}
          <div className="hidden sm:flex items-center gap-2 lg:gap-3 shrink-0">
            <SoundToggle />

            {/* ASHWIN Profile Button */}
            <Link
              href="/team"
              onClick={playClick}
              onMouseEnter={playHover}
              className="px-3 lg:px-4 py-1.5 rounded-lg bg-[#080A0F] border border-white/30 hover:border-[#FF9900] text-[11px] lg:text-xs font-mono font-bold tracking-widest text-white hover:text-[#FF9900] shadow-md transition-all uppercase"
              title="Group Leader Profile: Ashwin Chauhan"
            >
              ASHWIN
            </Link>

            <Link
              href="/join"
              onClick={playClick}
              onMouseEnter={playHover}
              className="inline-flex items-center gap-1.5 px-3 lg:px-3.5 py-1.5 rounded-lg text-[11px] lg:text-xs font-mono font-bold bg-[#FF9900] text-slate-950 hover:bg-amber-400 transition-colors shadow-md shadow-[#FF9900]/20 uppercase"
            >
              <Sparkles className="w-3 h-3" />
              <span>JOIN</span>
            </Link>
          </div>

          {/* Mobile Menu Trigger & Sound Toggle */}
          <div className="flex items-center gap-1.5 sm:gap-2 lg:hidden">
            <SoundToggle />

            <button
              onClick={() => {
                playClick();
                setMobileMenuOpen(!mobileMenuOpen);
              }}
              aria-label="Toggle menu"
              className="p-2 rounded-lg bg-[#080A0F] border border-white/10 text-white"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile & Tablet Full-Feature Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden px-4 pt-4 pb-6 bg-[#080A0F]/98 border-b border-white/15 backdrop-blur-2xl space-y-4 max-h-[calc(100dvh-4rem)] overflow-y-auto animate-in slide-in-from-top-2 duration-200 shadow-2xl">
          <div className="grid grid-cols-2 gap-2 text-xs font-mono">
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 p-2.5 rounded-lg bg-white/5 border border-white/10 text-white hover:border-[#FF9900]/50"
            >
              <span>HOME</span>
            </Link>
            <Link
              href="/resources"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 p-2.5 rounded-lg bg-white/5 border border-white/10 text-white hover:border-[#FF9900]/50"
            >
              <span>LEARNING</span>
            </Link>
            <Link
              href="/events"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between p-2.5 rounded-lg bg-white/5 border border-[#FF9900]/40 text-[#FF9900]"
            >
              <span>WORKSHOPS</span>
              <span className="text-[8px] bg-[#FF9900]/20 px-1 rounded">EARLY BIRD</span>
            </Link>
            <Link
              href="/projects"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 p-2.5 rounded-lg bg-white/5 border border-white/10 text-white hover:border-[#FF9900]/50"
            >
              <span>COMPETITIONS</span>
            </Link>
            <Link
              href="/team"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 p-2.5 rounded-lg bg-white/5 border border-white/10 text-[#FF9900] font-bold"
            >
              <span>ASHWIN (LEAD)</span>
            </Link>
            <Link
              href="/about"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 p-2.5 rounded-lg bg-white/5 border border-white/10 text-white hover:border-[#FF9900]/50"
            >
              <span>ABOUT US</span>
            </Link>
            <Link
              href="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 p-2.5 rounded-lg bg-white/5 border border-white/10 text-white hover:border-[#FF9900]/50 col-span-2"
            >
              <PhoneCall className="w-3.5 h-3.5 text-sky-400" />
              <span>CONTACT CAMPUS CHAPTER</span>
            </Link>
          </div>

          <Link
            href="/join"
            onClick={() => setMobileMenuOpen(false)}
            className="block w-full py-2.5 text-center rounded-lg bg-[#FF9900] text-slate-950 font-mono font-bold text-xs uppercase shadow-lg shadow-[#FF9900]/25"
          >
            JOIN CORE TEAM (MIN 7.0 CGPA)
          </Link>

          {/* Mobile Social Links Row (Full parity with desktop rail) */}
          <div className="pt-2 border-t border-white/10">
            <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block mb-2">
              Official Channels:
            </span>
            <div className="flex items-center justify-between gap-1 text-slate-300">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="p-2 rounded bg-white/5 hover:text-pink-400" title="Instagram">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="https://x.com" target="_blank" rel="noopener noreferrer" className="p-2 rounded bg-white/5 hover:text-white" title="X">
                <TwitterX className="w-4 h-4" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="p-2 rounded bg-white/5 hover:text-sky-400" title="LinkedIn">
                <Linkedin className="w-4 h-4" />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="p-2 rounded bg-white/5 hover:text-blue-500" title="Facebook">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="p-2 rounded bg-white/5 hover:text-red-500" title="YouTube">
                <YouTube className="w-4 h-4" />
              </a>
              <a href={COMMUNITY_INFO.whatsappUrl} target="_blank" rel="noopener noreferrer" className="p-2 rounded bg-white/5 hover:text-emerald-400" title="WhatsApp">
                <WhatsApp className="w-4 h-4" />
              </a>
              <a href="https://discord.com" target="_blank" rel="noopener noreferrer" className="p-2 rounded bg-white/5 hover:text-indigo-400" title="Discord">
                <Discord className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
