import Image, { type StaticImageData } from "next/image";
import { Section } from "./Section";

type ImageBandProps = {
  src: StaticImageData;
  alt: string;
};

export function ImageBand({ src, alt }: ImageBandProps) {
  return (
    <Section bleed className="cusec-image-band-section">
      <div className="cusec-image-band">
        <Image src={src} alt={alt} priority quality={95} sizes="100vw" />
      </div>
    </Section>
  );
}
