

import dynamic from "next/dynamic";

export const components = {
  features: dynamic(() => import("./Features")),
  hero: dynamic(() => import("./Hero")),
};
