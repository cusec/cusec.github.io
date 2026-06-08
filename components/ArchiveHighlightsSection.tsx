import { getTranslations } from "next-intl/server";
import { SectionHeading } from "@/components/SectionHeading";
import { resolveArchiveUrl, type ArchiveLink } from "@/lib/archiveYearsData";

type ArchiveHighlightsSectionProps = {
  highlights: ArchiveLink[];
  liveUrl?: string;
  year: number;
};

export async function ArchiveHighlightsSection({
  highlights,
  liveUrl,
  year,
}: ArchiveHighlightsSectionProps) {
  const t = await getTranslations("Archives");

  const hasContent = highlights.length > 0 || Boolean(liveUrl);

  return (
    <section className="cusec-section cusec-archive-section">
      <div className="cusec-section__inner">
        <SectionHeading
          title={t.rich("highlightsHeading", { em: (chunks) => <em>{chunks}</em> })}
          lede={t("highlightsLede")}
          align="left"
        />

        {hasContent ? (
          <div className="cusec-archive-highlights">
            {liveUrl && (
              <a
                href={liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="cusec-archive-chip cusec-archive-chip--feature"
              >
                {t("visitYearSite", { year })}
              </a>
            )}
            {highlights.map((link) => (
              <a
                key={link.url}
                href={resolveArchiveUrl(link.url)}
                target="_blank"
                rel="noopener noreferrer"
                className="cusec-archive-chip"
              >
                {link.label}
              </a>
            ))}
          </div>
        ) : (
          <p className="cusec-archive-placeholder">{t("noHighlights")}</p>
        )}
      </div>
    </section>
  );
}
