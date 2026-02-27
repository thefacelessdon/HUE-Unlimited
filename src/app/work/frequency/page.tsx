import { CaseStudyLayout } from "@/components/CaseStudyLayout";

export const metadata = {
  title: "Frequency — Spotify | HUE Unlimited",
  description: "How we co-built Spotify's #1 Black music destination from the ground up.",
};

export default function FrequencyPage() {
  return (
    <CaseStudyLayout
      data={{
        client: "Spotify · Embedded Partner",
        headline: "CO-BUILT FREQUENCY",
        headlineOutline: "VIA STORYTELLING.",
        description:
          "Frequency is Spotify's global destination for Black music and culture. HUE was embedded from inception — building the brand identity, creative strategy, and content engine that turned it into a platform with 2.1 million followers, 250 million video views, and a presence across six regions.",
        challenge:
          "Spotify needed a cultural brand, not a playlist. Frequency had to feel authentic to Black music audiences while scaling across genres, regions, and formats — all without feeling like a corporate initiative.",
        approach:
          "We embedded inside Spotify's team as the standing creative layer. Built the visual identity from scratch, developed the editorial voice, and produced hundreds of content pieces — artist interviews, short docs, social series, live events — all anchored by a brand system designed to flex across formats.",
        impact:
          "Frequency became the #1 destination for Black music on Spotify. The brand won two Telly Awards, drove 250M+ video views across platforms, grew to 2.1M followers, and launched in six global regions. HUE remained embedded for the entire journey.",
        stats: [
          { value: "#1", label: "Black Music Destination on Spotify" },
          { value: "2.1M", label: "Followers" },
          { value: "250M+", label: "Video Views" },
          { value: "2×", label: "Telly Awards" },
        ],
        tags: [
          "Global Brand Building",
          "Creative Direction",
          "Content Production",
          "Social Strategy",
          "Brand Identity",
          "Event Creative",
        ],
        gradient:
          "linear-gradient(105deg, rgba(255,200,0,0.75) 0%, rgba(255,60,0,0.55) 50%, transparent 100%)",
        next: { label: "Soul", href: "/work/soul" },
      }}
    />
  );
}
