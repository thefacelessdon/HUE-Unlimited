"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-neutral-950">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-12">
        <div className="grid gap-12 md:grid-cols-3">
          {/* Brand */}
          <div>
            <Link href="/" className="text-2xl font-bold tracking-tight">
              <span className="gradient-text">HUE</span>{" "}
              <span className="text-white">Unlimited</span>
            </Link>
            <p className="mt-4 max-w-xs text-sm text-neutral-400">
              Bold ideas. Vivid execution. We bring your brand to life through
              design, strategy, and digital craft.
            </p>
          </div>

          {/* Links */}
          <div className="grid grid-cols-2 gap-8">
            <div>
              <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-neutral-300">
                Navigate
              </h4>
              <ul className="space-y-2 text-sm text-neutral-400">
                <li>
                  <Link href="#services" className="hover:text-white transition-colors">
                    Services
                  </Link>
                </li>
                <li>
                  <Link href="#work" className="hover:text-white transition-colors">
                    Work
                  </Link>
                </li>
                <li>
                  <Link href="#about" className="hover:text-white transition-colors">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="#contact" className="hover:text-white transition-colors">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-neutral-300">
                Social
              </h4>
              <ul className="space-y-2 text-sm text-neutral-400">
                <li>
                  <span className="hover:text-white transition-colors cursor-pointer">
                    Instagram
                  </span>
                </li>
                <li>
                  <span className="hover:text-white transition-colors cursor-pointer">
                    LinkedIn
                  </span>
                </li>
                <li>
                  <span className="hover:text-white transition-colors cursor-pointer">
                    Dribbble
                  </span>
                </li>
                <li>
                  <span className="hover:text-white transition-colors cursor-pointer">
                    Twitter / X
                  </span>
                </li>
              </ul>
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-neutral-300">
              Stay in the loop
            </h4>
            <p className="mb-4 text-sm text-neutral-400">
              Get updates on our latest work and creative insights.
            </p>
            <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="your@email.com"
                className="flex-1 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white placeholder:text-neutral-500 focus:border-hue-500 focus:outline-none"
              />
              <button
                type="submit"
                className="rounded-full bg-hue-600 px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-hue-500"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="mt-16 border-t border-white/10 pt-8 text-center text-sm text-neutral-500">
          &copy; {new Date().getFullYear()} HUE Unlimited. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
