const stats = [
  { value: "50+", label: "Projects Delivered" },
  { value: "30+", label: "Happy Clients" },
  { value: "5+", label: "Years of Experience" },
  { value: "12", label: "Industry Awards" },
];

export default function About() {
  return (
    <section id="about" className="section-padding">
      <div className="mx-auto max-w-7xl">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          <div>
            <p className="mb-4 text-sm font-medium uppercase tracking-widest text-hue-400">
              About Us
            </p>
            <h2 className="text-4xl font-bold tracking-tight md:text-5xl">
              Creativity without{" "}
              <span className="gradient-text">limits</span>
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-neutral-400">
              HUE Unlimited was founded on a simple belief: great design has the
              power to transform businesses. We&apos;re a team of designers,
              strategists, and developers who thrive on pushing creative
              boundaries.
            </p>
            <p className="mt-4 text-lg leading-relaxed text-neutral-400">
              Every project is an opportunity to tell a story, solve a problem,
              and create something that resonates. We partner closely with our
              clients to ensure every detail aligns with their vision and goals.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-6">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 text-center"
              >
                <div className="text-4xl font-bold gradient-text">
                  {stat.value}
                </div>
                <div className="mt-2 text-sm text-neutral-400">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
