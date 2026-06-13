import { getTranslations } from "next-intl/server";
import { ButtonLink } from "@/components/ButtonLink";
import { LogoTile } from "@/components/LogoTile";
import { SectionHeading } from "@/components/SectionHeading";
import type { ArchiveSponsor } from "@/lib/archiveSponsorsData";

export async function ArchiveSponsorsSection({ sponsors }: { sponsors: ArchiveSponsor[] }) {
  const t = await getTranslations("Archives");

  return (
    <section className="cusec-section cusec-archive-section">
      <div className="cusec-section__inner">
        <SectionHeading
          title={t.rich("sponsorsHeading", { em: (chunks) => <em>{chunks}</em> })}
          lede={t("sponsorsLede")}
          align="left"
        />

        {sponsors.length > 0 ? (
          <ul className="cusec-archive-sponsors-grid">
            {sponsors.map((sponsor) => (
              <li key={sponsor.name} className="cusec-archive-sponsors-grid__item">
                <LogoTile name={sponsor.name} logo={sponsor.logo} />
              </li>
            ))}
          </ul>
        ) : (
          <p className="cusec-archive-placeholder">{t("noSponsors")}</p>
        )}

        <ButtonLink href="/historic-sponsors">{t("seeHistoricSponsors")}</ButtonLink>
      </div>
    </section>
  );
}
