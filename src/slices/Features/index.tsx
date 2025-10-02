import { FC } from "react";
import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import { Bounded } from "@/app/components";
import { PrismicNextImage } from "@prismicio/next";
import clsx from "clsx";
import { Noto_Serif_Dives_Akuru } from "next/font/google";
import dynamic from "next/dynamic";
const BentoComponents = dynamic(
  () => import("@/app/components/BentoComponents"),
);

/**
 * Props for `Features`.
 */
export type FeaturesProps = SliceComponentProps<Content.FeaturesSlice>;

/**
 * Component for "Features" Slices.
 */
const Features: FC<FeaturesProps> = ({ slice }) => {
  return (
    <Bounded
      innerClassName={" max-w-7xl"}
      data-slice-type={slice.slice_type}
      fullWidth={true}
      data-slice-variation={slice.variation}
    >
      <div className="font-bold-slanted mb-3 text-8xl">
        <PrismicRichText field={slice.primary.heading1} />
      </div>
      <div className={"grid h-full w-full grid-cols-1 gap-3 md:grid-cols-6"}>
        {slice.primary.bentoitems.map((item, index) => (
          <BentoComponents item={item} key={index} />
        ))}
      </div>
    </Bounded>
  );
};

export default Features;
