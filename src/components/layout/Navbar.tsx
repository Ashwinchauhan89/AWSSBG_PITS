"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Cloud,
  Menu,
  X,
  Sparkles,
  Users,
  Calendar,
  Layers,
  BookOpen,
  Mail,
  ShieldCheck,
  MessageCircle,
} from "lucide-react";
import { Github, Linkedin, Instagram } from "@/components/ui/Icons";
import { cn } from "@/lib/utils";
import { COMMUNITY_INFO } from "@/lib/data/initialData";
import { GsapMagnetic } from "@/components/gsap/GsapMagnetic";
import { SoundToggle } from "@/components/audio/SoundToggle";

const NAV_LINKS = [
  { href: "/", label: "Home", icon: Cloud },
  { href: "/about", label: "About", icon: Users },
  { href: "/resources", label: "Learning", icon: BookOpen },
  { href: "/events", label: "Events", icon: Calendar },
  { href: "/projects", label: "Projects", icon: Layers },
  { href: "/team", label: "Team", icon: Users },
];

export function Navbar() {
  const pathname = usePathname();
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
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        isScrolled
          ? "bg-[#080A0F]/85 backdrop-blur-xl border-b border-white/10 shadow-2xl shadow-black/50 py-2.5"
          : "bg-transparent border-b border-white/5 py-4"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-12 items-center justify-between gap-4">
          {/* Brand Logo */}
          <Link
            href="/"
            className="flex items-center gap-3 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 rounded-lg p-1"
          >
            <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-amber-500 via-orange-500 to-amber-600 shadow-lg shadow-orange-500/25 group-hover:scale-105 transition-transform">
              <Cloud className="h-5 w-5 text-slate-950" strokeWidth={2.5} />
              <span className="absolute -bottom-1 -right-1 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-3 w-3 bg-amber-400" />
              </span>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="text-base font-black tracking-tight text-white group-hover:text-amber-400 transition-colors">
                  AWS SBG
                </span>
                <span className="rounded bg-amber-500/15 px-1.5 py-0.2 text-[9px] font-mono font-bold text-amber-400 border border-amber-500/30">
                  PITS
                </span>
              </div>
              <span className="text-[10px] font-mono tracking-widest text-slate-400 -mt-0.5 uppercase">
                Ujjain Chapter
              </span>
            </div>
          </Link>

          {/* Desktop Floating Navigation Dock */}
          <nav className="hidden lg:flex items-center gap-1 px-3 py-1.5 rounded-full bg-[#101A2C]/60 border border-white/10 backdrop-blur-md shadow-inner">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "px-3.5 py-1.5 rounded-full text-xs font-medium tracking-wide transition-all duration-200",
                    isActive
                      ? "text-amber-400 bg-amber-500/15 font-semibold border border-amber-500/30 shadow-sm"
                      : "text-slate-300 hover:text-white hover:bg-white/5 hover:border-amber-500/20"
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden sm:flex items-center gap-3">
            <SoundToggle />

            <Link
              href="/admin"
              className="text-xs text-slate-400 hover:text-slate-200 px-2 py-1.5 rounded-lg hover:bg-slate-800/40 transition-colors flex items-center gap-1"
              title="Admin Portal"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-slate-500" />
              <span className="hidden xl:inline text-[11px] font-mono">Admin</span>
            </Link>

            <a
              href={COMMUNITY_INFO.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 transition-all"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>WhatsApp</span>
            </a>

            <GsapMagnetic strength={0.25}>
              <Link
                href="/join"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold bg-gradient-to-r from-amber-500 via-orange-500 to-amber-500 text-slate-950 shadow-md shadow-orange-500/30 hover:scale-105 active:scale-95 transition-all"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Join Community</span>
              </Link>
            </GsapMagnetic>
          </div>

          {/* Mobile Menu Trigger */}
          <div className="flex items-center gap-2 lg:hidden">
            <Link
              href="/join"
              className="sm:hidden inline-flex items-center px-3 py-1.5 rounded-full text-xs font-bold bg-amber-500 text-slate-950"
            >
              Join
            </Link>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800/60 focus:outline-none focus:ring-2 focus:ring-amber-500"
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer (Clean Accessible Menu replacing side rails) */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-white/10 bg-[#080A0F]/98 backdrop-blur-2xl px-6 pt-4 pb-8 space-y-4">
          <div className="text-[11px] font-mono tracking-widest uppercase text-amber-400/80 mb-2">
            Navigation Rail
          </div>
          <nav className="flex flex-col space-y-1.5">
            {NAV_LINKS.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-colors",
                    isActive
                      ? "bg-amber-500/15 text-amber-400 font-semibold border border-amber-500/30"
                      : "text-slate-300 hover:bg-white/5 hover:text-white"
                  )}
                >
                  <Icon className="h-4 w-4 text-slate-400" />
                  {link.label}
                </Link>
              );
            })}
            <Link
              href="/contact"
              className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium text-slate-300 hover:bg-white/5 hover:text-white"
            >
              <Mail className="h-4 w-4 text-slate-400" />
              Contact
            </Link>
          </nav>

          {/* Social Media Links for Mobile */}
          <div className="pt-4 border-t border-white/10 space-y-3">
            <div className="text-[11px] font-mono tracking-widest uppercase text-slate-400">
              Community Channels
            </div>
            <div className="flex items-center gap-3">
              <a
                href={COMMUNITY_INFO.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/20"
                aria-label="WhatsApp"
              >
                <MessageCircle className="w-5 h-5" />
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-10 h-10 rounded-xl bg-white/5 text-slate-300 border border-white/10 hover:text-white"
                aria-label="GitHub"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-10 h-10 rounded-xl bg-sky-500/10 text-sky-400 border border-sky-500/30 hover:bg-sky-500/20"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-10 h-10 rounded-xl bg-pink-500/10 text-pink-400 border border-pink-500/30 hover:bg-pink-500/20"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
            </div>

            <div className="pt-2 flex flex-col gap-2">
              <Link
                href="/join"
                className="flex items-center justify-center gap-2 w-full py-3 rounded-xl text-xs font-bold bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 shadow-lg shadow-orange-500/20"
              >
                <Sparkles className="w-4 h-4" />
                Apply for Core Team
              </Link>
              <Link
                href="/admin"
                className="flex items-center justify-center gap-2 w-full py-2 text-xs text-slate-500 hover:text-slate-300 font-mono"
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                Admin Portal
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
