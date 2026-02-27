import { CaseStudyLayout } from "@/components/CaseStudyLayout";

export const metadata = {
  title: "Death Row Records × Gamma | HUE Unlimited",
  description: "How we shaped the new era of Death Row Records through 360 artist campaigns.",
};

export default function DeathRowPage() {
  return (
    <CaseStudyLayout
      data={{
        client: "Death Row × Gamma · Artist Rollout",
        headline: "SHAPED THE NEW ERA",
        headlineOutline: "OF DEATH ROW.",
        description:
          "When Death Row Records relaunched under new ownership, HUE partnered with Gamma to build the creative infrastructure for artist rollouts — driving 25M+ video views, a #2 R&B radio placement, and breaking new artists into the mainstream.",
        challenge:
          "Death Row is one of the most iconic labels in hip-hop history. Relaunching it meant honoring the legacy while building something that felt current. The new roster needed full 360 campaigns that could compete with major label machinery.",
        approach:
          "We built artist branding, social strategy, and full campaign creative for Death Row's new roster. Every rollout was treated as a complete brand moment — from visual identity through content production to social execution. We functioned as the label's embedded creative department.",
        impact:
          "The campaigns drove 25M+ video views, a #2 R&B radio placement, a Top 20 Mediabase single, and helped grow artists to 1M+ monthly listeners. The partnership proved that catalog-era labels could compete in the streaming age with the right creative partner.",
        stats: [
          { value: "25M+", label: "Video Views" },
          { value: "#2", label: "R&B Radio" },
          { value: "TOP 20", label: "Mediabase" },
          { value: "1M+", label: "Monthly Listeners" },
        ],
        tags: [
          "Artist Branding",
          "360 Campaign",
          "Social Strategy",
          "Creative Direction",
          "Content Production",
        ],
        gradient:
          "linear-gradient(105deg, rgba(255,160,0,0.65) 0%, rgba(180,80,0,0.4) 50%, transparent 100%)",
        next: { label: "Artist Commerce", href: "/work/commerce" },
      }}
    />
  );
}
