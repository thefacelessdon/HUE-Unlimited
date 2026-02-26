import { FilmStrip } from "@/components/FilmStrip";

export const metadata = {
  title: "Film Archive | HUE Unlimited",
  description: "Analog film photography — raw, unfiltered, and real.",
};

const filmMedia = [
  { url: "/lovable-uploads/2f57e610-35da-4038-9e26-5b86c703d6ee.png", type: "image" as const },
  { url: "/lovable-uploads/d8cbc860-d156-4c3e-b248-83992f0187de.png", type: "image" as const },
  { url: "/lovable-uploads/e0ecccba-573c-4f9a-9dc3-caaf275ebd7d.png", type: "image" as const },
  { url: "/lovable-uploads/c5740964-54b0-4854-b301-6aaecab169c3.png", type: "image" as const },
  { url: "/lovable-uploads/585c643b-7a31-4c53-bfb2-8fc8fc481aa0.png", type: "image" as const },
  { url: "/lovable-uploads/4540d0da-4408-4f36-a5de-332ad3c282a2.png", type: "image" as const },
  { url: "/lovable-uploads/b59e66ec-8acd-4917-9da2-3056c4e04802.png", type: "image" as const },
  { url: "/lovable-uploads/1e0923f9-0614-4c2d-9323-e21bb1547f9e.png", type: "image" as const },
  { url: "/lovable-uploads/20feedaf-ecad-4937-8aca-c6a58b2b49cf.png", type: "image" as const },
  { url: "/lovable-uploads/d6959225-f944-4007-9594-f4ba86cb1947.png", type: "image" as const },
  { url: "/lovable-uploads/3941a04b-8576-443f-bb37-7f3d7c0b630e.png", type: "image" as const },
  { url: "/lovable-uploads/9a69fa4e-9120-4d78-b0da-1a7164e39154.png", type: "image" as const },
  { url: "/lovable-uploads/e7833092-747d-4fa8-8dda-128b2ab124f2.png", type: "image" as const },
  { url: "/lovable-uploads/275be8e7-5aec-4c37-b656-929b12043d2b.png", type: "image" as const },
  { url: "/lovable-uploads/695877f8-e363-4c0e-b84c-f670411245e8.png", type: "image" as const },
  { url: "/lovable-uploads/a3c27a32-132f-42ad-bfab-5ac6f122bb23.png", type: "image" as const },
  { url: "/lovable-uploads/e381a8b9-fa13-4be0-891b-2051ff01d3b1.png", type: "image" as const },
  { url: "/lovable-uploads/e5c6abe8-8c53-46ad-9235-220b865d6bca.png", type: "image" as const },
  { url: "/lovable-uploads/2b93b4b3-e5c3-4e61-9c2d-7b089d727c25.png", type: "image" as const },
  { url: "/lovable-uploads/42cf1ea1-e255-4749-b97e-27f5df4b1dce.png", type: "image" as const },
  { url: "/lovable-uploads/2691f242-ac26-4a7e-aa6d-c20564e07586.png", type: "image" as const },
  { url: "/lovable-uploads/2c596a9d-e571-4949-8ed2-fa6d6766896c.png", type: "image" as const },
  { url: "/lovable-uploads/c1cdbc8c-47d8-44e4-b9cf-464f4e4a9494.png", type: "image" as const },
  { url: "/lovable-uploads/95591e74-be11-40a4-a39f-5c314ead2d5c.png", type: "image" as const },
];

export default function FilmArchive() {
  return (
    <div className="min-h-screen pt-20">
      <FilmStrip media={filmMedia} />
    </div>
  );
}
