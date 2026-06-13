import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import cusecBand from "@/assets/cusec.png";
import { ArchiveSection } from "@/components/ArchiveSection";
import { EditorialSection } from "@/components/EditorialSection";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { ImageBand } from "@/components/ImageBand";
import { JsonLd } from "@/components/JsonLd";
import { PageShell } from "@/components/PageShell";
import { SchoolsSection } from "@/components/SchoolsSection";
import { SpeakersSection } from "@/components/SpeakersSection";
import { SponsorsSection } from "@/components/SponsorsSection";
import { StatsStatement } from "@/components/StatsStatement";
import { TestimonialsGrid } from "@/components/TestimonialsGrid";
import { editorialSections, testimonials } from "@/lib/content";
import { absoluteUrl, buildPageMetadata, siteUrl } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata.pages.home" });

  return buildPageMetadata({
    locale,
    path: "/",
    title: t("title"),
    description: t("description"),
  });
}

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Home");
  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "CUSEC",
    alternateName: "Canadian University Software Engineering Conference",
    url: absoluteUrl(locale, "/"),
  };
  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "CUSEC",
    url: siteUrl,
  };

  return (
    <>
      <JsonLd data={organizationJsonLd} />
      <JsonLd data={websiteJsonLd} />
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
