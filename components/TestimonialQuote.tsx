import { useTranslations } from "next-intl";
import type { Testimonial } from "@/lib/content";

type TestimonialQuoteProps = {
  testimonial: Testimonial;
};

export function TestimonialQuote({ testimonial }: TestimonialQuoteProps) {
  const t = useTranslations("Testimonials");

  return (
    <figure className="cusec-testimonial">
      <blockquote>
        <p>{t.rich(testimonial.id, { b: (chunks) => <strong>{chunks}</strong> })}</p>
      </blockquote>
      <figcaption>{t(`attributions.${testimonial.id}`)}</figcaption>
    </figure>
  );
}
