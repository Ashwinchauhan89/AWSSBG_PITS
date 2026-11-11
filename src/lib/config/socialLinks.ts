import React from "react";
import { Linkedin, Discord, Instagram, WhatsApp, Meetup, Github } from "@/components/ui/Icons";

export interface SocialLinkItem {
  id: "linkedin" | "discord" | "instagram" | "whatsapp" | "meetup" | "github";
  name: string;
  url: string;
  username?: string;
  handle?: string;
  label: string;
  accessibleLabel: string;
  description?: string;
  cardTitle: string;
  cardDescription: string;
  buttonLabel: string;
  badge: string;
  icon: React.ElementType;
  accent: {
    text: string;
    textHover: string;
    border: string;
    borderHover: string;
    bg: string;
    bgHover: string;
    glow: string;
    buttonBg: string;
    buttonHover: string;
    ring: string;
  };
}

/**
 * The 3 Primary Official Social Platforms for AWS Student Builder Group at PITS
 * Strict URLs specified by the organization:
 * - LinkedIn: https://www.linkedin.com/company/aws-student-builder-group-at-prashanti-institute-of-technology-science/
 * - Discord: https://discord.gg/u94MQe64K
 * - Instagram: https://www.instagram.com/aws.sbg.pits/ (@aws.sbg.pits)
 */
export const OFFICIAL_COMMUNITY_SOCIALS: Record<"linkedin" | "discord" | "instagram", SocialLinkItem> = {
  linkedin: {
    id: "linkedin",
    name: "LinkedIn",
    url: "https://www.linkedin.com/company/aws-student-builder-group-at-prashanti-institute-of-technology-science/",
    username: "aws-student-builder-group-at-prashanti-institute-of-technology-science",
    handle: "AWS SBG at PITS Ujjain",
    label: "AWS Student Builder Group at PITS",
    accessibleLabel: "Connect with AWS Student Builder Group at PITS on LinkedIn",
    cardTitle: "Connect Professionally",
    cardDescription: "Follow our community updates, achievements, and technical initiatives.",
    buttonLabel: "Follow on LinkedIn",
    badge: "Professional Network",
    icon: Linkedin,
    accent: {
      text: "text-sky-400",
      textHover: "hover:text-sky-300",
      border: "border-sky-500/30",
      borderHover: "hover:border-sky-400/60",
      bg: "bg-sky-500/10",
      bgHover: "hover:bg-sky-500/20",
      glow: "shadow-sky-500/20",
      buttonBg: "bg-gradient-to-r from-sky-600 to-blue-600",
      buttonHover: "hover:from-sky-500 hover:to-blue-500",
      ring: "focus-visible:ring-sky-400",
    },
  },
  discord: {
    id: "discord",
    name: "Discord",
    url: "https://discord.gg/u94MQe64K",
    handle: "discord.gg/u94MQe64K",
    label: "Join Our Discord Community",
    accessibleLabel: "Join the official AWS SBG PITS Discord Community Server",
    cardTitle: "Join Our Community",
    cardDescription: "Connect with fellow builders, discuss technology, collaborate, and participate in community conversations.",
    buttonLabel: "Join Discord",
    badge: "Builder Hub",
    icon: Discord,
    accent: {
      text: "text-indigo-400",
      textHover: "hover:text-indigo-300",
      border: "border-indigo-500/30",
      borderHover: "hover:border-indigo-400/60",
      bg: "bg-indigo-500/10",
      bgHover: "hover:bg-indigo-500/20",
      glow: "shadow-indigo-500/20",
      buttonBg: "bg-gradient-to-r from-indigo-600 to-violet-600",
      buttonHover: "hover:from-indigo-500 hover:to-violet-500",
      ring: "focus-visible:ring-indigo-400",
    },
  },
  instagram: {
    id: "instagram",
    name: "Instagram",
    url: "https://www.instagram.com/aws.sbg.pits/",
    username: "@aws.sbg.pits",
    handle: "@aws.sbg.pits",
    label: "Follow @aws.sbg.pits on Instagram",
    accessibleLabel: "Follow AWS SBG PITS on Instagram (@aws.sbg.pits)",
    cardTitle: "Follow Our Journey",
    cardDescription: "Explore event highlights, team introductions, workshops, and community moments.",
    buttonLabel: "Follow on Instagram",
    badge: "Official Stories",
    icon: Instagram,
    accent: {
      text: "text-pink-400",
      textHover: "hover:text-pink-300",
      border: "border-pink-500/30",
      borderHover: "hover:border-pink-400/60",
      bg: "bg-pink-500/10",
      bgHover: "hover:bg-pink-500/20",
      glow: "shadow-pink-500/20",
      buttonBg: "bg-gradient-to-r from-pink-600 via-purple-600 to-violet-600",
      buttonHover: "hover:from-pink-500 hover:via-purple-500 hover:to-violet-500",
      ring: "focus-visible:ring-pink-400",
    },
  },
};

