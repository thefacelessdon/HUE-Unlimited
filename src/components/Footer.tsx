import Link from "next/link";

export default function Footer() {
  return (
    <footer
      className="border-t px-6 py-12 md:px-12 lg:px-12"
      style={{ borderColor: "var(--border)" }}
    >
      <div className="mx-auto max-w-site">
        <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
          {/* Logo */}
          <Link
            href="/"
            className="font-display text-[18px] font-extrabold uppercase tracking-[0.04em] text-white"
          >
            HUE
          </Link>

          {/* Nav links */}
          <div className="flex flex-wrap gap-6">
            {["Work", "Services", "Systems", "Archives"].map((label) => (
              <Link
                key={label}
                href={
                  label === "Archives"
                    ? "/archives"
                    : `/#${label.toLowerCase()}`
                }
                className="font-mono text-[10px] uppercase tracking-[0.14em] transition-colors duration-200 hover:text-white"
                style={{ color: "var(--muted)" }}
              >
                {label}
              </Link>
            ))}
          </div>

          {/* Contact */}
          <div className="flex flex-wrap items-center gap-6">
            <a
              href="mailto:creative@hueunlimited.com"
              className="font-mono text-[10px] uppercase tracking-[0.14em] transition-colors duration-200 hover:text-white"
              style={{ color: "var(--muted)" }}
            >
              creative@hueunlimited.com
            </a>
          </div>
        </div>

        <div
          className="mt-10 border-t pt-6 font-mono text-[9px] uppercase tracking-[0.14em]"
          style={{ borderColor: "var(--border)", color: "var(--muted)" }}
        >
          &copy; 2026 HUE Unlimited · creative@hueunlimited.com
        </div>
      </div>
    </footer>
  );
}
