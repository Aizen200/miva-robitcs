"use client";

import { ReactLenis } from "lenis/react";
import { MotionConfig } from "motion/react";
import { createContext, useContext, useState, type ReactNode } from "react";

type Intro = { done: boolean; setDone: (done: boolean) => void };

// Lets the hero (and header) wait for the preloader before animating in.
const IntroContext = createContext<Intro>({ done: false, setDone: () => {} });

export const useIntro = () => useContext(IntroContext);

export function Providers({ children }: { children: ReactNode }) {
  const [done, setDone] = useState(false);

  return (
    <ReactLenis root options={{ lerp: 0.09, anchors: true }}>
      <MotionConfig reducedMotion="user">
        <IntroContext value={{ done, setDone }}>{children}</IntroContext>
      </MotionConfig>
    </ReactLenis>
  );
}
