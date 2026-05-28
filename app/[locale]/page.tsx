import { getTranslations, setRequestLocale } from "next-intl/server";
import { ArchiveSection } from "@/components/ArchiveSection";
import { EditorialSection } from "@/components/EditorialSection";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { ImageBand } from "@/components/ImageBand";
import { PageShell } from "@/components/PageShell";
import { SchoolsSection } from "@/components/SchoolsSection";
import { SpeakersSection } from "@/components/SpeakersSection";
import { SponsorsSection } from "@/components/SponsorsSection";
import { StatsStatement } from "@/components/StatsStatement";
import { TestimonialsGrid } from "@/components/TestimonialsGrid";
import cusecBand from "@/assets/cusec.png";
import { editorialSections, testimonials } from "@/lib/content";

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Home");

  return (
    <>
      <PageShell>
        <Hero />
        <ImageBand src={cusecBand} alt={t("bandAlt")} />
        <StatsStatement />
        <TestimonialsGrid testimonials={testimonials} />
        {editorialSections.map((section) => (
          <EditorialSection key={section.id} section={section} />
        ))}
        <ArchiveSection />
        <SponsorsSection />
        <SpeakersSection />
        <SchoolsSection />
      </PageShell>
      <Footer />
    </>
  );
}
