import { HeroSection } from "@/components/home/HeroSection";
import { CommunityMissionSection } from "@/components/home/CommunityMissionSection";
import { DomainsSection } from "@/components/home/DomainsSection";
import { LearningRoadmapSection } from "@/components/home/LearningRoadmapSection";
import { EventsPreview } from "@/components/home/EventsPreview";
import { ProjectsPreview } from "@/components/home/ProjectsPreview";
import { TeamPreview } from "@/components/home/TeamPreview";
import { BenefitsSection } from "@/components/home/BenefitsSection";
import { JoinCtaSection } from "@/components/home/JoinCtaSection";

export const metadata = {
  title: "AWS Student Builder Group | Prashanti Institute of Technology & Science",
  description:
    "Explore cloud computing, AI, machine learning, technical workshops, student projects, and developer community activities at Prashanti Institute of Technology & Science, Ujjain.",
};

export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <HeroSection />

      {/* Section 1 — The Community */}
      <CommunityMissionSection />

      {/* Section 2 — Explore Technology */}
      <DomainsSection />

      {/* Section C — Learning Roadmap */}
      <LearningRoadmapSection />

      {/* Section 4 — Events and Experiences */}
      <EventsPreview />

      {/* Section 5 — Student Projects */}
      <ProjectsPreview />

      {/* Section 6 — Meet the Team */}
      <TeamPreview />

      {/* Campus Cohort Highlights */}
      <BenefitsSection />

      {/* Section 7 — Join the Community */}
      <JoinCtaSection />
    </div>
  );
}
