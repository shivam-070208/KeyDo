import { FC } from "react";
import { Content, isFilled } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import { Bounded, SharedCanvas } from "@/app/components";

/**
 * Props for `Clicks`.
 */
export type ClicksProps = SliceComponentProps<Content.ClicksSlice>;

/**
 * Component for "Clicks" Slices.
 */
const Clicks: FC<ClicksProps> = ({ slice }) => {
  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <div className="text-lg font-semibold mb-2">
        <PrismicRichText
          components={{
            heading1: ({ children }: { children: React.ReactNode }) => (
              <h1 className="font-bold-slanted text text-6xl md:text-8xl">
                {children}
              </h1>
            ),
          }}
          field={slice.primary.heading}
        />
      </div>
      <div className="grid w-full grid-cols-1 gap-2 md:grid-cols-2">
        {slice.primary.clicksitems.map((item, index) => {
          const is = isFilled.contentRelationship(item.switch);
          if (is) return <SharedCanvas color={item.switch} key={index} />;
          return null;
        })}
      </div>
    </Bounded>
  );
};

export default Clicks;
