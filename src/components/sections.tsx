"use client";

import Image from "next/image";
import { AnimatePresence, motion, useScroll, useTransform } from "motion/react";
import { useRef, useState } from "react";
import {
  contact,
  features,
  images,
  industries,
  navLinks,
  posts,
  services,
  stats,
  testimonials,
} from "@/lib/data";
import {
  ArrowRight,
  ArrowUpRight,
  CircleArrow,
  Counter,
  Dash,
  EASE,
  Logo,
  Magnetic,
  Reveal,
  SplitHeading,
} from "./ui";

/* ---------------------------------------------------------------- Features */

function FeatureIcon({ name }: { name: (typeof features)[number]["icon"] }) {
  const common = {
    viewBox: "0 0 24 24",
    className: "size-7 transition-transform duration-700 ease-out",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };
  switch (name) {
    case "gear":
      return (
        <svg {...common} className={`${common.className} group-hover:rotate-180`}>
          <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
          <circle cx="12" cy="12" r="3" />
        </svg>
      );
    case "layers":
      return (
        <svg {...common} className={`${common.className} group-hover:-translate-y-1`}>
          <path d="m12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83Z" fill="currentColor" />
          <path d="m22 12.65-9.17 4.16a2 2 0 0 1-1.66 0L2 12.65" />
          <path d="m22 17.65-9.17 4.16a2 2 0 0 1-1.66 0L2 17.65" />
        </svg>
      );
    case "ring":
      return (
        <svg {...common} className={`${common.className} animate-[spin_6s_linear_infinite]`}>
          <path d="M12 3a9 9 0 1 1-8.5 6" strokeWidth="3" />
        </svg>
      );
    case "hands":
      return (
        <svg {...common} className={`${common.className} group-hover:-rotate-12`}>
          <path d="m11 17 2 2a1 1 0 1 0 3-3" />
          <path d="m14 14 2.5 2.5a1 1 0 1 0 3-3l-3.88-3.88a3 3 0 0 0-4.24 0l-.88.88a1 1 0 1 1-3-3l2.81-2.81a5.79 5.79 0 0 1 7.06-.87l.47.28a2 2 0 0 0 1.42.25L21 4" />
          <path d="m21 3 1 11h-2" />
          <path d="M3 3 2 14l6.5 6.5a1 1 0 1 0 3-3" />
          <path d="M3 4h8" />
        </svg>
      );
  }
}

