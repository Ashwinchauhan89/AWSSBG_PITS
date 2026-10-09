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
} from "lucide-react";
import { cn } from "@/lib/utils";
import { COMMUNITY_INFO } from "@/lib/data/initialData";

const NAV_LINKS = [
  { href: "/", label: "Home", icon: Cloud },
  { href: "/about", label: "About", icon: Users },
  { href: "/events", label: "Events", icon: Calendar },
  { href: "/team", label: "Team", icon: Users },
  { href: "/projects", label: "Projects", icon: Layers },
  { href: "/resources", label: "Resources", icon: BookOpen },
  { href: "/contact", label: "Contact", icon: Mail },
];

export function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [prevPathname, setPrevPathname] = React.useState(pathname);
  const [isScrolled, setIsScrolled] = React.useState(false);

  // Close mobile drawer on route change without cascading effect render
  if (prevPathname !== pathname) {
    setPrevPathname(pathname);
    setMobileMenuOpen(false);
  }

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 w-full transition-all duration-300",
        isScrolled
          ? "bg-slate-950/90 backdrop-blur-md border-b border-slate-800/80 shadow-lg shadow-black/20"
          : "bg-slate-950/60 backdrop-blur-sm border-b border-slate-800/40"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-4">
          {/* Brand Logo */}
          <Link
            href="/"
            className="flex items-center gap-3 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 rounded-lg p-1"
          >
            <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-amber-500 via-orange-500 to-amber-600 shadow-md shadow-orange-500/20 group-hover:scale-105 transition-transform">
              <Cloud className="h-5 w-5 text-slate-950" strokeWidth={2.5} />
              <span className="absolute -bottom-1 -right-1 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-amber-400"></span>
              </span>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="text-base font-extrabold tracking-tight text-white group-hover:text-amber-400 transition-colors">
                  AWS SBG
                </span>
                <span className="rounded bg-amber-500/10 px-1.5 py-0.5 text-[10px] font-bold text-amber-400 border border-amber-500/20">
                  PITS
                </span>
              </div>
              <span className="text-[10px] font-medium text-slate-400 -mt-0.5 tracking-wider uppercase">
                Ujjain Campus
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-1.5">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "px-3 py-1.5 rounded-lg text-xs xl:text-sm font-medium transition-all duration-150",
                    isActive
                      ? "text-amber-400 bg-amber-500/10 font-semibold"
                      : "text-slate-300 hover:text-white hover:bg-slate-800/60"
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden sm:flex items-center gap-2.5">
            <Link
              href="/admin"
              className="text-xs text-slate-400 hover:text-slate-200 px-2 py-1.5 rounded-lg hover:bg-slate-800/40 transition-colors flex items-center gap-1"
              title="Admin Portal"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-slate-500" />
              <span className="hidden xl:inline text-[11px]">Admin</span>
            </Link>

            <a
              href={COMMUNITY_INFO.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/20 transition-colors"
            >
              <span>WhatsApp Group</span>
            </a>

            <Link
              href="/join"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 shadow-md shadow-orange-500/20 hover:from-amber-400 hover:to-orange-500 transition-all hover:scale-105 active:scale-95"
            >
              <Sparkles className="w-3.5 h-3.5 text-slate-950" />
              Join Core Team
            </Link>
          </div>

          {/* Mobile Menu Trigger */}
          <div className="flex items-center gap-2 lg:hidden">
            <Link
              href="/join"
              className="sm:hidden inline-flex items-center px-2.5 py-1.5 rounded-lg text-xs font-bold bg-amber-500 text-slate-950"
            >
              Join
            </Link>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500"
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

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-slate-800 bg-slate-950/98 backdrop-blur-xl px-4 pt-2 pb-6 space-y-3">
          <nav className="flex flex-col space-y-1">
            {NAV_LINKS.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors",
                    isActive
                      ? "bg-amber-500/10 text-amber-400 font-semibold"
                      : "text-slate-300 hover:bg-slate-900 hover:text-white"
                  )}
                >
                  <Icon className="h-4 w-4 text-slate-400" />
                  {link.label}
                </Link>
              );
            })}
          </nav>

          <div className="pt-3 border-t border-slate-800 space-y-2">
            <a
              href={COMMUNITY_INFO.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
            >
              Join WhatsApp Community
            </a>
            <Link
              href="/join"
              className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl text-xs font-bold bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950"
            >
              <Sparkles className="w-3.5 h-3.5" />
              Apply for Core Team
            </Link>
            <Link
              href="/admin"
              className="flex items-center justify-center gap-2 w-full py-2 rounded-xl text-xs text-slate-400 hover:text-slate-200"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              Administrator Dashboard
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
