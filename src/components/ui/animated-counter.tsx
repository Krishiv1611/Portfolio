"use client";

import { animate } from "animejs";
import { useEffect, useRef, useState } from "react";

type AnimatedCounterProps = {
  value: number;
  suffix?: string;
  duration?: number;
};

export function AnimatedCounter({ value, suffix = "", duration = 1.2 }: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const frame = window.requestAnimationFrame(() => setDisplay(value));
      return () => window.cancelAnimationFrame(frame);
    }

    let control: ReturnType<typeof animate> | null = null;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;

        const state = { value: 0 };
        control = animate(state, {
          value,
          duration: duration * 1000,
          ease: "outExpo",
          onUpdate: () => setDisplay(Math.round(state.value))
        });
        observer.disconnect();
      },
      { rootMargin: "0px 0px -80px" }
    );

    observer.observe(element);
    return () => {
      observer.disconnect();
      control?.revert();
    };
  }, [duration, value]);

  return (
    <span ref={ref}>
      {display.toLocaleString()}
      {suffix}
    </span>
  );
}
