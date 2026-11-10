import React from "react";
import { INITIAL_TEAM_MEMBERS } from "@/lib/data/initialData";
import { TeamShowcaseClient } from "./TeamShowcaseClient";

export function TeamPreview() {
  return (
    <section
      id="team"
      className="py-24 sm:py-32 border-b border-white/10 bg-[#080A0F] relative overflow-hidden font-sans"
    >
      {/* Cloud & Futuristic ambient background accents */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[450px] bg-gradient-to-r from-purple-900/15 via-indigo-900/15 to-transparent blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-2/3 right-1/4 w-[500px] h-[300px] bg-purple-600/10 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute inset-0 tech-grid opacity-15 pointer-events-none -z-10" />

      <div className="responsive-container">
        <TeamShowcaseClient members={INITIAL_TEAM_MEMBERS} />
      </div>
    </section>
  );
}
