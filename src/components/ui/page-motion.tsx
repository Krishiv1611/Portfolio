"use client";

import { animate, set } from "animejs";
import { useEffect } from "react";

export function PageMotion() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const revealElements = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    const separators = Array.from(document.querySelectorAll<HTMLElement>("[data-separator]"));
    const controls: Array<ReturnType<typeof animate>> = [];

    set(revealElements, { translateY: 18 });
    set(separators, { scaleX: 0 });

    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          controls.push(
            animate(entry.target, {
              translateY: 0,
              duration: 760,
              ease: "outExpo"
            })
          );
          revealObserver.unobserve(entry.target);
        });
      },
      { rootMargin: "0px 0px -8%", threshold: 0.01 }
    );

    const separatorObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          controls.push(
            animate(entry.target, {
              scaleX: 1,
              duration: 900,
              ease: "outExpo"
            })
          );
          separatorObserver.unobserve(entry.target);
        });
      },
      { rootMargin: "0px 0px -4%", threshold: 0.01 }
    );

    revealElements.forEach((element) => revealObserver.observe(element));
    separators.forEach((element) => separatorObserver.observe(element));

    return () => {
      revealObserver.disconnect();
      separatorObserver.disconnect();
      controls.forEach((control) => control.revert());
    };
  }, []);

  return null;
}
