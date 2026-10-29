"use client";

import Image from "next/image";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import { useEffect, useRef, useState } from "react";
import { heroSlides } from "@/lib/data";
import { useIntro } from "./providers";
import { EASE, Eyebrow, SplitHeading } from "./ui";

const SLIDE_MS = 6000;

export function Hero() {
  const { done } = useIntro();
  const ref = useRef<HTMLElement>(null);
  const [slide, setSlide] = useState(0);

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.18]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "-60%"]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const mx = useSpring(px, { stiffness: 50, damping: 20 });
  const my = useSpring(py, { stiffness: 50, damping: 20 });

  useEffect(() => {
    if (!done) return;
    const id = setInterval(() => setSlide((s) => (s + 1) % heroSlides.length), SLIDE_MS);
    return () => clearInterval(id);
  }, [done, slide]);

  return (
    <section
      id="top"
      ref={ref}
      className="relative h-[100svh] min-h-[620px] overflow-hidden"
      onPointerMove={(e) => {
        px.set((e.clientX / window.innerWidth - 0.5) * -24);
        py.set((e.clientY / window.innerHeight - 0.5) * -16);
      }}
    >
      {/* Image stage */}
      <motion.div className="absolute inset-y-0 right-0 w-full md:w-[70%]" style={{ y: imageY }}>
        <motion.div
          className="absolute inset-0 overflow-hidden"
          initial={{ clipPath: "inset(0% 0% 0% 100%)" }}
          animate={{ clipPath: done ? "inset(0% 0% 0% 0%)" : "inset(0% 0% 0% 100%)" }}
          transition={{ duration: 1.6, ease: [0.76, 0, 0.24, 1], delay: 0.1 }}
        >
          <motion.div className="absolute -inset-8" style={{ scale: imageScale, x: mx, y: my }}>
            <AnimatePresence initial={false}>
              <motion.div
                key={slide}
                className="absolute inset-0"
                initial={{ opacity: 0, scale: 1.12 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ opacity: { duration: 1.2 }, scale: { duration: SLIDE_MS / 1000 + 1.2, ease: "linear" } }}
              >
                <Image
                  src={heroSlides[slide]}
                  alt="Robotic arms on an automated production line"
                  fill
                  priority
                  sizes="(min-width: 768px) 70vw, 100vw"
                  className="object-cover [filter:saturate(0.45)_contrast(1.08)]"
                />
              </motion.div>
            </AnimatePresence>
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-r from-paper via-paper/70 to-transparent md:via-paper/40 md:via-20% md:to-55%" />
          <div className="absolute inset-0 bg-gradient-to-t from-paper/80 to-transparent to-30% md:hidden" />
        </motion.div>
      </motion.div>

      {/* Orange rail with slide indicators */}
      <motion.div
        className="absolute inset-y-0 right-0 z-10 hidden w-[6%] max-w-24 min-w-14 origin-top bg-brand/85 mix-blend-multiply md:block"
        initial={{ scaleY: 0 }}
        animate={{ scaleY: done ? 1 : 0 }}
        transition={{ duration: 1.2, ease: EASE, delay: 0.9 }}
      />
      <motion.div
        className="absolute right-0 bottom-[18%] z-20 hidden w-[6%] max-w-24 min-w-14 flex-col items-center gap-5 md:flex"
        initial={{ opacity: 0 }}
        animate={{ opacity: done ? 1 : 0 }}
        transition={{ delay: 1.6 }}
      >
        {heroSlides.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setSlide(i)}
            aria-label={`Show slide ${i + 1}`}
            className={`flex flex-col items-center gap-2 text-[11px] transition-colors ${
              i === slide ? "text-white" : "text-white/55 hover:text-white"
            }`}
          >
            0{i + 1}
            <span className="relative block h-8 w-px bg-white/30">
              {i === slide && done && (
                <motion.span
                  key={slide}
                  className="absolute inset-0 origin-top bg-white"
                  initial={{ scaleY: 0 }}
                  animate={{ scaleY: 1 }}
                  transition={{ duration: SLIDE_MS / 1000, ease: "linear" }}
                />
              )}
            </span>
          </button>
        ))}
      </motion.div>

      {/* Copy */}
      <motion.div
        className="shell relative z-10 flex h-full flex-col justify-center pt-16"
        style={{ y: textY, opacity: textOpacity }}
      >
        <Eyebrow play={done}>Introducing Miva Robotics</Eyebrow>
        <SplitHeading
          as="h1"
          play={done}
          delay={0.35}
          stagger={0.07}
          className="mt-6 max-w-[12ch] text-[clamp(2.7rem,6.4vw,6rem)] leading-[0.95] font-semibold tracking-[-0.04em] md:max-w-none"
          lines={[
            [{ t: "Accessible," }],
            [{ t: "Adaptable, Affordable" }],
            [{ t: "automation" }, { t: "for", accent: true }],
            [{ t: "every scale.", accent: true }],
          ]}
        />
      </motion.div>

      {/* Scroll cue */}
      <motion.div
        className="absolute bottom-8 left-[var(--gutter)] z-10 flex items-center gap-3 text-[11px] tracking-[0.2em] text-ink/60 uppercase"
        initial={{ opacity: 0 }}
        animate={{ opacity: done ? 1 : 0 }}
        transition={{ delay: 1.8 }}
      >
        <span className="relative block h-10 w-px overflow-hidden bg-ink/15">
          <motion.span
            className="absolute inset-x-0 top-0 h-1/2 bg-brand"
            animate={{ y: ["-100%", "200%"] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          />
        </span>
        Scroll to explore
      </motion.div>
    </section>
  );
}
