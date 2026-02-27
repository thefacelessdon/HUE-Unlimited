import { CaseStudyLayout } from "@/components/CaseStudyLayout";

export const metadata = {
  title: "Camp — Red Bull | HUE Unlimited",
  description: "How we curated and produced Red Bull's next-generation music residency.",
};

export default function RedBullCampPage() {
  return (
    <CaseStudyLayout
      data={{
        client: "Red Bull · Music Residency",
        headline: "CURATED TALENT OF",
        headlineOutline: "THE NEXT GENERATION.",
        description:
          "Red Bull Camp was a music residency program designed to spotlight rising creators. HUE handled creative direction, content production, and program development — curating 10 emerging artists, producing 30+ content assets, and executive producing a collaborative EP.",
        challenge:
          "Red Bull wanted to invest in emerging talent but needed a program that felt organic to the culture, not like a brand activation. The creative had to let the artists lead while still delivering polished, platform-ready content.",
        approach:
          "We designed the program from scratch — scouting and curating 10 rising creators, then building a residency experience that combined studio sessions, mentorship, and content creation. Every asset was produced to feel artist-first while meeting Red Bull's quality bar.",
        impact:
          "The program produced 30+ content assets across video, photo, and social formats, plus a collaborative EP that was executive produced by HUE. The residency model became a blueprint for future Red Bull talent programs.",
        stats: [
          { value: "10", label: "Rising Creators Curated" },
          { value: "30+", label: "Content Assets Produced" },
          { value: "1", label: "Collaborative EP" },
          { value: "NEW", label: "Program Blueprint" },
        ],
        tags: [
          "Experiential",
          "Content Production",
          "Program Development",
          "Creative Direction",
          "Talent Curation",
        ],
        gradient:
          "linear-gradient(105deg, rgba(255,0,0,0.65) 0%, rgba(180,0,0,0.4) 50%, transparent 100%)",
        next: { label: "Death Row", href: "/work/death-row" },
      }}
    />
  );
}
