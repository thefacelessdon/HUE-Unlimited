"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";

const navLinks = [
  { label: "Work", href: "/#work" },
  { label: "Services", href: "/#services" },
  { label: "Systems", href: "/#systems" },
  { label: "Archives", href: "/archives" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      ref={headerRef}
      className="fixed top-0 z-50 w-full transition-all duration-300"
      style={{
        borderBottom: scrolled ? "1px solid var(--border)" : "1px solid transparent",
        background: scrolled ? "rgba(0,0,0,0.92)" : "transparent",
        backdropFilter: scrolled ? "blur(16px)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(16px)" : "none",
      }}
    >
      <nav className="mx-auto flex max-w-site items-center justify-between px-6 py-4 lg:px-12">
        {/* Logo */}
        <Link
          href="/"
          className="font-display text-[18px] font-extrabold uppercase tracking-[0.04em] text-white"
          style={{ lineHeight: 1 }}
        >
          HUE
        </Link>

        {/* Desktop nav */}
        <ul className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="nav-link font-mono text-[10px] uppercase tracking-[0.14em] transition-colors duration-200"
                style={{ color: "var(--muted)" }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.color = "var(--white)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color = "var(--muted)")
                }
              >
                {link.label}
              </Link>
            </li>
          ))}
          <li>
            <Link href="#cta" className="btn-primary">
              Start a conversation
            </Link>
          </li>
        </ul>

        {/* Mobile toggle */}
        <button
          className="flex flex-col gap-1.5 md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          <span
            className={`block h-[1px] w-5 bg-white transition-transform ${mobileOpen ? "translate-y-[7px] rotate-45" : ""}`}
          />
          <span
            className={`block h-[1px] w-5 bg-white transition-opacity ${mobileOpen ? "opacity-0" : ""}`}
          />
          <span
            className={`block h-[1px] w-5 bg-white transition-transform ${mobileOpen ? "-translate-y-[7px] -rotate-45" : ""}`}
          />
        </button>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div
          className="border-t px-6 py-8 md:hidden"
          style={{
            borderColor: "var(--border)",
            background: "rgba(0,0,0,0.95)",
          }}
        >
          <ul className="flex flex-col gap-5">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="font-mono text-[11px] uppercase tracking-[0.14em] text-white"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li className="mt-2">
              <Link
                href="#cta"
                className="btn-primary"
                onClick={() => setMobileOpen(false)}
              >
                Start a conversation
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
