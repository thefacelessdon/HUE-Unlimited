"use client";

export default function Contact() {
  return (
    <section id="contact" className="section-padding bg-neutral-900/50">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-16 lg:grid-cols-2">
          <div>
            <p className="mb-4 text-sm font-medium uppercase tracking-widest text-hue-400">
              Get in Touch
            </p>
            <h2 className="text-4xl font-bold tracking-tight md:text-5xl">
              Let&apos;s create something{" "}
              <span className="gradient-text">amazing</span>
            </h2>
            <p className="mt-6 text-lg text-neutral-400">
              Have a project in mind? We&apos;d love to hear about it. Drop us a
              message and let&apos;s start a conversation about bringing your
              vision to life.
            </p>

            <div className="mt-10 space-y-4 text-neutral-400">
              <div className="flex items-center gap-3">
                <span className="text-hue-400">&#9993;</span>
                <span>hello@hueunlimited.com</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-hue-400">&#9742;</span>
                <span>(555) 123-4567</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-hue-400">&#9673;</span>
                <span>Los Angeles, CA</span>
              </div>
            </div>
          </div>

          <form
            className="space-y-6"
            onSubmit={(e) => e.preventDefault()}
          >
            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <label
                  htmlFor="name"
                  className="mb-2 block text-sm font-medium text-neutral-300"
                >
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  placeholder="Your name"
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-neutral-500 focus:border-hue-500 focus:outline-none"
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-medium text-neutral-300"
                >
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-neutral-500 focus:border-hue-500 focus:outline-none"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="subject"
                className="mb-2 block text-sm font-medium text-neutral-300"
              >
                Subject
              </label>
              <input
                id="subject"
                type="text"
                placeholder="Project inquiry"
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-neutral-500 focus:border-hue-500 focus:outline-none"
              />
            </div>
            <div>
              <label
                htmlFor="message"
                className="mb-2 block text-sm font-medium text-neutral-300"
              >
                Message
              </label>
              <textarea
                id="message"
                rows={5}
                placeholder="Tell us about your project..."
                className="w-full resize-none rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-neutral-500 focus:border-hue-500 focus:outline-none"
              />
            </div>
            <button
              type="submit"
              className="w-full rounded-full bg-hue-600 px-8 py-3 text-sm font-medium text-white transition-colors hover:bg-hue-500 md:w-auto"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
