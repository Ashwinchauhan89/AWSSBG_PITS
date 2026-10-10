"use client";

import React from "react";
import { useSound } from "./SoundManager";
import { Volume2, VolumeX } from "lucide-react";

export function SoundToggle() {
  const { isMuted, toggleMute, playClick } = useSound();

  const handleClick = () => {
    toggleMute();
    playClick();
  };

  return (
    <button
      onClick={handleClick}
      aria-label={isMuted ? "Unmute atmospheric audio" : "Mute atmospheric audio"}
      title={isMuted ? "Sound: Off (Click to activate atmospheric synth)" : "Sound: Active (Atmospheric drone running)"}
      className={`group relative flex items-center gap-2.5 px-3 py-1.5 rounded-full border text-xs font-mono transition-all duration-300 backdrop-blur-md ${
        isMuted
          ? "bg-[#080A0F]/80 border-white/10 text-slate-400 hover:border-white/30 hover:text-white"
          : "bg-[#FF9900]/15 border-[#FF9900]/50 text-[#FF9900] shadow-[0_0_15px_rgba(255,153,0,0.35)]"
      }`}
    >
      {/* Icon */}
      {isMuted ? (
        <VolumeX className="w-3.5 h-3.5 text-slate-400 group-hover:text-white transition-colors" />
      ) : (
        <Volume2 className="w-3.5 h-3.5 text-[#FF9900] animate-pulse" />
      )}

      {/* Equalizer Waveform Bars */}
      <div className="flex items-end gap-[2px] h-3.5">
        <span
          className={`w-[2px] rounded-full transition-all duration-300 ${
            isMuted
              ? "h-1 bg-slate-600"
              : "bg-[#FF9900] animate-[soundbar_0.8s_ease-in-out_infinite]"
          }`}
        />
        <span
          className={`w-[2px] rounded-full transition-all duration-300 ${
            isMuted
              ? "h-1 bg-slate-600"
              : "bg-[#FF9900] animate-[soundbar_1.1s_ease-in-out_infinite_0.15s]"
          }`}
        />
        <span
          className={`w-[2px] rounded-full transition-all duration-300 ${
            isMuted
              ? "h-1 bg-slate-600"
              : "bg-[#43B7FF] animate-[soundbar_0.9s_ease-in-out_infinite_0.3s]"
          }`}
        />
        <span
          className={`w-[2px] rounded-full transition-all duration-300 ${
            isMuted
              ? "h-1 bg-slate-600"
              : "bg-[#FF9900] animate-[soundbar_1.2s_ease-in-out_infinite_0.1s]"
          }`}
        />
      </div>

      {/* Label */}
      <span className="hidden sm:inline-block tracking-wider font-semibold uppercase text-[10px]">
        {isMuted ? "AUDIO OFF" : "ATMOSPHERE ON"}
      </span>

      {/* Subtle indicator beacon */}
      <span
        className={`w-1.5 h-1.5 rounded-full ${
          isMuted ? "bg-slate-600" : "bg-[#FF9900] animate-ping"
        }`}
      />
    </button>
  );
}
