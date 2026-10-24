import Link from "next/link";
import Image from "next/image";
import {
  ExternalLink,
  MapPin,
  Mail,
  Shield,
  MessageCircle,
  Sparkles,
  Calendar,
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
import { COMMUNITY_INFO } from "@/lib/data/initialData";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-white/10 bg-[#080A0F] text-slate-400">
      {/* Top Banner inside footer */}
      <div className="border-b border-white/10 bg-[#101A2C]/50 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div className="space-y-1">
            <h3 className="text-base font-bold text-white flex items-center justify-center md:justify-start gap-2">
              <Sparkles className="w-4 h-4 text-amber-400" />
              Ready to build on AWS with fellow student developers?
            </h3>
            <p className="text-xs text-slate-400">
              Join workshops, build real cloud architectures, and prepare for industry cloud &amp; AI careers.
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <a
              href={COMMUNITY_INFO.meetupUrl || COMMUNITY_INFO.officialAwsSbgUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold bg-amber-500/10 text-amber-300 border border-amber-500/30 hover:bg-amber-500/20 transition-colors"
            >
              <Calendar className="w-3.5 h-3.5" />
              Join on Meetup
            </a>
            <a
              href={COMMUNITY_INFO.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/20 transition-colors"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              Join WhatsApp Community
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Col 1 & 2: About Community Identity & Location */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="relative flex h-11 w-11 items-center justify-center rounded-xl bg-[#080A0F] border border-purple-500/35 p-1.5 shadow-lg shadow-purple-500/20 shrink-0">
                <Image
                  src="/images/branding/community-mark-transparent.png"
                  alt="PITS Cloud Computing - AWS Student Builder Group Logo"
                  width={40}
                  height={40}
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <h4 className="text-base font-bold text-white tracking-tight">
                  PITS Cloud Computing
                </h4>
                <p className="text-xs text-amber-400 font-medium">
                  AWS Student Builder Group • {COMMUNITY_INFO.collegeShort}
                </p>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              A student-led technology community participating in the AWS Student Builder Groups program at Prashanti Institute of Technology &amp; Science, Ujjain. Dedicated to hands-on learning in cloud architecture, artificial intelligence, software engineering, and emerging technologies.
            </p>

            <div className="space-y-1.5 text-xs text-slate-400">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>Prashanti Institute of Technology &amp; Science, Indore-Ujjain Highway, Ghatiya, Ujjain, MP 456006</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                <a
                  href={`mailto:${COMMUNITY_INFO.email}`}
                  className="hover:text-white transition-colors"
                >
                  {COMMUNITY_INFO.email}
                </a>
              </div>
            </div>

            {/* Configured Social Media Links */}
            <div className="pt-2 flex items-center gap-2.5">
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-slate-300 hover:text-sky-400 hover:border-sky-500/40 transition-colors"
                title="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="https://x.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-slate-300 hover:text-white hover:border-white/40 transition-colors"
                title="X (Twitter)"
              >
                <TwitterX className="w-4 h-4" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-slate-300 hover:text-pink-400 hover:border-pink-500/40 transition-colors"
                title="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-slate-300 hover:text-blue-400 hover:border-blue-500/40 transition-colors"
                title="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-slate-300 hover:text-red-400 hover:border-red-500/40 transition-colors"
                title="YouTube"
              >
                <YouTube className="w-4 h-4" />
              </a>
              <a
                href={COMMUNITY_INFO.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-slate-300 hover:text-emerald-400 hover:border-emerald-500/40 transition-colors"
                title="WhatsApp Community"
              >
                <WhatsApp className="w-4 h-4" />
              </a>
              <a
                href="https://discord.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-slate-300 hover:text-indigo-400 hover:border-indigo-500/40 transition-colors"
                title="Discord"
              >
                <Discord className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 3: Quick Navigation */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-200">
              Quick Links
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/" className="hover:text-amber-400 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-amber-400 transition-colors">
                  About Community
                </Link>
              </li>
              <li>
                <Link href="/events" className="hover:text-amber-400 transition-colors">
                  Technical Events
                </Link>
              </li>
              <li>
                <Link href="/team" className="hover:text-amber-400 transition-colors">
                  Core Team Directory
                </Link>
              </li>
              <li>
                <Link href="/projects" className="hover:text-amber-400 transition-colors">
                  Student Projects
                </Link>
              </li>
              <li>
                <Link href="/resources" className="hover:text-amber-400 transition-colors">
                  Learning Resources
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-amber-400 transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Community Leadership */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-200">
              Community Leadership
            </h4>
            <div className="rounded-xl border border-white/10 bg-[#101A2C]/60 p-3 space-y-1.5">
              <span className="text-[10px] uppercase font-bold text-amber-400 tracking-wider">
                Group Leader
              </span>
              <p className="text-xs font-semibold text-white">
                {COMMUNITY_INFO.leaderName}
              </p>
              <p className="text-[11px] text-slate-400">
                Prashanti Institute of Technology &amp; Science, Ujjain
              </p>
            </div>
            <ul className="space-y-1.5 text-xs pt-1">
              <li>
                <Link href="/contact" className="hover:text-slate-200">
                  → Contact Organizing Team
                </Link>
              </li>
              <li>
                <Link href="/admin" className="hover:text-slate-200 text-slate-500">
                  → Administrator Portal
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 5: Verified AWS & Meetup Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-200">
              Community &amp; AWS Links
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a
                  href={COMMUNITY_INFO.meetupUrl || COMMUNITY_INFO.officialAwsSbgUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 hover:text-white transition-colors"
                >
                  Meetup Community Group
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
              <li>
                <a
                  href={COMMUNITY_INFO.officialAwsSbgUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 hover:text-white transition-colors"
                >
                  AWS Student Builder Groups
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
              <li>
                <a
                  href="https://explore.skillbuilder.aws/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 hover:text-white transition-colors"
                >
                  AWS Skill Builder Portal
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
              <li>
                <a
                  href="https://aws.amazon.com/free/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 hover:text-white transition-colors"
                >
                  AWS Free Tier Details
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
              <li>
                <a
                  href="https://community.aws/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 hover:text-white transition-colors"
                >
                  AWS Community Center
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Legal & Educational Disclaimer Notice */}
        <div className="mt-10 pt-6 border-t border-white/10">
          <div className="rounded-xl border border-white/10 bg-[#101A2C]/30 p-4 text-[11px] leading-relaxed text-slate-400 space-y-1.5">
            <div className="flex items-center gap-1.5 text-slate-300 font-semibold">
              <Shield className="w-3.5 h-3.5 text-amber-400" />
              <span>Independent Student Community Disclaimer</span>
            </div>
            <p>
              PITS Cloud Computing is an independent, student-led academic community at Prashanti Institute of Technology &amp; Science (PITS), Ujjain, participating in the AWS Student Builder Groups program. This website is organized and operated by student volunteers for educational collaboration, knowledge sharing, and peer mentoring.
            </p>
            <p className="text-slate-500">
              This is not an official Amazon Web Services (AWS) corporate website. Members and organizers are student volunteers and not employees, contractors, or official spokespersons of Amazon Web Services, Inc. Amazon Web Services, AWS, and other AWS marks are trademarks of Amazon.com, Inc. or its affiliates.
            </p>
          </div>

          <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
            <p>
              © {currentYear} PITS Cloud Computing • AWS Student Builder Group at Prashanti Institute of Technology &amp; Science, Ujjain. All rights reserved.
            </p>
            <div className="flex items-center gap-4">
              <Link href="/about" className="hover:text-slate-300">
                Mission
              </Link>
              <span>•</span>
              <Link href="/contact" className="hover:text-slate-300">
                Contact
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
