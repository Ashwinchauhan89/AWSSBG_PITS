"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, PhoneCall } from "lucide-react";
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

  const [avatarError, setAvatarError] = React.useState(false);

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
          {/* 1. Left Brand Mark (Matching TF™ aesthetic with Brand Logo Emblem) */}
          <Link
            href="/"
            onClick={playClick}
            onMouseEnter={playHover}
            className="flex items-center gap-2 sm:gap-2.5 group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF9900] rounded-lg shrink-0"
          >
            {/* Geometric Purple Pixel-Chip Brand Logo Emblem */}
            <div className="relative w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-[#080A0F] border border-purple-500/40 p-0.5 flex items-center justify-center shadow-lg shadow-purple-500/25 group-hover:border-purple-400 group-hover:shadow-purple-500/50 transition-all duration-300">
              <Image
                src="/images/branding/purple-pixel-chip.png"
                alt="PITS Cloud Computing - Purple Pixel Chip Brand Logo"
                width={36}
                height={36}
                className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300"
                priority
              />
            </div>
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
          <nav aria-label="Main Navigation" className="hidden lg:flex items-center relative shrink-0">
            {/* SVG Beveled Polygon Bracket Border */}
            <div className="relative flex items-center px-4 xl:px-8 py-2 xl:py-2.5 bg-[#080A0F]/90 backdrop-blur-xl border border-white/20 shadow-[0_4px_25px_rgba(0,0,0,0.6)] [clip-path:polygon(12px_0%,calc(100%-12px)_0%,100%_12px,100%_calc(100%-12px),calc(100%-12px)_100%,12px_100%,0%_calc(100%-12px),0%_12px)]">
              {/* Corner tech accents */}
              <div className="absolute top-0 left-0 w-2.5 h-2.5 border-t-2 border-l-2 border-[#FF9900]/70 pointer-events-none" />
              <div className="absolute top-0 right-0 w-2.5 h-2.5 border-t-2 border-r-2 border-[#FF9900]/70 pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-2.5 h-2.5 border-b-2 border-l-2 border-[#FF9900]/70 pointer-events-none" />
              <div className="absolute bottom-0 right-0 w-2.5 h-2.5 border-b-2 border-r-2 border-[#FF9900]/70 pointer-events-none" />

              <div className="flex items-center gap-4 xl:gap-8 text-[10px] xl:text-[11px] font-mono font-bold tracking-[0.14em] uppercase">
                {/* Learning / Resources */}
                <Link
                  href="/resources"
                  onClick={playClick}
                  onMouseEnter={playHover}
                  className={cn(
                    "transition-colors hover:text-[#FF9900] focus-visible:outline-none focus-visible:text-[#FF9900]",
                    pathname === "/resources" ? "text-[#FF9900]" : "text-slate-300"
                  )}
                >
                  LEARNING
                </Link>

                {/* Workshops with EARLY BIRD badge */}
                <div className="relative flex flex-col items-center">
                  <span className="absolute -top-3.5 text-[7px] xl:text-[7.5px] font-mono font-black tracking-wider text-[#FF9900] bg-[#FF9900]/20 px-1.5 py-0.5 rounded border border-[#FF9900]/40 leading-none pointer-events-none">
                    EARLY BIRD
                  </span>
                  <Link
                    href="/events"
                    onClick={playClick}
                    onMouseEnter={playHover}
                    className={cn(
                      "transition-colors hover:text-[#FF9900] focus-visible:outline-none focus-visible:text-[#FF9900]",
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
                    "transition-colors hover:text-[#FF9900] focus-visible:outline-none focus-visible:text-[#FF9900]",
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
                    "transition-colors hover:text-[#FF9900] focus-visible:outline-none focus-visible:text-[#FF9900]",
                    pathname === "/about" ? "text-[#FF9900]" : "text-slate-300"
                  )}
                >
                  IGNITE
                </Link>
              </div>
            </div>
          </nav>

          {/* 3. Right Controls: Unified Sound Toggle, Leader Profile Element & Mobile Menu Button */}
          <div className="flex items-center gap-2 sm:gap-2.5 lg:gap-3 shrink-0">
            {/* Single Unified SoundToggle across all viewports */}
            <SoundToggle />

            {/* Ashwin Chauhan Leader Profile Card (Desktop & Tablet) */}
            <Link
              href="/team"
              onClick={playClick}
              onMouseEnter={playHover}
              className="hidden sm:flex items-center gap-2 lg:gap-2.5 px-2.5 py-1 rounded-full bg-[#080A0F]/90 border border-purple-500/30 hover:border-purple-400 hover:bg-purple-950/20 transition-all duration-200 shadow-md shadow-purple-500/10 group focus:outline-none focus:ring-2 focus:ring-[#FF9900]/50"
              title="Group Leader Profile: Ashwin Chauhan • Student Builder Group Leader"
            >
              <div className="relative w-7 h-7 lg:w-8 lg:h-8 rounded-full overflow-hidden bg-slate-900 border border-purple-500/60 shadow-sm shadow-purple-500/30 group-hover:border-purple-400 group-hover:shadow-purple-500/50 transition-all shrink-0 flex items-center justify-center">
                {!avatarError ? (
                  <Image
                    src="/images/team/ashwin-chauhan.webp"
                    alt="Ashwin Chauhan - Student Builder Group Leader"
                    width={32}
                    height={32}
                    className="w-full h-full object-cover object-center"
                    onError={() => setAvatarError(true)}
                  />
                ) : (
                  <span className="text-[10px] font-mono font-bold text-amber-400">
                    AC
                  </span>
                )}
              </div>
              <div className="flex flex-col text-left leading-tight pr-1">
                <span className="text-[11px] lg:text-xs font-bold text-white group-hover:text-[#FF9900] transition-colors truncate font-sans">
                  Ashwin Chauhan
                </span>
                <span className="text-[8.5px] lg:text-[9px] font-mono text-slate-400 group-hover:text-slate-300 transition-colors truncate">
                  <span className="hidden xl:inline">Student Builder Group Leader</span>
                  <span className="xl:hidden">SBG Leader</span>
                </span>
              </div>
            </Link>

            {/* Mobile Compact Leader Avatar (Mobile only) */}
            <Link
              href="/team"
              onClick={playClick}
              className="sm:hidden relative w-8 h-8 rounded-full overflow-hidden bg-slate-900 border border-purple-500/50 shadow-sm shadow-purple-500/25 active:scale-95 transition-all flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-[#FF9900]/50"
              title="Ashwin Chauhan • Student Builder Group Leader"
              aria-label="View Leader Profile: Ashwin Chauhan"
            >
              {!avatarError ? (
                <Image
                  src="/images/team/ashwin-chauhan.webp"
                  alt="Ashwin Chauhan - Student Builder Group Leader"
                  width={32}
                  height={32}
                  className="w-full h-full object-cover object-center"
                  onError={() => setAvatarError(true)}
                />
              ) : (
                <span className="text-[10px] font-mono font-bold text-amber-400">
                  AC
                </span>
              )}
            </Link>

            {/* Tablet & Mobile Menu Toggle */}
            <button
              onClick={() => {
                playClick();
                setMobileMenuOpen(!mobileMenuOpen);
              }}
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              className="lg:hidden p-2 rounded-lg bg-[#080A0F] border border-white/10 hover:border-white/30 text-white transition-colors focus:outline-none focus:ring-2 focus:ring-[#FF9900]/50"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile & Tablet Full-Feature Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden px-4 pt-4 pb-6 bg-[#080A0F]/98 border-b border-white/15 backdrop-blur-2xl space-y-4 max-h-[calc(100dvh-4rem)] overflow-y-auto animate-in slide-in-from-top-2 duration-200 shadow-2xl">
          {/* Mobile Drawer Brand Header */}
          <div className="flex items-center gap-2.5 pb-3 border-b border-white/10">
            <div className="w-8 h-8 rounded-lg bg-[#080A0F] border border-purple-500/40 p-1 flex items-center justify-center shrink-0 shadow-md shadow-purple-500/20">
              <Image
                src="/images/branding/purple-pixel-chip.png"
                alt="PITS Cloud Computing Logo"
                width={32}
                height={32}
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <div className="text-xs font-mono font-bold text-white tracking-wider flex items-center gap-1">
                <span>AWS SBG</span>
                <span className="text-[9px] text-[#FF9900]">PITS</span>
              </div>
              <div className="text-[9px] font-mono text-slate-400">STUDENT BUILDER GROUP • UJJAIN</div>
            </div>
          </div>

          {/* Mobile Leader Profile Card */}
          <Link
            href="/team"
            onClick={() => {
              playClick();
              setMobileMenuOpen(false);
            }}
            className="flex items-center gap-3 p-3 rounded-xl bg-gradient-to-r from-purple-950/40 via-[#101A2C] to-slate-900 border border-purple-500/30 hover:border-purple-400 transition-all group"
          >
            <div className="relative w-10 h-10 rounded-full overflow-hidden bg-slate-900 border border-purple-500/60 shadow-md shadow-purple-500/30 shrink-0 flex items-center justify-center">
              {!avatarError ? (
                <Image
                  src="/images/team/ashwin-chauhan.webp"
                  alt="Ashwin Chauhan - Student Builder Group Leader"
                  width={40}
                  height={40}
                  className="w-full h-full object-cover object-center"
                  onError={() => setAvatarError(true)}
                />
              ) : (
                <span className="text-xs font-mono font-bold text-amber-400">
                  AC
                </span>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-1">
                <span className="text-xs font-bold text-white group-hover:text-[#FF9900] transition-colors truncate">
                  Ashwin Chauhan
                </span>
                <span className="text-[8px] font-mono font-bold text-[#FF9900] bg-[#FF9900]/15 px-1.5 py-0.5 rounded border border-[#FF9900]/30 shrink-0">
                  LEADER
                </span>
              </div>
              <span className="text-[10px] font-mono text-slate-400 block truncate">
                Student Builder Group Leader
              </span>
            </div>
          </Link>

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
              className="flex items-center gap-2 p-2.5 rounded-lg bg-white/5 border border-white/10 text-white hover:border-[#FF9900]/50"
            >
              <span>TEAM DIRECTORY</span>
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
