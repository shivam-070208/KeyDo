
import { PrismicNextImage } from "@prismicio/next";
import { PrismicRichText } from "@prismicio/react";
import clsx from "clsx";
import React from "react";
import { FeaturesSliceDefaultPrimaryBentoitemsItem } from "../../../prismicio-types";
import { InView } from "./InView";


// gsap.registerPlugin(ScrollTrigger);
const BentoComponents = ({
  item,
}: {
  item: FeaturesSliceDefaultPrimaryBentoitemsItem;
}) => {

  return (
    <div
      className={clsx(
        "relative col-span-1 h-120 overflow-hidden rounded-xl",
        item.size == "large" && "md:col-span-4",
        item.size == "medium" && "md:col-span-3",
        item.size == "small" && "md:col-span-2",
      )}
    >
        <InView >

<PrismicNextImage
        alt={""}
        className="h-full w-[100%] object-cover"
          field={item.image}
        />
        <p className="absolute bottom-0 left-4 mb-2 max-w-sm text-xl text-white">
          <PrismicRichText
            components={{
              heading1: ({ children }: { children: React.ReactNode }) => (
                <strong className="inline-block font-bold">{children}</strong>
              ),
              paragraph: ({ children }: { children: React.ReactNode }) => (
                <>{children}</>
              ),
            }}
            field={item.subhead}
          />
        </p>
          </InView>
      
       </div>
  
  );
};

export default BentoComponents;