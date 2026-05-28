import type { StaticImageData } from "next/image";
import fieldTall from "../assets/carsonsgit_A_lush_field_with_beautiful_blue_sky._The_field_sh_da3849c3-f6ce-4335-b673-ce909abc29c6_2.png";
import fieldWide from "../assets/carsonsgit_A_lush_field_with_beautiful_blue_sky._The_field_shou_b156f163-ef7e-41aa-9f1a-029ea08834f0.png";

export type Testimonial = {
  id: string;
};

export type EditorialSectionContent = {
  id: string;
  image: StaticImageData;
  imageSide: "left" | "right";
  bodyKeys: string[];
};

export const testimonials: Testimonial[] = [
  { id: "t1" },
  { id: "t2" },
  { id: "t3" },
  { id: "t4" },
];

export const editorialSections: EditorialSectionContent[] = [
  {
    id: "whatIsCusec",
    image: fieldWide,
    imageSide: "right",
    bodyKeys: ["body1", "body2"],
  },
  {
    id: "isCusecForMe",
    image: fieldTall,
    imageSide: "left",
    bodyKeys: ["body1"],
  },
];
