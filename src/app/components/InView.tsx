"use client"
import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import clsx from "clsx";

// gsap.registerPlugin(ScrollTrigger);
export const InView = ({
children,

}: {
  children : React.ReactNode;

}) => {
  const Cardref = useRef<HTMLDivElement | null>(null);
  useGSAP(() => {
    if (!Cardref.current) return;
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.from(Cardref.current, {
        y: 230,
        opacity: 0,
        ease: "back",
        scrollTrigger: {
          trigger: Cardref.current,
          start: "top bottom",
          toggleActions: "play pause pause reverse",
        },
      });
    });
  }, [Cardref]);
  return (
      <div ref={Cardref} className={clsx("  w-full h-full")}>
  {children}
    </div>
  );
};
