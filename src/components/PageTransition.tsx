"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { usePathname } from "next/navigation";
import { gsap } from "gsap";

export default function PageTransition({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [displayChildren, setDisplayChildren] = useState(children);
  const isFirstRender = useRef(true);

  const animateIn = useCallback(() => {
    if (!wrapperRef.current) return;
    gsap.fromTo(
      wrapperRef.current,
      { opacity: 0, y: 16 },
      { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" }
    );
  }, []);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      animateIn();
      return;
    }

    // Animate out, swap children, animate in
    if (wrapperRef.current) {
      gsap.to(wrapperRef.current, {
        opacity: 0,
        y: -12,
        duration: 0.2,
        ease: "power2.in",
        onComplete: () => {
          setDisplayChildren(children);
          window.scrollTo(0, 0);
          animateIn();
        },
      });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  // Keep children in sync for same-page updates
  useEffect(() => {
    setDisplayChildren(children);
  }, [children]);

  return (
    <div ref={wrapperRef} style={{ willChange: "opacity, transform" }}>
      {displayChildren}
    </div>
  );
}
