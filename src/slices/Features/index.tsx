import { FC } from "react";
import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import { Bounded } from "@/app/components";
import { PrismicNextImage } from "@prismicio/next";
import clsx from "clsx";
import { Noto_Serif_Dives_Akuru } from "next/font/google";

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
      <div className=" font-bold-slanted text-8xl mb-3 ">

    <PrismicRichText  field={slice.primary.heading1} />
        </div>
    <div className={"w-full h-full grid grid-cols-1 gap-3 md:grid-cols-6"}>
    {slice.primary.bentoitems.map((item,index) =>  (
      <div key={index} className={clsx("h-120 w-full overflow-hidden col-span-1 relative rounded-xl ",item.size=="large"&&"md:col-span-4",item.size=="medium"&&"md:col-span-3",item.size=="small"&&"md:col-span-2")}>
      
        <PrismicNextImage  className=" w-[100%] h-full object-cover" field={item.image} />
       <p className="text-xl max-w-sm mb-2 text-white absolute bottom-0 left-4 ">

        <PrismicRichText components={{
          heading1:({children}:{children:React.ReactNode})=>(
            <strong className="inline-block font-bold">{children}</strong>
          ),
          paragraph:({children}:{children:React.ReactNode})=>(
            <>{children}</>
          )
        }} field={item.subhead} />
       </p>
   
      </div>
))}
    </div>
    </Bounded>
  );
};

export default Features;
