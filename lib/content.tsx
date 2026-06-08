import type { StaticImageData } from "next/image";
import fieldTall from "../assets/field-tall.png";
import fieldWide from "../assets/field-wide.png";

export type Testimonial = {
  id: string;
};

export type EditorialSectionContent = {
  id: string;
  image: StaticImageData;
  imageSide: "left" | "right";
  bodyKeys: string[];
};

export const testimonials: Testimonial[] = [{ id: "t1" }, { id: "t2" }, { id: "t3" }, { id: "t4" }];

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
