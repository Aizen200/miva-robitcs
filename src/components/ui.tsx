"use client";

import {
  animate,
  motion,
  useInView,
  useSpring,
  type HTMLMotionProps,
} from "motion/react";
import { Fragment, useEffect, useRef, useState, type ReactNode } from "react";

export const EASE = [0.16, 1, 0.3, 1] as const;

export function Logo({ className = "" }: { className?: string }) {
  return (
    <a
      href="#top"
      aria-label="MIVA home"
      className={`flex flex-col items-center leading-none transition-colors ${className}`}
    >
      <svg viewBox="0 0 44 38" className="h-7 w-auto" fill="currentColor" aria-hidden>
        <path d="M2 37 14.5 2H16L4 37Z" />
        <path d="M14 2h4l12 35h-5Z" />
        <path d="M16 37 28.5 2H30L18 37Z" />
        <path d="M28 2h4l12 35h-5Z" />
        <rect x="0" y="36" width="7" height="1.4" />
        <rect x="23" y="36" width="9" height="1.4" />
        <rect x="37" y="36" width="7" height="1.4" />
      </svg>
      <span className="mt-1 pl-[0.32em] font-serif text-[11px] font-semibold tracking-[0.32em]">
        MIVA
      </span>
    </a>
  );
}

export function ArrowUpRight({ className = "size-3" }: { className?: string }) {
  return (
    <svg viewBox="0 0 12 12" className={className} fill="none" stroke="currentColor" strokeWidth="1.3" aria-hidden>
      <path d="M3 9 9 3M4 3h5v5" />
    </svg>
  );
}

export function ArrowRight({ className = "size-3" }: { className?: string }) {
  return (
    <svg viewBox="0 0 12 12" className={className} fill="none" stroke="currentColor" strokeWidth="1.3" aria-hidden>
      <path d="M2 6h8M6.5 2.5 10 6 6.5 9.5" />
    </svg>
  );
}

/** Round outlined arrow button; parent needs `group` for the hover state. */
export function CircleArrow({ dark = false }: { dark?: boolean }) {
  return (
    <span
      className={`relative grid size-9 shrink-0 place-items-center overflow-hidden rounded-full border transition-colors duration-500 group-hover:border-brand group-hover:text-white ${
        dark ? "border-white/60 text-white" : "border-ink/40 text-ink"
      }`}
    >
      <span className="absolute inset-0 scale-0 rounded-full bg-brand transition-transform duration-500 ease-out group-hover:scale-100" />
      <ArrowRight className="relative size-3 transition-transform duration-500 group-hover:-rotate-45" />
    </span>
  );
}

export function Dash({ className = "" }: { className?: string }) {
  return (
    <motion.span
      aria-hidden
      className={`block h-[3px] w-7 origin-left bg-brand ${className}`}
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: EASE }}
    />
  );
}

export function Eyebrow({ children, play }: { children: ReactNode; play?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });
  const active = play ?? inView;
  return (
    <div ref={ref} className="flex items-center gap-3">
      <motion.span
        className="block h-[2px] w-6 origin-left bg-brand"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: active ? 1 : 0 }}
        transition={{ duration: 0.8, ease: EASE }}
      />
      <motion.span
        className="text-[10px] font-medium tracking-[0.18em] text-ink/70 uppercase"
        initial={{ opacity: 0, x: -10 }}
        animate={active ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
        transition={{ duration: 0.8, ease: EASE, delay: 0.2 }}
      >
        {children}
      </motion.span>
    </div>
  );
}

export type Seg = { t: string; accent?: boolean };

/** Heading whose words slide up from behind a mask, one after another. */
export function SplitHeading({
  lines,
  play,
  delay = 0,
  stagger = 0.06,
  className = "",
  as: Tag = "h2",
}: {
  lines: Seg[][];
  play?: boolean;
  delay?: number;
  stagger?: number;
  className?: string;
  as?: "h1" | "h2" | "h3";
}) {
  const ref = useRef<HTMLHeadingElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -12% 0px" });
  const active = play ?? inView;
  let index = 0;

  return (
    <Tag ref={ref} className={className}>
      {lines.map((line, li) => (
        <span key={li} className="block">
          {line.map((seg, si) =>
            seg.t
              .split(" ")
              .filter(Boolean)
              .map((word, wi) => {
                const i = index++;
                return (
                  <Fragment key={`${si}-${wi}`}>
                    <span className="-mb-[0.12em] inline-block overflow-hidden pb-[0.12em] align-bottom">
                      <motion.span
                        className={`inline-block ${seg.accent ? "text-brand" : ""}`}
                        initial={{ y: "115%" }}
                        animate={{ y: active ? "0%" : "115%" }}
                        transition={{ duration: 1.1, ease: EASE, delay: delay + i * stagger }}
                      >
                        {word}
                      </motion.span>
                    </span>{" "}
                  </Fragment>
                );
              }),
          )}
        </span>
      ))}
    </Tag>
  );
}

export function Reveal({
  children,
  delay = 0,
  y = 36,
  className,
  ...rest
}: { children: ReactNode; delay?: number; y?: number } & HTMLMotionProps<"div">) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: 0.9, ease: EASE, delay }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

/** Pulls its child toward the pointer while hovered. */
export function Magnetic({ children, strength = 0.35 }: { children: ReactNode; strength?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useSpring(0, { stiffness: 220, damping: 15, mass: 0.4 });
  const y = useSpring(0, { stiffness: 220, damping: 15, mass: 0.4 });

  return (
    <motion.div
      ref={ref}
      className="inline-block"
      style={{ x, y }}
      onPointerMove={(e) => {
        const r = ref.current!.getBoundingClientRect();
        x.set((e.clientX - r.left - r.width / 2) * strength);
        y.set((e.clientY - r.top - r.height / 2) * strength);
      }}
      onPointerLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      {children}
    </motion.div>
  );
}

export function Counter({ to, pad = 0, suffix = "+" }: { to: number; pad?: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, to, {
      duration: 2.2,
      ease: EASE,
      onUpdate: (v) => setValue(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, to]);

  return (
    <span ref={ref} className="tabular-nums">
      {String(value).padStart(pad, "0")}
      {suffix}
    </span>
  );
}
