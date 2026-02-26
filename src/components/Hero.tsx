import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden">
      {/* Background gradient orbs */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-40 top-1/4 h-[500px] w-[500px] rounded-full bg-hue-600/20 blur-[120px]" />
        <div className="absolute -right-40 bottom-1/4 h-[400px] w-[400px] rounded-full bg-pink-500/15 blur-[100px]" />
        <div className="absolute left-1/2 top-1/2 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-orange-500/10 blur-[80px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 py-32 lg:px-12">
        <div className="max-w-4xl">
          <p className="mb-6 text-sm font-medium uppercase tracking-widest text-hue-400">
            Creative Agency
          </p>
          <h1 className="text-5xl font-bold leading-tight tracking-tight md:text-7xl lg:text-8xl">
            We craft{" "}
            <span className="gradient-text">bold brands</span>{" "}
            &amp; digital experiences
          </h1>
          <p className="mt-8 max-w-2xl text-lg text-neutral-400 md:text-xl">
            HUE Unlimited is a creative studio that transforms ideas into
            unforgettable visual identities, websites, and campaigns that move
            people.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              href="#work"
              className="rounded-full bg-hue-600 px-8 py-3 text-sm font-medium text-white transition-colors hover:bg-hue-500"
            >
              View Our Work
            </Link>
            <Link
              href="#contact"
              className="rounded-full border border-white/20 px-8 py-3 text-sm font-medium text-white transition-colors hover:border-white/40 hover:bg-white/5"
            >
              Start a Project
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
