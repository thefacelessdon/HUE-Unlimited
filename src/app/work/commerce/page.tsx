import { CaseStudyLayout } from "@/components/CaseStudyLayout";

export const metadata = {
  title: "Artist Commerce | HUE Unlimited",
  description: "How we made commerce feel like culture for Anderson .Paak, MGK, Snoop Dogg, and more.",
};

export default function CommercePage() {
  return (
    <CaseStudyLayout
      data={{
        client: "Anderson .Paak · MGK · Snoop Dogg",
        headline: "MADE COMMERCE",
        headlineOutline: "FEEL LIKE CULTURE.",
        description:
          "HUE built full brand systems and retail creative for some of the biggest names in music — creating product lines, packaging, and commerce experiences for partners including Vans, Hot Topic, Amazon, and touring retail operations.",
        challenge:
          "Artist merch is usually an afterthought — slapped logos on blanks. These artists needed commerce that felt like an extension of their creative identity, not a cash grab. The systems had to work across retail partners with wildly different requirements.",
        approach:
          "We treated each artist as a brand, not a license. Built complete visual systems — brand guidelines, product design, packaging, and retail-ready assets — then adapted them for each channel. Every SKU was designed to feel intentional, from Vans collabs to Amazon storefronts to touring merch.",
        impact:
          "We delivered full brand systems across multiple artists and retail partners. The commerce programs proved that artist merch could drive real revenue while strengthening the artist's brand equity — not diluting it.",
        stats: [
          { value: "3+", label: "Artist Brand Systems" },
          { value: "4+", label: "Retail Partners" },
          { value: "FULL", label: "Product to Packaging" },
          { value: "TOURING", label: "Retail Operations" },
        ],
        tags: [
          "Artist Commerce",
          "Brand Systems",
          "Product Design",
          "Packaging",
          "Retail",
          "Touring Merch",
        ],
        gradient:
          "linear-gradient(105deg, rgba(0,0,255,0.6) 0%, rgba(0,0,150,0.35) 50%, transparent 100%)",
      }}
    />
  );
}
