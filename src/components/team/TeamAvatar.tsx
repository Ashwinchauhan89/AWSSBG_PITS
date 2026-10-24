"use client";

import React, { useState } from "react";
import Image from "next/image";
import { User } from "lucide-react";

export interface TeamAvatarProps {
  src?: string;
  alt: string;
  name: string;
  size?: "sm" | "md" | "lg" | "xl" | "hero" | "leader" | "leader-xl";
  variant?: "circular" | "rounded";
  glowColor?: "amber" | "blue" | "purple" | "emerald" | "pink" | "cyan" | "slate";
  showStatus?: boolean;
  statusLabel?: string;
  showChipBadge?: boolean;
  className?: string;
}

const SIZE_MAP = {
  sm: "w-10 h-10 text-xs",
  md: "w-14 h-14 text-base",
  lg: "w-20 h-20 text-xl",
  xl: "w-28 h-28 text-2xl",
  hero: "w-32 h-32 sm:w-40 sm:h-40 text-3xl sm:text-4xl",
  leader: "w-52 h-52 sm:w-64 sm:h-64 lg:w-72 lg:h-72 text-4xl sm:text-5xl",
  "leader-xl": "w-60 h-60 sm:w-72 sm:h-72 lg:w-80 lg:h-80 text-5xl sm:text-6xl",
};

const GLOW_MAP = {
  amber: "from-amber-500 via-orange-500 to-amber-600 shadow-orange-500/25 ring-amber-500/40",
  blue: "from-sky-500 via-blue-600 to-indigo-600 shadow-sky-500/25 ring-sky-500/40",
  purple: "from-purple-500 via-fuchsia-600 to-pink-600 shadow-purple-500/25 ring-purple-500/40",
  emerald: "from-emerald-500 via-teal-600 to-cyan-600 shadow-emerald-500/25 ring-emerald-500/40",
  pink: "from-pink-500 via-rose-600 to-amber-500 shadow-pink-500/25 ring-pink-500/40",
  cyan: "from-cyan-400 via-teal-500 to-blue-600 shadow-cyan-500/25 ring-cyan-500/40",
  slate: "from-slate-700 via-slate-800 to-slate-900 shadow-slate-700/20 ring-slate-600/40",
};

export function TeamAvatar({
  src,
  alt,
  name,
  size = "md",
  variant = "rounded",
  glowColor = "amber",
  showStatus = false,
  statusLabel = "Active",
  showChipBadge = false,
  className = "",
}: TeamAvatarProps) {
  const [imageError, setImageError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const getInitials = (fullName: string) => {
    return fullName
      .split(" ")
      .filter(Boolean)
      .map((part) => part[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const initials = getInitials(name);
  const sizeClasses = SIZE_MAP[size];
  const glowClasses = GLOW_MAP[glowColor] || GLOW_MAP.purple;
  const radiusClasses =
    variant === "circular"
      ? "rounded-full"
      : size === "leader" || size === "leader-xl"
      ? "rounded-[2.5rem]"
      : size === "hero"
      ? "rounded-[2rem]"
      : size === "xl" || size === "lg"
      ? "rounded-3xl"
      : "rounded-2xl";

  const hasValidImage = Boolean(src && !imageError);

  return (
    <div className={`relative inline-block shrink-0 group ${className}`}>
      {/* Outer ambient glow halo */}
      <div
        className={`absolute -inset-1.5 ${radiusClasses} bg-gradient-to-tr ${glowClasses} opacity-40 blur-lg group-hover:opacity-75 transition-opacity duration-300 pointer-events-none`}
      />

      {/* Portrait Container */}
      <div
        className={`relative ${sizeClasses} ${radiusClasses} overflow-hidden border-2 border-white/20 shadow-2xl bg-slate-900 flex items-center justify-center`}
      >
        {hasValidImage ? (
          <>
            {/* Real photo rendering with 1080x1080 cover & centered framing */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={src}
              alt={alt || `${name} portrait`}
              onLoad={() => setIsLoaded(true)}
              onError={() => setImageError(true)}
              className={`w-full h-full object-cover object-center transition-all duration-300 group-hover:scale-105 ${
                isLoaded ? "opacity-100" : "opacity-0"
              }`}
            />

            {/* Fallback while loading */}
            {!isLoaded && (
              <div
                className={`absolute inset-0 bg-gradient-to-tr ${glowClasses} flex items-center justify-center font-black text-slate-950 font-mono`}
              >
                {initials || <User className="w-1/2 h-1/2" />}
              </div>
            )}
          </>
        ) : (
          /* Sleek fallback initials avatar when photo is pending */
          <div
            className={`w-full h-full bg-gradient-to-tr ${glowClasses} flex flex-col items-center justify-center font-black text-slate-950 font-mono tracking-wider select-none relative`}
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.3),transparent_70%)] pointer-events-none" />
            <span className="relative z-10 drop-shadow-sm">{initials}</span>
          </div>
        )}

        {/* Gloss overlay accent */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-white/10 pointer-events-none" />
      </div>

      {/* Purple pixel chip logo accent badge */}
      {showChipBadge && (
        <div
          className="absolute -top-2 -right-2 z-20 w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-[#090D18]/90 border border-purple-500/50 shadow-lg shadow-purple-500/30 p-1 flex items-center justify-center backdrop-blur-md"
          title="PITS Cloud Computing Brand Identity"
        >
          <Image
            src="/images/branding/purple-pixel-chip.png"
            alt="PITS Cloud Pixel Chip"
            width={24}
            height={24}
            className="w-full h-full object-contain"
          />
        </div>
      )}

      {/* Online / Appointed Status Indicator */}
      {showStatus && (
        <span
          className="absolute -bottom-1 -right-1 flex h-5 w-5 sm:h-6 sm:w-6 z-20"
          title={statusLabel}
        >
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-5 w-5 sm:h-6 sm:w-6 bg-emerald-500 border-2 border-slate-950 text-[10px] items-center justify-center font-bold text-slate-950 shadow-sm">
            ✓
          </span>
        </span>
      )}
    </div>
  );
}
