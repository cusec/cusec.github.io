import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ArchiveHighlightsSection } from "@/components/ArchiveHighlightsSection";
import { ArchiveSpeakersSection } from "@/components/ArchiveSpeakersSection";
import { ArchiveSponsorsSection } from "@/components/ArchiveSponsorsSection";
import { ArchiveTeamSection } from "@/components/ArchiveTeamSection";
import { ArchiveYearHeader } from "@/components/ArchiveYearHeader";
import { Footer } from "@/components/Footer";
import { JsonLd } from "@/components/JsonLd";
import { PageShell } from "@/components/PageShell";
import { archiveData } from "@/lib/archiveData";
import { getArchiveSpeakers } from "@/lib/archiveSpeakers";
import { getArchiveSponsors } from "@/lib/archiveSponsorsData";
import { archiveYearDetails } from "@/lib/archiveYearsData";
import { absoluteUrl, buildPageMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return archiveData.map((item) => ({ year: String(item.year) }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; year: string }>;
}): Promise<Metadata> {
  const { locale, year } = await params;
  const t = await getTranslations({ locale, namespace: "Archives" });
  const metadata = await getTranslations({ locale, namespace: "Metadata" });
  const title = t("metaTitle", { year });
  const description = archiveYearDetails[Number(year)]?.summary ?? metadata("description");

  return buildPageMetadata({
    locale,
    path: `/archives/${year}`,
    title,
    description,
  });
}

export default async function ArchiveYearPage({
  params,
}: {
  params: Promise<{ locale: string; year: string }>;
}) {
  const { locale, year } = await params;
  setRequestLocale(locale);

  const numericYear = Number(year);
  const archiveYear = archiveData.find((item) => item.year === numericYear);

  if (!archiveYear) {
    notFound();
  }

  const detail = archiveYearDetails[numericYear];
  const yearSpeakers = getArchiveSpeakers(numericYear);
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "CUSEC",
        item: absoluteUrl(locale, "/"),
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Archives",
        item: absoluteUrl(locale, "/archives"),
      },
      {
        "@type": "ListItem",
        position: 3,
        name: `CUSEC ${numericYear}`,
        item: absoluteUrl(locale, `/archives/${numericYear}`),
      },
    ],
  };

  return (
    <>
      <JsonLd data={breadcrumbJsonLd} />
      <PageShell>
        <ArchiveYearHeader
          year={numericYear}
          logo={archiveYear.logo}
          theme={detail?.theme}
          summary={detail?.summary}
          liveUrl={archiveYear.url}
          logoNeedsDarkBg={archiveYear.logoNeedsDarkBg}
        />
        <ArchiveSpeakersSection speakers={yearSpeakers} talks={detail?.talks ?? []} />
        <ArchiveTeamSection team={detail?.team ?? []} />
        <ArchiveSponsorsSection sponsors={getArchiveSponsors(numericYear)} />
        <ArchiveHighlightsSection
          highlights={detail?.highlights ?? []}
          liveUrl={archiveYear.url}
          year={numericYear}
        />
      </PageShell>
      <Footer />
    </>
  );
}
