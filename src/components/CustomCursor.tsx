"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: 0, y: 0 });
  const visible = useRef(false);

  useEffect(() => {
    const dot = dotRef.current;
    if (!dot) return;

    // Only enable on non-touch devices
    const mq = window.matchMedia("(pointer: fine)");
    if (!mq.matches) {
      dot.style.display = "none";
      return;
    }

    // Hide default cursor globally
    document.documentElement.style.cursor = "none";

    const moveCursor = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY };
      if (!visible.current) {
        visible.current = true;
        gsap.set(dot, { opacity: 1 });
      }
    };

    const tick = () => {
      gsap.set(dot, {
        x: pos.current.x,
        y: pos.current.y,
        xPercent: -50,
        yPercent: -50,
      });
    };

    // Hover grow effect on interactive elements
    const interactiveSelector =
      'a, button, [role="button"], .work-card, input, textarea, [data-cursor-grow]';

    const onEnterInteractive = () => {
      gsap.to(dot, {
        width: 48,
        height: 48,
        duration: 0.25,
        ease: "power2.out",
      });
    };

    const onLeaveInteractive = () => {
      gsap.to(dot, {
        width: 12,
        height: 12,
        duration: 0.25,
        ease: "power2.out",
      });
    };

    const addListeners = () => {
      document.querySelectorAll(interactiveSelector).forEach((el) => {
        el.addEventListener("mouseenter", onEnterInteractive);
        el.addEventListener("mouseleave", onLeaveInteractive);
        (el as HTMLElement).style.cursor = "none";
      });
    };

    // Observe DOM changes to catch dynamically added elements
    const observer = new MutationObserver(() => {
      addListeners();
    });
    observer.observe(document.body, { childList: true, subtree: true });

    window.addEventListener("mousemove", moveCursor);
    gsap.ticker.add(tick);
    addListeners();

    const onLeaveWindow = () => {
      gsap.set(dot, { opacity: 0 });
      visible.current = false;
    };
    const onEnterWindow = () => {
      gsap.set(dot, { opacity: 1 });
      visible.current = true;
    };
    document.addEventListener("mouseleave", onLeaveWindow);
    document.addEventListener("mouseenter", onEnterWindow);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      gsap.ticker.remove(tick);
      document.removeEventListener("mouseleave", onLeaveWindow);
      document.removeEventListener("mouseenter", onEnterWindow);
      observer.disconnect();
      document.documentElement.style.cursor = "";
      document.querySelectorAll(interactiveSelector).forEach((el) => {
        el.removeEventListener("mouseenter", onEnterInteractive);
        el.removeEventListener("mouseleave", onLeaveInteractive);
        (el as HTMLElement).style.cursor = "";
      });
    };
  }, []);

  return (
    <div
      ref={dotRef}
      className="pointer-events-none fixed left-0 top-0 z-[10000] rounded-full"
      style={{
        width: 12,
        height: 12,
        background: "#ffff00",
        mixBlendMode: "exclusion",
        opacity: 0,
        willChange: "transform",
      }}
      aria-hidden="true"
    />
  );
}
