"use client";

import { useEffect } from "react";

/**
 * Adds IntersectionObserver-based scroll reveals.
 * Any element with class `reveal` will get `visible` added
 * when it enters the viewport.
 */
export function useScrollReveal() {
  useEffect(() => {
    const elements = document.querySelectorAll(".reveal");
    if (!elements.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );

    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);
}
