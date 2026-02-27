import { CaseStudyLayout } from "@/components/CaseStudyLayout";

export const metadata = {
  title: "Soul — Disney / Pixar | HUE Unlimited",
  description: "How we took Disney/Pixar's Soul beyond the screen into culture, commerce, and community.",
};

export default function SoulPage() {
  return (
    <CaseStudyLayout
      data={{
        client: "Disney / Pixar · Brand Extension",
        headline: "TOOK SOUL BEYOND",
        headlineOutline: "THE SCREEN.",
        description:
          "When Disney and Pixar released Soul, HUE was brought in to extend the film's cultural resonance into product, retail, and real-world experiences — building an 80+ SKU catalog, Disney Parks OOH, an Amazon storefront, and a Gold Telly-winning campaign.",
        challenge:
          "Soul resonated deeply with Black audiences, but Disney needed a partner who could authentically extend that into commerce and culture without reducing it to merchandise. The brand extension had to feel as intentional as the film itself.",
        approach:
          "We developed the complete brand identity system for the Soul product line — packaging, colorways, typography, and visual language that honored the film's themes of purpose and passion. Then we executed across retail (Amazon, Disney Parks), OOH, and digital campaigns.",
        impact:
          "The program produced 80+ SKUs, a full Amazon storefront, Disney Parks out-of-home placements, and a Gold Telly Award-winning campaign. The brand extension became an evergreen program that continued well past the film's release window.",
        stats: [
          { value: "80+", label: "SKU Product Catalog" },
          { value: "GOLD", label: "Telly Award" },
          { value: "6+", label: "Retail Partners" },
          { value: "EVERGREEN", label: "Program Status" },
        ],
        tags: [
          "Brand Identity",
          "Product Design",
          "Campaign Rollout",
          "Packaging",
          "Retail",
          "Evergreen Programs",
        ],
        gradient:
          "linear-gradient(105deg, rgba(100,0,200,0.65) 0%, rgba(40,0,100,0.45) 50%, transparent 100%)",
        next: { label: "Red Bull Camp", href: "/work/red-bull-camp" },
      }}
    />
  );
}
