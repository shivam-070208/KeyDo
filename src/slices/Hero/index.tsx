"use client";
import { FC } from "react";
import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import { Bounded } from "@/app/components";
import { Scene } from "./Scene";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger, SplitText } from "gsap/all";

/**
 * Props for `Hero`.
 */
export type HeroProps = SliceComponentProps<Content.HeroSlice>;
gsap.registerPlugin(useGSAP, SplitText, ScrollTrigger);
/**
 * Component for "Hero" Slices.
 */
const Hero: FC<HeroProps> = ({ slice }) => {
  useGSAP(() => {
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const split = SplitText.create(".hero-heading", {
        type: "chars,lines",
        mask: "lines",
        linesClass: "line++",
      });

      const tl = gsap.timeline({ delay: 4.2 });

      tl.from(split.chars, {
        opacity: 0,
        y: -120,
        ease: "back",
        duration: 0.4,
        stagger: 0.07,
      }).to(".hero-body", { opacity: 1, duration: 0.6, ease: "power2.out" });
    });

    mm.add("(prefers-reduced-motion: reduce)", () => {
      gsap.set(".hero-heading, .hero-body", { opacity: 1 });
    });
  });
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="blue-gradient-bg hero h-dvh text-white text-shadow-black/30 text-shadow-lg motion-safe:h-[300vh]"
    >
      <div className="hero-scene pointer-events-none sticky top-0 h-dvh w-full">
        <Scene />
      </div>
      <div className="hero-content absolute inset-x-0 top-0 h-dvh">
        <Bounded
          fullWidth
          className="absolute inset-x-0 top-16 md:top-24 md:left-[8vw]"
        >
          <PrismicRichText
            field={slice.primary.heading}
            components={{
              heading1: ({ children }) => (
                <h1 className="hero-heading font-bold-slanted text-6xl leading-[0.8] font-[950]! uppercase sm:text-7xl lg:text-8xl">
                  {children}
                </h1>
              ),
            }}
          />
        </Bounded>
        <Bounded
          fullWidth
          className="absolute inset-x-0 bottom-0 md:right-[10vw] md:left-auto"
        >
          <div className="max-w-lg">
            <PrismicRichText
              field={slice.primary.body}
              components={{
                heading2: ({ children }: { children: React.ReactNode }) => (
                  <h1 className="hero-heading font-bold-slanted text-4xl leading-[0.8] uppercase lg:text-6xl">
                    {children}
                  </h1>
                ),
                paragraph: ({ children }: { children: React.ReactNode }) => (
                  <p className="hero-body opacity-0">{children}</p>
                ),
              }}
            />
          </div>
          <button className="font-bold-slanted hero-body group flex w-fit cursor-pointer items-center gap-1 rounded bg-[#01A7E1] px-3 py-1 text-2xl uppercase opacity-0 transition disabled:grayscale">
            {slice.primary.buy_button_text}
            <span className="transition-all group-hover:translate-x-1">
              {">"}
            </span>
          </button>
        </Bounded>
      </div>
    </section>
  );
};

export default Hero;
