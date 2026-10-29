"use client";

import { useLenis } from "lenis/react";
import {
  AnimatePresence,
  animate,
  motion,
  useMotionValueEvent,
  useScroll,
} from "motion/react";
import { useEffect, useState } from "react";
import { contact, navLinks } from "@/lib/data";
import { useIntro } from "./providers";
import { ArrowUpRight, EASE, Logo } from "./ui";

export function Preloader() {
  const { done, setDone } = useIntro();
  const lenis = useLenis();
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!lenis) return;
    if (done) lenis.start();
    else lenis.stop();
  }, [lenis, done]);

  useEffect(() => {
    const controls = animate(0, 100, {
      duration: 2,
      ease: [0.65, 0, 0.35, 1],
      onUpdate: (v) => setCount(Math.round(v)),
      onComplete: () => setDone(true),
    });
    return () => controls.stop();
  }, [setDone]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          key="accent"
          className="fixed inset-0 z-[98] bg-brand"
          exit={{ y: "-100%" }}
          transition={{ duration: 1, ease: [0.76, 0, 0.24, 1], delay: 0.15 }}
        />
      )}
      {!done && (
        <motion.div
          key="loader"
          className="fixed inset-0 z-[99] flex flex-col justify-between bg-ink p-[var(--gutter)] text-paper"
          exit={{ y: "-100%" }}
          transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
        >
          <div className="flex justify-between text-[11px] tracking-[0.2em] text-white/50 uppercase">
            <span>Miva Robotics</span>
            <span>Booting systems</span>
          </div>

          <motion.div
            className="mx-auto scale-[2.2]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: EASE }}
          >
            <Logo />
          </motion.div>

          <div>
            <div className="flex items-end justify-between">
              <p className="max-w-[16rem] text-sm text-white/60">
                Accessible, adaptable, affordable automation for every scale.
              </p>
              <span className="text-[clamp(4rem,12vw,10rem)] leading-[0.8] font-semibold tracking-tighter tabular-nums">
                {String(count).padStart(3, "0")}
              </span>
            </div>
            <div className="mt-6 h-px bg-white/15">
              <div className="h-px origin-left bg-brand" style={{ transform: `scaleX(${count / 100})` }} />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function Header() {
  const { done } = useIntro();
  const lenis = useLenis();
  const { scrollY, scrollYProgress } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setHidden(y > prev && y > 240);
    setScrolled(y > 40);
  });

  useEffect(() => {
    if (!done || !lenis) return;
    if (open) lenis.stop();
    else lenis.start();
  }, [open, done, lenis]);

  const go = (href: string) => {
    setOpen(false);
    lenis?.start();
    lenis?.scrollTo(href, { duration: 1.6 });
  };

  return (
    <>
      <motion.header
        className="fixed inset-x-0 top-0 z-50"
        initial={{ y: "-100%" }}
        animate={{ y: !done || (hidden && !open) ? "-100%" : "0%" }}
        transition={{ duration: 0.7, ease: EASE, delay: done && !scrolled ? 0.6 : 0 }}
      >
        <div
          className={`relative transition-[background-color,backdrop-filter] duration-500 ${
            scrolled && !open ? "bg-paper/75 backdrop-blur-md" : ""
          }`}
        >
          <div className="shell flex h-20 items-center justify-between">
            <Logo className={open ? "text-paper" : "text-ink"} />

            <nav className={`hidden gap-10 text-[13px] transition-opacity md:flex ${open ? "opacity-0" : ""}`}>
              {navLinks.map((l) => (
                <a key={l.href} href={l.href} className="group relative py-1">
                  {l.label}
                  <span className="absolute inset-x-0 -bottom-0.5 h-px origin-right scale-x-0 bg-brand transition-transform duration-500 group-hover:origin-left group-hover:scale-x-100" />
                </a>
              ))}
            </nav>

            <div className="flex items-center gap-6">
              <a
                href="#contact"
                className={`group hidden items-center gap-6 border-b pb-1 text-[13px] transition-colors sm:flex ${
                  open ? "border-paper/40 text-paper" : "border-ink/50"
                }`}
              >
                Contact Us
                <ArrowUpRight className="size-3 transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
              <button
                type="button"
                onClick={() => setOpen((o) => !o)}
                aria-label={open ? "Close menu" : "Open menu"}
                aria-expanded={open}
                className={`relative grid size-11 place-items-center rounded-full transition-colors duration-500 ${
                  open ? "bg-brand" : "bg-ink"
                }`}
              >
                <motion.span
                  className="absolute h-[1.5px] w-4 bg-paper"
                  animate={open ? { rotate: 45, y: 0 } : { rotate: 0, y: -3 }}
                  transition={{ duration: 0.4, ease: EASE }}
                />
                <motion.span
                  className="absolute h-[1.5px] w-4 bg-paper"
                  animate={open ? { rotate: -45, y: 0 } : { rotate: 0, y: 3 }}
                  transition={{ duration: 0.4, ease: EASE }}
                />
              </button>
            </div>
          </div>
          <motion.div
            className="absolute inset-x-0 bottom-0 h-[2px] origin-left bg-brand"
            style={{ scaleX: scrollYProgress }}
          />
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-40 bg-ink text-paper"
            initial={{ clipPath: "circle(0% at 94% 40px)" }}
            animate={{ clipPath: "circle(150% at 94% 40px)" }}
            exit={{ clipPath: "circle(0% at 94% 40px)" }}
            transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
          >
            <div className="shell flex h-full flex-col justify-between pt-32 pb-10">
              <nav className="flex flex-col">
                {[...navLinks, { label: "Contact", href: "#contact" }].map((l, i) => (
                  <div key={l.href} className="overflow-hidden border-b border-white/10">
                    <motion.a
                      href={l.href}
                      onClick={(e) => {
                        e.preventDefault();
                        go(l.href);
                      }}
                      className="group flex items-baseline gap-5 py-2 text-[clamp(2.2rem,6vw,5rem)] leading-[1.05] font-semibold tracking-[-0.03em]"
                      initial={{ y: "100%" }}
                      animate={{ y: "0%" }}
                      exit={{ y: "100%" }}
                      transition={{ duration: 0.8, ease: EASE, delay: 0.25 + i * 0.06 }}
                    >
                      <span className="text-xs font-normal tracking-normal text-white/40">0{i + 1}</span>
                      <span className="transition-[color,transform] duration-500 group-hover:translate-x-4 group-hover:text-brand">
                        {l.label}
                      </span>
                    </motion.a>
                  </div>
                ))}
              </nav>
              <motion.div
                className="flex flex-wrap justify-between gap-4 text-sm text-white/50"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: { delay: 0.7 } }}
                exit={{ opacity: 0 }}
              >
                <a href={`mailto:${contact.email}`}>{contact.email}</a>
                <a href={`tel:${contact.phone}`}>{contact.phone}</a>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
