import type { Testimonial } from "@/lib/content";
import { Section } from "./Section";
import { TestimonialQuote } from "./TestimonialQuote";

type TestimonialsGridProps = {
  testimonials: Testimonial[];
};

export function TestimonialsGrid({ testimonials }: TestimonialsGridProps) {
  return (
    <Section className="cusec-testimonials-section">
      <div className="cusec-testimonials-grid">
        {testimonials.map((testimonial) => (
          <TestimonialQuote key={testimonial.id} testimonial={testimonial} />
        ))}
      </div>
    </Section>
  );
}
