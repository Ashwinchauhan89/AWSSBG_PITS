"use client";

import React, { useState } from "react";
import { useSound } from "@/components/audio/SoundManager";

interface FloatingDroneBotProps {
  onClick?: () => void;
}

export function FloatingDroneBot({ onClick }: FloatingDroneBotProps) {
  const { playHover, playClick } = useSound();
  const [isHovered, setIsHovered] = useState(false);

  return (
    <button
      type="button"
      className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 lg:bottom-8 lg:right-8 z-40 select-none cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF9900] focus-visible:ring-offset-4 focus-visible:ring-offset-[#080A0F] rounded-2xl p-1 bg-transparent border-0"
      onClick={() => {
        playClick();
        onClick?.();
      }}
      onMouseEnter={() => {
        playHover();
        setIsHovered(true);
      }}
      onMouseLeave={() => setIsHovered(false)}
      title="Ask Builder AI / SBG Drone Companion"
      aria-label="Ask Builder AI - Open Interactive Terminal Assistant"
    >
      <div className="relative flex flex-col items-center">
        {/* Chat Speech Bubble Tooltip (Responsive) */}
        <div
          className={`mb-1.5 sm:mb-2 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-xl bg-[#080A0F]/95 border border-[#43B7FF]/40 text-slate-200 font-mono shadow-[0_0_20px_rgba(67,183,255,0.3)] backdrop-blur-md transition-all duration-300 flex items-center gap-1.5 sm:gap-2 ${
            isHovered ? "scale-105 border-[#FF9900]" : "animate-bounce"
          }`}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#43B7FF] animate-ping" />
          <span className="text-[10px] sm:text-[11px] font-bold text-white tracking-wide">
            {isHovered ? "CLICK TO CHAT" : "ASK BUILDER AI"}
          </span>
          {/* Bubble tail */}
          <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 sm:w-2 h-1.5 sm:h-2 bg-[#080A0F] border-r border-b border-[#43B7FF]/40 rotate-45" />
        </div>

        {/* 3D-Look Flying Quad-Drone Robot SVG (Responsive sizing) */}
        <div className="relative w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 animate-[float_4s_ease-in-out_infinite] filter drop-shadow-[0_8px_16px_rgba(0,0,0,0.8)]">
          <svg
            viewBox="0 0 100 100"
            className="w-full h-full"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Left Top Rotor */}
            <g className="animate-[spin_0.3s_linear_infinite] origin-[20px_25px]">
              <line x1="10" y1="25" x2="30" y2="25" stroke="#43B7FF" strokeWidth="2.5" strokeLinecap="round" opacity="0.8" />
              <circle cx="20" cy="25" r="3" fill="#101A2C" stroke="#43B7FF" strokeWidth="1.5" />
            </g>

            {/* Right Top Rotor */}
            <g className="animate-[spin_0.3s_linear_infinite_reverse] origin-[80px_25px]">
              <line x1="70" y1="25" x2="90" y2="25" stroke="#43B7FF" strokeWidth="2.5" strokeLinecap="round" opacity="0.8" />
              <circle cx="80" cy="25" r="3" fill="#101A2C" stroke="#43B7FF" strokeWidth="1.5" />
            </g>

            {/* Left Bottom Rotor */}
            <g className="animate-[spin_0.3s_linear_infinite_reverse] origin-[15px_65px]">
              <line x1="5" y1="65" x2="25" y2="65" stroke="#FF9900" strokeWidth="2" strokeLinecap="round" opacity="0.7" />
              <circle cx="15" cy="65" r="2.5" fill="#101A2C" stroke="#FF9900" strokeWidth="1.5" />
            </g>

            {/* Right Bottom Rotor */}
            <g className="animate-[spin_0.3s_linear_infinite] origin-[85px_65px]">
              <line x1="75" y1="65" x2="95" y2="65" stroke="#FF9900" strokeWidth="2" strokeLinecap="round" opacity="0.7" />
              <circle cx="85" cy="65" r="2.5" fill="#101A2C" stroke="#FF9900" strokeWidth="1.5" />
            </g>

            {/* Drone Rotor Support Arms */}
            <path d="M30 45 L20 25" stroke="#9BA7B7" strokeWidth="2.5" strokeLinecap="round" />
            <path d="M70 45 L80 25" stroke="#9BA7B7" strokeWidth="2.5" strokeLinecap="round" />
            <path d="M30 55 L15 65" stroke="#9BA7B7" strokeWidth="2.5" strokeLinecap="round" />
            <path d="M70 55 L85 65" stroke="#9BA7B7" strokeWidth="2.5" strokeLinecap="round" />

            {/* Main Spherical Chassis */}
            <circle cx="50" cy="50" r="24" fill="url(#droneBodyGrad)" stroke="#F5F7FA" strokeWidth="1.8" />

            {/* Glowing Visor Screen */}
            <rect x="34" y="42" width="32" height="16" rx="8" fill="#080A0F" stroke="#43B7FF" strokeWidth="1.5" />

            {/* Cyan Expressive Eyes */}
            <circle cx="43" cy="50" r="3" fill="#43B7FF">
              <animate attributeName="r" values="3;0.5;3" dur="4s" repeatCount="indefinite" />
            </circle>
            <circle cx="57" cy="50" r="3" fill="#43B7FF">
              <animate attributeName="r" values="3;0.5;3" dur="4s" repeatCount="indefinite" />
            </circle>

            {/* Glowing Antenna */}
            <line x1="50" y1="26" x2="50" y2="18" stroke="#F5F7FA" strokeWidth="2" strokeLinecap="round" />
            <circle cx="50" cy="16" r="3" fill="#FF9900" className="animate-pulse" />

            {/* Bottom Thruster Glow */}
            <ellipse cx="50" cy="74" rx="8" ry="3" fill="#FF9900" opacity="0.7" className="animate-pulse" />

            {/* Gradients */}
            <defs>
              <linearGradient id="droneBodyGrad" x1="26" y1="26" x2="74" y2="74" gradientUnits="userSpaceOnUse">
                <stop stopColor="#F5F7FA" />
                <stop offset="0.6" stopColor="#CBD5E1" />
                <stop offset="1" stopColor="#64748B" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>
    </button>
  );
}