/**
 * Array of the 3 primary showcase cards in requested display order:
 * 1. LinkedIn
 * 2. Discord
 * 3. Instagram
 */
export const PRIMARY_SOCIAL_SHOWCASE_CARDS: SocialLinkItem[] = [
  OFFICIAL_COMMUNITY_SOCIALS.linkedin,
  OFFICIAL_COMMUNITY_SOCIALS.discord,
  OFFICIAL_COMMUNITY_SOCIALS.instagram,
];

/**
 * Extended list of all community channels (for full navigation drawers and footer rails)
 */
export interface CommunityChannelItem {
  id: string;
  name: string;
  url: string;
  label: string;
  accessibleLabel: string;
  icon: React.ElementType;
  accentClass: string;
  badge?: string;
}

export const ALL_COMMUNITY_CHANNELS: CommunityChannelItem[] = [
  {
    id: "linkedin",
    name: "LinkedIn",
    url: OFFICIAL_COMMUNITY_SOCIALS.linkedin.url,
    label: OFFICIAL_COMMUNITY_SOCIALS.linkedin.label,
    accessibleLabel: OFFICIAL_COMMUNITY_SOCIALS.linkedin.accessibleLabel,
    icon: Linkedin,
    accentClass: "hover:text-sky-400 hover:border-sky-500/40 hover:bg-sky-500/10",
    badge: "Network",
  },
  {
    id: "discord",
    name: "Discord",
    url: OFFICIAL_COMMUNITY_SOCIALS.discord.url,
    label: OFFICIAL_COMMUNITY_SOCIALS.discord.label,
    accessibleLabel: OFFICIAL_COMMUNITY_SOCIALS.discord.accessibleLabel,
    icon: Discord,
    accentClass: "hover:text-indigo-400 hover:border-indigo-500/40 hover:bg-indigo-500/10",
    badge: "Chat",
  },
  {
    id: "instagram",
    name: "Instagram",
    url: OFFICIAL_COMMUNITY_SOCIALS.instagram.url,
    label: OFFICIAL_COMMUNITY_SOCIALS.instagram.label,
    accessibleLabel: OFFICIAL_COMMUNITY_SOCIALS.instagram.accessibleLabel,
    icon: Instagram,
    accentClass: "hover:text-pink-400 hover:border-pink-500/40 hover:bg-pink-500/10",
    badge: "@aws.sbg.pits",
  },
  {
    id: "whatsapp",
    name: "WhatsApp Community",
    url: "https://chat.whatsapp.com/EYN9G6KJxfy66GQ3gTgR13",
    label: "Join AWS SBG PITS WhatsApp Community Group",
    accessibleLabel: "Join the official AWS SBG PITS student WhatsApp group",
    icon: WhatsApp,
    accentClass: "hover:text-emerald-400 hover:border-emerald-500/40 hover:bg-emerald-500/10",
    badge: "Announcements",
  },
  {
    id: "meetup",
    name: "Meetup",
    url: "https://www.meetup.com/aws-sbg-at-prashanti-institute-of-technology-and-science/",
    label: "Join AWS SBG PITS on Meetup",
    accessibleLabel: "RSVP to campus workshops and tech talks on Meetup",
    icon: Meetup,
    accentClass: "hover:text-red-400 hover:border-red-500/40 hover:bg-red-500/10",
    badge: "Events",
  },
  {
    id: "github",
    name: "GitHub",
    url: "https://github.com",
    label: "Explore AWS SBG PITS on GitHub",
    accessibleLabel: "Browse student repositories and cloud architecture samples on GitHub",
    icon: Github,
    accentClass: "hover:text-white hover:border-white/40 hover:bg-white/10",
    badge: "Code",
  },
];

