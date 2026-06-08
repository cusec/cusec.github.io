import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ArchiveHighlightsSection } from "@/components/ArchiveHighlightsSection";
import { ArchiveSpeakersSection } from "@/components/ArchiveSpeakersSection";
import { ArchiveSponsorsSection } from "@/components/ArchiveSponsorsSection";
import { ArchiveTeamSection } from "@/components/ArchiveTeamSection";
import { ArchiveYearHeader } from "@/components/ArchiveYearHeader";
import { Footer } from "@/components/Footer";
import { PageShell } from "@/components/PageShell";
import { getArchiveSpeakers } from "@/lib/archiveSpeakers";
import { archiveData } from "@/lib/archiveData";
import { archiveYearDetails } from "@/lib/archiveYearsData";

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
  return {
    title: t("metaTitle", { year }),
  };
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

  return (
    <>
      <PageShell>
        <ArchiveYearHeader
          year={numericYear}
          logo={archiveYear.logo}
          theme={detail?.theme}
          liveUrl={archiveYear.url}
          logoNeedsDarkBg={archiveYear.logoNeedsDarkBg}
        />
        <ArchiveSpeakersSection speakers={yearSpeakers} talks={detail?.talks ?? []} />
        <ArchiveTeamSection team={detail?.team ?? []} />
        <ArchiveSponsorsSection />
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
