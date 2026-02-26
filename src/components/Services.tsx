const services = [
  {
    title: "Brand Identity",
    description:
      "We build cohesive brand systems — from logos and color palettes to voice and visual guidelines — that make your brand instantly recognizable.",
    icon: "01",
  },
  {
    title: "Web Design & Development",
    description:
      "Pixel-perfect, responsive websites and web apps that perform beautifully across every device and deliver measurable results.",
    icon: "02",
  },
  {
    title: "Creative Strategy",
    description:
      "Data-informed creative direction that connects your brand with the right audience through compelling storytelling and campaigns.",
    icon: "03",
  },
  {
    title: "Motion & Visual Content",
    description:
      "Eye-catching motion graphics, video content, and visual assets that bring your brand to life across digital channels.",
    icon: "04",
  },
];

export default function Services() {
  return (
    <section id="services" className="section-padding">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 max-w-2xl">
          <p className="mb-4 text-sm font-medium uppercase tracking-widest text-hue-400">
            What We Do
          </p>
          <h2 className="text-4xl font-bold tracking-tight md:text-5xl">
            Services built for{" "}
            <span className="gradient-text">impact</span>
          </h2>
          <p className="mt-4 text-lg text-neutral-400">
            From concept to launch, we offer end-to-end creative services that
            help brands stand out and connect with their audience.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {services.map((service) => (
            <div
              key={service.title}
              className="group rounded-2xl border border-white/10 bg-white/[0.02] p-8 transition-colors hover:border-hue-500/30 hover:bg-white/[0.04]"
            >
              <span className="mb-4 inline-block text-3xl font-bold text-hue-500/40">
                {service.icon}
              </span>
              <h3 className="mb-3 text-xl font-semibold text-white">
                {service.title}
              </h3>
              <p className="text-neutral-400 leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
