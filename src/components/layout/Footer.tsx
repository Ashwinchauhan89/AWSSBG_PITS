import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  MapPin,
  Mail,
  Shield,
  MessageCircle,
  Sparkles,
  Calendar,
  ExternalLink,
  ArrowUpRight,
  GraduationCap,
} from "lucide-react";
import {
  Instagram,
  Linkedin,
  Github,
  WhatsApp,
  Discord,
  Meetup,
} from "@/components/ui/Icons";
import { COMMUNITY_INFO } from "@/lib/data/initialData";
import { FooterAnimationWrapper } from "./FooterAnimationWrapper";

export function Footer() {
  const currentYear = new Date().getFullYear();

  const communityLinks = [
    { label: "About Us", href: "/about" },
    { label: "Our Core Team", href: "/team" },
    { label: "Events", href: "/events" },
    { label: "Join Our Community", href: "/#join" },
  ];

  const learningLinks = [
    { label: "AWS Cloud Computing", href: "/resources" },
    { label: "AI & Machine Learning", href: "/resources" },
    { label: "Workshops", href: "/events" },
    { label: "Student Projects", href: "/projects" },
  ];

  const socialLinks = [
    {
      name: "Meetup",
      href: COMMUNITY_INFO.meetupUrl,
      icon: Meetup,
      label: "Join AWS SBG PITS on Meetup",
      accent: "hover:text-red-400 hover:border-red-500/40 hover:bg-red-500/10",
    },
    {
      name: "LinkedIn",
      href: COMMUNITY_INFO.linkedinOrgUrl,
      icon: Linkedin,
      label: "Connect with AWS SBG PITS on LinkedIn",
      accent: "hover:text-sky-400 hover:border-sky-500/40 hover:bg-sky-500/10",
    },
    {
      name: "Instagram",
      href: COMMUNITY_INFO.instagramUrl || "https://www.instagram.com/aws_pits/",
      icon: Instagram,
      label: "Follow AWS SBG PITS on Instagram",
      accent: "hover:text-pink-400 hover:border-pink-500/40 hover:bg-pink-500/10",
    },
    {
      name: "WhatsApp Community",
      href: COMMUNITY_INFO.whatsappUrl,
      icon: WhatsApp,
      label: "Join AWS SBG PITS WhatsApp Community Group",
      accent:
        "hover:text-emerald-400 hover:border-emerald-500/40 hover:bg-emerald-500/10",
    },
    {
      name: "GitHub",
      href: COMMUNITY_INFO.githubOrgUrl,
      icon: Github,
      label: "Explore AWS SBG PITS on GitHub",
      accent: "hover:text-white hover:border-white/40 hover:bg-white/10",
    },
    {
      name: "Discord",
      href: "https://discord.com",
      icon: Discord,
      label: "Connect with AWS SBG PITS on Discord",
      accent:
        "hover:text-indigo-400 hover:border-indigo-500/40 hover:bg-indigo-500/10",
    },
  ];

  return (
    <FooterAnimationWrapper>
      <footer
        aria-label="Site Footer"
        className="relative mt-auto border-t border-white/10 bg-[#07090E] text-slate-400 overflow-hidden"
      >
        {/* Subtle Ambient Violet & Purple Lighting Atmosphere */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-32 left-1/2 -translate-x-1/2 w-[700px] sm:w-[1000px] h-[350px] bg-gradient-to-b from-purple-900/15 via-violet-900/5 to-transparent blur-3xl -z-0"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute bottom-0 right-0 w-[450px] h-[350px] bg-indigo-900/10 blur-3xl -z-0"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-500/35 to-transparent"
        />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 sm:pt-14 pb-12">
          {/* 1. Community CTA Banner Section */}
          <div className="gsap-footer-cta mb-12 sm:mb-16">
            <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-[#101726]/85 via-[#0A0E1A]/90 to-[#070A12]/95 backdrop-blur-xl p-6 sm:p-8 lg:p-10 shadow-2xl shadow-black/60">
              {/* Subtle tech border gradient accent */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(168,85,247,0.12),transparent_70%)]"
              />

              <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-10 text-center lg:text-left">
                <div className="space-y-2 max-w-2xl">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/25 text-purple-300 text-xs font-mono font-semibold tracking-wide">
                    <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                    <span>AWS Student Builder Community</span>
                  </div>
                  <h2 className="text-xl sm:text-2xl lg:text-3xl font-black text-white tracking-tight">
                    Ready to build on AWS with fellow student developers?
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    Join workshops, build real cloud architectures, and prepare
                    for industry cloud &amp; AI careers with hands-on campus
                    mentorship at PITS Ujjain.
                  </p>
                </div>

                <div className="flex flex-wrap items-center justify-center gap-3 shrink-0">
                  <a
                    href={COMMUNITY_INFO.meetupUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="gsap-cta-btn inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold font-mono tracking-wider uppercase bg-[#FF9900] text-slate-950 hover:bg-[#FFB84D] shadow-lg shadow-amber-500/20 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
                  >
                    <Calendar className="w-4 h-4 text-slate-950" />
                    <span>Join on Meetup</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-slate-950/70" />
                  </a>

                  <a
                    href={COMMUNITY_INFO.whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="gsap-cta-btn inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold font-mono tracking-wider uppercase bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 hover:bg-emerald-500/25 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
                  >
                    <MessageCircle className="w-4 h-4 text-emerald-400" />
                    <span>WhatsApp Community</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* 2. Main 4-Column Footer Layout */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8 xl:gap-12 pb-12">
            {/* Column 1: Brand Section */}
            <div className="gsap-footer-col space-y-4">
              <div className="flex items-center gap-3">
                <div className="gsap-footer-logo relative flex h-12 w-12 items-center justify-center rounded-2xl bg-[#090D18] border border-purple-500/40 p-2 shadow-lg shadow-purple-500/20 shrink-0">
                  <Image
                    src="/images/branding/community-mark-transparent.png"
                    alt="AWS Student Builder Group Logo"
                    width={40}
                    height={40}
                    className="w-full h-full object-contain"
                  />
                </div>
                <div>
                  <h3 className="text-sm font-black text-white tracking-tight leading-snug">
                    AWS Student Builder Group
                  </h3>
                  <p className="text-[11px] font-mono font-medium text-amber-400">
                    at PITS • {COMMUNITY_INFO.collegeShort}
                  </p>
                </div>
              </div>

              <p className="text-xs text-slate-400 leading-relaxed">
                A student-led technology community focused on AWS Cloud,
                Artificial Intelligence, Machine Learning, innovation, and
                hands-on learning.
              </p>

              <div className="space-y-2 text-xs text-slate-400 pt-1">
                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                  <span className="leading-snug">
                    {COMMUNITY_INFO.city}
                  </span>
                </div>
                <div className="flex items-start gap-2.5">
                  <GraduationCap className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
                  <span className="text-[11px] text-slate-400 leading-snug">
                    {COMMUNITY_INFO.college}
                  </span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                  <a
                    href={`mailto:${COMMUNITY_INFO.email}`}
                    className="hover:text-white transition-colors focus-visible:outline-none focus-visible:underline"
                  >
                    {COMMUNITY_INFO.email}
                  </a>
                </div>
              </div>
            </div>

            {/* Column 2: Community Links */}
            <div className="gsap-footer-col space-y-4">
              <h3 className="gsap-footer-heading text-xs font-mono font-bold uppercase tracking-wider text-white flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
                <span>Community</span>
              </h3>
              <nav aria-label="Community navigation">
                <ul className="space-y-2.5 text-xs">
                  {communityLinks.map((item) => (
                    <li key={item.label}>
                      <Link
                        href={item.href}
                        className="group relative inline-flex items-center text-slate-400 hover:text-white transition-colors py-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-400 focus-visible:rounded"
                      >
                        <span className="transition-transform duration-200 ease-out group-hover:translate-x-1.5 flex items-center gap-2">
                          <span className="w-1 h-1 rounded-full bg-slate-600 group-hover:bg-amber-400 transition-colors" />
                          <span>{item.label}</span>
                        </span>
                        <span className="absolute bottom-0 left-0 w-0 h-px bg-gradient-to-r from-amber-400 to-purple-400 transition-all duration-300 ease-out group-hover:w-full" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>

            {/* Column 3: Learning Resources */}
            <div className="gsap-footer-col space-y-4">
              <h3 className="gsap-footer-heading text-xs font-mono font-bold uppercase tracking-wider text-white flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#FF9900]" />
                <span>Learning Resources</span>
              </h3>
              <nav aria-label="Learning resources navigation">
                <ul className="space-y-2.5 text-xs">
                  {learningLinks.map((item) => (
                    <li key={item.label}>
                      <Link
                        href={item.href}
                        className="group relative inline-flex items-center text-slate-400 hover:text-white transition-colors py-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:rounded"
                      >
                        <span className="transition-transform duration-200 ease-out group-hover:translate-x-1.5 flex items-center gap-2">
                          <span className="w-1 h-1 rounded-full bg-slate-600 group-hover:bg-purple-400 transition-colors" />
                          <span>{item.label}</span>
                        </span>
                        <span className="absolute bottom-0 left-0 w-0 h-px bg-gradient-to-r from-purple-400 to-amber-400 transition-all duration-300 ease-out group-hover:w-full" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>

            {/* Column 4: Connect With Us */}
            <div className="gsap-footer-col space-y-4">
              <h3 className="gsap-footer-heading text-xs font-mono font-bold uppercase tracking-wider text-white flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />
                <span>Connect With Us</span>
              </h3>

              <p className="text-xs text-slate-400 leading-relaxed">
                Connect with our student builders, attend hands-on workshops,
                and stay updated with community announcements.
              </p>

              {/* Social Icons Grid */}
              <div className="flex flex-wrap items-center gap-2.5 pt-1">
                {socialLinks.map((social) => {
                  const IconComponent = social.icon;
                  return (
                    <a
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.label}
                      title={social.name}
                      className={`gsap-social-icon relative flex h-10 w-10 items-center justify-center rounded-xl bg-white/[0.04] border border-white/10 text-slate-300 hover:text-white transition-colors shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-400 ${social.accent}`}
                    >
                      <IconComponent className="w-4 h-4" />
                    </a>
                  );
                })}
              </div>

              {/* Verified Official Links Badge */}
              <div className="pt-2">
                <a
                  href={COMMUNITY_INFO.officialAwsSbgUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-1.5 text-[11px] font-mono text-slate-400 hover:text-amber-400 transition-colors focus-visible:outline-none focus-visible:underline"
                >
                  <span>AWS Student Builder Groups Directory</span>
                  <ExternalLink className="w-3 h-3 text-slate-500 group-hover:text-amber-400 transition-colors" />
                </a>
              </div>
            </div>
          </div>

          {/* 3. Legal & Educational Disclaimer Notice */}
          <div className="gsap-footer-bottom mt-8 pt-8 border-t border-white/10 space-y-6">
            <div className="rounded-2xl border border-white/10 bg-[#0C101C]/60 backdrop-blur-md p-5 text-[11px] leading-relaxed text-slate-400 space-y-2 shadow-lg shadow-black/40">
              <div className="flex items-center gap-2 text-slate-200 font-bold tracking-tight">
                <Shield className="w-3.5 h-3.5 text-amber-400" />
                <span>Independent Student Community Disclaimer</span>
              </div>
              <p>
                PITS Cloud Computing is an independent, student-led academic
                community at Prashanti Institute of Technology &amp; Science
                (PITS), Ujjain, participating in the AWS Student Builder Groups
                program. This website is organized and operated by student
                volunteers for educational collaboration, knowledge sharing, and
                peer mentoring.
              </p>
              <p className="text-slate-500">
                This is not an official Amazon Web Services (AWS) corporate
                website. Members and organizers are student volunteers and not
                employees, contractors, or official spokespersons of Amazon Web
                Services, Inc. Amazon Web Services, AWS, and other AWS marks are
                trademarks of Amazon.com, Inc. or its affiliates.
              </p>
            </div>

            {/* 4. Copyright & Utility Links Bar */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
              <p className="text-center sm:text-left">
                © {currentYear} AWS Student Builder Group at Prashanti Institute
                of Technology &amp; Science, Ujjain. All rights reserved.
              </p>

              <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-mono">
                <Link
                  href="/about"
                  className="hover:text-white transition-colors focus-visible:outline-none focus-visible:underline"
                >
                  About Us
                </Link>
                <span className="text-slate-600">•</span>
                <Link
                  href="/team"
                  className="hover:text-white transition-colors focus-visible:outline-none focus-visible:underline"
                >
                  Core Team
                </Link>
                <span className="text-slate-600">•</span>
                <Link
                  href="/contact"
                  className="hover:text-white transition-colors focus-visible:outline-none focus-visible:underline"
                >
                  Contact
                </Link>
                <span className="text-slate-600">•</span>
                <Link
                  href="/admin"
                  className="hover:text-slate-200 text-slate-500 transition-colors focus-visible:outline-none focus-visible:underline"
                >
                  Admin Portal
                </Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </FooterAnimationWrapper>
  );
}
