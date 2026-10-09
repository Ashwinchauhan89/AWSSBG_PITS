import { HeroSection } from "@/components/home/HeroSection";
import { DomainsSection } from "@/components/home/DomainsSection";
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
      <HeroSection />
      <DomainsSection />
      <EventsPreview />
      <ProjectsPreview />
      <TeamPreview />
      <BenefitsSection />
      <JoinCtaSection />
    </div>
  );
}