export function Features() {
  return (
    <section id="solutions" className="relative border-y border-line">
      <div className="shell grid sm:grid-cols-2 lg:grid-cols-4">
        {features.map((f, i) => (
          <Reveal
            key={f.title}
            delay={i * 0.1}
            className="group relative py-10 sm:px-8 sm:first:pl-0 lg:py-14 [&:nth-child(odd)]:sm:pl-0 lg:[&:nth-child(odd)]:pl-8 lg:first:pl-0"
          >
            {i > 0 && (
              <motion.span
                aria-hidden
                className="absolute top-10 bottom-10 left-0 hidden w-px origin-top bg-line lg:block"
                initial={{ scaleY: 0 }}
                whileInView={{ scaleY: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, ease: EASE, delay: 0.3 + i * 0.1 }}
              />
            )}
            <span className="inline-block transition-colors duration-500 group-hover:text-brand">
              <FeatureIcon name={f.icon} />
            </span>
            <h3 className="mt-5 max-w-[10ch] text-[15px] leading-tight font-semibold">{f.title}</h3>
            <p className="mt-4 max-w-[30ch] text-[13px] leading-relaxed text-muted">{f.body}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------ Smart plants */

export function SmartPlants() {
  const imageRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: imageRef, offset: ["start end", "center center"] });
  const clip = useTransform(scrollYProgress, [0, 1], ["inset(18% 0% 18% 30%)", "inset(0% 0% 0% 0%)"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1.35, 1]);

  return (
    <section className="relative overflow-hidden pt-20 md:pt-28">
      <div className="shell grid items-center gap-10 md:grid-cols-[0.85fr_1.15fr] md:gap-12">
        <div>
          <Dash />
          <SplitHeading
            className="mt-6 text-[clamp(2.2rem,4.4vw,3.8rem)] leading-[0.98] font-semibold tracking-[-0.04em]"
            lines={[[{ t: "AI-Powered" }], [{ t: "robotics for" }], [{ t: "smart plants", accent: true }]]}
          />
          <Reveal delay={0.3}>
            <p className="mt-6 max-w-[42ch] text-[15px] leading-relaxed text-muted">
              We empower MSMEs with modular AI-driven automation &amp; robotics that improves efficiency,
              reduces costs and reworks by adapting to real factory workflows.
            </p>
          </Reveal>
        </div>

        <motion.div
          ref={imageRef}
          style={{ clipPath: clip }}
          className="relative aspect-[16/10] overflow-hidden md:-mr-[var(--gutter)]"
        >
          <motion.div className="absolute inset-0" style={{ scale }}>
            <Image
              src={images.carAssembly}
              alt="Robotic arms assembling a car body"
              fill
              sizes="(min-width: 768px) 60vw, 100vw"
              className="object-cover [filter:saturate(0.5)_contrast(1.08)]"
            />
          </motion.div>
        </motion.div>
      </div>

      <div className="shell mt-6 grid gap-5 md:mt-8 md:grid-cols-2">
        {services.map((s, i) => (
          <Reveal key={s.title[0]} delay={i * 0.12}>
            <a href="#contact" className="group relative block h-[220px] overflow-hidden bg-ink text-white md:h-[250px]">
              <div className="absolute inset-y-0 right-0 w-[65%] overflow-hidden">
                <Image
                  src={s.image}
                  alt=""
                  fill
                  sizes="(min-width: 768px) 30vw, 65vw"
                  className="object-cover grayscale transition-[transform,filter] duration-1000 ease-out group-hover:scale-110 group-hover:grayscale-0"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/50 to-transparent" />
              </div>
              <div className="relative flex h-full flex-col justify-between p-6 md:p-8">
                <h3 className="text-lg leading-snug font-medium md:text-xl">
                  {s.title[0]}
                  <br />
                  {s.title[1]}
                </h3>
                <CircleArrow dark />
              </div>
            </a>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* -------------------------------------------------------------- Industries */

export function Industries() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const marqueeX = useTransform(scrollYProgress, [0, 1], ["5%", "-35%"]);
  const names = industries.map((i) => i.name);

  return (
    <section id="industries" ref={ref} className="relative overflow-hidden pt-16 pb-20 md:pt-24 md:pb-28">
      <motion.div
        aria-hidden
        style={{ x: marqueeX }}
        className="pointer-events-none flex gap-10 text-[clamp(4rem,11vw,10rem)] leading-none font-semibold tracking-[-0.05em] whitespace-nowrap text-ink/[0.05] select-none"
      >
        {[...names, ...names].map((n, i) => (
          <span key={i} className="flex items-center gap-10">
            {n}
            <span className="inline-block size-[0.25em] rounded-full bg-brand/40" />
          </span>
        ))}
      </motion.div>

      <div className="shell -mt-6 md:-mt-12">
        <Dash />
        <SplitHeading
          className="mt-5 text-[clamp(1.5rem,2.4vw,2rem)] font-semibold tracking-[-0.03em]"
          lines={[[{ t: "Industry Focus Area" }]]}
        />
        <Reveal delay={0.2}>
          <p className="mt-2 text-sm text-muted">MIVA enables intelligent automation across industries.</p>
        </Reveal>

        <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {industries.map((ind, i) => (
            <motion.a
              key={ind.name}
              href="#contact"
              className="group block"
              initial={{ clipPath: "inset(100% 0% 0% 0%)" }}
              whileInView={{ clipPath: "inset(0% 0% 0% 0%)" }}
              viewport={{ once: true, margin: "0px 0px -10% 0px" }}
              transition={{ duration: 1.1, ease: [0.76, 0, 0.24, 1], delay: i * 0.08 }}
            >
              <div className="relative aspect-[4/3.4] overflow-hidden bg-paper-2">
                <Image
                  src={ind.image}
                  alt={ind.name}
                  fill
                  sizes="(min-width: 1024px) 16vw, (min-width: 640px) 33vw, 50vw"
                  className="object-cover grayscale-[0.85] transition-[transform,filter] duration-1000 ease-out group-hover:scale-110 group-hover:grayscale-0"
                />
                <span className="absolute inset-x-0 bottom-0 h-[3px] origin-left scale-x-0 bg-brand transition-transform duration-700 group-hover:scale-x-100" />
              </div>
              <div className="mt-3 flex items-center justify-between text-[13px] font-semibold">
                {ind.name}
                <ArrowRight className="size-3 -translate-x-2 text-brand opacity-0 transition-all duration-500 group-hover:translate-x-0 group-hover:opacity-100" />
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------- Stats */

export function Stats() {
  return (
    <section id="about" className="border-y border-line">
      <div className="shell grid gap-10 py-16 md:grid-cols-[0.75fr_auto_2fr] md:gap-12 md:py-20">
        <SplitHeading
          className="text-[clamp(1.9rem,3vw,2.6rem)] leading-[1] font-semibold tracking-[-0.035em]"
          lines={[
            [{ t: "The hundred" }],
            [{ t: "of completed" }],
            [{ t: "works" }, { t: "still", accent: true }],
            [{ t: "counting", accent: true }],
          ]}
        />
        <motion.span
          aria-hidden
          className="hidden w-px origin-top bg-line md:block"
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: EASE }}
        />
        <div>
          <Reveal>
            <p className="max-w-[62ch] text-[14px] leading-relaxed text-muted">
              Built on deep engineering expertise, patented innovation, and real-world industrial experience,
              MIVA ROBOTICS combines strong technical foundations with practical execution. Our team brings
              years of hands-on experience across robotics, AI, vision systems, industrial automation, and
              finance management.
            </p>
          </Reveal>
          <div className="mt-10 grid grid-cols-2 gap-y-8 lg:grid-cols-4">
            {stats.map((s, i) => (
              <Reveal key={s.label} delay={0.1 + i * 0.1} className={`pr-4 ${i > 0 ? "lg:border-l lg:border-line lg:pl-6" : ""} ${i % 2 ? "border-l border-line pl-6 lg:pl-6" : ""}`}>
                <div className="text-[clamp(1.6rem,2.4vw,2.2rem)] font-semibold tracking-[-0.03em]">
                  <Counter to={s.value} pad={s.pad} />
                </div>
                <p className="mt-2 max-w-[16ch] text-xs leading-snug text-muted">{s.label}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------ Testimonials */

export function Testimonials() {
  const [[index, dir], setState] = useState<[number, number]>([0, 1]);
  const t = testimonials[index];
  const go = (d: number) => setState(([i]) => [(i + d + testimonials.length) % testimonials.length, d]);

  return (
    <section id="case-studies" className="border-b border-line">
      <div className="shell grid items-center gap-8 py-16 md:grid-cols-[0.6fr_1.2fr_1.6fr_auto] md:gap-10 md:py-20">
        <div className="self-start">
          <Dash />
          <SplitHeading
            className="mt-5 text-[clamp(1.5rem,2.4vw,2rem)] font-semibold tracking-[-0.03em]"
            lines={[[{ t: "Testimonials" }]]}
          />
        </div>

        <Reveal className="relative aspect-[16/9] overflow-hidden bg-paper-2">
          <AnimatePresence initial={false} custom={dir}>
            <motion.div
              key={index}
              custom={dir}
              className="absolute inset-0"
              initial={{ clipPath: dir > 0 ? "inset(0% 0% 0% 100%)" : "inset(0% 100% 0% 0%)" }}
              animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
              transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
            >
              <Image src={t.image} alt="" fill sizes="(min-width: 768px) 30vw, 100vw" className="object-cover grayscale-[0.7]" />
            </motion.div>
          </AnimatePresence>
        </Reveal>

        <div className="relative min-h-[190px]">
          <span className="font-serif text-6xl leading-none text-muted/60">&ldquo;</span>
          <AnimatePresence mode="wait" initial={false}>
            <motion.blockquote
              key={index}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -24 }}
              transition={{ duration: 0.5, ease: EASE }}
            >
              <p className="-mt-6 text-[15px] leading-relaxed md:text-base">{t.quote}</p>
              <footer className="mt-5 text-sm">
                <span className="font-semibold">{t.name}</span>
                <span className="text-muted"> — {t.company}</span>
              </footer>
            </motion.blockquote>
          </AnimatePresence>
        </div>

        <div className="flex items-center gap-3 md:h-full md:border-l md:border-line md:pl-10">
          <button
            type="button"
            onClick={() => go(-1)}
            aria-label="Previous testimonial"
            className="grid size-10 place-items-center rounded-full border border-ink/40 transition-colors hover:border-ink hover:bg-ink hover:text-paper"
          >
            <ArrowRight className="size-3 rotate-180" />
          </button>
          <button
            type="button"
            onClick={() => go(1)}
            aria-label="Next testimonial"
            className="grid size-10 place-items-center rounded-full bg-brand text-white transition-colors hover:bg-brand-dark"
          >
            <ArrowRight className="size-3" />
          </button>
          <span className="ml-2 text-xs text-muted tabular-nums">
            0{index + 1} / 0{testimonials.length}
          </span>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------- Posts */

export function Posts() {
  return (
    <section className="py-16 md:py-20">
      <div className="shell">
        <div className="flex items-end justify-between">
          <SplitHeading
            className="text-[clamp(1.5rem,2.4vw,2rem)] font-semibold tracking-[-0.03em]"
            lines={[[{ t: "Latest Posts" }]]}
          />
          <a href="https://mivarobotics.ai/category/blogs/" className="group flex items-center gap-2 border-b border-ink/40 pb-1 text-[13px]">
            View all <ArrowUpRight className="size-3 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </a>
        </div>
        <div className="mt-6 grid gap-8 md:grid-cols-3 md:gap-5">
          {posts.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.12}>
              <a href={p.href} className="group block">
                <div className="relative aspect-[16/9] overflow-hidden bg-paper-2">
                  <Image
                    src={p.image}
                    alt=""
                    fill
                    sizes="(min-width: 768px) 33vw, 100vw"
                    className="object-cover grayscale-[0.6] transition-[transform,filter] duration-1000 ease-out group-hover:scale-110 group-hover:grayscale-0"
                  />
                  <span className="absolute top-3 left-3 bg-paper/90 px-2 py-1 text-[10px] tracking-[0.14em] uppercase backdrop-blur">
                    {p.tag}
                  </span>
                </div>
                <div className="mt-4 flex items-start justify-between gap-6">
                  <h3 className="max-w-[30ch] text-[14px] leading-snug font-semibold transition-colors group-hover:text-brand">
                    {p.title}
                  </h3>
                  <CircleArrow />
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* --------------------------------------------------------------------- CTA */

export function Cta() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-12%", "12%"]);

  return (
    <section id="contact" ref={ref} className="relative overflow-hidden bg-ink text-white">
      <motion.div className="absolute inset-y-0 right-0 w-full md:w-[60%]" style={{ y }}>
        <div className="absolute -inset-y-[15%] inset-x-0">
          <Image
            src={images.roboticLine}
            alt=""
            fill
            sizes="(min-width: 768px) 60vw, 100vw"
            className="object-cover [filter:saturate(0.5)_brightness(0.7)]"
          />
        </div>
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/85 to-ink/10" />

      <div className="shell relative py-20 md:py-28">
        <div className="flex items-center gap-3">
          <Dash />
          <span className="text-[10px] tracking-[0.18em] text-white/50 uppercase">Get in touch</span>
        </div>
        <div className="mt-6 flex flex-col gap-10 md:flex-row md:items-end md:gap-16">
          <SplitHeading
            stagger={0.03}
            className="max-w-[24ch] text-[clamp(1.6rem,2.8vw,2.5rem)] leading-[1.12] font-medium tracking-[-0.03em]"
            lines={[
              [{ t: "We help our clients improve productivity, safety, and efficiency through intelligent automation" }],
              [{ t: "and robotics that is accessible, affordable, and adaptable.", accent: true }],
            ]}
          />
          <Reveal delay={0.4} className="shrink-0">
            <Magnetic>
              <a
                href={`mailto:${contact.email}`}
                className="group relative flex items-center gap-4 overflow-hidden bg-brand px-7 py-4 text-sm font-medium"
              >
                <span className="absolute inset-0 translate-y-full bg-white transition-transform duration-500 ease-out group-hover:translate-y-0" />
                <span className="relative transition-colors duration-500 group-hover:text-ink">Contact Us</span>
                <ArrowUpRight className="relative size-3 transition-colors duration-500 group-hover:text-ink" />
              </a>
            </Magnetic>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ Footer */

export function Footer() {
  return (
    <footer className="overflow-hidden bg-ink text-white">
      <div className="shell flex flex-wrap items-center justify-between gap-8 border-t border-white/10 py-8">
        <div className="flex items-center gap-10">
          <Logo className="text-white" />
          <span className="hidden h-10 w-px bg-white/15 md:block" />
        </div>
        <nav className="flex flex-wrap gap-x-10 gap-y-3 text-[13px] text-white/70">
          {navLinks.map((l) => (
            <a key={l.href} href={l.href} className="transition-colors hover:text-white">
              {l.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-6">
          <a href="#contact" className="group flex items-center gap-6 border-b border-white/50 pb-1 text-[13px]">
            Contact Us <ArrowUpRight className="size-3 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </a>
          <a href="#top" aria-label="Back to top" className="grid size-11 place-items-center rounded-full bg-white text-ink transition-colors hover:bg-brand hover:text-white">
            <ArrowRight className="size-3 -rotate-90" />
          </a>
        </div>
      </div>

      <div className="shell overflow-hidden">
        <motion.p
          aria-hidden
          className="-mb-[0.18em] text-center font-serif text-[30vw] leading-none font-semibold tracking-[0.04em] text-white/[0.06] select-none md:text-[24vw]"
          initial={{ y: "60%" }}
          whileInView={{ y: "0%" }}
          viewport={{ once: true }}
          transition={{ duration: 1.4, ease: EASE }}
        >
          MIVA
        </motion.p>
      </div>
      <div className="shell flex justify-between border-t border-white/10 py-5 text-xs text-white/40">
        <span>© 2026 MIVA ROBOTICS | All Rights Reserved</span>
        <span className="flex gap-6">
          <a href={`tel:${contact.phone}`} className="hover:text-white">{contact.phone}</a>
          <a href={`mailto:${contact.email}`} className="hover:text-white">{contact.email}</a>
        </span>
      </div>
    </footer>
  );
}
