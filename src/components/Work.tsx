import Link from "next/link";

const projects = [
  {
    title: "Frequency Campaign",
    category: "Case Study",
    color: "from-hue-600 to-pink-500",
    href: "/case-studies",
  },
  {
    title: "Film Archive",
    category: "Analog Photography",
    color: "from-pink-500 to-orange-500",
    href: "/film-archive",
  },
  {
    title: "Polaroid Archives",
    category: "Portrait Collection",
    color: "from-orange-500 to-yellow-500",
    href: "/polaroid-archives",
  },
  {
    title: "Coming Soon",
    category: "Motion Design",
    color: "from-hue-500 to-blue-500",
    href: "#",
  },
];

export default function Work() {
  return (
    <section id="work" className="section-padding bg-neutral-900/50">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 max-w-2xl">
          <p className="mb-4 text-sm font-medium uppercase tracking-widest text-hue-400">
            Selected Work
          </p>
          <h2 className="text-4xl font-bold tracking-tight md:text-5xl">
            Projects we&apos;re{" "}
            <span className="gradient-text">proud of</span>
          </h2>
          <p className="mt-4 text-lg text-neutral-400">
            A glimpse into the brands and experiences we&apos;ve helped shape.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {projects.map((project) => (
            <Link
              key={project.title}
              href={project.href}
              className="group relative overflow-hidden rounded-2xl"
            >
              {/* Gradient placeholder for project image */}
              <div
                className={`aspect-[4/3] bg-gradient-to-br ${project.color} opacity-80 transition-transform duration-500 group-hover:scale-105`}
              />
              <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-neutral-950/90 via-transparent p-8">
                <span className="text-xs font-medium uppercase tracking-wider text-neutral-300">
                  {project.category}
                </span>
                <h3 className="mt-1 text-2xl font-bold text-white">
                  {project.title}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
