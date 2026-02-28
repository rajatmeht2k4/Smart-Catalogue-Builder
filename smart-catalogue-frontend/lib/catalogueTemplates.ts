import FreshmartFull from "@/components/catalogue/templates/freshmart/Full";
import FreshmartPreview from "@/components/catalogue/templates/freshmart/Preview";
import MinimalFull from "@/components/catalogue/templates/minimal/Full";
import MinimalPreview from "@/components/catalogue/templates/minimal/Preview";

import VibrantFull from "@/components/catalogue/templates/vibrant/Full";
import VibrantPreview from "@/components/catalogue/templates/vibrant/Preview";

// import ElegantFull from "@/components/catalogue/templates/elegant/Full";
// import ElegantPreview from "@/components/catalogue/templates/elegant/Preview";

// import FreshFull from "@/components/catalogue/templates/fresh/Full";
// import FreshPreview from "@/components/catalogue/templates/fresh/Preview";

export const catalogueTemplates = [
  {
    id: "freshmart",
    name: " Modern Retail",
    description: "Bold, modern catalogue for retail & FMCG brands",
    Preview: FreshmartPreview,
    Full: FreshmartFull,
  },
  {
    id: "minimal",
    name: "Minimal Clean",
    description: "Clean modern catalogue for any business",
    Full: MinimalFull,
    Preview: MinimalPreview,
  },
  // {
  //   id: "vibrant",
  //   name: "Vibrant Pop",
  //   description: "Colorful layout for FMCG & food brands",
  //   Full: VibrantFull,
  //   Preview: VibrantPreview,
  // },
  // {
  //   id: "elegant",
  //   name: "Elegant Classic",
  //   description: "Premium look for luxury products",
  //   Full: ElegantFull,
  //   Preview: ElegantPreview,
  // },
  // {
  //   id: "fresh",
  //   name: "Fresh Green",
  //   description: "Health & organic brands",
  //   Full: FreshFull,
  //   Preview: FreshPreview,
  // },
];