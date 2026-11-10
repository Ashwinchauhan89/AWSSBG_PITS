import { HeroSection } from "@/components/home/HeroSection";
import { TechnologyMarquee } from "@/components/home/TechnologyMarquee";
import { AboutCommunitySection } from "@/components/home/AboutCommunitySection";
import { WhyJoinSection } from "@/components/home/WhyJoinSection";
import { CommunityMissionSection } from "@/components/home/CommunityMissionSection";
import { TeamPreview } from "@/components/home/TeamPreview";
import { EventsShowcaseSection } from "@/components/home/EventsShowcaseSection";
import { LearningEcosystemSection } from "@/components/home/LearningEcosystemSection";
import { CommunityCollaborationSection } from "@/components/home/CommunityCollaborationSection";
import { CommunityImpactSection } from "@/components/home/CommunityImpactSection";
import { CampusInfoSection } from "@/components/home/CampusInfoSection";
import { CommunityFaqSection } from "@/components/home/CommunityFaqSection";
import { CommunityCtaSection } from "@/components/home/CommunityCtaSection";

export const metadata = {
  title: "AWS Student Builder Group | Prashanti Institute of Technology & Science",
  description:
    "Explore cloud computing, AI, machine learning, technical workshops, student projects, and developer community activities at Prashanti Institute of Technology & Science, Ujjain.",
};

export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* Existing Hero Section — STRICTLY PRESERVED & PROTECTED */}
      <HeroSection />

      {/* SECTION 01 — TECHNOLOGY MARQUEE */}
      <TechnologyMarquee />

      {/* SECTION 02 — ABOUT OUR COMMUNITY */}
      <AboutCommunitySection />

      {/* SECTION 03 — WHY JOIN OUR COMMUNITY */}
      <WhyJoinSection />

      {/* SECTION 04 — LEARN, BUILD & CONNECT */}
      <CommunityMissionSection />

      {/* SECTION 05 — MEET OUR BUILDERS */}
      <TeamPreview />

      {/* SECTION 06 — EVENTS & COMMUNITY ACTIVITIES */}
      <EventsShowcaseSection />

      {/* SECTION 07 — OUR LEARNING ECOSYSTEM */}
      <LearningEcosystemSection />

      {/* SECTION 08 — COMMUNITY COLLABORATION */}
      <CommunityCollaborationSection />

      {/* SECTION 09 — COMMUNITY IMPACT */}
      <CommunityImpactSection />

      {/* SECTION 10 — CAMPUS & COMMUNITY INFORMATION */}
      <CampusInfoSection />

      {/* SECTION 11 — FAQ */}
      <CommunityFaqSection />

      {/* SECTION 12 — COMMUNITY CTA */}
      <CommunityCtaSection />
    </div>
  );
}
