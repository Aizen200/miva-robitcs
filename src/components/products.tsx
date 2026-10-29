"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { products } from "@/lib/data";
import { ProductArt } from "./product-art";
import { Dash, SplitHeading } from "./ui";

/** Vertical scroll drives a horizontal track while the section is pinned. */
export function Products() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [distance, setDistance] = useState(0);

  useEffect(() => {
    const track = trackRef.current!;
    const measure = () => setDistance(Math.max(0, track.scrollWidth - window.innerWidth));
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(track);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end end"] });
  const x = useTransform(scrollYProgress, (v) => -v * distance);
  const [active, setActive] = useState(1);
  useEffect(
    () => scrollYProgress.on("change", (v) => setActive(Math.min(products.length, Math.floor(v * products.length) + 1))),
    [scrollYProgress],
  );

  return (
    <section id="technology" ref={sectionRef} style={{ height: `calc(100svh + ${distance}px)` }} className="relative">
      <div className="sticky top-0 flex h-[100svh] flex-col justify-center overflow-hidden">
        <div className="shell mb-10 flex items-end justify-between gap-6">
          <div>
            <Dash />
            <SplitHeading
              className="mt-5 text-[clamp(2rem,4vw,3.4rem)] leading-none font-semibold tracking-[-0.035em]"
              lines={[[{ t: "The MIVA" }, { t: "ecosystem", accent: true }]]}
            />
          </div>
          <div className="flex items-baseline gap-1 text-sm tabular-nums">
            <span className="text-2xl font-semibold">0{active}</span>
            <span className="text-muted">/ 0{products.length}</span>
          </div>
        </div>

        <motion.div
          ref={trackRef}
          style={{ x, paddingLeft: "max(var(--gutter), calc((100vw - 1440px) / 2 + var(--gutter)))" }}
          className="flex w-max gap-4 pr-[var(--gutter)] md:gap-6"
        >
          {products.map((p, i) => (
            <motion.article
              key={p.name}
              className="group w-[72vw] sm:w-[44vw] lg:w-[27vw] lg:max-w-[400px]"
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: i * 0.08 }}
            >
              <div className="relative aspect-[4/4.2] overflow-hidden bg-paper-2 transition-colors duration-700 group-hover:bg-[#dcd7cf]">
                <ProductArt
                  kind={p.art}
                  className="absolute inset-[12%] transition-transform duration-700 ease-out group-hover:scale-110"
                />
                <span className="absolute inset-x-0 bottom-0 h-[3px] origin-left scale-x-0 bg-brand transition-transform duration-700 group-hover:scale-x-100" />
              </div>
              <h3 className="mt-4 text-[13px] font-bold tracking-[0.06em]">{p.name}</h3>
              <p className="mt-1.5 max-w-[34ch] text-sm leading-relaxed text-muted">{p.body}</p>
            </motion.article>
          ))}
        </motion.div>

        <div className="shell mt-10">
          <div className="h-px bg-line">
            <motion.div className="h-px origin-left bg-ink" style={{ scaleX: scrollYProgress }} />
          </div>
        </div>
      </div>
    </section>
  );
}
